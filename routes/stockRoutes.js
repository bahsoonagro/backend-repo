const express = require('express');
const router = express.Router();
const Stock = require('../models/Stock');

// GET all stocks
router.get('/', async (req, res) => {
  try {
    const stocks = await Stock.find();
    res.status(200).json(stocks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stocks.' });
  }
});

// POST new stock
router.post('/', async (req, res) => {
  try {
    const newStock = new Stock(req.body);
    const savedStock = await newStock.save();
    res.status(201).json(savedStock);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create stock.' });
  }
});

module.exports = router;
