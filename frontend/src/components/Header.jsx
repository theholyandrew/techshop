import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Header.css';

function Header() {
  const navigate = useNavigate();
  const { getTotalItems } = useCart();
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          
          {/* Логотип */}
          <Link to="/" className="logo">
            TechShop
          </Link>

          {/* Пошук */}
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Пошук товарів..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-btn">
              🔍
            </button>
          </form>

          {/* Навігація */}
          <nav className="nav">
            <Link to="/" className="nav-link">Головна</Link>
            <Link to="/products" className="nav-link">Каталог</Link>
            
            {/* Показати Admin Panel тільки для admin */}
            {isAdmin() && (
              <Link to="/admin" className="nav-link admin-link">
                ⚙️ Адмін
              </Link>
            )}

            {/* Кошик */}
            <Link to="/cart" className="cart-link">
              🛒 Кошик
              {getTotalItems() > 0 && (
                <span className="cart-badge">{getTotalItems()}</span>
              )}
            </Link>

            {/* Авторизація */}
            {isAuthenticated() ? (
            <div className="user-menu">
              <Link to="/profile" className="user-name">
                👤 {user?.name}
               </Link>
             <button onClick={handleLogout} className="btn btn-secondary btn-small">
               Вийти
              </button>
             </div>
            ) : (
            <Link to="/login" className="btn btn-primary btn-small">
               Увійти
            </Link>
          )}
          </nav>

        </div>
      </div>
    </header>
  );
}

export default Header;