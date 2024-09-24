class ServiceUserInterface{

    constructor(){
        if(new.target === ServiceUserInterface){
            throw new Error('It is an abstract class can not be instancited');
        }

    }

    async create(req,res){
        throw new Error('Must be Implemented!!');
    }
   

}
export default ServiceUserInterface;