import mongoose from "mongoose";

export const orderSchema = new mongoose.Schema({
    orderNum: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cardDetails: {
        personName: { type: String, required: true },
        cardNumber: { type: String, required: true },
        expiry: { type: String, required: true },
        cvv: { type: String, required: true }
      },
    deliveryOption: {
        type: String,
        required: true,
        default: "Standard"
    },
    deliveryAddress: {
        type: String,
        required: true
    },
    contactNum: {
        type: String,
        required: true
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            default: []
        }
    ]
}, { timestamps: true })

const Order = mongoose.model("Order", orderSchema)

export default Order