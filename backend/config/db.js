const mongoose = require('mongoose');

// Функція підключення до MongoDB
const connectDB = async () => {
  try {
    // Підключення до MongoDB Atlas
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`✅ MongoDB підключено: ${conn.connection.host}`);
    console.log(`📊 База даних: ${conn.connection.name}`);
  } catch (error) {
    console.error('❌ Помилка підключення до MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;