import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

const allowedOrigins = ["https://frontend-repo-topaz.vercel.app"];

import rawMaterialRoutes from "./routes/rawMaterialRoutes.js";
import finishedProductRoutes from "./routes/finishedProductRoutes.js";
import stockMovementRoutes from "./routes/stockMovementRoutes.js";
import dispatchDeliveryRoutes from "./routes/dispatchDeliveryRoutes.js";
import stockRoutes from "./routes/stockRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";

dotenv.config();
const app = express();

// --- Flexible CORS Setup ---
// Allow localhost during dev, and any *.vercel.app domain in production
const corsOptions = {
  origin: (origin, callback) => {
    if (
      !origin || // allow server-to-server requests & Postman
      /^https:\/\/.*\.vercel\.app$/.test(origin) || // any Vercel subdomain
      /^http:\/\/localhost(:\d+)?$/.test(origin) // local dev
    ) {
      callback(null, true);
    } else {
      callback(new Error(`CORS policy: origin ${origin} not allowed`));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());

// --- Routes ---
app.use("/api/raw-materials", rawMaterialRoutes);
app.use("/api/finished-products", finishedProductRoutes);
app.use("/api/stock-movements", stockMovementRoutes);
app.use("/api/dispatch-delivery", dispatchDeliveryRoutes);
app.use("/api/stocks", stockRoutes);
app.use("/api/reports", reportRoutes);

// --- Root check ---
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// --- MongoDB Connection ---
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// --- Start Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
