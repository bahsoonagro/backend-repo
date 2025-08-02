const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  item: { type: String, required: true },
  quantity: { type: Number, required: true },
  category: String,
  unit: String,
  supplier: String,
  dateReceived: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Stock', stockSchema);

