import StockMovement from "../models/StockMovement.js";

export async function getStockMovements(req, res) {
  try {
    const movements = await StockMovement.find().sort({ date: -1 });
    res.json(movements);
  } catch (error) {
    res.status(500).json({ message: "Error fetching stock movements", error: error.message });
  }
}

export async function createStockMovement(req, res) {
  try {
    const { item, quantity, movementType, date } = req.body;
    if (!item || !quantity || !movementType) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const newMovement = new StockMovement({ item, quantity, movementType, date });
    await newMovement.save();
    res.status(201).json(newMovement);
  } catch (error) {
    res.status(500).json({ message: "Error creating stock movement", error: error.message });
  }
}
