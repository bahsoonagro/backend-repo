// server.js
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

// ✅ Regex-based CORS origin check
const corsOptions = {
  origin: (origin, callback) => {
    if (
      !origin || // allow mobile apps / curl
      /^http:\/\/localhost:\d+$/.test(origin) || // any localhost:3000, 5173, etc
      /\.vercel\.app$/.test(new URL(origin).hostname) // any Vercel frontend
    ) {
      callback(null, true);
    } else {
      console.log("❌ Blocked by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());

// Logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Test routes
app.get("/", (req, res) => res.send("✅ Backend running!"));
app.get("/api/ping", (req, res) => res.json({ message: "pong 🏓" }));

// MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB Atlas");

    // Mount routes
    app.use("/api/raw-materials", rawMaterialRoutes);
    app.use("/api/finished-products", finishedProductRoutes);
    app.use("/api/stock-movements", stockMovementRoutes);
    app.use("/api/dispatch-delivery", dispatchDeliveryRoutes);
    app.use("/api/stocks", stockRoutes);
    app.use("/api/reports", reportRoutes);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  });

// Error handler
app.use((err, req, res, next) => {
  console.error("❌ ERROR:", err.stack);
  res.status(500).json({ message: err.message || "Internal Server Error" });
});
