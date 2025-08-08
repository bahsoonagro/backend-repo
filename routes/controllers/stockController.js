import StockItem from '../models/StockItem.js';

export const getAllStocks = async (req, res) => {
  try {
    const items = await StockItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createStock = async (req, res) => {
  try {
    const newItem = new StockItem(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateStock = async (req, res) => {
  try {
    const updated = await StockItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Item not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteStock = async (req, res) => {
  try {
    const deleted = await StockItem.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Item not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
