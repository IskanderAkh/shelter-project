import { sendOrderConfirmationEmail } from "../mail/emails.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";
import Order from "../models/order.model.js"; // Import the Order model

export const create = async (req, res) => {
    try {

        const { name, price, rating, overview, SKU, categories, aditionalInfo } = req.body

        if (!name || !price || !rating || !overview || !SKU || !categories || !aditionalInfo) {
            return res.status(400).json({ error: "All fields are required" })
        }

        const newProduct = new Product({
            name,
            price,
            rating,
            overview,
            SKU,
            categories,
            aditionalInfo
        })

        if (newProduct) {
            await newProduct.save()
            res.status(201).json(newProduct)
        } else {
            res.status(400).json({ error: "Failed to create product" })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" })
    }
}


export const getAll = async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).json(products)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" })
    }
}

export const getOne = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.status(200).json(product)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" })
    }
}

export const buyProduct = async (req, res) => {
    try {
        const userId = req.user._id;
        const { cartItems, cardDetails, deliveryOption, deliveryAddress, contactNum } = req.body;

        if (!userId || !cartItems || cartItems.length === 0) {
            return res.status(400).json({ error: "User ID and cart items are required" });
        }

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Generate product rows and calculate the grand total
        let productRows = '';
        let grandTotal = 0;
        const productIds = [];

        for (const item of cartItems) {
            const product = await Product.findById(item.productId);
            if (!product) {
                return res.status(404).json({ error: `Product not found for ID ${item.productId}` });
            }

            const itemTotalPrice = product.price * item.quantity;
            grandTotal += itemTotalPrice;
            productIds.push(product._id);

            productRows += `
                <tr>
                    <td style="border: 1px solid #ddd; padding: 8px;">${product.name}</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">${item.quantity}</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">${product.price} USD</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">${itemTotalPrice} USD</td>
                </tr>
            `;
        }

        // Create a new order
        const lastOrder = await Order.findOne().sort({ orderNum: -1 });
        const newOrderNum = lastOrder ? lastOrder.orderNum + 1 : 1;

        const newOrder = new Order({
            orderNum: newOrderNum,
            email: user.email,
            cardDetails,
            deliveryOption: deliveryOption || "Standard",
            deliveryAddress,
            contactNum,
            products: productIds,
        });

        await newOrder.save();
        await sendOrderConfirmationEmail(user, productRows, grandTotal);


        res.status(200).json({
            message: "Order successfully processed. Confirmation email sent.",
            orderDetails: {
                orderNum: newOrderNum,
                items: cartItems,
                grandTotal,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};






export const addToWishlist = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        const currentUser = await User.findById(req.user._id);

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        if (currentUser.wishList.includes(product._id)) {
            return res.status(400).json({ error: "Product already in wishlist" });
        }


        await User.findByIdAndUpdate(currentUser._id, { $push: { wishList: product._id } })
        await currentUser.save();

        res.status(200).json({ message: "Product added to wishlist" });
    } catch (error) {
        console.log("Error in addToWishlist", error.message);
        res.status(500).json({ error: "Internal server error" })
    }
}
export const deleteFromWishlist = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        const currentUser = await User.findById(req.user._id);

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        if (currentUser.wishList.includes(product._id)) {
            await User.findByIdAndUpdate(currentUser._id, { $pull: { wishList: product._id } })
            await currentUser.save();
        }
        await currentUser.save();

        res.status(200).json({ message: "Product deleted from wishlist" });
    } catch (error) {
        console.log("Error in addToWishlist", error.message);
        res.status(500).json({ error: "Internal server error" })
    }
}


export const addToCart = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        const currentUser = await User.findById(req.user._id)

        if (!product) {
            return res.status(404).json({ error: "Product not found" })
        }

        if (currentUser.cart.includes(id)) {
            return res.status(400).json({ error: "Product already in cart" })
        }

        await User.findByIdAndUpdate(currentUser._id, { $push: { cart: product._id } })
        await currentUser.save()

        res.status(200).json({ message: "Product added to cart" })
    } catch (error) {
        console.log("Error in addToCart", error.message);
        res.status(500).json({ error: "Internal server error" })
    }
}

export const deleteFromCart = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        const currentUser = await User.findById(req.user._id);

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        if (currentUser.cart.includes(product._id)) {
            await User.findByIdAndUpdate(currentUser._id, { $pull: { cart: product._id } })
            await currentUser.save();
        }
        await currentUser.save();

        res.status(200).json({ message: "Product deleted from cart" })
    } catch (error) {
        console.log("Error in deleteFromCart", error.message);
        res.status(500).json({ error: "Internal server error" })
    }
}