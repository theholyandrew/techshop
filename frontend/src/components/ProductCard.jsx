import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Toast from './Toast';
import './ProductCard.css';

function ProductCard({ product }) {
  const { addToCart, isInCart } = useCart();
  const [showToast, setShowToast] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
    setShowToast(true);
  };

  return (
    <>
      {showToast && (
        <Toast
          message={`${product.name} додано в кошик!`}
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}

      <div className="product-card">
        
        <div className="product-image">
          <img src={product.image} alt={product.name} />
          {!product.inStock && (
            <div className="out-of-stock-badge">Немає в наявності</div>
          )}
        </div>

        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-category">{product.category}</p>
          
          <div className="product-rating">
            ⭐ {product.rating} / 5
          </div>

          <div className="product-footer">
            <p className="product-price">{product.price} ₴</p>
            
            <div className="product-actions">
              <Link to={`/product/${product._id}`} className="btn btn-secondary">
                Деталі
              </Link>
              <button 
                className={`btn ${isInCart(product._id) ? 'btn-success' : 'btn-primary'} btn-animated`}
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                {!product.inStock ? 'Немає' : isInCart(product._id) ? '✓ В кошику' : 'В кошик'}
              </button>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

export default ProductCard;