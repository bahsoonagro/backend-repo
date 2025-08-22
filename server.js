import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import rawMaterialRoutes from "./routes/rawMaterialRoutes.js";
import finishedProductRoutes from "./routes/finishedProductRoutes.js";
import stockMovementRoutes from "./routes/stockMovementRoutes.js";
import dispatchDeliveryRoutes from "./routes/dispatchDeliveryRoutes.js";
import stockRoutes from "./routes/stockRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";

dotenv.config();

const app = express();

// CORS options
const corsOptions = {
  origin: 'https://frontend-repo1.onrender.com', // frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
  'http://localhost:3001',               // local dev

};

// Enable CORS for all routes
app.use(cors(corsOptions));

// Parse JSON
app.use(express.json());

// Test routes
app.get("/", (req, res) => {
  res.send("✅ BFC Backend is running. Try /api/ping");
});

app.get("/api/ping", (req, res) => {
  res.json({ message: "pong 🏓 from BFC backend" });
});

// Connect to MongoDB first
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB Atlas");

    // Mount API routes AFTER DB connection
    app.use("/api/raw-materials", rawMaterialRoutes);
    app.use("/api/finished-products", finishedProductRoutes);
    app.use("/api/stock-movements", stockMovementRoutes);
    app.use("/api/dispatch-delivery", dispatchDeliveryRoutes);
    app.use("/api/stocks", stockRoutes);
    app.use("/api/reports", reportRoutes);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  });
