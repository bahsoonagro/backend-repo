import mongoose from "mongoose";

const rawMaterialSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  openingQty: { type: Number, required: true, default: 0 },
  newStock: { type: Number, required: true, default: 0 },
  totalStock: { type: Number, required: true, default: 0 },
  stockOut: { type: Number, required: true, default: 0 },
  balance: { type: Number, required: true, default: 0 },
  remarks: { type: String, default: "" },
  requisitionNumber: { type: String, default: "" },
  storeKeeper: { type: String, required: true },
  supervisor: { type: String, required: true },
  batchNumber: { type: String, required: true },
  location: { type: String, required: true },
}, { timestamps: true });

const RawMaterial = mongoose.model("RawMaterial", rawMaterialSchema);
export default RawMaterial;
