import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

// --- CORS Setup ---
const allowedOrigins = [
  /^https:\/\/.*\.vercel\.app$/, // any deployed frontend on Vercel
  /^http:\/\/localhost:\d+$/,    // local dev, any port
  "https://your-custom-domain.com" // (optional) replace with your real domain if you add one
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // allow requests with no origin (like mobile apps, curl)
    if (allowedOrigins.some(pattern => 
      (pattern instanceof RegExp && pattern.test(origin)) || pattern === origin
    )) {
      callback(null, true);
    } else {
      callback(new Error(`CORS policy: Origin ${origin} not allowed`));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());

// --- Your Routes ---
import rawMaterialRoutes from "./routes/rawMaterialRoutes.js";
import finishedProductRoutes from "./routes/finishedProductRoutes.js";
import stockMovementRoutes from "./routes/stockMovementRoutes.js";
import dispatchDeliveryRoutes from "./routes/dispatchDeliveryRoutes.js";
import stockRoutes from "./routes/stockRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";

app.use("/api/raw-materials", rawMaterialRoutes);
app.use("/api/finished-products", finishedProductRoutes);
app.use("/api/stock-movements", stockMovementRoutes);
app.use("/api/dispatch-delivery", dispatchDeliveryRoutes);
app.use("/api/stock", stockRoutes);
app.use("/api/reports", reportRoutes);

// --- MongoDB Connection ---
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

// --- Start Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
