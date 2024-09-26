import SeanceService from "../services/serviceImplementation/ServiceSeanceImplementation.js";
class SeanceController {
    constructor() {
        this.SeanceService = new SeanceService();
    }

    getAllSeance = async (req, res) => {
        this.SeanceService.getAllSeance(req, res);
    };
    createSeance = async (req, res) => {
        this.SeanceService.createSeance(req, res);
    };
    getSeance = async (req, res) => {
        this.SeanceService.getSeance(req, res);

    };
    updateSeance = async (req, res) => {
        this.SeanceService.updateSeance(req, res);

    };
    deleteSeance = async (req, res) => {
        this.SeanceService.deleteSeance(req, res);

    };
}
export default new SeanceController();