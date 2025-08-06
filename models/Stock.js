// models/Stock.js

const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  item: {
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
    required: true,
    trim: true,
  },
  unit: {
    type: String,
    required: true,
    trim: true,
  },
  supplier: {
    type: String,
    required: true,
    trim: true,
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Stock', stockSchema);
