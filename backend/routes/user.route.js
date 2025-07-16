import e from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { addToCart, deleteFromCart, getCart, subscribe, syncCart } from "../controlers/user.controller.js";
import { addReview } from "../controlers/review.controller.js";

const router = e.Router();

router.post('/cart/:productId', protectRoute, addToCart); // You might not need this if /addToCart handles adding products
router.post('/addToCart', protectRoute, addToCart); // Ensure the frontend is using this endpoint correctly
router.post('/deleteFromCart', protectRoute, deleteFromCart);
router.post('/syncCart', protectRoute, syncCart);
router.get('/getCart', protectRoute, getCart);
router.post('/newsletter', protectRoute, subscribe);
router.post('/addReview', protectRoute, addReview)
export default router;
