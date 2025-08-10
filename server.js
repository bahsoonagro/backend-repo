import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import stockRoutes from "./routes/stockRoutes.js";
import stockItemRoutes from "./routes/stockItemRoutes.js";
import rawMaterialRoutes from "./routes/rawMaterialRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/stocks", stockRoutes);
app.use("/api/stock-items", stockItemRoutes);
app.use("/api/raw-materials", rawMaterialRoutes);

app.get("/api/ping", (req, res) => {
  res.json({ message: "pong 🏓 from BFC backend" });
});

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

