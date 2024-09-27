import asyncHandler from "express-async-handler";
import ReservationModel from "../../models/Reservation.mjs";
import SeanceModel from "../../models/Seance.mjs";
import ReservationInterface from "../Interface/ReservationInterface.js"


class ReservationRepository extends ReservationInterface {


    createReservation = asyncHandler(async (req, res) => {
        const { seanceId, places_reservees } = req.body;


        try {
            // Trouver la séance par ID
            const seance = await SeanceModel.Seance.findById(seanceId);
            console.log(seance)
            if (!seance) {
                return res.status(404).json({ message: 'Séance introuvable.' });
            }

            // Vérifier si les places demandées sont disponibles
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

            // Mettre à jour les places pour les marquer comme réservées
            seance.places = seance.places.map((place) => {
                if (places_reservees.find(p => p.numero === place.numero)) {
                    return { ...place, disponible: false };
                }
                return place;
            });
            await seance.save();

            // Créer la réservation
            try {

                const nouvelleReservation = await ReservationModel.Reservation.create({

                    seance: seanceId,
                    places_reservees,
                    status: 'confirmed'
                });
                return res.status(201).json({
                    success: true,
                    message: 'Réservation effectuée avec succès.',
                    reservation: nouvelleReservation
                });
            } catch (error) {
                console.log(error);

            }



        } catch (error) {
            console.error('Erreur lors de la création de la réservation:', error.message);
            return res.status(500).json({ message: 'Erreur interne du serveur.' });
        }
    });
}



export default ReservationRepository;
