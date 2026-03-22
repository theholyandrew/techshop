const express = require('express');
const router = express.Router();
const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const { protect } = require('../middleware/auth');

// @route   POST /api/auth/register
// @desc    Реєстрація нового користувача
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Перевірити чи всі поля заповнені
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Будь ласка, заповніть всі поля' });
    }

    // Перевірити чи користувач вже існує
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Користувач з таким email вже існує' });
    }

    // Створити користувача
    const user = await User.create({
      name,
      email,
      password  // Хешування відбудеться автоматично (pre save hook)
    });

    // Відправити токен і дані користувача
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    });

  } catch (error) {
    console.error('Помилка реєстрації:', error);
    res.status(500).json({ message: 'Помилка сервера при реєстрації' });
  }
});

// @route   POST /api/auth/login
// @desc    Логін користувача
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Перевірити чи всі поля заповнені
    if (!email || !password) {
      return res.status(400).json({ message: 'Будь ласка, введіть email та пароль' });
    }

    // Знайти користувача за email (включити password!)
    const user = await User.findOne({ email }).select('+password');

    // Перевірити чи існує користувач і чи пароль правильний
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Невірний email або пароль' });
    }

    // Відправити токен і дані користувача
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    });

  } catch (error) {
    console.error('Помилка логіну:', error);
    res.status(500).json({ message: 'Помилка сервера при вході' });
  }
});

// @route   GET /api/auth/profile
// @desc    Отримати профіль користувача
// @access  Private (потрібен токен)
router.get('/profile', protect, async (req, res) => {
  try {
    // req.user вже є (з protect middleware)
    res.json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role
    });
  } catch (error) {
    console.error('Помилка отримання профілю:', error);
    res.status(500).json({ message: 'Помилка сервера' });
  }
});

module.exports = router;