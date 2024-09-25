import express from "express";
import FilmController from "../controllers/FilmController.js";
const router = express.Router();

router.get('/allFilm', FilmController.getAllFilm);
router.post('/createFilm', FilmController.createFilm);
router.get('/getFilm/:id', FilmController.getFilm);
router.put('/updateFilm/:id', FilmController.updateFilm);
router.delete('/deleteFilm/:id', FilmController.deleteFilm);

export default router;