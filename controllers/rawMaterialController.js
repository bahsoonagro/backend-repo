import RawMaterial from "../models/RawMaterial.js";

// Add single raw material
export async function addRawMaterial(req, res) {
  try {
    const newRawMaterial = new RawMaterial(req.body);
    await newRawMaterial.save();
    res.status(201).json(newRawMaterial);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Get all raw materials
export async function getAllRawMaterials(req, res) {
  try {
    const materials = await RawMaterial.find().sort({ date: -1 });
    res.json(materials);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch raw materials", error: err.message });
  }
}

// Delete a raw material
export async function deleteRawMaterial(req, res) {
  try {
    const material = await RawMaterial.findByIdAndDelete(req.params.id);
    if (!material) return res.status(404).json({ message: "Raw material not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
}

// Bulk upload
export async function bulkUploadRawMaterials(req, res) {
  try {
    const rawMaterials = req.body;
    if (!Array.isArray(rawMaterials) || rawMaterials.length === 0)
      return res.status(400).json({ message: "Invalid or empty array" });

    await RawMaterial.insertMany(rawMaterials);
    res.status(201).json({ message: "Bulk upload successful" });
  } catch (err) {
    res.status(500).json({ message: "Bulk upload failed", error: err.message });
  }
}
