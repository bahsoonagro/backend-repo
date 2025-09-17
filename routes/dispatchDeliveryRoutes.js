// routes/dispatchDelivery.routes.js
import express from "express";
import DispatchDelivery from "../models/dispatchDelivery.model.js";

const router = express.Router();

/**
 * @route   GET /api/dispatch-delivery
 * @desc    Fetch all dispatch deliveries
 */
router.get("/", async (req, res) => {
  try {
    const dispatches = await DispatchDelivery.find().sort({ createdAt: -1 });
    res.json(dispatches);
  } catch (err) {
    console.error("Error fetching dispatch deliveries:", err);
    res.status(500).json({ error: "Server error while fetching dispatches" });
  }
});

/**
 * @route   POST /api/dispatch-delivery
 * @desc    Create a new dispatch delivery
 */
router.post("/", async (req, res) => {
  try {
    const newDispatch = new DispatchDelivery(req.body);
    const savedDispatch = await newDispatch.save();
    res.status(201).json(savedDispatch);
  } catch (err) {
    console.error("Error creating dispatch:", err);
    res.status(400).json({ error: "Invalid dispatch data" });
  }
});

/**
 * @route   PUT /api/dispatch-delivery/:id
 * @desc    Update a dispatch delivery by ID
 */
router.put("/:id", async (req, res) => {
  try {
    const updatedDispatch = await DispatchDelivery.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedDispatch) {
      return res.status(404).json({ error: "Dispatch not found" });
    }
    res.json(updatedDispatch);
  } catch (err) {
    console.error("Error updating dispatch:", err);
    res.status(400).json({ error: "Invalid update data" });
  }
});

/**
 * @route   DELETE /api/dispatch-delivery/:id
 * @desc    Delete a dispatch delivery by ID
 */
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await DispatchDelivery.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Dispatch not found" });
    }
    res.json({ message: "Dispatch deleted successfully", id: req.params.id });
  } catch (err) {
    console.error("Error deleting dispatch:", err);
    res.status(500).json({ error: "Server error while deleting dispatch" });
  }
});

export default router;
