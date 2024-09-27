import AdminRepository from "../../repository/Implementation/AdminImplementation.js";
class AdminService  {
    constructor() {
        this.AdminRepository = new AdminRepository()
    }
 
    async getAllAdmin(req, res) {
        return this.AdminRepository.getAllAdmin(req, res)
    }
    async createAdmin(req, res) {
        return this.AdminRepository.createAdmin(req, res)
    }
    async getAdmin(req, res) {
        return this.AdminRepository.getAdmin(req, res)
    }
    async updateAdmin(req, res) {
        return this.AdminRepository.updateAdmin(req, res)
    }
    async deleteAdmin(req, res) {
        return this.AdminRepository.deleteAdmin(req, res)
    }
}

export default AdminService;