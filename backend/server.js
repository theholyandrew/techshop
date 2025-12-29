require('dotenv').config();
const connectDB = require('./config/db');

connectDB();

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
// ========================================
// MIDDLEWARE
// ========================================

app.use(express.json());
app.use(cors());

// ========================================
// ROUTES
// ========================================

// Головна сторінка
app.get('/', (req, res) => {
  res.json({ 
    message: '🎉 Backend TechShop працює!',
    version: '1.0.0',
    endpoints: {
      products: '/api/products'
    }
  });
});


const productsRoutes = require('./routes/products');
app.use('/api/products', productsRoutes);


app.use((req, res) => {
  res.status(404).json({ 
    message: 'Маршрут не знайдено' 
  });
});


app.listen(PORT, () => {
  console.log(`✅ Сервер запущено на http://localhost:${PORT}`);
  console.log(`📦 API товарів: http://localhost:${PORT}/api/products`);
});