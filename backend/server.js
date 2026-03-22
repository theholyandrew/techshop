require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Підключення до MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const productsRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');

app.use('/api/products', productsRoutes);
app.use('/api/auth', authRoutes);

// Головний route
app.get('/', (req, res) => {
  res.json({ message: 'TechShop API працює!' });
});

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Сервер запущено на http://localhost:${PORT}`);
});