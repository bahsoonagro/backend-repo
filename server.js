require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Stock = require('./models/Stock');
const StockItem = require('./models/StockItem');
const RawMaterial = require('./models/RawMaterial');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/api/stocks', stockRoutes);
app.use('/api/stock-items', stockItemRoutes);
app.use('/api/raw-materials', rawMaterialRoutes);

// 🧠 Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ Connected to MongoDB');

  // Optional: seed data once
  StockItem.create({ name: 'Sugar', quantity: 100, category: 'raw material', unitPrice: 3.5 })
    .then(item => console.log('🌱 Seeded item:', item))
    .catch(err => console.error('❌ Seed error:', err));
}).catch((err) => {
  console.error('❌ MongoDB connection failed:', err.message);
});

// 🧪 Health Check
app.get('/api/ping', (req, res) => {
  res.send('pong');
});

// ====================
// 📦 STOCK ROUTES
// ====================

// Create new stock
app.post('/api/stocks', async (req, res) => {
  try {
    const stock = new Stock(req.body);
    const saved = await stock.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create stock', error: err.message });
  }
});

// Get all stocks
app.get('/api/stocks', async (req, res) => {
  try {
    const stocks = await Stock.find();
    res.json(stocks);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching stocks', error: err.message });
  }
});

// Update stock
app.put('/api/stocks/:id', async (req, res) => {
  try {
    const updated = await Stock.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Stock not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Update failed', error: err.message });
  }
});

// Delete stock
app.delete('/api/stocks/:id', async (req, res) => {
  try {
    const deleted = await Stock.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Stock not found' });
    res.json({ message: 'Stock deleted' });
  } catch (err) {
    res.status(400).json({ message: 'Delete failed', error: err.message });
  }
});

// ====================
// 🧱 RAW MATERIAL ROUTES
// ====================

// Add single raw material
app.post('/api/raw-materials', async (req, res) => {
  try {
    const newMaterial = new RawMaterial(req.body);
    const saved = await newMaterial.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Bulk upload
app.post('/api/raw-materials/bulk-upload', async (req, res) => {
  const records = req.body;
  if (!Array.isArray(records) || records.length === 0) {
    return res.status(400).json({ message: 'No records provided' });
  }
  try {
    const inserted = await RawMaterial.insertMany(records);
    res.status(201).json({ message: `${inserted.length} records saved.` });
  } catch (err) {
    res.status(500).json({ message: 'Bulk insert failed', error: err.message });
  }
});

// Get all raw materials
app.get('/api/raw-materials', async (req, res) => {
  try {
    const materials = await RawMaterial.find();
    res.json(materials);
  } catch (err) {
    res.status(500).json({ message: 'Fetch failed', error: err.message });
  }
});

// ====================
// 📦 STOCK ITEMS ROUTE
// ====================
app.get('/api/items', async (req, res) => {
  try {
    const items = await StockItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching items', error: err.message });
  }
});

// Root route
app.get('/', (req, res) => {
  res.send('📡 BFC Stock Management API is live');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
