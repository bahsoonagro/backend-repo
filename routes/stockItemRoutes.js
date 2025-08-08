const express = require('express');
const router = express.Router();
const StockItem = require('../models/StockItem');

// GET all stock items
router.get('/', async (req, res) => {
  try {
    const items = await StockItem.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stock items.' });
  }
});

// POST new stock item
router.post('/', async (req, res) => {
  try {
    const newItem = new StockItem(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create stock item.' });
  }
});

module.exports = router;
