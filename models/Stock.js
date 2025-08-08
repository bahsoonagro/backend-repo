import mongoose from 'mongoose';

const stockSchema = new mongoose.Schema({
  itemName: String,
  quantity: Number,
  location: String,
  date: {
    type: Date,
    default: Date.now
  }
});

const Stock = mongoose.model('Stock', stockSchema);
export default Stock;
