// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables first
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error("❌ MONGO_URI is missing in .env");
  process.exit(1);
}

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch(err => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// Routes
import stockRoutes from './routes/stockRoutes.js';
import stockItemRoutes from './routes/stockItemRoutes.js';
import rawMaterialRoutes from './routes/rawMaterialRoutes.js';

app.use('/api/stocks', stockRoutes);
app.use('/api/stock-items', stockItemRoutes);
app.use('/api/raw-materials', rawMaterialRoutes);

// Simple ping route for testing
app.get('/api/ping', (req, res) => {
  res.json({ message: "pong 🏓 from BFC backend" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
