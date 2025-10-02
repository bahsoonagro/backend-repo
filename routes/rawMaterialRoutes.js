import express from "express";
import {
  addRawMaterial,
  getAllRawMaterials,
  deleteRawMaterial,
  bulkUploadRawMaterials
} from "../controllers/rawMaterialController.js";

const router = express.Router();

// Raw Materials Routes
router.post("/", addRawMaterial);
router.get("/", getAllRawMaterials);
router.delete("/:id", deleteRawMaterial);
router.post("/bulk-upload", bulkUploadRawMaterials);

export default router;
