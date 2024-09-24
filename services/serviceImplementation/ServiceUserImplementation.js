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
    async currentUser(req,res){
        return this.UserRepository.currentUser(req, res)
    }
}

export default UserService;