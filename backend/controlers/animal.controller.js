import Animal from "../models/animal.model.js";
import User from "../models/user.model.js";
import Adoption from "../models/adoption.model.js";
import ShelterStaff from "../models/shelterStaff.model.js";

// ➕ Добавление нового животного
export const addAnimal = async (req, res) => {
	try {
		const { name, species, breed, gender, age, healthStatus, adoptionStatus, imgs } = req.body;

		// Проверка на дубликат (по имени, породе и возрасту)
		const existingAnimal = await Animal.findOne({ name, species, breed, age });
		if (existingAnimal) {
			return res.status(400).json({ error: "Animal already exists in the database" });
		}

		const newAnimal = new Animal({
			name,
			species,
			breed,
			gender,
			age,
			healthStatus,
			adoptionStatus,
			imgs
		});

		await newAnimal.save();

		res.status(201).json(newAnimal);
	} catch (error) {
		console.error("Error in addAnimal:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

// 📋 Получить список всех животных
export const getAllAnimals = async (req, res) => {
	try {
		const animals = await Animal.find();
		res.status(200).json(animals);
	} catch (error) {
		console.error("Error in getAllAnimals:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

// 🔍 Получить одно животное по ID
export const getAnimalById = async (req, res) => {
	try {
		const animal = await Animal.findById(req.params.id);
		if (!animal) {
			return res.status(404).json({ error: "Animal not found" });
		}
		res.status(200).json(animal);
	} catch (error) {
		console.error("Error in getAnimalById:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

// 📝 Обновить информацию о животном
export const updateAnimal = async (req, res) => {
	try {
		const updatedAnimal = await Animal.findByIdAndUpdate(
			req.params.id,
			{ $set: req.body },
			{ new: true }
		);

		if (!updatedAnimal) {
			return res.status(404).json({ error: "Animal not found" });
		}

		res.status(200).json(updatedAnimal);
	} catch (error) {
		console.error("Error in updateAnimal:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

// ❌ Удалить животное
export const deleteAnimal = async (req, res) => {
	try {
		const deletedAnimal = await Animal.findByIdAndDelete(req.params.id);
		if (!deletedAnimal) {
			return res.status(404).json({ error: "Animal not found" });
		}
		res.status(200).json({ message: "Animal deleted successfully" });
	} catch (error) {
		console.error("Error in deleteAnimal:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

// 🔍 Фильтрация животных по параметрам
export const filterAnimals = async (req, res) => {
	try {
		const { species, breed, gender, minAge, maxAge, adoptionStatus, healthStatus } = req.query;

		let filter = {};

		if (species) filter.species = species;
		if (breed) filter.breed = breed;
		if (gender) filter.gender = gender;
		if (adoptionStatus) filter.adoptionStatus = adoptionStatus;
		if (healthStatus) filter.healthStatus = healthStatus;

		if (minAge || maxAge) {
			filter.age = {};
			if (minAge) filter.age.$gte = parseInt(minAge);
			if (maxAge) filter.age.$lte = parseInt(maxAge);
		}

		const animals = await Animal.find(filter);
		res.status(200).json(animals);
	} catch (error) {
		console.error("Error in filterAnimals:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const adoptAnimal = async (req, res) => {
	try {
		const animalId = req.params.id;

		// Identify user (adopter)
		let user = await User.findById(req.user._id).select("-password");
		let adopterType = "user";

		if (!user) {
			user = await ShelterStaff.findById(req.user._id).select("-password");
			adopterType = "shelter";
		}

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		// Check animal existence
		const animal = await Animal.findById(animalId);
		if (!animal) {
			return res.status(404).json({ error: "Animal not found" });
		}
		const existingAdoption = await Adoption.findOne({
			animalId,
			status: { $in: ["Pending", "Approved"] } // Or just "Pending" if that's your logic
		});
		if (existingAdoption) {
			return res.status(400).json({ error: "This animal is already in an adoption process" });
		}
		const existingPendingAdoption = await Adoption.findOne({
			adopterId: user._id,
			status: "Pending"
		});

		if (existingPendingAdoption) {
			return res.status(400).json({
				error: "You already have a pending adoption request. Please wait for approval."
			});
		}

		// Create adoption
		const adoption = new Adoption({
			animalId: animal._id,
			adopterId: user._id,
			staffId: req.body.staffId || null,
			status: "Pending",
			description: req.body.description || ""
		});

		await adoption.save();

		// ✅ Add adoption to user's record (only if user is a User, not ShelterStaff)
		if (adopterType === "user") {
			const fullUser = await User.findById(user._id);
			fullUser.adoptions.push(adoption._id);
			await fullUser.save();
		}

		// ✅ Update animal status
		animal.adoptionStatus = "Pending";
		await animal.save();

		return res.status(201).json({
			message: "Adoption request submitted successfully",
			adoption
		});

	} catch (error) {
		console.error("Error in adoptAnimal:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const getAdoptionById = async (req, res) => {
	try {
		const { id } = req.params;

		const adoption = await Adoption.findById(id)
			.populate("adopterId", "-password")
			.populate("animalId")
			.populate("staffId", "-password");

		if (!adoption) {
			return res.status(404).json({ error: "Adoption not found" });
		}

		res.status(200).json(adoption);
	} catch (error) {
		console.error("Error in getAdoptionById:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};
export const getAdoptions = async (req, res) => {
	try {
		const adoptions = await Adoption.find()
			.populate("animalId", "name species breed")
			.populate("adopterId", "fname lname email")
			.populate("staffId", "fname lname role");

		res.status(200).json(adoptions);
	} catch (error) {
		console.error("Error in getAdoptions:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};


export const updateAdoptionStatus = async (req, res) => {
	try {
		const { id } = req.params;
		const { status } = req.body;

		if (!["Pending", "Approved", "Rejected"].includes(status)) {
			return res.status(400).json({ error: "Invalid status value" });
		}

		const adoption = await Adoption.findById(id);
		if (!adoption) {
			return res.status(404).json({ error: "Adoption not found" });
		}

		adoption.status = status;
		await adoption.save();


		if (status === "Rejected") {
			const animal = await Animal.findById(adoption.animalId);
			if (animal) {
				animal.adoptionStatus = "Available";
				await animal.save();
			}
		}

		if (status === "Approved") {
			const animal = await Animal.findById(adoption.animalId);
			if (animal) {
				animal.adoptionStatus = "Adopted";
				await animal.save();
			}
		}
		if (status === "Pending") {
			const animal = await Animal.findById(adoption.animalId);
			if (animal) {
				animal.adoptionStatus = "Pending";
				await animal.save();
			}
		}


		res.status(200).json({ message: "Adoption status updated", adoption });
	} catch (error) {
		console.error("Error in updateAdoptionStatus:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};


export const updateAnimalAdoptionStatus = async (req, res) => {
	try {
		const { id } = req.params;
		const { status } = req.body;

		if (!["Available", "Adopted", "Pending"].includes(status)) {
			return res.status(400).json({ error: "Invalid status value" });
		}

		const animal = await Animal.findById(id);
		if (!animal) {
			return res.status(404).json({ error: "Animal not found" });
		}

		animal.adoptionStatus = status;
		await animal.save();

		res.status(200).json({ message: "Animal adoption status updated", animal });
	} catch (error) {
		console.error("Error in updateAnimalAdoptionStatus:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const deleteAdoption = async (req, res) => {
	try {
		const { id } = req.params;
		const deleted = await Adoption.findByIdAndDelete(id);
		if (!deleted) return res.status(404).json({ error: "Adoption not found" });
		res.status(200).json({ message: "Adoption deleted successfully" });
	} catch (err) {
		console.error("Error in deleteAdoption:", err);
		res.status(500).json({ error: "Internal server error" });
	}
};
