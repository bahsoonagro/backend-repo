import mongoose from "mongoose";

const stockItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  category: { type: String, enum: ["raw material", "finished product"], required: true },
  unitPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

const StockItem = mongoose.model("StockItem", stockItemSchema);
export default StockItem;
