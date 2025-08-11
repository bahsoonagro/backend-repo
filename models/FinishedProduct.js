// models/FinishedProduct.js
import mongoose from "mongoose";

const finishedProductSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  batchNumber: { type: String, required: true },
  productionDate: { type: Date, required: true },
  quantityKg: { type: Number, required: true },
  unit: { type: String, required: true },
  remarks: { type: String }
}, { timestamps: true });

const FinishedProduct = mongoose.model("FinishedProduct", finishedProductSchema);

export default FinishedProduct;
