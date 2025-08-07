// models/RawMaterial.js

const mongoose = require("mongoose");

const rawMaterialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Raw material name is required"],
    },
    description: {
      type: String,
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [0, "Quantity cannot be negative"],
    },
    unit: {
      type: String,
      enum: ["kg", "g", "ton", "litre", "ml", "pcs"],
      default: "kg",
    },
    supplier: {
      type: String,
    },
    purchaseDate: {
      type: Date,
      default: Date.now,
    },
    pricePerUnit: {
      type: Number,
      default: 0,
    },
    totalCost: {
      type: Number,
      default: 0,
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Optional: Automatically calculate totalCost before saving
rawMaterialSchema.pre("save", function (next) {
  this.totalCost = this.quantity * this.pricePerUnit;
  next();
});

module.exports = mongoose.model("RawMaterial", rawMaterialSchema);
