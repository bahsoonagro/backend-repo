import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

// Minimal CORS — allow frontend temporarily
app.use(cors({
  origin: "*", 
  credentials: true
}));

// JSON parsing
app.use(express.json());

// Health check
app.get("/api/ping", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
