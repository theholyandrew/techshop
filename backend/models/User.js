const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Схема користувача
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Будь ласка, вкажіть ім\'я'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Будь ласка, вкажіть email'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Невірний формат email']
  },
  password: {
    type: String,
    required: [true, 'Будь ласка, вкажіть пароль'],
    minlength: [6, 'Пароль повинен бути мінімум 6 символів'],
    select: false
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
}, {
  timestamps: true
});

// MIDDLEWARE: Хешувати пароль перед збереженням
userSchema.pre('save', async function() {
  // Якщо пароль не змінювався - пропустити
  if (!this.isModified('password')) {
    return;
  }
  
  // Хешувати пароль
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// МЕТОД: Порівняти паролі
userSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;