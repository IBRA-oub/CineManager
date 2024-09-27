import UserInterface from '../Interface/UserInterface.js';
import UserModel from "../../models/User.mjs";
import bcrypt from "bcrypt";
// import crypto from 'crypto';
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

class UserRepository extends UserInterface {

    create = asyncHandler(async (req, res) => {
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
            password: hashedPassword
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



    loginUser = asyncHandler(async (req, res) => {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400);
            throw new Error("All fields are mandatory!")
        }

        const user = await UserModel.User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            const accessToken = jwt.sign({
                user: {
                    nom: user.nom,
                    email: user.email,
                    id: user.id
                },
            }, process.env.ACCESSS_TOKEN_SECRET, { expiresIn: '1800s' });

            res.status(200).json({ accessToken })
        } else {
            res.status(401)
            throw new Error("email or password is not valid")
        }

    });

    currentUser = asyncHandler(async (req, res) => {
        res.json(req.user);
    });
}

export default UserRepository;
