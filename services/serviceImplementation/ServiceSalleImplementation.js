import SalleRepository from "../../repository/Implementation/SalleImplementation.js";
class SalleService {
    constructor() {
        this.SalleRepository = new SalleRepository()
    }

    async getAllSalle(req, res) {
        return this.SalleRepository.getAllSalle(req, res)
    }
    async createSalle(req, res) {
        return this.SalleRepository.createSalle(req, res)
    }
    async getSalle(req, res) {
        return this.SalleRepository.getSalle(req, res)
    }
    async updateSalle(req, res) {
        return this.SalleRepository.updateSalle(req, res)
    }
    async deleteSalle(req, res) {
        return this.SalleRepository.deleteSalle(req, res)
    }
}

export default SalleService;