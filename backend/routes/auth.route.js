import e from "express";
import { getUser, login, logout, signup } from "../controlers/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = e.Router()

router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)
router.get("/me", protectRoute, getUser)

export default router