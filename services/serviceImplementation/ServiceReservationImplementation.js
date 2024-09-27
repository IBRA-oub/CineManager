import ReservationRepository from "../../repository/Implementation/ReservationImplementation.js";
class ReservationService  {
    constructor() {
        this.ReservationRepository = new ReservationRepository()
    }
 
    async getAllReservation(req, res) {
        return this.ReservationRepository.getAllReservation(req, res)
    }
    async createReservation(req, res) {
        return this.ReservationRepository.createReservation(req, res)
    }
   
    async updateReservation(req, res) {
        return this.ReservationRepository.updateReservation(req, res)
    }
    async deleteReservation(req, res) {
        return this.ReservationRepository.deleteReservation(req, res)
    }
}

export default ReservationService;