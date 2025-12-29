import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getProductById } from '../api/api';
import { useCart } from '../context/CartContext';
import './ProductDetails.css';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, isInCart, getItemQuantity } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Завантаження товару з API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await getProductById(id);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError('Товар не знайдено');
        setLoading(false);
        console.error(err);
      }
    };

    fetchProduct();
  }, [id]);

  // Loading стан
  if (loading) {
    return (
      <div className="product-details">
        <div className="container">
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Завантаження...</p>
          </div>
        </div>
      </div>
    );
  }

  // Помилка або товар не знайдено
  if (error || !product) {
    return (
      <div className="container" style={{ padding: '60px 20px', textAlign: 'center' }}>
        <h2>😢 Товар не знайдено</h2>
        <Link to="/products" className="btn btn-primary">
          Повернутися до каталогу
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
  };

  const itemQuantity = getItemQuantity(product._id);

  return (
    <div className="product-details">
      <div className="container">
        
        <button onClick={() => navigate(-1)} className="back-button">
          ← Назад
        </button>

        <div className="product-details-content">
          
          {/* Ліва частина - зображення */}
          <div className="product-image-section">
            <div className="product-main-image">
              <img src={product.image} alt={product.name} />
              {!product.inStock && (
                <div className="out-of-stock-overlay">
                  <span>Немає в наявності</span>
                </div>
              )}
            </div>
          </div>

          {/* Права частина - інформація */}
          <div className="product-info-section">
            
            <div className="product-category-badge">
              {product.category}
            </div>

            <h1 className="product-title">{product.name}</h1>

            <div className="product-rating-large">
              <span className="stars">⭐⭐⭐⭐⭐</span>
              <span className="rating-number">{product.rating} / 5</span>
              <span className="reviews-count">(248 відгуків)</span>
            </div>

            <div className="product-price-section">
              <span className="current-price">{product.price} ₴</span>
              <span className="old-price">{Math.round(product.price * 1.2)} ₴</span>
              <span className="discount-badge">-20%</span>
            </div>

            <div className="product-description">
              <h3>Опис товару</h3>
              <p>{product.description}</p>
            </div>

            <div className="product-features">
              <h3>Основні характеристики</h3>
              <ul>
                <li>✓ Офіційна гарантія 12 місяців</li>
                <li>✓ Безкоштовна доставка по Україні</li>
                <li>✓ Оплата при отриманні</li>
                <li>✓ Повернення протягом 14 днів</li>
              </ul>
            </div>

            <div className="product-availability">
              {product.inStock ? (
                <span className="in-stock">✓ В наявності</span>
              ) : (
                <span className="out-of-stock">✗ Немає в наявності</span>
              )}
            </div>

            <div className="product-actions-section">
              <button 
                className={`btn btn-add-to-cart ${isInCart(product._id) ? 'btn-success' : 'btn-primary'}`}
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                {!product.inStock 
                  ? 'Немає в наявності' 
                  : isInCart(product._id) 
                    ? `✓ В кошику (${itemQuantity})` 
                    : '🛒 Додати в кошик'
                }
              </button>
              
              <Link to="/products" className="btn btn-secondary">
                Продовжити покупки
              </Link>
            </div>

          </div>

        </div>

        {/* Додаткова інформація */}
        <div className="product-additional-info">
          <div className="info-tabs">
            
            <div className="info-tab">
              <h3>📋 Детальний опис</h3>
              <p>{product.description}</p>
              <p>
                Цей товар ідеально підходить для тих, хто цінує якість та надійність. 
                Виготовлено з використанням найсучасніших технологій та матеріалів.
              </p>
            </div>

            <div className="info-tab">
              <h3>🚚 Доставка та оплата</h3>
              <p><strong>Доставка:</strong></p>
              <ul>
                <li>Нова Пошта - безкоштовно (1-2 дні)</li>
                <li>Укрпошта - безкоштовно (3-5 днів)</li>
                <li>Кур'єр по Києву - безкоштовно (в день замовлення)</li>
              </ul>
              <p><strong>Оплата:</strong></p>
              <ul>
                <li>Готівкою при отриманні</li>
                <li>Карткою онлайн</li>
                <li>Безготівковий розрахунок</li>
              </ul>
            </div>

            <div className="info-tab">
              <h3>↩️ Повернення та обмін</h3>
              <p>
                Ви можете повернути або обміняти товар протягом 14 днів з моменту покупки, 
                якщо він не був у використанні та збережено товарний вигляд.
              </p>
              <p>
                Гарантія: 12 місяців офіційної гарантії від виробника.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default ProductDetails;