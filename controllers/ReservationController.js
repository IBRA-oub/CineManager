import ReservationService from "../services/serviceImplementation/ServiceReservationImplementation.js";
class ReservationController {
    constructor() {
        this.ReservationService = new ReservationService();
    }

    getAllReservation = async (req, res) => {
        this.ReservationService.getAllReservation(req, res);
    };
    createReservation = async (req, res) => {
        this.ReservationService.createReservation(req, res);
    };
    getReservation = async (req, res) => {
        this.ReservationService.getReservation(req, res);

    };
  
    deleteReservation = async (req, res) => {
        this.ReservationService.deleteReservation(req, res);

    };
}
export default new ReservationController();