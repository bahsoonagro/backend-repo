import StockMovement from "../models/StockMovement.js";

// GET /api/stock-movements
export async function getStockMovements(req, res) {
  try {
    const stockMovements = await StockMovement.find().sort({ date: -1 });
    res.json(stockMovements);
  } catch (error) {
    console.error("Error fetching stock movements:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// POST /api/stock-movements
export async function createStockMovement(req, res) {
  try {
    const { item, quantity, type, date } = req.body;

    if (!item || !quantity || !type || !date) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newStockMovement = new StockMovement({
      item,
      quantity,
      type,
      date,
    });

    await newStockMovement.save();

    res.status(201).json(newStockMovement);
  } catch (error) {
    console.error("Error adding stock movement:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
