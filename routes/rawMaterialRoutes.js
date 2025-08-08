const express = require('express');
const router = express.Router();
const RawMaterial = require('../models/RawMaterial');

// GET all raw materials
router.get('/', async (req, res) => {
  try {
    const materials = await RawMaterial.find();
    res.status(200).json(materials);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch raw materials.' });
  }
});

// POST new raw material
router.post('/', async (req, res) => {
  try {
    const newMaterial = new RawMaterial(req.body);
    const savedMaterial = await newMaterial.save();
    res.status(201).json(savedMaterial);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create raw material.' });
  }
});

module.exports = router;
