// models/RawMaterial.js
const mongoose = require('mongoose');

const RawMaterialSchema = new mongoose.Schema({
  material: { type: String, required: true },
  month: { type: String, required: true },
  openingBalance: { type: Number, required: true },
  newStockIn: { type: Number, required: true },
  totalStockIn: { type: Number, required: true },
  totalStockOut: { type: Number, required: true },
  totalStockBalance: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('RawMaterial', RawMaterialSchema);

