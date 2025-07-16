import mongoose from "mongoose";

export const animalSchema = new mongoose.Schema({
    animalID: {
        type: Number,
        unique: true,
        index: true,
    },
    name: {
        type: String,
        required: true,
        maxLength: 50,
    },
    species: {
        type: String,
        required: true,
        maxLength: 50,
    },
    breed: {
        type: String,
        required: true,
        maxLength: 50,
    },
    gender: {
        type: String,
        enum: ["Male", "Female"],
        required: true,
    },
    age: {
        type: Number,
        required: true,
        min: 0,
    },
    healthStatus: {
        type: String,
        required: true,
    },
    adoptionStatus: {
        type: String,
        enum: ["Available", "Adopted", "Pending"],
        required: true,
    },
    imgs:{
        type: String,
        default: ""
    }
}, { timestamps: true });

const Animal = mongoose.model("Animal", animalSchema)

export default Animal