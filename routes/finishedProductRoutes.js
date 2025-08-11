// routes/finishedProductRoutes.js
import express from "express";
import FinishedProduct from "../models/FinishedProduct.js";

const router = express.Router();

// Create new finished product
router.post("/", async (req, res) => {
  try {
    const newProduct = new FinishedProduct(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: "Failed to save finished product", error });
  }
});

// Get all finished products
router.get("/", async (req, res) => {
  try {
    const products = await FinishedProduct.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch finished products", error });
  }
});

export default router;
