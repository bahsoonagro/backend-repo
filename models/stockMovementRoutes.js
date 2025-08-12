import mongoose from "mongoose";

const stockMovementSchema = new mongoose.Schema({
  requisitionNo: { type: String, required: true, unique: true },
  dateTime: { type: Date, required: true, default: Date.now },
  rawMaterial: { type: String, required: true },
  batchNumber: { type: String, required: true },
  quantityBags: { type: Number, required: true },  // number of 50kg bags
  weightRemovedKg: { type: Number, required: true },
  weightReceivedKg: { type: Number, required: true },
  storeman: { type: String, required: true },
  cleaningReceiver: { type: String, required: true },
  requisitionFormUrl: { type: String },  // optional, file URL if uploaded
  deliveryNoteUrl: { type: String },     // optional, file URL if uploaded
  remarks: { type: String }
}, { timestamps: true });

const StockMovement = mongoose.model("StockMovement", stockMovementSchema);
export default StockMovement;
