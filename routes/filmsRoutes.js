import express from "express";
import FilmController from "../controllers/FilmController.js";
import validateToken from "../middleware/validateTokenHandler.js";
import checkRole from "../middleware/checkRole.js";
import upload from "../middleware/configMulter.js";
const router = express.Router();

router.get('/allFilm', FilmController.getAllFilm);
router.post('/createFilm',validateToken, checkRole("admin"),upload.single('image'), FilmController.createFilm);
router.get('/getFilm/:id', FilmController.getFilm);
router.put('/updateFilm/:id',validateToken, checkRole("admin"), FilmController.updateFilm);
router.delete('/deleteFilm/:id',validateToken, checkRole("admin"), FilmController.deleteFilm);

export default router;