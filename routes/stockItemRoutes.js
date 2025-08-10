import express from "express";
import {
  getAllStockItems,
  createStockItem,
  updateStockItem,
  deleteStockItem
} from "../controllers/stockItemController.js";

const router = express.Router();

router.get("/", getAllStockItems);
router.post("/", createStockItem);
router.put("/:id", updateStockItem);
router.delete("/:id", deleteStockItem);

export default router;
