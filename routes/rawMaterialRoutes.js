import express from "express";
import { getAllRawMaterials, createRawMaterial } from "../controllers/rawMaterialController.js";

const router = express.Router();

router.get("/", getAllRawMaterials);
router.post("/", createRawMaterial);

export default router;
