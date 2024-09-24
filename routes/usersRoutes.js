// const express = require('express');
import express from "express";
import UserController from "../controllers/UserController.js";
import validateToken from "../middleware/validateTokenHandler.js";
const router = express.Router();

router.post('/register', UserController.registerUser)
router.post('/login', UserController.loginUser)
router.get('/current',validateToken, UserController.currentUser)

export default router;
