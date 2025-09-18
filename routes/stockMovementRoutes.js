// routes/stockMovementRoutes.js
import express from "express";
import StockMovement from "../models/StockMovement.js";
import Inventory from "../models/Inventory.js"; // Ensure Inventory model exists

const router = express.Router();

// --------------------------
// GET all stock movements
// --------------------------
router.get("/", async (req, res) => {
  try {
    const movements = await StockMovement.find().sort({ dateTime: -1 });
    res.json(movements);
  } catch (err) {
    console.error("Error fetching stock movements:", err);
    res.status(500).json({ message: "Failed to fetch stock movements." });
  }
});

// --------------------------
// POST a new stock movement
// --------------------------
router.post("/", async (req, res) => {
  try {
    const {
      type,
      requisitionNo,
      dateTime,
      rawMaterial,
      batchNumber,
      quantityBags,
      weightRemovedKg,
      weightReceivedKg,
      storeman,
      cleaningReceiver,
      remarks,
      updateInventory = false,
    } = req.body;

    // Save stock movement
    const movement = new StockMovement({
      type,
      requisitionNo,
      dateTime,
      rawMaterial,
      batchNumber,
      quantityBags: Number(quantityBags) || 0,
      weightRemovedKg: Number(weightRemovedKg) || 0,
      weightReceivedKg: Number(weightReceivedKg) || 0,
      storeman,
      cleaningReceiver,
      notes: remarks || "",
    });
    await movement.save();

    // Optional inventory update
    let inventory = null;
    if (updateInventory) {
      inventory = await Inventory.findOne({ productName: rawMaterial, batchNumber });
      if (!inventory) {
        inventory = new Inventory({ productName: rawMaterial, batchNumber });
      }

      if (type === "IN") {
        inventory.stockIn += Number(weightReceivedKg) || 0;
        inventory.totalProduced += Number(quantityBags) || 0;
      } else if (type === "OUT") {
        inventory.stockOut += Number(weightRemovedKg) || 0;
      }

      inventory.availableStock =
        (inventory.stockIn || 0) - (inventory.stockOut || 0);
      inventory.lastUpdated = new Date();

      await inventory.save();
    }

    res.status(201).json({ movement, inventory });
  } catch (err) {
    console.error("Error saving stock movement:", err);
    res.status(500).json({ message: "Failed to save stock movement." });
  }
});

// --------------------------
// PUT update a stock movement
// --------------------------
router.put("/:id", async (req, res) => {
  try {
    const updatedMovement = await StockMovement.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        notes: req.body.remarks || req.body.notes,
      },
      { new: true }
    );

    if (!updatedMovement) {
      return res.status(404).json({ message: "Stock movement not found." });
    }

    res.json(updatedMovement);
  } catch (err) {
    console.error("Error updating stock movement:", err);
    res.status(500).json({ message: "Failed to update stock movement." });
  }
});

// --------------------------
// DELETE a stock movement
// --------------------------
router.delete("/:id", async (req, res) => {
  try {
    const deletedMovement = await StockMovement.findByIdAndDelete(req.params.id);
    if (!deletedMovement) {
      return res.status(404).json({ message: "Stock movement not found." });
    }
    res.json({ message: "Stock movement deleted successfully." });
  } catch (err) {
    console.error("Error deleting stock movement:", err);
    res.status(500).json({ message: "Failed to delete stock movement." });
  }
});

export default router;
