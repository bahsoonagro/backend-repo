const express = require('express');
const router = express.Router();
const StockItem = require('../models/StockItem');

// CREATE a new stock item
router.post('/', async (req, res) => {
  try {
    const newItem = await StockItem.create(req.body);
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ all stock items
router.get('/', async (req, res) => {
  try {
    const items = await StockItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE a stock item by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedItem = await StockItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedItem) return res.status(404).json({ error: 'Item not found' });
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a stock item by ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await StockItem.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Item not found' });
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;

