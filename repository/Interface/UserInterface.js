class UserInterface{

    constructor(){
        if(new.target === UserInterface){
            throw new Error('It is an abstract class can not be instancited');
        }

    }

    async create(req,res){
        throw new Error('Must be Implemented!!');
    }
    async loginUser(req,res){
        throw new Error('Must be Implemented!!');
    }
   

}
export default UserInterface;