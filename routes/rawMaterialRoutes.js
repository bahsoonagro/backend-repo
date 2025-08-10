import express from "express";
import {
  getAllRawMaterials,
  createRawMaterial,
  bulkUploadRawMaterials
} from "../controllers/rawMaterialController.js";

const router = express.Router();

router.get("/", getAllRawMaterials);
router.post("/", createRawMaterial);
router.post("/bulk-upload", bulkUploadRawMaterials);

export default router;
