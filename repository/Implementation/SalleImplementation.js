import SalleInterface from '../Interface/SalleInterface.js';
import SalleModel from "../../models/Salle.mjs";
import asyncHandler from "express-async-handler";

class SalleRepository extends SalleInterface {
    getAllSalle = asyncHandler(async (req, res) => {
        const salles = await SalleModel.Salle.find();
        res.status(200).json(salles);
    });
    createSalle = asyncHandler(async (req, res) => {
        const { nom, places, type } = req.body;

        if (!nom || !places || !type ) {
            res.status(400);
            throw new Error("All fields are required")
        }

        const salle = await SalleModel.Salle.create({
            nom,
            places,
            type
        });
        res.status(201).json(salle);

    });

    getSalle = asyncHandler(async (req, res) => {
        const salle = await SalleModel.Salle.findById(req.params.id);
        if (!salle) {
            res.status(404);
            throw new Error("Salle not found")
        }
        res.status(200).json(salle)
    });

    updateSalle = asyncHandler(async (req, res) => {
        const salle = await SalleModel.Salle.findById(req.params.id);
        if (!salle) {
            res.status(404);
            throw new Error("Salle not found")
        }

        const updatedSalle = await SalleModel.Salle.findByIdAndUpdate(

            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedSalle);

    });

    deleteSalle = asyncHandler(async (req, res) => {
        const salle = await SalleModel.Salle.findById(req.params.id);
        if (!salle) {
            res.status(404);
            throw new Error("Salle not found")
        }

        await SalleModel.Salle.deleteOne(salle);
        res.status(200).json({ message: "salle delete seccessfuly " })
    })
}

export default SalleRepository