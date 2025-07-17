import express from "express";
import { createShelterAccount, deleteShelterAccount, getAllAdmins, getDashboardStats, getRecentAdoptions, getRecentMedicalRecords } from "../controlers/shelter.controller.js";
import { checkAdminOnly, protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

// Route to create shelter staff account
router.post("/register", protectRoute, checkAdminOnly, createShelterAccount);

router.get("/dashboard/overview", protectRoute, checkAdminOnly, getDashboardStats);

router.get("/recent", protectRoute, checkAdminOnly, getRecentAdoptions);

router.get("/med/recent", protectRoute, checkAdminOnly, getRecentMedicalRecords);

router.delete('/delete/:id', protectRoute, checkAdminOnly, deleteShelterAccount)

router.get('/all', protectRoute, checkAdminOnly, getAllAdmins)

export default router;
