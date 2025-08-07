require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Route imports
const stockRoutes = require('./routes/stockRoutes');
const stockItemRoutes = require('./routes/stockItemRoutes');
const rawMaterialRoutes = require('./routes/rawMaterialRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/stocks', stockRoutes);
app.use('/api/stock-items', stockItemRoutes);
app.use('/api/raw-materials', rawMaterialRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ Connected to MongoDB');
}).catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});

// Routes
app.get('/', (req, res) => {
  res.send('📡 BFC Stock Management API is live');
});

app.use('/api/stocks', stockRoutes);
app.use('/api/items', stockItemRoutes);
app.use('/api/raw-materials', rawMaterialRoutes);

app.get('/api/ping', (req, res) => {
  res.send('pong');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
