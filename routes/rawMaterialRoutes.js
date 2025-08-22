import express from "express";
import { 
  addRawMaterial, 
  bulkUploadRawMaterials, 
  getLPOs, 
  addLPO, 
  deleteLPO,
  getAllRawMaterials   // <- new
} from "../controllers/rawMaterialController.js";

const router = express.Router();

// ----------------- RAW MATERIALS -----------------
router.post("/", addRawMaterial);
router.get("/", getAllRawMaterials);   // <- new GET route
router.post("/bulk-upload", bulkUploadRawMaterials);

// ----------------- LPO ROUTES -----------------
router.get("/lpo", getLPOs);
router.post("/lpo", addLPO);
router.delete("/lpo/:id", deleteLPO);

export default router;

