import RawMaterial from "../models/RawMaterial.js";
import FinishedProduct from "../models/FinishedProduct.js";
import LPO from "../models/LPO.js";

// ----------------- STOCK REPORTS -----------------

// Raw material stock summary
export async function getRawMaterialStock(req, res) {
  try {
    const materials = await RawMaterial.aggregate([
      { 
        $group: { 
          _id: "$rawMaterialType", 
          totalBags: { $sum: "$supplierBags" },
          totalWeight: { $sum: "$totalWeight" }
        } 
      }
    ]);
    res.json(materials);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch raw material stock", error: err.message });
  }
}

// Finished product stock summary
export async function getFinishedProductStock(req, res) {
  try {
    const products = await FinishedProduct.aggregate([
      { 
        $group: { 
          _id: "$productName", 
          totalQuantity: { $sum: "$quantity" } 
        } 
      }
    ]);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch finished product stock", error: err.message });
  }
}

// Customer supply history
export async function getCustomerSupply(req, res) {
  try {
    const supplies = await FinishedProduct.find({ customer: { $exists: true } })
      .sort({ createdAt: -1 });
    res.json(supplies);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch customer supply history", error: err.message });
  }
}

// Fetch all LPOs, receipts, or requisition forms
export async function getAllPaperwork(req, res) {
  try {
    const lpos = await LPO.find().sort({ createdAt: -1 });
    const rawMaterials = await RawMaterial.find().sort({ date: -1 });
    res.json({ lpos, rawMaterials });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch paperwork", error: err.message });
  }
}
