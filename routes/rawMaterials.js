// routes/rawMaterials.js
const express = require('express');
const router = express.Router();
const RawMaterial = require('../models/RawMaterial');
app.use('/api', rawMaterialRoutes); // 👈 this ensures /api/raw-materials works

// POST single record
router.post('/raw-materials', async (req, res) => {
  try {
    const newRecord = new RawMaterial(req.body);
    const saved = await newRecord.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// POST bulk upload
router.post('/raw-materials/bulk-upload', async (req, res) => {
  const records = req.body;
  if (!Array.isArray(records) || records.length === 0) {
    return res.status(400).json({ message: 'No records provided' });
  }
  try {
    const inserted = await RawMaterial.insertMany(records);
    res.status(201).json({ message: `${inserted.length} records saved.` });
  } catch (error) {
    res.status(500).json({ message: 'Failed to save records', error: error.message });
  }
});

module.exports = router;

