import UserInterface from '../Interface/UserInterface.js';
import UserModel from "../../models/User.mjs";
import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";

class UserRepository extends UserInterface {
    // Encapsuler la méthode avec asyncHandler
    create = asyncHandler(async (req, res) => {
        const { nom, email, password, role } = req.body;

        if (!nom || !email || !password || !role) {
            res.status(400);
            throw new Error("All fields are mandatory!");
        }

        const userAvailable = await UserModel.User.findOne({ email });
        if (userAvailable) {
            res.status(400);
            throw new Error("User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("hashed password: " + hashedPassword);

        const user = await UserModel.User.create({
            nom,
            email,
            password: hashedPassword,
            role
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
}

export default UserRepository;
