import mongoose from "mongoose";

const stockMovementSchema = new mongoose.Schema({
  item: { type: String, required: true },
  quantity: { type: Number, required: true },
  movementType: { type: String, enum: ['IN', 'OUT'], required: true },
  date: { type: Date, default: Date.now }
});

const StockMovement = mongoose.model("StockMovement", stockMovementSchema);
export default StockMovement;
