// routes/dispatchDeliveryRoutes.js
import express from "express";
import { getDispatches, createDispatch } from "../controllers/dispatchDeliveryController.js";

const router = express.Router();

router.get("/", getDispatches);
router.post("/", createDispatch);

export default router;
