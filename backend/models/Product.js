const mongoose = require('mongoose');

// Схема товару
const productSchema = new mongoose.Schema({
  name: {
    type: String,          
    required: true,        
    trim: true            
  },

  
  price: {
    type: Number,          
    required: true,
    min: 0                 
  },

  
  category: {
    type: String,
    required: true,
    enum: ['Смартфони', 'Ноутбуки', 'Планшети', 'Аксесуари']  
  },

  
  image: {
    type: String,
    required: true
  },

 
  description: {
    type: String,
    required: true
  },

  
  inStock: {
    type: Boolean,         
    default: true         
  },

  
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  }
}, {
  timestamps: true  // Автоматично додає createdAt і updatedAt
});



const Product = mongoose.model('Product', productSchema);

module.exports = Product;