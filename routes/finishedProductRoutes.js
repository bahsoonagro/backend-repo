// routes/finishedProducts.js
import express from "express";
import {
  createFinishedProduct,
  getFinishedProducts,
  getFinishedProductById,
  updateFinishedProduct,
  deleteFinishedProduct
} from "../controllers/finishedProductController.js";

const router = express.Router();

router.post("/", createFinishedProduct);
router.get("/", getFinishedProducts);
router.get("/:id", getFinishedProductById);
router.put("/:id", updateFinishedProduct);
router.delete("/:id", deleteFinishedProduct);

export default router;
