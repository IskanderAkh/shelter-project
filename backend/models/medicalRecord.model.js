import mongoose from "mongoose";

const medicalRecordSchema = new mongoose.Schema({
  animalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Animal",
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  diagnosis: {
    type: String,
    required: true,
  },
  treatment: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  staffId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ShelterStaff",
    required: true,
  },
}, { timestamps: true });

const MedicalRecord = mongoose.model("MedicalRecord", medicalRecordSchema);

export default MedicalRecord;
