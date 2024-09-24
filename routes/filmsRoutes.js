import express from "express";
import FilmController from "../controllers/FilmController.js";
const router = express.Router();

router.get('/allFilm', FilmController.getAllFilm);
router.post('/createFilm', FilmController.createFilm);

export default router;