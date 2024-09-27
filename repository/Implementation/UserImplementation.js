import UserInterface from '../Interface/UserInterface.js';
import UserModel from "../../models/User.mjs";
import bcrypt from "bcrypt";
import crypto from 'crypto';
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import sendMail from "../../email.js";

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
        // console.log("hashed password: " + hashedPassword);

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
                    role:user.role,
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

     requestPasswordReset = asyncHandler(async (req, res) => {
        const { email } = req.body;
        
        try {
          
            const user = await UserModel.User.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            
            const token = crypto.randomBytes(20).toString('hex');
    
          
            user.resetPasswordToken = token;
            user.resetPasswordExpires = Date.now() + 3600000; 
    
            
            await user.save();
    
          
           
            const resetUrl = ` http://localhost:3000/api/user/resetPassword/${token}`;
            await sendMail(
                user.email,
                "Password Reset",
                `You are receiving this because you have requested the reset of your password.\n\n` +
                `Please click on the following link, or paste this into your browser to complete the process:\n\n` +
                `${resetUrl}\n\n` +
                `If you did not request this, please ignore this email and your password will remain unchanged.\n`
            );
    
            res.status(200).json({ message: 'Password reset link has been sent to your email.' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });

     resetPassword = asyncHandler(async (req, res) => {
        const { token } = req.params;
        const { newPassword } = req.body;
    
        try {
           
            const user = await UserModel.User.findOne({
                resetPasswordToken: token,
                resetPasswordExpires: { $gt: Date.now() }
            });
    
            if (!user) {
                return res.status(400).json({ message: 'Password reset token is invalid or has expired.' });
            }
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            
            user.password = hashedPassword;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
    
          
            await user.save();
    
            res.status(200).json({ message: 'Password has been reset successfully.' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });


}

export default UserRepository;
