import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    rating:{
        type: Number,
        required: true
    },
    comment:{
        type: String,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true })

const Review = mongoose.model("Review", reviewSchema)

export default Review