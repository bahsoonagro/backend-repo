import express from "express";
import { addRawMaterial, bulkUploadRawMaterials } from "../controllers/rawMaterialController.js";

const router = express.Router();

router.post("/", addRawMaterial);
router.post("/bulk-upload", bulkUploadRawMaterials);

export default router;
