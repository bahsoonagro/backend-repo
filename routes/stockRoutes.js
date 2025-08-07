const express = require('express');
const router = express.Router();
const Stock = require('../models/Stock');  // adjust path if needed

// GET all stocks
router.get('/', async (req, res) => {
  try {
    const stocks = await Stock.find();
    res.json(stocks);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch stocks', error: err.message });
  }
});

// POST create a new stock
router.post('/', async (req, res) => {
  try {
    const newStock = new Stock(req.body);
    const saved = await newStock.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create stock', error: err.message });
  }
});

// PUT update a stock by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedStock = await Stock.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedStock) {
      return res.status(404).json({ message: 'Stock not found' });
    }
    res.json(updatedStock);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update stock', error: err.message });
  }
});

// DELETE a stock by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedStock = await Stock.findByIdAndDelete(req.params.id);
    if (!deletedStock) {
      return res.status(404).json({ message: 'Stock not found' });
    }
    res.json({ message: 'Stock deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Failed to delete stock', error: err.message });
  }
});

module.exports = router;
