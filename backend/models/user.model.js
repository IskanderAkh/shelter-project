import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
  email: {
    type: String,
    required: true,
    unique: true,
    maxLength: 100,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  phoneNumber: {
    type: String,
    required: true,
    maxLength: 20,
    match: [/^\+?[0-9]{7,20}$/, 'Invalid phone number'],
  },
  address: {
    type: String,
    required: false,
  },
  adoptions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Adoption", // Assuming adoption records
      default: [],
    }
  ],
  status: {
    type: String,
    default: "user",
    enum: ["user", "admin"]
  }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
