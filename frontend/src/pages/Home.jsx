import React, { useState, useEffect } from 'react';  
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getAllProducts } from '../api/api';  
import './Home.css';

function Home() {
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

  
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="home">
      
      {/* Hero секція */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Ласкаво просимо до TechShop!</h1>
            <p>Найкраща техніка за найкращими цінами</p>
            <Link to="/products" className="btn btn-primary btn-large">
              Переглянути каталог
            </Link>
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