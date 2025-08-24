import mongoose from 'mongoose';

const lpoItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  unitPrice: { type: Number, required: true },
  total: { type: Number } // auto-calculated
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

  // Grand total (items + extras)
  total: { type: Number }
}, { timestamps: true });

// Auto-calculate item totals + grand total before save
lpoSchema.pre('save', function (next) {
  if (this.items && this.items.length > 0) {
    // calculate each item's total
    this.items.forEach(item => {
      item.total = item.quantity * item.unitPrice;
    });

    // calculate grand total (items total + extras)
    const itemsTotal = this.items.reduce((acc, item) => acc + item.total, 0);
    const extras = this.fuelCost + this.perDiem + this.tollFee + this.miscellaneous;

    this.total = itemsTotal + extras;
  } else {
    this.total = this.fuelCost + this.perDiem + this.tollFee + this.miscellaneous;
  }

  next();
});

const LPO = mongoose.model('LPO', lpoSchema);
export default LPO;
