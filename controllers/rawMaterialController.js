import RawMaterial from "../models/RawMaterial.js";
import LPO from "../models/LPO.js";

// ----------------- RAW MATERIAL -----------------

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

// ----------------- LPO -----------------

// Get all LPOs
export async function getLPOs(req, res) {
  try {
    const lpos = await LPO.find().sort({ createdAt: -1 });
    res.json(lpos);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch LPOs', error: err.message });
  }
}

// Add a new LPO
export async function addLPO(req, res) {
  try {
    const { material, year, quantity, unitPrice, payment, supplier, comments } = req.body;

    if (!material || !quantity || !unitPrice || !supplier) {
      return res.status(400).json({ message: 'Missing required fields for LPO' });
    }

    const newLPO = await LPO.create({
      material,
      year,
      quantity,
      unitPrice,
      payment,
      supplier,
      comments
    });

    res.status(201).json(newLPO);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add LPO', error: err.message });
  }
}

// Delete LPO by ID
export async function deleteLPO(req, res) {
  try {
    await LPO.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete LPO', error: err.message });
  }
}
