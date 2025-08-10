import mongoose from "mongoose";

const stockSchema = new mongoose.Schema({
  name: { type: String, required: true },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "StockItem" }],
  createdAt: { type: Date, default: Date.now }
});

const Stock = mongoose.model("Stock", stockSchema);
export default Stock;
