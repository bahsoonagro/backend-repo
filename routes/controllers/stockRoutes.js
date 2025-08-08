import express from 'express';
import {
  getAllStocks,
  createStock,
  updateStock,
  deleteStock
} from '../controllers/stockController.js';

const router = express.Router();

router.get('/', getAllStocks);
router.post('/', createStock);
router.put('/:id', updateStock);
router.delete('/:id', deleteStock);

export default router;
