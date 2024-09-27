import express from "express";
import ReservationController from "../controllers/ReservationController.js";

const router = express.Router();

router.get('/allReservation', ReservationController.getAllReservation);
router.post('/createReservation', ReservationController.createReservation);
router.get('/getReservation/:id', ReservationController.getReservation);
router.put('/updateReservation/:id', ReservationController.updateReservation);
router.delete('/deleteReservation/:id', ReservationController.deleteReservation);

export default router;