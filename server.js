import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import rawMaterialRoutes from "./routes/rawMaterialRoutes.js";
import finishedProductRoutes from "./routes/finishedProductRoutes.js";
import stockMovementRoutes from "./routes/stockMovementRoutes.js";
import dispatchDeliveryRoutes from "./routes/dispatchDeliveryRoutes.js";


dotenv.config();
const app = express();

// Allow requests only from your frontend URL
const corsOptions = {
  origin: 'https://frontend-repo1.onrender.com',  // your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
};

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("✅ BFC Backend is running. Try /api/ping");
});

// Mount raw material routes under /api/raw-materials
app.use("/api/raw-materials", rawMaterialRoutes);
app.use("/api/finished-products", finishedProductRoutes);
app.use("/api/stock-movements", stockMovementRoutes);
app.use("/api/stock-movements", stockMovementRoutes);
app.use("/api/dispatch-delivery", dispatchDeliveryRoutes);

// Simple ping route to test backend is live
app.get("/api/ping", (req, res) => {
  res.json({ message: "pong 🏓 from BFC backend" });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


