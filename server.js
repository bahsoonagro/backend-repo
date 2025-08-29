import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
}));

app.get("/api/ping", (req, res) => {
  res.json({ status: "ok", message: "Backend is live!" });
});

app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
