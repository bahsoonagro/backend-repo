import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import stockRoutes from './routes/stockRoutes.js';
import stockItemRoutes from './routes/stockItemRoutes.js';
import rawMaterialRoutes from './routes/rawMaterialRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

// Test endpoint
app.get('/api/ping', (req, res) => {
  res.json({ message: 'pong 🏓 from BFC backend' });
});

// Routes
app.use('/api/stocks', stockRoutes);
app.use('/api/stock-items', stockItemRoutes);
app.use('/api/raw-materials', rawMaterialRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));













dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Atlas connected');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err));
