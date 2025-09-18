// models/StockMovement.js
import mongoose from "mongoose";

const stockMovementSchema = new mongoose.Schema(
  {
    type: { 
      type: String, 
      enum: ["IN", "OUT"], 
      required: true, // better to enforce direction
    },
    requisitionNo: { 
      type: String, 
      trim: true 
    },
    dateTime: { 
      type: Date, 
      default: Date.now 
    },
    rawMaterial: { 
      type: String, 
      required: true, 
      trim: true 
    },
    batchNumber: { 
      type: String, 
      trim: true 
    },
    quantityBags: { 
      type: Number, 
      min: 0 
    },
    weightRemovedKg: { 
      type: Number, 
      min: 0 
    },
    weightReceivedKg: { 
      type: Number, 
      min: 0 
    },
    storeman: { 
      type: String, 
      trim: true 
    },
    cleaningReceiver: { 
      type: String, 
      trim: true 
    },
    notes: { 
      type: String, 
      trim: true 
    }, // maps to "remarks" from frontend
  },
  { 
    timestamps: true 
  }
);

export default mongoose.model("StockMovement", stockMovementSchema);
