const jwt = require('jsonwebtoken');

// Функція для створення JWT токену
const generateToken = (userId) => {
  return jwt.sign(
    { userId },  // Payload - що кладемо в токен
    process.env.JWT_SECRET,  // Секретний ключ
    { expiresIn: '30d' }  // Токен дійсний 30 днів
  );
};

module.exports = generateToken;