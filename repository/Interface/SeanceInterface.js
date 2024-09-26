class SeanceInterface{

    constructor(){
        if(new.target === SeanceInterface){
            throw new Error('It is an abstract class can not be instancited');
        }

    }

    async getAllSeance(req,res){
        throw new Error('Must be Implemented!!');
    }
    
    async createSeance(req,res){
        throw new Error('Must be Implemented!!');
    }
    async getSeance(req,res){
        throw new Error('Must be Implemented!!');
    }
    async updateSeance(req,res){
        throw new Error('Must be Implemented!!');
    }
    async deleteSeance(req,res){
        throw new Error('Must be Implemented!!');
    }
   

}
export default SeanceInterface;