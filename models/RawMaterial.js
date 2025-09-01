import mongoose from "mongoose";

const rawMaterialSchema = new mongoose.Schema({
  rawMaterialType: { type: String, required: true },
  supplierName: { type: String, required: true },
  supplierPhone: { type: String, required: true },
  supplierBags: { type: Number, required: true },
  extraKg: { type: Number, default: 0 },
  bagsAfterStd: { type: Number, required: true },
  totalWeight: { type: Number, required: true },
  storeKeeper: { type: String, required: true },
  supervisor: { type: String, required: true },
  location: { type: String, required: true },
  batchNumber: { type: String, required: true },
  date: { type: Date, required: true },
  damaged: { type: String, enum: ["Yes", "No"], default: "No" },
  createdAt: { type: Date, default: Date.now }
});

const RawMaterial = mongoose.model("RawMaterial", rawMaterialSchema);
export default RawMaterial;
