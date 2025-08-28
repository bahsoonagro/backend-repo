import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// Import your models
import RawMaterial from "./models/RawMaterial.js";
import FinishedProduct from "./models/FinishedProduct.js";
import StockMovement from "./models/StockMovement.js";
import DispatchDelivery from "./models/DispatchDelivery.js";
import Stock from "./models/Stock.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// -------------------- CORS Setup --------------------
const allowedOrigins = [
  "https://frontend-repo-topaz.vercel.app",
  "http://localhost:3000",
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS blocked for origin: " + origin));
    }
  },
  credentials: true,
}));

app.use(express.json());

// -------------------- Database --------------------
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));

// -------------------- Routes --------------------

// Ping route
app.get("/api/ping", (req, res) => {
  res.json({ message: "pong" });
});

// Raw Materials
app.get("/api/raw-materials", async (req, res) => {
  try {
    const items = await RawMaterial.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.post("/api/raw-materials", async (req, res) => {
  try {
    const newItem = new RawMaterial(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Finished Products
app.get("/api/finished-products", async (req, res) => {
  try {
    const items = await FinishedProduct.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.post("/api/finished-products", async (req, res) => {
  try {
    const newItem = new FinishedProduct(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Stock Movements
app.get("/api/stock-movements", async (req, res) => {
  try {
    const movements = await StockMovement.find();
    res.json(movements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.post("/api/stock-movements", async (req, res) => {
  try {
    const movement = new StockMovement(req.body);
    await movement.save();
    res.status(201).json(movement);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Dispatch & Delivery
app.get("/api/dispatch-delivery", async (req, res) => {
  try {
    const deliveries = await DispatchDelivery.find();
    res.json(deliveries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.post("/api/dispatch-delivery", async (req, res) => {
  try {
    const delivery = new DispatchDelivery(req.body);
    await delivery.save();
    res.status(201).json(delivery);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Stocks
app.get("/api/stocks", async (req, res) => {
  try {
    const stocks = await Stock.find();
    res.json(stocks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Reports example
app.get("/api/reports/stock-summary", async (req, res) => {
  try {
    const report = await Report.find(); // Customize your aggregation as needed
    res.json(report);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// -------------------- Start Server --------------------
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
