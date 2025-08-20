const mongoose = require('mongoose');

const lpoSchema = new mongoose.Schema({
  material: { type: String, required: true },
  year: { type: Number, required: true },
  quantity: { type: Number, required: true },
  unitPrice: { type: Number, required: true },
  payment: { type: String, enum: ['Pending', 'Paid'], default: 'Pending' },
  supplier: { type: String, required: true },
  comments: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('LPO', lpoSchema);
