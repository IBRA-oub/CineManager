class ReservationInterface{

    constructor(){
        if(new.target === ReservationInterface){
            throw new Error('It is an abstract class can not be instancited');
        }

    }

    async getAllReservation(req,res){
        throw new Error('Must be Implemented!!');
    }
    
    async createReservation(req,res){
        throw new Error('Must be Implemented!!');
    }
   
    async updateReservation(req,res){
        throw new Error('Must be Implemented!!');
    }
    async deleteReservation(req,res){
        throw new Error('Must be Implemented!!');
    }

}
export default ReservationInterface;