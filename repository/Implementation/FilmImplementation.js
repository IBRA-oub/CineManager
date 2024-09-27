import FilmInterface from '../Interface/FilmInterface.js';
import FilmModel from "../../models/Film.mjs";
import asyncHandler from "express-async-handler";
import path from 'path';
import upload from '../../middleware/configMulter.js';


class FilmRepository extends FilmInterface {

    getAllFilm = asyncHandler(async (req, res) => {
        const films = await FilmModel.Film.find();
        res.status(200).json(films);
    });
    
    createFilm = asyncHandler(async (req, res) => {
        const { titre, description, genre, duree, annee } = req.body;

         
         if (!req.file) {
            return res.status(400).json({ message: 'Image is required' });
        }

        if (!titre || !description || !genre || !duree || !annee) {
            res.status(400);
            throw new Error("All fields are required")
        }
        const imagePath = req.file.path;

        const film = await FilmModel.Film.create({
            titre,
            description,
            genre,
            duree,
            annee,
            image: {
                data: imagePath,
                contentType: req.file.mimetype
            }
        });
        res.status(201).json(film);

    });

    getFilm = asyncHandler(async (req, res) => {
        const film = await FilmModel.Film.findById(req.params.id);
        if (!film) {
            res.status(404);
            throw new Error("Film not found")
        }
        res.status(200).json(film)
    });

    updateFilm = asyncHandler(async (req, res) => {
        const film = await FilmModel.Film.findById(req.params.id);
        if (!film) {
            res.status(404);
            throw new Error("Film not found")
        }

        if (req.file) {
            const imagePath = req.file.path;
            req.body.image = {
                data: imagePath,
                contentType: req.file.mimetype
            };
        }

        const updatedFilm = await FilmModel.Film.findByIdAndUpdate(

            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedFilm);

    });

    deleteFilm = asyncHandler(async (req, res) => {
        const film = await FilmModel.Film.findById(req.params.id);
        if (!film) {
            res.status(404);
            throw new Error("Film not found")
        }

        await FilmModel.Film.deleteOne(film);
        res.status(200).json({ message: "film delete seccessfuly " })
    })
}

export default FilmRepository;