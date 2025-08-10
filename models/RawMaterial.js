// models/RawMaterial.js
import mongoose from 'mongoose';

const rawMaterialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    unit: { type: String, default: 'kg' }, // unit type, e.g., kg, liters
    pricePerUnit: { type: Number, default: 0 },
    supplier: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model('RawMaterial', rawMaterialSchema);
