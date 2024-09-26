import mongoose from "mongoose";

class SeanceModel {
    constructor() {
        const seancesSchema = new mongoose.Schema({
            date_heure: {
                type: String,
                required: [true, "Please add date and time"]
            },
            tarif: {
                type: Number,
                required: [true, "Please specify the number of tarif"],
            },
            places: [{
                numero: {
                    type: Number,
                    required: [true, "Please specify the seat number"]
                },
                disponible: {
                    type: Boolean,
                    default: true  // Par défaut, la place est disponible
                }
            }],
            film: {
                titre: {
                    type: String,
                    required: [true, "Please add the film title"]
                },
                genre: {
                    type: String,
                    required: [true, "Please add the film genre"]
                },
                duree: {
                    type: Number,
                    required: [true, "Please add the film duration"]
                },
                annee: {
                    type: Date,
                    required: [true, "Please add the year of production"]
                }
            },
            salle: {
                nom: {
                    type: String,
                    required: [true, "Please add the room name"]
                },
                type: {
                    type: String,
                    required: [true, "Please specify the room type"]
                },
                places_totales: {
                    type: Number,
                    required: [true, "Please specify the total number of seats"]
                }
            }
        });

        this.Seance = mongoose.model("Seance", seancesSchema);
    }
}

export default new SeanceModel();
