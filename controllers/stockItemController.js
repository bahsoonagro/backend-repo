import StockItem from "../models/StockItem.js";

export const getAllStockItems = async (req, res) => {
  try {
    const items = await StockItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createStockItem = async (req, res) => {
  const item = new StockItem(req.body);
  try {
    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateStockItem = async (req, res) => {
  try {
    const updated = await StockItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Stock item not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteStockItem = async (req, res) => {
  try {
    const deleted = await StockItem.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Stock item not found" });
    res.json({ message: "Stock item deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
