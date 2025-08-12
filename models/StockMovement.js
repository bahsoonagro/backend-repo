import mongoose from "mongoose";

const stockMovementSchema = new mongoose.Schema({
  requisitionNo: { type: String, required: true },
  dateTime: { type: Date, required: true },
  rawMaterial: { type: String, required: true },
  batchNumber: { type: String, required: true },
  quantityBags: { type: Number, required: true },
  weightRemovedKg: { type: Number, required: true },
  weightReceivedKg: { type: Number, required: true },
  storeman: { type: String, required: true },
  cleaningReceiver: { type: String, required: true },
  remarks: { type: String },
}, {
  timestamps: true,
});

const StockMovement = mongoose.model("StockMovement", stockMovementSchema);
export default StockMovement;
