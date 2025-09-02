import mongoose from "mongoose";

const dispatchDeliverySchema = new mongoose.Schema({
  item: { type: String, required: true },
  quantity: { type: Number, required: true },
  date: { type: Date, required: true },
  customer: { type: String, required: true },
  driver: { type: String, required: true },
  vehicle: { type: String, required: true },
  tollGroup: { type: String },    // e.g. "Group 2: Taxis and Sedans"
  tollFee: { type: Number, default: 0 }, // actual price
  fuelCost: { type: Number, default: 0 },
  perDiem: { type: Number, default: 0 },
  personnel: { type: [String], default: [] },
  totalCost: { type: Number, default: 0 },
  remarks: { type: String, default: "" },
}, { timestamps: true });

export default mongoose.model("DispatchDelivery", dispatchDeliverySchema);
