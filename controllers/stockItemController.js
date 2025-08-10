import StockItem from "../models/StockItem.js";

export const getAllStockItems = async (req, res) => {
  try {
    const items = await StockItem.find().populate("stockId");
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
