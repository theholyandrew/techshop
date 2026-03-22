import React, { useState, useEffect } from 'react';  
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProductCard from '../components/ProductCard';
import { getAllProducts } from '../api/api';  
import './Home.css';

function Home() {
  const { isAuthenticated } = useAuth();
  
  // State для товарів
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Завантаження товарів
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Помилка завантаження:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Перші 3 товари для головної
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="home">
      
      {/* Hero секція */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Ласкаво просимо до TechShop!</h1>
            <p>Найкраща техніка за найкращими цінами</p>
  
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <Link to="/products" className="btn btn-primary btn-large">
                Переглянути каталог
              </Link>
              
              {/* Кнопка "Увійти" тільки для неавторизованих */}
              {!isAuthenticated() && (
                <Link to="/login" className="btn btn-secondary btn-large">
                  🔐 Увійти
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Популярні товари */}
      <section className="featured-section">
        <div className="container">
          <h2>🔥 Популярні товари</h2>
          
          {loading ? (
            <div className="loading-state">
              <div className="loading-spinner"></div>
            </div>
          ) : (
            <>
              <div className="products-grid">
                {featuredProducts.map(product => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
              <div className="view-all">
                <Link to="/products" className="btn btn-secondary">
                  Дивитись всі товари →
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

    </div>
  );
}

export default Home;