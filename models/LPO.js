import mongoose from 'mongoose';

const lpoItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  unitPrice: { type: Number, required: true },
  total: { type: Number, required: true }
});

const lpoSchema = new mongoose.Schema({
  year: { type: Number, required: true },
  supplier: { type: String, required: true },
  payment: { type: String, enum: ['Pending', 'Paid'], default: 'Pending' },
  comments: { type: String, default: '' },

  items: { type: [lpoItemSchema], required: true },

  // Extra costs
  fuelCost: { type: Number, default: 0 },
  perDiem: { type: Number, default: 0 },
  tollFee: { type: Number, default: 0 },
  miscellaneous: { type: Number, default: 0 },

  total: { type: Number, required: true } // grand total including all extras
}, { timestamps: true });

const LPO = mongoose.model('LPO', lpoSchema);
export default LPO;
