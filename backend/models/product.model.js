import mongoose from "mongoose";

export const productSchema = new mongoose.Schema({
    imgs: {
        type: String,
        default: ""
    },
    name:{
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,

    },
    overview: {
        type: String,
    },
    SKU: {
        type: Number,
    },
    categories: {
        type: String,
    },
    aditionalInfo: {
        type: String
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reviews",
        default: []
    }]
}, { timestamps: true })

const Product = mongoose.model("Product", productSchema)

export default Product