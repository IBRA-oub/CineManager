import AdminService from "../services/serviceImplementation/ServiceAdminImplementation.js";
class AdminController {
    constructor() {
        this.AdminService = new AdminService();
    }

    getAllAdmin = async (req, res) => {
        this.AdminService.getAllAdmin(req, res);
    };
    createAdmin = async (req, res) => {
        this.AdminService.createAdmin(req, res);
    };
    getAdmin = async (req, res) => { 
        this.AdminService.getAdmin(req,res);  
       
    };
    updateAdmin = async (req, res) => { 
        this.AdminService.updateAdmin(req,res);  
       
    };
    deleteAdmin = async (req, res) => { 
        this.AdminService.deleteAdmin(req,res);  
       
    };

}

export default new AdminController();