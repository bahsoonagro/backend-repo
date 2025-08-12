import mongoose from "mongoose";

const stockSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    quantity: { type: Number, required: true, min: 0 },
    category: { type: String, required: true },
    unitPrice: { type: Number, required: true, min: 0 },
    supplier: { type: String, default: "" },
  },
  { timestamps: true }
);

const Stock = mongoose.model("Stock", stockSchema);
export default Stock;
