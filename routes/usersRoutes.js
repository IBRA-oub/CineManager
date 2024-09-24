// const express = require('express');
import express from "express";
import UserController from "../controllers/UserController.js";
const router = express.Router();

router.post('/register', UserController.registerUser)
router.post('/login', UserController.loginUser)
router.get('/current', UserController.currentUser)

export default router;
