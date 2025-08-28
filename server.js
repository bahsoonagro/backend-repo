import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// Import routes
import rawMaterialRoutes from "./routes/rawMaterialRoutes.js";
import finishedProductRoutes from "./routes/finishedProductRoutes.js";
import stockMovementRoutes from "./routes/stockMovementRoutes.js";
import dispatchDeliveryRoutes from "./routes/dispatchDeliveryRoutes.js";
import stockRoutes from "./routes/stockRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";

dotenv.config();
const app = express();

// --- CORS Setup ---
const allowedOrigins = [
  "https://frontend-repo-topaz.vercel.app", // your deployed frontend
  "http://localhost:3000", // local dev frontend
  "http://localhost:3001",
  "http://localhost:3002"
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error("Blocked by CORS:", origin);
      callback(new Error(`CORS policy: origin ${origin} not allowed`));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
app.use(express.json());

// --- Test Root & Ping ---
app.get("/", (req, res) => res.send("✅ BFC Backend running"));
app.get("/api/ping", (req, res) => res.json({ message: "pong 🏓" }));

// --- Temporary fallback routes (dummy data) ---
// So frontend works even if MongoDB is down
app.get("/api/raw-materials", (req, res) => {
  res.json([
    { _id: "1", name: "Flour", quantity: 100, unit: "kg" },
    { _id: "2", name: "Sugar", quantity: 50, unit: "kg" }
  ]);
});

app.get("/api/finished-products", (req, res) => {
  res.json([
    { _id: "1", name: "Bread", quantity: 200, unit: "pcs" },
    { _id: "2", name: "Cake", quantity: 80, unit: "pcs" }
  ]);
});

app.get("/api/stock-movements", (req, res) => {
  res.json([{ _id: "1", product: "Flour", type: "IN", qty: 50 }]);
});

app.get("/api/dispatch-delivery", (req, res) => {
  res.json([{ _id: "1", product: "Bread", qty: 100, destination: "Shop A" }]);
});

// --- Mount actual routes AFTER DB connection ---
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ MongoDB connected");

    // Mount all real API routes
    app.use("/api/raw-materials", rawMaterialRoutes);
    app.use("/api/finished-products", finishedProductRoutes);
    app.use("/api/stock-movements", stockMovementRoutes);
    app.use("/api/dispatch-delivery", dispatchDeliveryRoutes);
    app.use("/api/stocks", stockRoutes);
    app.use("/api/reports", reportRoutes);
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// --- Start Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
