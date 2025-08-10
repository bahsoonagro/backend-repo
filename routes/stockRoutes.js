import express from "express";
import { getAllStocks, createStock, deleteStock } from "../controllers/stockController.js";

const router = express.Router();

router.get("/", getAllStocks);
router.post("/", createStock);
router.delete("/:id", deleteStock);

export default router;
