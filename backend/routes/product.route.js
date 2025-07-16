
import e from "express"
import { protectRoute } from "../middleware/protectRoute.js"
import { addToCart, addToWishlist, buyProduct, create, deleteFromCart, deleteFromWishlist, getAll, getOne } from "../controlers/product.controller.js"

const router = e.Router()

router.post("/create", protectRoute, create)
router.post("/wishlist/:id", protectRoute, addToWishlist)
router.post("/unwishlist/:id", protectRoute, deleteFromWishlist)
router.get("/getone/:id", getOne)
router.get("/getall", getAll)
router.post("/tocart/:id", protectRoute, addToCart)
router.post("/buyProduct", protectRoute, buyProduct)
router.delete("/fromcart/:id", protectRoute, deleteFromCart)



export default router