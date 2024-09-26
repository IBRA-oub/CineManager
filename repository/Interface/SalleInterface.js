class SalleInterface {
    constructor() {
        if (new.target === SalleInterface) {
            throw new Error('It is an abstract class can not be instancited');
        }

    }
    async getAllSalle(req, res) {
        throw new Error('Must be Implemented!!');
    }

    async createSalle(req, res) {
        throw new Error('Must be Implemented!!');
    }
    async getSalle(req, res) {
        throw new Error('Must be Implemented!!');
    }
    async updateSalle(req, res) {
        throw new Error('Must be Implemented!!');
    }
    async deleteSalle(req, res) {
        throw new Error('Must be Implemented!!');
    }

}
export default SalleInterface;