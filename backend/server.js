import path from "path";
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import productRoutes from './routes/product.route.js';
import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';
import promoRoutes from './routes/promocode.route.js';
import animalRoutes from './routes/animal.route.js';
import connectMongoDB from './db/connectMongoDB.js';
import shelterRoutes from "./routes/shelter.route.js";
import medRoutes from "./routes/medical.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/promocode', promoRoutes)
app.use('/api/animal', animalRoutes)
app.use("/api/shelter", shelterRoutes);
app.use("/api/med", medRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

app.listen(PORT, () => {
	console.log('Server is running on port', PORT);
	connectMongoDB();
});
