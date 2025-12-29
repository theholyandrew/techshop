import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { getAllProducts } from '../api/api';  
import './Products.css';

function Products() {
  const [selectedCategory, setSelectedCategory] = useState('Всі');
  const [products, setProducts] = useState([]);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);      

  const categories = ['Всі', 'Смартфони', 'Ноутбуки', 'Планшети', 'Аксесуари'];

  // ========================================
  // ЗАВАНТАЖЕННЯ ТОВАРІВ З BACKEND
  // ========================================
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Робимо запит до Backend
        const data = await getAllProducts();
        
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError('Помилка при завантаженні товарів. Спробуйте пізніше.');
        setLoading(false);
        console.error(err);
      }
    };

    fetchProducts();
  }, []); // Пустий масив = виконати 1 раз при завантаженні компонента

  
  const filteredProducts = selectedCategory === 'Всі' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  // ========================================
  // LOADING СТАН
  // ========================================
  if (loading) {
    return (
      <div className="products-page">
        <div className="container">
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Завантаження товарів...</p>
          </div>
        </div>
      </div>
    );
  }

  // ========================================
  // ПОМИЛКА
  // ========================================
  if (error) {
    return (
      <div className="products-page">
        <div className="container">
          <div className="error-state">
            <h2>😔 {error}</h2>
            <button 
              onClick={() => window.location.reload()} 
              className="btn btn-primary"
            >
              Спробувати знову
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ========================================
  // ВІДОБРАЖЕННЯ ТОВАРІВ
  // ========================================
  return (
    <div className="products-page">
      <div className="container">
        
        <h1>Каталог товарів</h1>

        {/* Фільтр по категоріям */}
        <div className="category-filter">
          {categories.map(category => (
            <button
              key={category}
              className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Кількість знайдених товарів */}
        <p className="products-count">
          Знайдено товарів: {filteredProducts.length}
        </p>

        {/* Сітка товарів */}
        {filteredProducts.length > 0 ? (
          <div className="products-grid">
            {filteredProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="no-products">
            <p>Товарів в цій категорії поки немає 😢</p>
          </div>
        )}

      </div>
    </div>
  );
}

export default Products;