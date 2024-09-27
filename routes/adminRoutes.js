import express from "express";
import AdminController from "../controllers/AdminController.js";
const router = express.Router();

router.get('/allAdmin', AdminController.getAllAdmin);
router.post('/createAdmin', AdminController.createAdmin);
router.get('/getAdmin/:id', AdminController.getAdmin);
router.put('/updateAdmin/:id', AdminController.updateAdmin);
router.delete('/deleteAdmin/:id', AdminController.deleteAdmin);

export default router;