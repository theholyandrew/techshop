import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Cart.css';

function Cart() {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getTotalPrice 
  } = useCart();

  
  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <div className="container">
          <div className="empty-cart-content">
            <h2>🛒 Ваш кошик порожній</h2>
            <p>Додайте товари щоб продовжити покупки</p>
            <Link to="/products" className="btn btn-primary">
              Перейти до каталогу
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
  <div className="cart-page">
    <div className="container">
      
      <div className="cart-header">
        <h1>🛒 Кошик</h1>
        <button onClick={clearCart} className="btn btn-secondary">
          Очистити кошик
        </button>
      </div>

      <div className="cart-content">
        
        <div className="cart-items">
          {cartItems.map(item => (
            <div key={item._id} className="cart-item">
              
              <div className="cart-item-image">
                <img src={item.image} alt={item.name} />
              </div>

              <div className="cart-item-info">
                <Link to={`/product/${item._id}`} className="cart-item-name">
                  {item.name}
                </Link>
                <p className="cart-item-category">{item.category}</p>
                <p className="cart-item-price">{item.price} ₴</p>
              </div>

              <div className="cart-item-quantity">
                <button 
                  onClick={() => updateQuantity(item._id, item.quantity - 1)}
                  className="quantity-btn"
                >
                  −
                </button>
                <span className="quantity-value">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  className="quantity-btn"
                >
                  +
                </button>
              </div>

              <div className="cart-item-total">
                <p>{item.price * item.quantity} ₴</p>
              </div>

              <button 
                onClick={() => removeFromCart(item._id)}
                className="cart-item-remove"
                title="Видалити"
              >
                ✕
              </button>

            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h3>Підсумок замовлення</h3>
          
          <div className="summary-row">
            <span>Товарів:</span>
            <span>{cartItems.reduce((sum, item) => sum + item.quantity, 0)} шт</span>
          </div>

          <div className="summary-row">
            <span>Сума:</span>
            <span>{getTotalPrice()} ₴</span>
          </div>

          <div className="summary-row">
            <span>Доставка:</span>
            <span className="free-delivery">Безкоштовно</span>
          </div>

          <div className="summary-divider"></div>

          <div className="summary-total">
            <span>До сплати:</span>
            <span>{getTotalPrice()} ₴</span>
          </div>

          <Link to="/checkout" className="btn btn-primary btn-checkout">
            Оформити замовлення
          </Link>

          <Link to="/products" className="continue-shopping">
            ← Продовжити покупки
          </Link>
        </div>

      </div>

    </div>
  </div>
);
}

export default Cart;