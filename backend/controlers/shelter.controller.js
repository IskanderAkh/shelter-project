import ShelterStaff from "../models/shelterStaff.model.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../lib/utils/generateToken.js";

export const createShelterAccount = async (req, res) => {
  try {
    const { fname, lname, role, email, phoneNumber, password } = req.body;
    console.log(req.body);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const existingStaff = await ShelterStaff.findOne({ email });
    const existingUser = await User.findOne({ email });

    if (existingStaff || existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newStaff = new ShelterStaff({
      fname,
      lname,
      role,
      email,
      phoneNumber,
      password: hashedPassword,
    });
    await newStaff.save();

    const newUser = new User({
      fname,
      lname,
      email,
      phoneNumber,
      password: hashedPassword,
      status: "admin",
    });
    await newUser.save();

    generateTokenAndSetCookie(newUser._id, res);

    res.status(201).json({
      message: "Shelter staff and admin account created successfully",
      staff: {
        _id: newStaff._id,
        fname: newStaff.fname,
        lname: newStaff.lname,
        email: newStaff.email,
        phoneNumber: newStaff.phoneNumber,
        role: newStaff.role,
      },
      user: {
        _id: newUser._id,
        status: newUser.status,
      },
    });
  } catch (error) {
    console.error("Error in createShelterAccount:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

import Animal from "../models/animal.model.js";
import Adoption from "../models/adoption.model.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalAnimals = await Animal.countDocuments();
    const availableAnimals = await Animal.countDocuments({ adoptionStatus: "Available" });
    const adoptedAnimals = await Animal.countDocuments({ adoptionStatus: "Adopted" });
    const pendingAdoptions = await Adoption.countDocuments({ status: "Pending" });

    res.status(200).json({
      totalAnimals,
      availableAnimals,
      adoptedAnimals,
      pendingAdoptions,
    });
  } catch (error) {
    console.error("Error in getDashboardStats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


import MedicalRecord from "../models/medicalRecord.model.js";

export const getRecentMedicalRecords = async (req, res) => {
  try {
    const records = await MedicalRecord.find()
      .sort({ date: -1 })
      .limit(5)
      .populate("animalId", "name species")
      .populate("staffId", "fname lname");

    res.status(200).json(records);
  } catch (error) {
    console.error("Error in getRecentMedicalRecords:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const getRecentAdoptions = async (req, res) => {
  try {
    const adoptions = await Adoption.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("animalId", "name species")
      .populate("adopterId", "fname lname");

    res.status(200).json(adoptions);
  } catch (error) {
    console.error("Error in getRecentAdoptions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
