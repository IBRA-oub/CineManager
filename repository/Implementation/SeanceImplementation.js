import SeanceInterface from '../Interface/SeanceInterface.js';
import FilmModel from "../../models/Film.mjs";
import SeanceModel from "../../models/Seance.mjs";
import SalleModel from "../../models/Salle.mjs";
import asyncHandler from "express-async-handler";

class SeanceRepository extends SeanceInterface {

    getAllSeance = asyncHandler(async (req, res) => {
        const seancesSchema = await SeanceModel.Seance.find();
        res.status(200).json(seancesSchema);
    });
    createSeance = asyncHandler(async (req, res) => {

        const { date_heure, tarif, filmId, salleId } = req.body;

        const salle = await SalleModel.Salle.findById(salleId);
        const film = await FilmModel.Film.findById(filmId);

        if (!salle || !film) {
            return res.status(404).json({ message: "Salle ou film non trouvée" });
        }

        const places = [];
        for (let i = 1; i <= salle.places; i++) {
            places.push({ numero: i, disponible: true });
        }

        const Seance = await SeanceModel.Seance.create({
            date_heure,
            tarif,
            film: {
                titre: film.titre,
                genre: film.genre,
                duree: film.duree,
                annee: film.annee
            },
            salle: {
                nom: salle.nom,
                type: salle.type,
                places_totales: salle.places
            },
            places
        });
        res.status(201).json(Seance);
    })
    getSeance = asyncHandler(async (req, res) => {
        const seance = await SeanceModel.Seance.findById(req.params.id);
        if (!seance) {
            res.status(404);
            throw new Error("seance not found")
        }
        res.status(200).json(seance)
    });

    updateSeance = asyncHandler(async (req, res) => {
        const { salleId, filmId, date_heure, tarif } = req.body;

        const seance = await SeanceModel.Seance.findById(req.params.id);

        if (!seance) {
            return res.status(404).json({ message: "Séance non trouvée" });
        }

        if (filmId) {
            const film = await FilmModel.Film.findById(filmId);
            if (!film) {
                return res.status(404).json({ message: "Film non trouvé" });
            }
            seance.film = {
                titre: film.titre,
                genre: film.genre,
                duree: film.duree,
                annee: film.annee
            };
        }

        if (salleId) {
            const salle = await SalleModel.Salle.findById(salleId);
            if (!salle) {
                return res.status(404).json({ message: "Salle non trouvée" });
            }

            const places = [];
            for (let i = 1; i <= salle.places; i++) {
                places.push({ numero: i, disponible: true });
            }
            seance.salle = {
                nom: salle.nom,
                type: salle.type,
                places_totales: salle.places
            };
            seance.places = places;
        }
        if (date_heure) seance.date_heure = date_heure;
        if (tarif) seance.tarif = tarif;

        const updatedSeance = await seance.save();
        return res.status(200).json(updatedSeance);
    });

    deleteSeance = asyncHandler(async (req, res) => {
        const seance = await SeanceModel.Seance.findById(req.params.id);
        if (!seance) {
            res.status(404);
            throw new Error("Seance not found")
        }

        await SeanceModel.Seance.deleteOne(seance);
        res.status(200).json({ message: "seance delete seccessfuly " })
    })


}

export default SeanceRepository;