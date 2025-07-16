export const addReview = (req, res) => {
    try {
        const { productId, rating, comment } = req.body;
        const userId = req.user._id;
        console.log(productId, rating, comment, userId);
        res.status(200).json({ message: "Review added successfully" });
    } catch (error) {
        console.log("Error in addReview", error.message);
        res.status(500).json({ error: "Internal server error" })
    }
}
