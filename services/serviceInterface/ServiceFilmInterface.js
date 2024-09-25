class ServiceFilmInterface{

    constructor(){
        if(new.target === ServiceFilmInterface){
            throw new Error('It is an abstract class can not be instancited');
        }

    }
    async getAllFilm(req,res){
        throw new Error('Must be Implemented!!');
    }
    async createFilm(req,res){
        throw new Error('Must be Implemented!!');
    }
    async getFilm(req,res){
        throw new Error('Must be Implemented!!');
    }
    async updateFilm(req,res){
        throw new Error('Must be Implemented!!');
    }
    async deleteFilm(req,res){
        throw new Error('Must be Implemented!!');
    }
  
   

}
export default ServiceFilmInterface;