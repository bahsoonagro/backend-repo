// models/StockItem.js
import mongoose from 'mongoose';

const stockItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    quantity: { type: Number, default: 0 },
    stock: { type: mongoose.Schema.Types.ObjectId, ref: 'Stock' }, // relation to Stock
  },
  { timestamps: true }
);

export default mongoose.model('StockItem', stockItemSchema);
