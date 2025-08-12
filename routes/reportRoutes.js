// routes/reportRoutes.js
import express from "express";
import { getStockSummary } from "../controllers/reportController.js";

const router = express.Router();

// GET /api/reports/stock-summary
router.get("/stock-summary", getStockSummary);

export default router;
