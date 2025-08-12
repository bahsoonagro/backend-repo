import Stock from "../models/Stock.js";

export async function getStocks(req, res) {
  try {
    const stocks = await Stock.find().sort({ createdAt: -1 });
    res.json(stocks);
  } catch (error) {
    console.error("Failed to get stocks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function createStock(req, res) {
  try {
    const { name, quantity, category, unitPrice, supplier } = req.body;
    if (!name || quantity == null || !category || unitPrice == null) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const stock = new Stock({ name, quantity, category, unitPrice, supplier });
    await stock.save();
    res.status(201).json(stock);
  } catch (error) {
    console.error("Failed to create stock:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function updateStock(req, res) {
  try {
    const { id } = req.params;
    const { name, quantity, category, unitPrice, supplier } = req.body;

    const stock = await Stock.findByIdAndUpdate(
      id,
      { name, quantity, category, unitPrice, supplier },
      { new: true, runValidators: true }
    );

    if (!stock) {
      return res.status(404).json({ error: "Stock item not found" });
    }

    res.json(stock);
  } catch (error) {
    console.error("Failed to update stock:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function deleteStock(req, res) {
  try {
    const { id } = req.params;
    const stock = await Stock.findByIdAndDelete(id);

    if (!stock) {
      return res.status(404).json({ error: "Stock item not found" });
    }

    res.json({ message: "Stock item deleted successfully" });
  } catch (error) {
    console.error("Failed to delete stock:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
