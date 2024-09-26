import express from "express";
import SalleController from "../controllers/SalleController.js";

const router = express.Router();

router.get('/allSalle', SalleController.getAllSalle);
router.post('/createSalle', SalleController.createSalle);
router.get('/getSalle/:id', SalleController.getSalle);
router.put('/updateSalle/:id', SalleController.updateSalle);
router.delete('/deleteSalle/:id', SalleController.deleteSalle);

export default router;