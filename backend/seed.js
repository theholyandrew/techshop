require('dotenv').config();
const connectDB = require('./config/db');
const Product = require('./models/Product');

// Початкові товари для бази даних
const products = [
  {
    name: "iPhone 15 Pro",
    price: 37999,
    category: "Смартфони",
    image: "https://via.placeholder.com/300x300?text=iPhone+15+Pro",
    description: "Потужний смартфон з титановим корпусом та процесором A17 Pro",
    inStock: true,
    rating: 4.8
  },
  {
    name: "Samsung Galaxy S24",
    price: 32999,
    category: "Смартфони",
    image: "https://via.placeholder.com/300x300?text=Samsung+S24",
    description: "Флагман від Samsung з AI функціями та чудовою камерою",
    inStock: true,
    rating: 4.7
  },
  {
    name: "MacBook Air M3",
    price: 54999,
    category: "Ноутбуки",
    image: "https://via.placeholder.com/300x300?text=MacBook+Air",
    description: "Тонкий та легкий ноутбук з неймовірною продуктивністю",
    inStock: true,
    rating: 4.9
  },
  {
    name: "Dell XPS 15",
    price: 45999,
    category: "Ноутбуки",
    image: "https://via.placeholder.com/300x300?text=Dell+XPS+15",
    description: "Професійний ноутбук для роботи та творчості",
    inStock: false,
    rating: 4.6
  },
  {
    name: "AirPods Pro 2",
    price: 9999,
    category: "Аксесуари",
    image: "https://via.placeholder.com/300x300?text=AirPods+Pro",
    description: "Бездротові навушники з активним шумозаглушенням",
    inStock: true,
    rating: 4.8
  },
  {
    name: "iPad Pro 12.9",
    price: 42999,
    category: "Планшети",
    image: "https://via.placeholder.com/300x300?text=iPad+Pro",
    description: "Потужний планшет для професіоналів",
    inStock: true,
    rating: 4.9
  }
];

// Функція заповнення бази даних
const seedDatabase = async () => {
  try {
    // Підключаємось до БД
    await connectDB();

    // Видаляємо всі старі товари
    await Product.deleteMany();
    console.log('🗑️  Старі товари видалено');

    // Додаємо нові товари
    await Product.insertMany(products);
    console.log('✅ Товари додано в базу даних');

    console.log('\n📊 Всього товарів:', await Product.countDocuments());
    
    // Виходимо з програми
    process.exit(0);
  } catch (error) {
    console.error('❌ Помилка:', error);
    process.exit(1);
  }
};

// Запускаємо
seedDatabase();