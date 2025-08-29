// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ CORS configuration
const allowedOrigins = [
  process.env.FRONTEND_URL, // Railway frontend URL
  "http://localhost:3000"   // Local development
].filter(Boolean);

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // Postman / curl requests
    if (allowedOrigins.includes(origin)) return callback(null, true);

    console.warn(`❌ Blocked CORS request from: ${origin}`);
    return callback(new Error(`CORS policy: ${origin} not allowed`), false);
  },
  credentials: true
}));

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ Health check route
app.get("/api/ping", (req, res) => {
  res.json({ status: "ok", message: "Backend is live!" });
});

// ✅ Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "API is working and ready for frontend!" });
});

// ✅ Import all your routes
import rawMaterialRoutes from "./routes/rawMaterialRoutes.js";
import stockMovementRoutes from "./routes/stockMovementRoutes.js";
import finishedProductRoutes from "./routes/finishedProductRoutes.js";
import dispatchDeliveryRoutes from "./routes/dispatchDeliveryRoutes.js";

// ✅ Use routes
app.use("/api/raw-materials", rawMaterialRoutes);
app.use("/api/stock-movements", stockMovementRoutes);
app.use("/api/finished-products", finishedProductRoutes);
app.use("/api/dispatch-delivery", dispatchDeliveryRoutes);

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
