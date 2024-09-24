import FilmInterface from '../Interface/FilmInterface.js';
import FilmModel from "../../models/Film.mjs";
import asyncHandler from "express-async-handler";

class FilmRepository extends FilmInterface {

    getAllFilm = asyncHandler(async (req, res) => {
        const films = await FilmModel.Film.find();
        res.status(200).json(films);
    });
    createFilm = asyncHandler(async (req, res) => {
        const{titre,description,genre,duree,annee} = req.body;

        if(!titre || !description || !genre || !duree || !annee ){
            res.status(400);
            throw new Error ("All fields are required")
        }

        const film = await FilmModel.Film.create({
            titre,
            description,
            genre,
            duree,
            annee
        });
        res.status(201).json(film);
         
    });
}

export default FilmRepository;