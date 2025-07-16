import MedicalRecord from "../models/medicalRecord.model.js";

export const createMedicalRecord = async (req, res) => {
  try {
    const { animalId, date, diagnosis, treatment, description, staffId } = req.body;

    const newRecord = new MedicalRecord({
      animalId,
      date: date || new Date(),
      diagnosis,
      treatment,
      description,
      staffId: req.user._id
    });

    await newRecord.save();

    res.status(201).json({
      message: "Medical record created successfully",
      record: newRecord,
    });
  } catch (error) {
    console.error("Error in createMedicalRecord:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const getAllMedicalRecords = async (req, res) => {
  try {
    const records = await MedicalRecord.find()
      .populate("animalId", "name species")
      .populate("staffId", "fname lname");
    res.status(200).json(records);
  } catch (error) {
    console.error("Error in getAllMedicalRecords:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateMedicalRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await MedicalRecord.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ error: "Medical record not found" });
    res.status(200).json(updated);
  } catch (error) {
    console.error("Error in updateMedicalRecord:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteMedicalRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await MedicalRecord.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: "Medical record not found" });
    res.status(200).json({ message: "Medical record deleted successfully" });
  } catch (error) {
    console.error("Error in deleteMedicalRecord:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

