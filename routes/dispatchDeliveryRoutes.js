import express from "express";
import DispatchDelivery from "../models/dispatchDelivery.js";

const router = express.Router();

// @route   POST /api/dispatch-delivery
// @desc    Create a new dispatch delivery
router.post("/", async (req, res) => {
  try {
    const {
      item,
      quantity,
      date,
      customer,
      driver,
      vehicle,
      tollFee,
      fuelCost,
      perDiem,
      personnel,
    } = req.body;

    // Calculate total cost
    const totalCost = (tollFee || 0) + (fuelCost || 0) + (perDiem || 0);

    const newDelivery = new DispatchDelivery({
      item,
      quantity,
      date,
      customer,
      driver,
      vehicle,
      tollFee,
      fuelCost,
      perDiem,
      personnel,
      totalCost,
    });

    const savedDelivery = await newDelivery.save();
    res.status(201).json(savedDelivery);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @route   GET /api/dispatch-delivery
// @desc    Get all dispatch deliveries
router.get("/", async (req, res) => {
  try {
    const deliveries = await DispatchDelivery.find().sort({ createdAt: -1 });
    res.json(deliveries);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @route   GET /api/dispatch-delivery/:id
// @desc    Get single delivery by ID
router.get("/:id", async (req, res) => {
  try {
    const delivery = await DispatchDelivery.findById(req.params.id);
    if (!delivery) return res.status(404).json({ message: "Not found" });
    res.json(delivery);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @route   PUT /api/dispatch-delivery/:id
// @desc    Update delivery
router.put("/:id", async (req, res) => {
  try {
    const updatedDelivery = await DispatchDelivery.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        totalCost:
          (req.body.tollFee || 0) +
          (req.body.fuelCost || 0) +
          (req.body.perDiem || 0),
      },
      { new: true }
    );
    if (!updatedDelivery) return res.status(404).json({ message: "Not found" });
    res.json(updatedDelivery);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @route   DELETE /api/dispatch-delivery/:id
// @desc    Delete delivery
router.delete("/:id", async (req, res) => {
  try {
    const deletedDelivery = await DispatchDelivery.findByIdAndDelete(
      req.params.id
    );
    if (!deletedDelivery)
      return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
