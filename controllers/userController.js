import UserService from "../services/serviceImplementation/ServiceUserImplementation.js";
import asyncHandler from "express-async-handler";
class UserController {
    constructor() {
        this.UserService = new UserService();
    }
    registerUser = async(req,res)=>{
         this.UserService.create(req,res);
    };
   

    loginUser = async (req, res) => {   
        this.UserService.loginUser(req,res);
       
    };
    currentUser = asyncHandler(async (req, res) => {   
        res.json({message:"current  user"});
    });
}

export default new UserController();


