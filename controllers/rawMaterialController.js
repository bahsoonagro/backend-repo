// controllers/rawMaterialController.js
import RawMaterial from '../models/RawMaterial.js';

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

export const updateRawMaterial = async (req, res) => {
  try {
    const updated = await RawMaterial.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteRawMaterial = async (req, res) => {
  try {
    await RawMaterial.findByIdAndDelete(req.params.id);
    res.json({ message: 'Raw material deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
