// controllers/stockItemController.js
import StockItem from '../models/StockItem.js';

export const getAllStockItems = async (req, res) => {
  try {
    const items = await StockItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createStockItem = async (req, res) => {
  try {
    const item = new StockItem(req.body);
    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateStockItem = async (req, res) => {
  try {
    const updated = await StockItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteStockItem = async (req, res) => {
  try {
    await StockItem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Stock item deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
