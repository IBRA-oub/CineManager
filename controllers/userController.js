import UserService from "../services/serviceImplementation/ServiceUserImplementation.js";
// import asyncHandler from "express-async-handler";
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
    currentUser = async (req, res) => { 
        this.UserService.currentUser(req,res);  
       
    };
}

export default new UserController();


