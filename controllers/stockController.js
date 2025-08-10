// routes/stockRoutes.js
import express from 'express';
import {
  getAllStocks,
  createStock,
  deleteStock
} from '../controllers/stockController.js';

const router = express.Router();

// GET all stocks
router.get('/', getAllStocks);

// POST create new stock
router.post('/', createStock);

// DELETE stock by ID
router.delete('/:id', deleteStock);

export default router;
