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

// ----------------- LPO Data -----------------
// Temporary in-memory storage; replace with DB logic if needed
let lpos = [];

// GET all LPOs
exports.getLPOs = (req, res) => {
  res.json(lpos);
};

// POST add new LPO
exports.addLPO = (req, res) => {
  const { material, year, quantity, unitPrice, payment, supplier, comments } = req.body;

  if (!material || !quantity || !unitPrice || !supplier) {
    return res.status(400).send('Missing required fields for LPO');
  }

  const newLPO = {
    id: Date.now(), // or use your DB-generated ID
    material,
    year,
    quantity,
    unitPrice,
    payment,
    supplier,
    comments
  };

  lpos.push(newLPO);
  res.status(201).json(newLPO);
};

// DELETE LPO
exports.deleteLPO = (req, res) => {
  const id = Number(req.params.id);
  lpos = lpos.filter(l => l.id !== id);
  res.sendStatus(204);
};

