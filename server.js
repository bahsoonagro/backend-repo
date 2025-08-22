import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// Import route modules
import rawMaterialRoutes from "./routes/rawMaterialRoutes.js";
import finishedProductRoutes from "./routes/finishedProductRoutes.js";
import stockMovementRoutes from "./routes/stockMovementRoutes.js";
import dispatchDeliveryRoutes from "./routes/dispatchDeliveryRoutes.js";
import stockRoutes from "./routes/stockRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";

dotenv.config();

const app = express();

// CORS configuration
const allowedOrigins = [
  "http://localhost:3001", // local dev
  "http://localhost:3002", // React dashboard dev
  "https://frontend-repo1.onrender.com" // deployed frontend
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS policy: origin ${origin} not allowed`));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());

// Test endpoint
app.get("/", (req, res) => {
  res.send("✅ BFC Backend is running. Try /api/ping");
});

app.get("/api/ping", (req, res) => {
  res.json({ message: "pong 🏓 from BFC backend" });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB Atlas");

    // Mount API routes
    app.use("/api/raw-materials", rawMaterialRoutes);
    app.use("/api/finished-products", finishedProductRoutes);
    app.use("/api/stock-movements", stockMovementRoutes);
    app.use("/api/dispatch-delivery", dispatchDeliveryRoutes);
    app.use("/api/stocks", stockRoutes);
    app.use("/api/reports", reportRoutes);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  });
