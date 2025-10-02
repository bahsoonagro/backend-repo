// models/FinishedProduct.js
import mongoose from "mongoose";

const finishedProductSchema = new mongoose.Schema({
  batchNumber: { type: String, required: true },
  date: { type: Date, required: true },
  productName: { type: String, required: true },
  openingQty: { type: Number, required: true },
  newStock: { type: Number, required: true },
  totalStock: { type: Number, required: true },
  qtyOut: { type: Number, required: true },
  balance: { type: Number, required: true },
  remarks: { type: String }
}, { timestamps: true });

const FinishedProduct = mongoose.model("FinishedProduct", finishedProductSchema);

export default FinishedProduct;
