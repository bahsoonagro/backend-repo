// routes/stockRoutes.js
import express from "express";
import {
  getStocks,
  createStock,
  updateStock,
  deleteStock,
} from "../controllers/stockController.js";

const router = express.Router();

// ----------------- STOCK ROUTES -----------------

// Get all stocks
router.get("/", getStocks);

// Create a new stock entry
router.post("/", createStock);

// Update a stock entry by ID
router.put("/:id", updateStock);

// Delete a stock entry by ID
router.delete("/:id", deleteStock);

export default router;
