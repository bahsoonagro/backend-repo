// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS: allow only your frontend
const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:3000"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // allow Postman/curl
    if (allowedOrigins.includes(origin)) return callback(null, true);
    console.warn(`Blocked CORS request from: ${origin}`);
    return callback(new Error(`CORS policy: ${origin} not allowed`), false);
  },
  credentials: true
}));

// Simple JSON parser
app.use(express.json());

// Test route
app.get("/api/ping", (req, res) => {
  res.json({ status: "ok", message: "Backend is live!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
