import ShelterStaff from "../models/shelterStaff.model.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";


export const protectRoute = async (req, res, next) => {
	try {
		const token = req.cookies.jwt;
		if (!token) {
			return res.status(401).json({ error: "Unauthorized: No Token Provided" });
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		if (!decoded) {
			return res.status(401).json({ error: "Unauthorized: Invalid Token" });
		}

		// Try to find in User first
		let user = await User.findById(decoded.userId).select("-password");
		let type = "user";

		if (!user) {
			// Try to find in ShelterStaff
			user = await ShelterStaff.findById(decoded.userId).select("-password");
			type = "shelter";
		}

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		req.user = user;
		req.userType = type;
		next();

	} catch (err) {
		console.log("Error in protectRoute middleware:", err.message);
		return res.status(500).json({ error: "Internal Server Error" });
	}
};


export const checkAdminOrUser = (req, res, next) => {
	try {
		const user = req.user;

		if (!user) {
			return res.status(401).json({ error: "Unauthorized: User not authenticated" });
		}

		if (user.status === "admin" || user.status === "user") {
			// Allow action
			return next();
		}

		// If status is neither admin nor user
		return res.status(403).json({ error: "Forbidden: Access denied" });
	} catch (err) {
		console.log("Error in checkAdminOrUser middleware", err.message);
		return res.status(500).json({ error: "Internal Server Error" });
	}
};

export const checkAdminOnly = (req, res, next) => {
	try {
		const user = req.user;

		if (!user || user.status !== "admin") {
			return res.status(403).json({ error: "Access denied. Admins only." });
		}

		next();
	} catch (err) {
		console.error("Error in checkAdminOnly middleware:", err.message);
		return res.status(500).json({ error: "Internal server error" });
	}
};

