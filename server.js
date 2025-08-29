// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Routes
import rawMaterialRoutes from "./routes/rawMaterialRoutes.js";
import stockMovementRoutes from "./routes/stockMovementRoutes.js";
import finishedProductRoutes from "./routes/finishedProductRoutes.js";
import dispatchDeliveryRoutes from "./routes/dispatchDeliveryRoutes.js";
import stockRoutes from "./routes/stockRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ---------------------------
// CORS configuration
// ---------------------------
const allowedOrigins = [
  process.env.FRONTEND_URL || "https://frontend-repo-production-c3b7.up.railway.app",
  "http://localhost:3000",
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // Allow curl, Postman
    if (allowedOrigins.includes(origin)) return callback(null, true);
    console.warn("Blocked CORS request from:", origin);
    return callback(new Error("Not allowed by CORS"), false);
  },
  credentials: true,
}));

// ---------------------------
// Middleware
// ---------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---------------------------
// MongoDB connection
// ---------------------------
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// ---------------------------
// Health check
// ---------------------------
app.get("/api/ping", (req, res) => {
  res.json({ status: "ok", message: "Backend is live!" });
});

// ---------------------------
// API Routes
// ---------------------------
app.use("/api/raw-materials", rawMaterialRoutes);
app.use("/api/stock-movements", stockMovementRoutes);
app.use("/api/finished-products", finishedProductRoutes);
app.use("/api/dispatch-delivery", dispatchDeliveryRoutes);
app.use("/api/stocks", stockRoutes);
app.use("/api/reports", reportRoutes);

// ---------------------------
// Global error handler
// ---------------------------
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

// ---------------------------
// Start server
// ---------------------------
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
