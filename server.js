import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import rawMaterialRoutes from "./routes/rawMaterialRoutes.js";
import finishedProductRoutes from "./routes/finishedProductRoutes.js";
import stockMovementRoutes from "./routes/stockMovementRoutes.js";
import dispatchDeliveryRoutes from "./routes/dispatchDeliveryRoutes.js";
import stockRoutes from "./routes/stockRoutes.js";

dotenv.config();

const app = express();

const corsOptions = {
  origin: 'https://frontend-repo1.onrender.com', // confirm this URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("✅ BFC Backend is running. Try /api/ping");
});

// Simple ping route to test backend is live
app.get("/api/ping", (req, res) => {
  res.json({ message: "pong 🏓 from BFC backend" });
});

// Connect to MongoDB first, then mount routes and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB Atlas");

    // Mount routes AFTER DB connection
    app.use("/api/raw-materials", rawMaterialRoutes);
    app.use("/api/finished-products", finishedProductRoutes);
    app.use("/api/stock-movements", stockMovementRoutes);
    app.use("/api/dispatch-delivery", dispatchDeliveryRoutes);
    app.use("/api/stocks", stockRoutes);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1); // exit if DB connection fails
  });
