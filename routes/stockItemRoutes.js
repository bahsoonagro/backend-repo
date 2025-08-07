const express = require('express');
const router = express.Router();
const StockItem = require('../models/StockItem');

// Seed sample item (optional — for dev only)
router.post('/seed', async (req, res) => {
  try {
    const item = await StockItem.create({
      name: 'Sugar',
      quantity: 100,
      category: 'raw material',
      unitPrice: 3.5
    });
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: 'Error seeding item', error: err.message });
  }
});

// Get all items
router.get('/', async (req, res) => {
  try {
    const items = await StockItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching items', error: err.message });
  }
});

module.exports = router;
