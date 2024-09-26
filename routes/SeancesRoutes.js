import express from "express";
import SeanceController from "../controllers/SeanceController.js";

const router = express.Router();

router.get('/allSeance', SeanceController.getAllSeance);
router.post('/createSeance', SeanceController.createSeance);
router.get('/getSeance/:id', SeanceController.getSeance);
router.put('/updateSeance/:id', SeanceController.updateSeance);
router.delete('/deleteSeance/:id', SeanceController.deleteSeance);

export default router;