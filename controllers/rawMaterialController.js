import RawMaterial from "../models/RawMaterial.js";

export const getAllRawMaterials = async (req, res) => {
  try {
    const materials = await RawMaterial.find();
    res.json(materials);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createRawMaterial = async (req, res) => {
  const material = new RawMaterial(req.body);
  try {
    const newMaterial = await material.save();
    res.status(201).json(newMaterial);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const bulkUploadRawMaterials = async (req, res) => {
  const records = req.body;
  if (!Array.isArray(records) || records.length === 0) {
    return res.status(400).json({ message: "No records provided" });
  }
  try {
    const inserted = await RawMaterial.insertMany(records);
    res.status(201).json({ message: `${inserted.length} records saved.` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
