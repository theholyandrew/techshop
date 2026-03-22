import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getAllProducts, deleteProduct } from '../api/api';
import './AdminPanel.css';

function AdminPanel() {
  const { token } = useAuth();
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Завантажити товари
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getAllProducts();
      setProducts(data);
      setError('');
    } catch (err) {
      setError('Помилка при завантаженні товарів');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Видалити товар
  const handleDelete = async (id, name) => {
    if (!window.confirm(`Видалити товар "${name}"?`)) {
      return;
    }

    try {
      await deleteProduct(id, token);
      // Оновити список після видалення
      setProducts(products.filter(p => p._id !== id));
      alert('Товар успішно видалено!');
    } catch (err) {
      alert('Помилка при видаленні товару: ' + err.message);
    }
  };

  if (loading) {
    return (
      <div className="admin-panel">
        <div className="container">
          <div className="loading">
            <div className="spinner"></div>
            <p>Завантаження товарів...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <div className="container">
        
        <div className="admin-header">
          <h1>⚙️ Адмін панель</h1>
          <Link to="/admin/product/new" className="btn btn-primary">
            ➕ Додати товар
          </Link>
        </div>

        {error && (
          <div className="error-message">{error}</div>
        )}

        <div className="products-table-container">
          <table className="products-table">
            <thead>
              <tr>
                <th>Фото</th>
                <th>Назва</th>
                <th>Ціна</th>
                <th>Категорія</th>
                <th>В наявності</th>
                <th>Рейтинг</th>
                <th>Дії</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '40px' }}>
                    Товарів поки немає. Додайте перший!
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product._id}>
                    <td>
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="product-thumb"
                      />
                    </td>
                    <td>{product.name}</td>
                    <td>{product.price} ₴</td>
                    <td>{product.category}</td>
                    <td>
                      <span className={`badge ${product.inStock ? 'in-stock' : 'out-stock'}`}>
                        {product.inStock ? '✅ Так' : '❌ Ні'}
                      </span>
                    </td>
                    <td>⭐ {product.rating}</td>
                    <td>
                      <div className="action-buttons">
                        <Link 
                          to={`/admin/product/${product._id}`}
                          className="btn btn-secondary btn-small"
                        >
                          ✏️ Редагувати
                        </Link>
                        <button
                          onClick={() => handleDelete(product._id, product.name)}
                          className="btn btn-danger btn-small"
                        >
                          🗑️ Видалити
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default AdminPanel;