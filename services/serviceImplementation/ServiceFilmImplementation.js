import FilmRepository from "../../repository/Implementation/FilmImplementation.js";
class FilmService {
    constructor() {
        this.FilmRepository = new FilmRepository()
    }
 
    async getAllFilm(req, res) {
        return this.FilmRepository.getAllFilm(req, res)
    }
    async createFilm(req, res) {
        return this.FilmRepository.createFilm(req, res)
    }
}

export default FilmService;