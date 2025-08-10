import mongoose from "mongoose";

const stockItemSchema = new mongoose.Schema({
  stockId: { type: mongoose.Schema.Types.ObjectId, ref: "Stock", required: true },
  batchNumber: { type: String, required: true },
  expiryDate: { type: Date }
}, { timestamps: true });

export default mongoose.model("StockItem", stockItemSchema);
