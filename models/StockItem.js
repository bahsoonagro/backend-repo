import mongoose from 'mongoose';

const stockItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, default: 'kg' },
  category: { type: String },
  lastUpdated: { type: Date, default: Date.now }
});

export default mongoose.model('StockItem', stockItemSchema);
