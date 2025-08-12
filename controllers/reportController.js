// controllers/reportController.js
import Stock from "../models/Stock.js";
import StockMovement from "../models/StockMovement.js";

/**
 * GET /api/reports/stock-summary
 * Returns summary stats suitable for management dashboard
 */
export async function getStockSummary(req, res) {
  try {
    // 1) Total stock value (quantity * unitPrice)
    const valAgg = await Stock.aggregate([
      {
        $project: {
          value: { $multiply: [{ $ifNull: ["$quantity", 0] }, { $ifNull: ["$unitPrice", 0] }] },
        },
      },
      { $group: { _id: null, totalStockValue: { $sum: "$value" } } },
    ]);

    const totalStockValue = (valAgg[0] && valAgg[0].totalStockValue) || 0;

    // 2) Total items count
    const totalItemsCount = await Stock.countDocuments();

    // 3) Low stock items (use reorderLevel if present, otherwise threshold 10)
    const lowThreshold = Number(req.query.threshold) || 10;
    const lowStockItems = await Stock.find({
      $expr: { $lte: ["$quantity", { $ifNull: ["$reorderLevel", lowThreshold] }] },
    })
      .select("name quantity reorderLevel")
      .limit(100)
      .lean();

    // 4) Top 5 by quantity and top 5 by value
    const topByQty = await Stock.find().sort({ quantity: -1 }).limit(5).select("name quantity").lean();
    const topByValue = await Stock.aggregate([
      {
        $project: {
          name: 1,
          value: { $multiply: [{ $ifNull: ["$quantity", 0] }, { $ifNull: ["$unitPrice", 0] }] },
        },
      },
      { $sort: { value: -1 } },
      { $limit: 5 },
    ]);

    // 5) Stock movement totals in last 30 days (if 'type' exists)
    const now = new Date();
    const since30 = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    // Aggregate IN/OUT if type field present
    const movementAgg = await StockMovement.aggregate([
      { $match: { dateTime: { $gte: since30 } } },
      {
        $group: {
          _id: "$type",
          totalQuantity: { $sum: { $ifNull: ["$quantity", 0] } },
        },
      },
    ]);

    const totals = { IN: 0, OUT: 0 };
    movementAgg.forEach((m) => {
      if (m._id === "IN") totals.IN = m.totalQuantity;
      if (m._id === "OUT") totals.OUT = m.totalQuantity;
    });

    // 6) Recent movements (last 10), handle fields flexibly
    const recentMovementsRaw = await StockMovement.find()
      .sort({ dateTime: -1 })
      .limit(10)
      .lean();

    // Normalize results for frontend
    const recentMovements = recentMovementsRaw.map((m) => ({
      _id: m._id,
      date: m.dateTime || m.createdAt,
      itemName: m.itemName || m.rawMaterial || m.requisitionNo || "Unknown",
      type: m.type || "N/A",
      quantity: m.quantity || 0,
      notes: m.notes || "",
    }));

    // Compose summary object
    const summary = {
      totalStockValue,
      totalItemsCount,
      lowStockCount: lowStockItems.length,
      lowStockItems,
      topByQty,
      topByValue,
      totalIn30: totals.IN,
      totalOut30: totals.OUT,
    };

    res.json({ summary, recentMovements });
  } catch (err) {
    console.error("Error building stock summary:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
