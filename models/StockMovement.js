// models/StockMovement.js
import mongoose from "mongoose";

const stockMovementSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["IN", "OUT"], required: false },
    requisitionNo: { type: String },
    dateTime: { type: Date, default: Date.now },
    rawMaterial: { type: String },
    batchNumber: { type: String },
    quantityBags: { type: Number },
    weightRemovedKg: { type: Number },
    weightReceivedKg: { type: Number },
    storeman: { type: String },
    cleaningReceiver: { type: String },
    notes: { type: String }, // maps to "remarks" from frontend
  },
  { timestamps: true }
);

const StockMovement = mongoose.model("StockMovement", stockMovementSchema);
export default StockMovement;
