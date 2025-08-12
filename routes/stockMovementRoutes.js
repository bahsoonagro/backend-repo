import express from "express";

const router = express.Router();

// Example GET route - fetch all stock movements
router.get("/", async (req, res) => {
  try {
    // Temporary demo data until you connect your database
    const stockMovements = [
      { id: 1, item: "Rice", quantity: 100, type: "IN", date: "2025-08-12" },
      { id: 2, item: "Sugar", quantity: 50, type: "OUT", date: "2025-08-11" }
    ];

    res.json(stockMovements);
  } catch (error) {
    console.error("Error fetching stock movements:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Example POST route - add a new stock movement
router.post("/", async (req, res) => {
  try {
    const { item, quantity, type, date } = req.body;

    if (!item || !quantity || !type || !date) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // For now, just send back what was received
    const newStockMovement = { id: Date.now(), item, quantity, type, date };

    res.status(201).json(newStockMovement);
  } catch (error) {
    console.error("Error adding stock movement:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
