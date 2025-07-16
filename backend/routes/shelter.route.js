import express from "express";
import { createShelterAccount, getDashboardStats, getRecentAdoptions, getRecentMedicalRecords } from "../controlers/shelter.controller.js";
import { checkAdminOnly, protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

// Route to create shelter staff account
router.post("/register", createShelterAccount);

router.get("/dashboard/overview", protectRoute, checkAdminOnly, getDashboardStats);

router.get("/recent", protectRoute, checkAdminOnly, getRecentAdoptions);

router.get("/med/recent", protectRoute, checkAdminOnly, getRecentMedicalRecords);

export default router;
