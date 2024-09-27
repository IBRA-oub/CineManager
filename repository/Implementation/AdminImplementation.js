import AdminInterface from '../Interface/AdminInterface.js';
import UserModel from "../../models/User.mjs";
import bcrypt from "bcrypt";
// import crypto from 'crypto';
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

class AdminRepository extends AdminInterface {

    createAdmin = asyncHandler(async (req, res) => {
        const { nom, email, password } = req.body;

        if (!nom || !email || !password) {
            res.status(400);
            throw new Error("All fields are mandatory!");
        }

        const userAvailable = await UserModel.User.findOne({ email });
        if (userAvailable) {
            res.status(400).json({ "message": "User already exists" })
            throw new Error("User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("hashed password: " + hashedPassword);

        const user = await UserModel.User.create({
            nom,
            email,
            password: hashedPassword,
            role: "admin"
        });

        console.log(`User created: ${user}`);

        if (user) {
            console.log('user entered');
            return res.status(201).json({ _id: user.id, email: user.email, role: user.role });
        } else {
            res.status(400);
            throw new Error("User data is not valid");
        }
    });

    getAllAdmin = asyncHandler(async (req, res) => {
        const admins = await UserModel.User.find({ role: "admin" });
        res.status(200).json(admins);
    });

    getAdmin = asyncHandler(async (req, res) => {

        const admin = await UserModel.User.findById(req.params.id);


        if (!admin || admin.role !== "admin") {
            res.status(404);
            throw new Error("Admin not found");
        }

        res.status(200).json(admin);
    });

    updateAdmin = asyncHandler(async (req, res) => {
        const admin = await UserModel.User.findById(req.params.id);
        if (!admin || admin.role !== "admin") {
            res.status(404);
            throw new Error("Admin not found");
        }

        const updatedAdmin = await UserModel.User.findByIdAndUpdate(

            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedAdmin);

    });

    deleteAdmin = asyncHandler(async (req, res) => {
        const admin = await UserModel.User.findById(req.params.id);

        if (!admin || admin.role !== "admin") {
            res.status(404);
            throw new Error("Admin not found");
        }


        await UserModel.User.deleteOne(admin);
        res.status(200).json({ message: "Admin delete seccessfuly " })
    })



}

export default AdminRepository;
