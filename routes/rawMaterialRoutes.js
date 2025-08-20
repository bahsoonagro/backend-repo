import express from "express";
import { addRawMaterial, bulkUploadRawMaterials } from "../controllers/rawMaterialController.js";

const router = express.Router();

router.post("/", addRawMaterial);
router.post("/bulk-upload", bulkUploadRawMaterials);

const rawMaterialsController = require('../controllers/rawMaterialsController');

// ----------------- LPO Routes -----------------
router.get('/lpo', rawMaterialsController.getLPOs);       // Get all LPOs
router.post('/lpo', rawMaterialsController.addLPO);      // Add new LPO
router.delete('/lpo/:id', rawMaterialsController.deleteLPO); // Delete LPO by ID


export default router;
