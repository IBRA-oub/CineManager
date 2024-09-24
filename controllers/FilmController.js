import FilmService from "../services/serviceImplementation/ServiceFilmImplementation.js";
class FilmController {
    constructor() {
        this.FilmService = new FilmService();
    }

    getAllFilm = async (req, res) => {
        this.FilmService.getAllFilm(req, res);
    };
    createFilm = async (req, res) => {
        this.FilmService.createFilm(req, res);
    };

}

export default new FilmController();