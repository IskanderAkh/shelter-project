import e from "express"
import { protectRoute } from "../middleware/protectRoute.js"
import { createNewPromocode, getOnePromo, getPromocodes } from "../controlers/promocode.controller.js"

const router = e.Router()

router.post('/createNewPromocode', protectRoute, createNewPromocode)
router.get('/getPromocodes', protectRoute, getPromocodes)
router.get('/getOnePromo', protectRoute, getOnePromo)

export default router;