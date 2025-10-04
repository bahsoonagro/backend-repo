import express from "express";
import {
  addRawMaterial,
  getAllRawMaterials,
  updateRawMaterial,
  deleteRawMaterial,
  bulkUploadRawMaterials
} from "../controllers/rawMaterialController.js";

const router = express.Router();

router.post("/", addRawMaterial);
router.get("/", getAllRawMaterials);
router.put("/:id", updateRawMaterial); // NEW
router.delete("/:id", deleteRawMaterial);
router.post("/bulk-upload", bulkUploadRawMaterials);

export default router;
