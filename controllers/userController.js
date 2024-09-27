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
    requestPasswordReset = async (req, res) => { 
        this.UserService.requestPasswordReset(req,res);  
       
    };
    resetPassword = async (req, res) => { 
        this.UserService.resetPassword(req,res);  
       
    };
}

export default new UserController();


