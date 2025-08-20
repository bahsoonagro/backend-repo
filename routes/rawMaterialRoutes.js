import express from "express";
import { 
  addRawMaterial, 
  bulkUploadRawMaterials, 
  getLPOs, 
  addLPO, 
  deleteLPO 
} from "../controllers/rawMaterialsController.js";

const router = express.Router();

// ----------------- RAW MATERIALS -----------------
router.post("/", addRawMaterial);
router.post("/bulk-upload", bulkUploadRawMaterials);

// ----------------- LPO ROUTES -----------------
router.get("/lpo", getLPOs);           // Get all LPOs
router.post("/lpo", addLPO);           // Add new LPO
router.delete("/lpo/:id", deleteLPO); // Delete LPO by ID

export default router;
