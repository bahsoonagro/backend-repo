import RawMaterial from "../models/RawMaterial.js";
import LPO from "../models/LPO.js";

// --- RAW MATERIAL ---
export async function addRawMaterial(req, res) {
  try {
    const newRawMaterial = new RawMaterial(req.body);
    await newRawMaterial.save();
    res.status(201).json(newRawMaterial);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function bulkUploadRawMaterials(req, res) {
  try {
    const rawMaterials = req.body;
    if (!Array.isArray(rawMaterials) || rawMaterials.length === 0)
      return res.status(400).json({ message: "Invalid or empty raw materials array" });

    await RawMaterial.insertMany(rawMaterials);
    res.status(201).json({ message: "Bulk upload successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getAllRawMaterials(req, res) {
  try {
    const materials = await RawMaterial.find().sort({ createdAt: -1 });
    res.json(materials);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch raw materials", error: err.message });
  }
}

// --- LPO ---
export async function getLPOs(req, res) {
  try {
    const lpos = await LPO.find().sort({ createdAt: -1 });
    res.json(lpos);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch LPOs', error: err.message });
  }
}

export async function addLPO(req, res) {
  try {
    const { year, supplier, payment, comments, items, fuelCost, perDiem, tollFee, miscellaneous } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "LPO must have at least one item" });
    }

    const newLPO = new LPO({
      year,
      supplier,
      payment,
      comments,
      items,
      fuelCost: fuelCost || 0,
      perDiem: perDiem || 0,
      tollFee: tollFee || 0,
      miscellaneous: miscellaneous || 0
    });

    await newLPO.save();
    res.status(201).json(newLPO);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add LPO', error: err.message });
  }
}

export async function deleteLPO(req, res) {
  try {
    await LPO.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete LPO', error: err.message });
  }
}
