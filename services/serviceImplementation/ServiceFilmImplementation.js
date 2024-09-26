import FilmRepository from "../../repository/Implementation/FilmImplementation.js";
class FilmService  {
    constructor() {
        this.FilmRepository = new FilmRepository()
    }
 
    async getAllFilm(req, res) {
        return this.FilmRepository.getAllFilm(req, res)
    }
    async createFilm(req, res) {
        return this.FilmRepository.createFilm(req, res)
    }
    async getFilm(req, res) {
        return this.FilmRepository.getFilm(req, res)
    }
    async updateFilm(req, res) {
        return this.FilmRepository.updateFilm(req, res)
    }
    async deleteFilm(req, res) {
        return this.FilmRepository.deleteFilm(req, res)
    }
}

export default FilmService;