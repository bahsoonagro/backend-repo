require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Stock = require('./models/Stock');
const StockItem = require('./models/StockItem');
const stockRoutes = require('./routes/stockRoutes');



const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ Connected to MongoDB');

  // 👉 Only once: seed a sample item
  StockItem.create({ name: 'Sugar', quantity: 100, category: 'raw material', unitPrice: 3.5 })
    .then(item => console.log('🌱 Sample item created:', item))
    .catch(err => console.error('⚠️ Error seeding item:', err));
}).catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});

// API Routes
app.post('/save', async (req, res) => {
  try {
    const newStock = new Stock(req.body);
    const saved = await newStock.save();
    res.json({ success: true, message: 'Saved to MongoDB', data: saved });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error saving data' });
  }
});

app.get('/data', async (req, res) => {
  try {
    const stocks = await Stock.find();
    res.json(stocks);
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching data' });
  }
});

app.get('/items', async (req, res) => {
  try {
    const items = await StockItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching items' });
  }
});

app.get('/', (req, res) => {
  res.send('📡 BFC Stock Management API is live');
});
app.use('/api/stocks', stockRoutes);

app.get('/api/ping', (req, res) => {
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

