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
    getFilm = async (req, res) => { 
        this.FilmService.getFilm(req,res);  
       
    };
    updateFilm = async (req, res) => { 
        this.FilmService.updateFilm(req,res);  
       
    };
    deleteFilm = async (req, res) => { 
        this.FilmService.deleteFilm(req,res);  
       
    };

}

export default new FilmController();