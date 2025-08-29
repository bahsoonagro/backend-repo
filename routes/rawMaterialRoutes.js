// routes/rawMaterialRoutes.js
import express from "express";
import { 
  addRawMaterial, 
  bulkUploadRawMaterials, 
  getLPOs, 
  addLPO, 
  deleteLPO,
  getAllRawMaterials
} from "../controllers/rawMaterialController.js";

const router = express.Router();

// ----------------- RAW MATERIALS -----------------

// Add a single raw material
router.post("/", addRawMaterial);

// Get all raw materials
router.get("/", getAllRawMaterials);

// Bulk upload raw materials
router.post("/bulk-upload", bulkUploadRawMaterials);

// ----------------- LPO ROUTES -----------------

// Get all LPOs
router.get("/lpo", getLPOs);

// Add a new LPO
router.post("/lpo", addLPO);

// Delete an LPO by ID
router.delete("/lpo/:id", deleteLPO);

export default router;
