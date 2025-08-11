import RawMaterial from "../models/RawMaterial.js";

// Add a single raw material entry
export async function addRawMaterial(req, res) {
  try {
    const newRawMaterial = new RawMaterial(req.body);
    await newRawMaterial.save();
    res.status(201).json(newRawMaterial);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Bulk upload raw materials
export async function bulkUploadRawMaterials(req, res) {
  try {
    const rawMaterials = req.body;

    if (!Array.isArray(rawMaterials) || rawMaterials.length === 0) {
      return res.status(400).json({ message: "Invalid or empty raw materials array" });
    }

    await RawMaterial.insertMany(rawMaterials);
    res.status(201).json({ message: "Bulk upload successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
