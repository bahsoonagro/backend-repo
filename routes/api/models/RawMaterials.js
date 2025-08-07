const mongoose = require('mongoose');

const RawMaterialSchema = new mongoose.Schema({
  rawMaterialType: { type: String, required: true },  // e.g., Sugar, Rice
  date: { type: Date, required: true },
  storeKeeper: { type: String, required: true },
  supervisor: { type: String, required: true },
  location: { type: String, required: true },          // free text location
  weightKg: { type: Number, required: true },          // weight before standardization
  damaged: { type: String, enum: ['Yes', 'No'], default: 'No' },  // or Boolean if you prefer
}, { timestamps: true });

module.exports = mongoose.model('RawMaterial', RawMaterialSchema);
