import { generateTokenAndSetCookie } from "../lib/utils/generateToken.js";
import ShelterStaff from "../models/shelterStaff.model.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
export const signup = async (req, res) => {
    try {
        const { fname, lname, email, password, phoneNumber } = req.body
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let emailResult = emailRegex.test(email);
        if (!emailResult) {
            return res.status(400).json({ error: `Invalid email format` });
        }


        const existingEmail = await User.findOne({ email })
        if (existingEmail) {
            return res.status(400).json({ error: "Email is already taken" })
        }


        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            fname,
            lname,
            email,
            password: hashedPassword,
            phoneNumber,

        })

        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res)
            await newUser.save()

            res.status(201).json({
                _id: newUser._id,
                fname: newUser.fname,
                lname: newUser.lname,
                email: newUser.email,
                phoneNumber: newUser.phoneNumber,
            })
        } else {
            res.status(400).json({ error: "Failed to create user" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" })
    }
}



export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ error: "email and password are required" })
        }
        let user = await User.findOne({ email });
        let type = "user";

        if (!user) {
            // If not found, try in ShelterStaff
            user = await ShelterStaff.findOne({ email });
            type = "shelter";
        }

        if (!user) {
            return res.status(400).json({ error: "Invalid email or password" });
        }


        const isPasswordValid = await bcrypt.compare(password, user?.password || "")
        if (!user || !isPasswordValid) {
            return res.status(400).json({ error: "Invalid email or password" })
        }

        generateTokenAndSetCookie(user._id, res)


        res.status(200).json({
            _id: user._id,
            fname: user.fname,
            lname: user.lname,
            email: user.email,
            streetAddress: user.streetAddress,
            phoneNumber: user.phoneNumber,
            type: user.status
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error in Login" })
    }
}
export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 })
        res.status(200).json({ message: "Logged out successfully" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error in Logout" })
    }
}

export const getUser = async (req, res) => {
    try {
        // Try finding as User
        let user = await User.findById(req.user._id).select("-password");
        let type = "user";

        if (!user) {
            // Try finding as ShelterStaff
            user = await ShelterStaff.findById(req.user._id).select("-password");
            type = "shelter";
        }

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ ...user._doc, type });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error in getUser" });
    }
};

