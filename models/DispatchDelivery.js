import mongoose from "mongoose";

const dispatchDeliverySchema = new mongoose.Schema({
  item: { type: String, required: true },
  quantity: { type: Number, required: true },
  date: { type: Date, required: true },
  customer: { type: String, required: true },
  driver: { type: String, required: true },
  vehicle: { type: String, required: true },
}, { timestamps: true });

const DispatchDelivery = mongoose.model("DispatchDelivery", dispatchDeliverySchema);
export default DispatchDelivery;
