const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware для перевірки токену
const protect = async (req, res, next) => {
  let token;

  // Перевірити чи є токен в headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Дістати токен з "Bearer TOKEN"
      token = req.headers.authorization.split(' ')[1];

      // Розшифрувати токен
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Знайти користувача за ID з токену
      req.user = await User.findById(decoded.userId).select('-password');

      next();  // Пропустити далі
    } catch (error) {
      console.error('Помилка токену:', error);
      return res.status(401).json({ message: 'Не авторизований, невірний токен' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Не авторизований, немає токену' });
  }
};

// Middleware для перевірки ролі admin
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();  // Роль admin - пропустити
  } else {
    res.status(403).json({ message: 'Доступ заборонено. Тільки для адміністраторів.' });
  }
};

module.exports = { protect, admin };