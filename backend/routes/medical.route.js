
import e from "express"
import { checkAdminOnly, checkAdminOrUser, protectRoute } from "../middleware/protectRoute.js"
import { createMedicalRecord, deleteMedicalRecord, getAllMedicalRecords, updateMedicalRecord } from "../controlers/medical.controller.js";

const router = e.Router()

router.post('/create', protectRoute, checkAdminOnly, createMedicalRecord);
router.get("/all", protectRoute, checkAdminOrUser, getAllMedicalRecords);
router.put("/:id", protectRoute, checkAdminOrUser, updateMedicalRecord);
router.delete("/:id", protectRoute, checkAdminOrUser, deleteMedicalRecord);




export default router