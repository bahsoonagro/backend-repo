import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import rawMaterialRoutes from "./routes/rawMaterialRoutes.js";
import finishedProductRoutes from "./routes/finishedProductRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("✅ BFC Backend is running. Try /api/ping");
});

// Mount raw material routes under /api/raw-materials
app.use("/api/raw-materials", rawMaterialRoutes);
app.use("/api/finished-products", finishedProductRoutes);

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
