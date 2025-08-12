import StockMovement from "../models/StockMovement.js";

export async function getStockMovements(req, res) {
  try {
    const stockMovements = await StockMovement.find().sort({ dateTime: -1 });
    res.json(stockMovements);
  } catch (error) {
    console.error("Error fetching stock movements:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function createStockMovement(req, res) {
  try {
    const {
      requisitionNo,
      dateTime,
      rawMaterial,
      batchNumber,
      quantityBags,
      weightRemovedKg,
      weightReceivedKg,
      storeman,
      cleaningReceiver,
      remarks,
    } = req.body;

    if (
      !requisitionNo ||
      !dateTime ||
      !rawMaterial ||
      !batchNumber ||
      quantityBags == null ||
      weightRemovedKg == null ||
      weightReceivedKg == null ||
      !storeman ||
      !cleaningReceiver
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newStockMovement = new StockMovement({
      requisitionNo,
      dateTime,
      rawMaterial,
      batchNumber,
      quantityBags,
      weightRemovedKg,
      weightReceivedKg,
      storeman,
      cleaningReceiver,
      remarks,
    });

    await newStockMovement.save();
    res.status(201).json(newStockMovement);
  } catch (error) {
    console.error("Error adding stock movement:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
