import express from "express";
import StockMovement from "../models/StockMovement.js";

const router = express.Router();

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
