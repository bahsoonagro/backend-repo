// controllers/rawMaterialController.js
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
  try {
    const material = new RawMaterial(req.body);
    const newMaterial = await material.save();
    res.status(201).json(newMaterial);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
