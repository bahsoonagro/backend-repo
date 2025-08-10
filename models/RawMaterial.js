import mongoose from "mongoose";

const rawMaterialSchema = new mongoose.Schema({
  rawMaterialType: { type: String, required: true },
  date: { type: Date, required: true },
  storeKeeper: { type: String, required: true },
  supervisor: { type: String, required: true },
  location: { type: String, required: true },
  weightKg: { type: Number, required: true },
  damaged: { type: String, enum: ["Yes", "No"], default: "No" },
  createdAt: { type: Date, default: Date.now }
});

const RawMaterial = mongoose.model("RawMaterial", rawMaterialSchema);
export default RawMaterial;
