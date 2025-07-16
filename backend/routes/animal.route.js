import e from "express";
import {
	addAnimal,
	getAllAnimals,
	getAnimalById,
	updateAnimal,
	deleteAnimal,
	filterAnimals,
	adoptAnimal,
	deleteAdoption,
	getAdoptionById,
	getAdoptions,
	updateAdoptionStatus
} from "../controlers/animal.controller.js";
import {
	protectRoute,
	checkAdminOrUser,
	checkAdminOnly
} from "../middleware/protectRoute.js";
import { updateAnimalAdoptionStatus } from "../controlers/animal.controller.js";

const router = e.Router();


router.put("/adoption/:id/status", protectRoute, checkAdminOrUser, updateAdoptionStatus);
router.delete("/adoption/:id", protectRoute, checkAdminOrUser, deleteAdoption);
router.get("/getAlladoptions", protectRoute, checkAdminOnly, getAdoptions);
router.get("/adoption/:id", protectRoute, checkAdminOrUser, getAdoptionById);

// Specific routes must come first
router.get("/filter", filterAnimals);
router.get("/adoption/:id", protectRoute, getAdoptionById);
router.get("/getAlladoptions", protectRoute, checkAdminOnly, getAdoptions);
router.put("/adoption/:id/status", protectRoute, checkAdminOnly, updateAdoptionStatus);

// Add this line
router.put("/:id/adoption-status", protectRoute, checkAdminOnly, updateAnimalAdoptionStatus);

router.post("/adopt/:id", protectRoute, adoptAnimal);
router.post("/addAnimal", protectRoute, checkAdminOrUser, addAnimal);

router.get("/all", getAllAnimals);

// Generic (last)
router.get("/:id", getAnimalById);
router.put("/:id", protectRoute, checkAdminOrUser, updateAnimal);
router.delete("/:id", protectRoute, checkAdminOrUser, deleteAnimal);

export default router;
