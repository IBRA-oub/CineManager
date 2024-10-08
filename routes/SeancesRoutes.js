import express from "express";
import SeanceController from "../controllers/SeanceController.js";
import validateToken from "../middleware/validateTokenHandler.js";
import checkRole from "../middleware/checkRole.js";


const router = express.Router();

router.get('/allSeance', SeanceController.getAllSeance);
router.post('/createSeance',validateToken, checkRole("admin"), SeanceController.createSeance);
router.get('/getSeance/:id', SeanceController.getSeance);
router.put('/updateSeance/:id',validateToken, checkRole("admin"), SeanceController.updateSeance);
router.delete('/deleteSeance/:id',validateToken, checkRole("admin"), SeanceController.deleteSeance);

export default router;