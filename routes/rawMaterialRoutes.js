// routes/rawMaterialRoutes.js
import express from 'express';
import {
  getAllRawMaterials,
  createRawMaterial,
  updateRawMaterial,
  deleteRawMaterial
} from '../controllers/rawMaterialController.js';

const router = express.Router();

router.get('/', getAllRawMaterials);
router.post('/', createRawMaterial);
router.put('/:id', updateRawMaterial);
router.delete('/:id', deleteRawMaterial);

export default router;
