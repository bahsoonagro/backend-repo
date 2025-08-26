import express from "express";
import StockMovement from "../models/StockMovement.js";
import Inventory from "../models/Inventory.js"; // Make sure you have this

const router = express.Router();

// Get all stock movements
router.get("/", async (req, res) => {
  try {
    const movements = await StockMovement.find().sort({ dateTime: -1 });
    res.json(movements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a stock movement + update inventory
router.post("/", async (req, res) => {
  try {
    const { productName, batchNumber, movementType, quantity } = req.body;

    // 1. Save Stock Movement
    const movement = new StockMovement(req.body);
    await movement.save();

    // 2. Find existing inventory record
    let inventory = await Inventory.findOne({ productName, batchNumber });

    if (!inventory) {
      inventory = new Inventory({ productName, batchNumber });
    }

    // 3. Update inventory fields
    if (movementType === "stock-in") {
      inventory.stockIn += quantity;
      inventory.totalProduced += quantity;
    } else if (movementType === "stock-out") {
      inventory.stockOut += quantity;
    } else if (movementType === "damaged") {
      inventory.damages += quantity;
    }

    // Auto calculate available stock
    inventory.availableStock = inventory.stockIn - inventory.stockOut - inventory.damages;
    inventory.lastUpdated = new Date();

    await inventory.save();

    res.status(201).json({ movement, inventory });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a stock movement
router.put("/:id", async (req, res) => {
  try {
    const updatedMovement = await StockMovement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedMovement) {
      return res.status(404).json({ message: "Stock movement not found" });
    }
    res.json(updatedMovement);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a stock movement
router.delete("/:id", async (req, res) => {
  try {
    const deletedMovement = await StockMovement.findByIdAndDelete(req.params.id);
    if (!deletedMovement) {
      return res.status(404).json({ message: "Stock movement not found" });
    }
    res.json({ message: "Stock movement deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
