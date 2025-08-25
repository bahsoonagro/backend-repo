import express from "express";
import StockMovement from "../models/StockMovement.js";

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

// Create a new stock movement
router.post("/", async (req, res) => {
  try {
    const movement = new StockMovement(req.body);
    await movement.save();
    res.status(201).json(movement);
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
      { new: true } // return updated doc
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

router.get("/", async (req, res) => {
  try {
    const movements = await StockMovement.find().sort({ dateTime: -1 });
    res.json(movements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const movement = new StockMovement(req.body);
    await movement.save();
    res.status(201).json(movement);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
