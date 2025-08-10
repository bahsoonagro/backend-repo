// models/Stock.js
import mongoose from 'mongoose';

const stockSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String },
    capacity: { type: Number },
  },
  { timestamps: true }
);

export default mongoose.model('Stock', stockSchema);
