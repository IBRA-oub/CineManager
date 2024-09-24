import UserRepository from "../../repository/Implementation/userImplementation.js";
class UserService {
    constructor() {
        this.UserRepository = new UserRepository()
    }
    async create(req, res) {
        return this.UserRepository.create(req, res)
    }
    async loginUser(req,res){
        return this.UserRepository.loginUser(req, res)
    }
}

export default UserService;