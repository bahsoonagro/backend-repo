import express from 'express';
import { getAllStockItems, createStockItem, deleteStockItem } from '../controllers/stockItemController.js';

const router = express.Router();

router.get('/', getAllStockItems);
router.post('/', createStockItem);
router.delete('/:id', deleteStockItem);

export default router;
