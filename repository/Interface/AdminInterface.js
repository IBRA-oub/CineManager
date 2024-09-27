class AdminInterface{

    constructor(){
        if(new.target === AdminInterface){
            throw new Error('It is an abstract class can not be instancited');
        }

    }

    async getAllAdmin(req,res){
        throw new Error('Must be Implemented!!');
    }
    
    async createAdmin(req,res){
        throw new Error('Must be Implemented!!');
    }
    async getAdmin(req,res){
        throw new Error('Must be Implemented!!');
    }
    async updateAdmin(req,res){
        throw new Error('Must be Implemented!!');
    }
    async deleteAdmin(req,res){
        throw new Error('Must be Implemented!!');
    }

}
export default AdminInterface;