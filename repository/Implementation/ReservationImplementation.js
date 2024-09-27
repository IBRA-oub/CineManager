import asyncHandler from "express-async-handler";
import ReservationModel from "../../models/Reservation.mjs";
import SeanceModel from "../../models/Seance.mjs";
import UserModel from "../../models/User.mjs";
import ReservationInterface from "../Interface/ReservationInterface.js";
import sendMail from "../../email.js";
import jwt from "jsonwebtoken";



class ReservationRepository extends ReservationInterface {


    createReservation = asyncHandler(async (req, res) => {
        const { seanceId, places_reservees } = req.body;

    try {
        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Token not provided' });
        }

        const decoded = jwt.verify(token, process.env.ACCESSS_TOKEN_SECRET);
        const userId = decoded.user.id;

        const user = await UserModel.User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const seance = await SeanceModel.Seance.findById(seanceId);
        if (!seance) {
            return res.status(404).json({ message: 'Séance introuvable.' });
        }

        let toutesPlacesDisponibles = true;
        places_reservees.forEach((place) => {
            const placeInSeance = seance.places.find(p => p.numero === place.numero);
            if (!placeInSeance || !placeInSeance.disponible) {
                toutesPlacesDisponibles = false;
            }
        });

        if (!toutesPlacesDisponibles) {
            return res.status(400).json({ message: 'Une ou plusieurs places ne sont pas disponibles.' });
        }

        seance.places = seance.places.map((place) => {
            if (places_reservees.find(p => p.numero === place.numero)) {
                return { ...place, disponible: false };
            }
            return place;
        });
        await seance.save();
        console.log(user.email);
        
        
        try {
            await sendMail(
                user.email, 
                'Confirmation de Réservation',  
                `Votre réservation pour la séance "${seance.description}" a été confirmée. Places réservées : ${places_reservees.map(p => p.numero).join(', ')}.` 
            );
            console.log('E-mail de confirmation envoyé.');
        } catch (emailError) {
            console.error("Erreur lors de l'envoi de l'e-mail:", emailError.message);
        }

       
        const nouvelleReservation = await ReservationModel.Reservation.create({
            user: user,
            seance: seance,
            places_reservees,
            status: 'confirmed'
        });

        return res.status(201).json({
            success: true,
            message: 'Réservation effectuée avec succès.',
            reservation: nouvelleReservation
        });

    } catch (error) {
        console.error('Erreur lors de la création de la réservation:', error.message);
        return res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
    });

    getAllReservation = asyncHandler(async (req, res) => {
        try {
            
            const token = req.headers['authorization']?.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'Token not provided' });
            }

            
            const decoded = jwt.verify(token, process.env.ACCESSS_TOKEN_SECRET);
            const userId = decoded.user.id;

            
            const reservations = await ReservationModel.Reservation.find({ user: userId });
            if (!reservations || reservations.length === 0) {
                return res.status(404).json({ message: 'No reservations found for this user' });
            }


            res.status(200).json(reservations);
        } catch (error) {
            console.error('Erreur lors de la récupération des réservations:', error.message);
            res.status(500).json({ message: 'Erreur interne du serveur.' });
        }
    });


    getReservation = asyncHandler(async (req, res) => {
        try {
            
            const token = req.headers['authorization']?.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'Token not provided' });
            }

            
            const decoded = jwt.verify(token, process.env.ACCESSS_TOKEN_SECRET);
            const userId = decoded.user.id; 

            
            const reservation = await ReservationModel.Reservation.findById(req.params.id).populate('seance');;
            if (!reservation) {
                return res.status(404).json({ message: "Reservation not found" });
            }

           
            if (reservation.user.toString() !== userId) {
                return res.status(403).json({ message: "Access denied, this reservation does not belong to you" });
            }

            res.status(200).json(reservation);
        } catch (error) {
            console.error('Erreur lors de la récupération de la réservation:', error.message);
            res.status(500).json({ message: 'Erreur interne du serveur.' });
        }
    });


    deleteReservation = asyncHandler(async (req, res) => {
        
        const reservation = await ReservationModel.Reservation.findById(req.params.id);

        if (!reservation) {
            res.status(404);
            throw new Error("Réservation introuvable");
        }

        
        const seance = await SeanceModel.Seance.findById(reservation.seance);
        if (!seance) {
            res.status(404);
            throw new Error("Séance introuvable");
        }

       
        reservation.places_reservees.forEach((placeReservee) => {
            seance.places = seance.places.map((place) => {
                if (place.numero === placeReservee.numero) {
                    return { ...place, disponible: true };
                }
                return place;
            });
        });

       
        await seance.save();

       
        await ReservationModel.Reservation.deleteOne({ _id: reservation._id });

        res.status(200).json({ message: "Réservation supprimée et places rendues disponibles avec succès" });
    });

}

export default ReservationRepository;
