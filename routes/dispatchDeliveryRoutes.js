import express from "express";
import {
  getDispatches,
  getDispatchById,
  createDispatch,
  updateDispatch,
  deleteDispatch,
} from "../controllers/dispatchDeliveryController.js";

const router = express.Router();

router.get("/", getDispatches);           // Get all
router.get("/:id", getDispatchById);      // Get one
router.post("/", createDispatch);         // Create
router.put("/:id", updateDispatch);       // Update
router.delete("/:id", deleteDispatch);    // Delete

export default router;
