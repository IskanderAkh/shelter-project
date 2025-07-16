import Promocode from "../models/promocode.model.js";

export const createNewPromocode = async (req, res) => {
    try {

        const { code, discount, expirationDate } = req.body

        if (!code || !discount) {
            return res.status(400).json({ error: "All fields are required" })
        }

        const newPromocode = new Promocode({
            code,
            discount,
            expirationDate,
        })

        if (newPromocode) {
            await newPromocode.save()
            res.status(201).json(newPromocode)
        } else {
            res.status(400).json({ error: "Failed to create product" })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" })
    }
}

export const getPromocodes = async (req, res) => {
    try {
        const res = await Promocode.find()
        res.status(200).json(res)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" })
    }
}

export const getOnePromo = async (req, res) => {
    try {
        const { code } = req.params;
        const promocode = await Promocode.findOne(code);
        if (!promocode) {
            return res.status(404).json({ error: "Promocode not found" });
        }
        res.status(200).json(promocode)

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" })
    }
}