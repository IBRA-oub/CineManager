import UserRepository from "../../repository/Implementation/userImplementation.js";
class UserService{
    constructor() {
        this.UserRepository = new UserRepository()
    }
    async create(req,res){
        return this.UserRepository.create(req,res)
    }
}

export default UserService;