import SalleService from "../services/serviceImplementation/ServiceSalleImplementation.js";
class SalleController {
    constructor() {
        this.SalleService = new SalleService();
    }

    getAllSalle = async (req, res) => {
        this.SalleService.getAllSalle(req, res);
    };
    createSalle = async (req, res) => {
        this.SalleService.createSalle(req, res);
    };
    getSalle = async (req, res) => { 
        this.SalleService.getSalle(req,res);  
       
    };
    updateSalle = async (req, res) => { 
        this.SalleService.updateSalle(req,res);  
       
    };
    deleteSalle = async (req, res) => { 
        this.SalleService.deleteSalle(req,res);  
       
    };
}
export default new SalleController();