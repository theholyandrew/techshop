const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); 
const { protect, admin } = require('../middleware/auth');  // ← ДОДАЛИ

// ========================================
// GET /api/products - Отримати всі товари з MongoDB
// ========================================
router.get('/', async (req, res) => {
  try {
    // Знаходимо всі товари в базі даних
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ 
      message: 'Помилка при отриманні товарів',
      error: error.message 
    });
  }
});


// ========================================
// GET /api/products/:id - Отримати один товар
// ========================================
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ 
        message: 'Товар не знайдено' 
      });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ 
      message: 'Помилка при отриманні товару',
      error: error.message 
    });
  }
});

// ========================================
// POST /api/products - Додати новий товар
// ========================================
router.post('/', protect, admin, async (req, res) => {
  try {
    const product = new Product(req.body);
    
    const savedProduct = await product.save();
    
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ 
      message: 'Помилка при створенні товару',
      error: error.message 
    });
  }
});

// ========================================
// PUT /api/products/:id - Оновити товар
// ========================================
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { 
        new: true,           
        runValidators: true  
      }
    );
    
    if (!updatedProduct) {
      return res.status(404).json({ 
        message: 'Товар не знайдено' 
      });
    }

    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ 
      message: 'Помилка при оновленні товару',
      error: error.message 
    });
  }
});

// ========================================
// DELETE /api/products/:id - Видалити товар
// ========================================
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    
    if (!deletedProduct) {
      return res.status(404).json({ 
        message: 'Товар не знайдено' 
      });
    }

    res.json({ 
      message: 'Товар успішно видалено',
      product: deletedProduct
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Помилка при видаленні товару',
      error: error.message 
    });
  }
});

module.exports = router;