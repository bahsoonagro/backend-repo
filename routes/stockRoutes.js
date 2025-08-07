// routes/stockRoutes.js
const express = require('express');
const router = express.Router();
const Stock = require('../models/Stock');

// GET all stocks
router.get('/', async (req, res) => {
  try {
    const stocks = await Stock.find().populate('items');
    res.json(stocks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create new stock
router.post('/', async (req, res) => {
  const stock = new Stock(req.body);
  try {
    const newStock = await stock.save();
    res.status(201).json(newStock);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;


// routes/stockItemRoutes.js
const express = require('express');
const router = express.Router();
const StockItem = require('../models/StockItem');

// GET all stock items
router.get('/', async (req, res) => {
  try {
    const items = await StockItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create new stock item
router.post('/', async (req, res) => {
  const item = new StockItem(req.body);
  try {
    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;


// routes/rawMaterialRoutes.js
const express = require('express');
const router = express.Router();
const RawMaterial = require('../models/RawMaterial');

// GET all raw materials
router.get('/', async (req, res) => {
  try {
    const materials = await RawMaterial.find();
    res.json(materials);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create new raw material
router.post('/', async (req, res) => {
  const material = new RawMaterial(req.body);
  try {
    const newMaterial = await material.save();
    res.status(201).json(newMaterial);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
