import SeanceRepository from "../../repository/Implementation/SeanceImplementation.js";
class SeanceService {
    constructor() {
        this.SeanceRepository = new SeanceRepository()
    }

    async getAllSeance(req, res) {
        return this.SeanceRepository.getAllSeance(req, res)
    }
    async createSeance(req, res) {
        return this.SeanceRepository.createSeance(req, res)
    }
    async getSeance(req, res) {
        return this.SeanceRepository.getSeance(req, res)
    }
    async updateSeance(req, res) {
        return this.SeanceRepository.updateSeance(req, res)
    }
    async deleteSeance(req, res) {
        return this.SeanceRepository.deleteSeance(req, res)
    }
}

export default SeanceService;