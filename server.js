import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Allow requests from your frontend Railway app + localhost
const allowedOrigins = [
  process.env.FRONTEND_URL,            // e.g., https://frontend-repo-production.up.railway.app
  "http://localhost:3000"              // local dev
];

// ✅ Improved CORS config (more flexible)
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // Allow Postman/curl
    const isAllowed = allowedOrigins.some((allowed) => origin.startsWith(allowed));
    if (!isAllowed) {
      console.warn(`❌ Blocked CORS request from: ${origin}`);
      return callback(new Error(`CORS policy: ${origin} not allowed`), false);
    }
    return callback(null, true);
  },
  credentials: true,
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Health check route
app.get("/api/ping", (req, res) => {
  res.json({ status: "ok", message: "Backend is live!" });
});

// Example route
app.get("/api/test", (req, res) => {
  res.json({ message: "API is working and ready for frontend!" });
});

// TODO: Add your real routes here
// app.use("/api/raw-materials", rawMaterialRoutes);
// app.use("/api/stock-movements", stockMovementRoutes);
// app.use("/api/finished-products", finishedProductRoutes);
// app.use("/api/dispatch-delivery", dispatchDeliveryRoutes);

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
