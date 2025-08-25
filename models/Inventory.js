import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
  productName: { type: String, required: true },
  batchNumber: { type: String, required: true },
  totalProduced: { type: Number, default: 0 }, // qty of finished products
  stockIn: { type: Number, default: 0 },
  stockOut: { type: Number, default: 0 },
  damages: { type: Number, default: 0 },
  availableStock: { type: Number, default: 0 }, // auto-calculated
  lastUpdated: { type: Date, default: Date.now },
});

inventorySchema.pre("save", function (next) {
  this.availableStock = this.stockIn - this.stockOut - this.damages;
  next();
});

const Inventory = mongoose.model("Inventory", inventorySchema);
export default Inventory;
