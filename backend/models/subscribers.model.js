import mongoose from "mongoose";

export const SubscriberSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
}, { timestamps: true })


const Subscriber = mongoose.model("Subscriber", SubscriberSchema)

export default Subscriber