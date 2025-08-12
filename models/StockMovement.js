// models/StockMovement.js
import mongoose from "mongoose";

const stockMovementSchema = new mongoose.Schema(
  {
    // optional 'type' field ("IN" or "OUT"). Some existing records may not have it.
    type: { type: String, enum: ["IN", "OUT"], required: false },
    // fallback fields used by your forms:
    requisitionNo: { type: String },
    dateTime: { type: Date, default: Date.now },
    rawMaterial: { type: String },
    itemName: { type: String }, // sometimes used
    quantity: { type: Number, required: false },
    // other metadata
    source: { type: String },
    notes: { type: String },
  },
  { timestamps: true }
);

const StockMovement = mongoose.model("StockMovement", stockMovementSchema);
export default StockMovement;
