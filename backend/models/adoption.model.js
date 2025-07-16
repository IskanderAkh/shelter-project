import mongoose from "mongoose";

const adoptionSchema = new mongoose.Schema({
    animalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Animal",
        required: true,
    },
    adopterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    dateOfAdoption: {
        type: Date,
        required: true,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending",
        required: true,
    },
    staffId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ShelterStaff",
        default: '6875681f8b27fb1813b7b98c',
        required: false,
    },
    description: {
        type: String,
        default: "",
    }
}, { timestamps: true });

const Adoption = mongoose.model("Adoption", adoptionSchema);

export default Adoption;
