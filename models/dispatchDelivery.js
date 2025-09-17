import mongoose from "mongoose";

const dispatchDeliverySchema = new mongoose.Schema({
  item: { type: String, required: true },
  quantity: { type: Number, required: true },
  date: { type: Date, required: true },
  customer: { type: String, required: true },
  driver: { type: String, required: true },
  vehicle: { type: String, required: true },
  tollFee: { type: Number, default: 0 },
  fuelCost: { type: Number, default: 0 },
  perDiem: { type: Number, default: 0 },
  personnel: { type: [String], default: [] },
  totalCost: { type: Number, default: 0 },
  remarks: { type: String, default: "" },
  status: { type: String, enum: ["pending", "in-transit", "delivered"], default: "pending" },
}, { timestamps: true });

const DispatchDelivery = mongoose.model("DispatchDelivery", dispatchDeliverySchema);
export default DispatchDelivery;
