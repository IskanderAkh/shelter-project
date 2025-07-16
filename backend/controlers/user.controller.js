import User from "../models/user.model.js";

export const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const cart = user.cart || [];
        const existingItem = cart.find(item => item.productId.toString() === productId);
        if (existingItem) {
            existingItem.quantity += Number(quantity);
        } else {
            cart.push({ productId, quantity });
        }
        user.cart = cart;
        await user.save();
        res.status(200).json({ message: "Product added to cart" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error in addToCart" });
    }
};

export const deleteFromCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        user.cart = user.cart.filter(item => item.productId.toString() !== productId);
        await user.save();
        res.status(200).json({ message: "Product removed from cart" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error in deleteFromCart" });
    }
};

export const getCart = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const cart = user.cart || [];
        res.status(200).json(cart);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error in getCart" });
    }
};

export const syncCart = async (req, res) => {
    try {
        const { cart } = req.body;
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        user.cart = cart;
        await user.save();
        res.status(200).json({ message: "Cart synced successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error in syncCart" });
    }
};

export const subscribe = async (req, res) => {
    try {
        const { email } = req.body;
        const userId = req.user._id;

        const existingSubscription = await Subscriber.findOne({ userId });
        if (existingSubscription) {
            return res.status(400).json({ error: "User already subscribed" });
        }

        const newSubscriber = new Subscriber({
            email,
            userId
        });

        await newSubscriber.save();

        return res.status(201).json({
            _id: newSubscriber._id,
            email: newSubscriber.email,
            userId: newSubscriber.userId
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error in subscribe" });
    }
};
