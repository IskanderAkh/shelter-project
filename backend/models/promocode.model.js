import mongoose from "mongoose";

const promocodeSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    discount: {
        type: String,
        required: true
    },
    expirationDate: {
        type: Date,
    }
})

const Promocode = mongoose.model("Promocode", promocodeSchema)

export default Promocode 