const mongoose = require('mongoose');

const stockItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    enum: ['raw material', 'finished product', 'packaging', 'other'],
    required: true,
  },
  unitPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  supplier: {
    type: String,
    default: 'Unknown',
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to update 'lastUpdated' before each save
stockItemSchema.pre('save', function (next) {
  this.lastUpdated = Date.now();
  next();
});

module.exports = mongoose.model('StockItem', stockItemSchema);

