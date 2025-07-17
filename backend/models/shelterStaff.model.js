import mongoose from "mongoose";

const shelterStaffSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        maxLength: 50,
    },
    lname: {
        type: String,
        required: true,
        maxLength: 50,
    },
    role: {
        type: String,
        required: true,
        maxLength: 50,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
    },
    phoneNumber: {
        type: String,
        required: true,
        match: [/^\+?[0-9]{7,15}$/, 'Please enter a valid phone number'],
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    status: {
        type: String,
        required: true,
        default: "admin"
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
    }
}, { timestamps: true });

const ShelterStaff = mongoose.model("ShelterStaff", shelterStaffSchema);

export default ShelterStaff;
