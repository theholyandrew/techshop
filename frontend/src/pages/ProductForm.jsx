import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getProductById, createProduct, updateProduct } from '../api/api';
import './ProductForm.css';

function ProductForm() {
  const navigate = useNavigate();
  const { id } = useParams(); // Якщо є ID - режим редагування
  const { token } = useAuth();

  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Смартфони',
    image: '',
    description: '',
    inStock: true,
    rating: 5,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Якщо режим редагування - завантажити товар
  useEffect(() => {
    if (isEditMode) {
      loadProduct();
    }
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const product = await getProductById(id);
      setFormData({
        name: product.name,
        price: product.price,
        category: product.category,
        image: product.image,
        description: product.description || '',
        inStock: product.inStock,
        rating: product.rating,
      });
    } catch (err) {
      setError('Помилка при завантаженні товару');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Валідація
    if (!formData.name || !formData.price || !formData.image) {
      setError('Будь ласка, заповніть всі обов\'язкові поля');
      return;
    }

    if (formData.price <= 0) {
      setError('Ціна має бути більше 0');
      return;
    }

    try {
      setLoading(true);

      // Конвертувати ціну в число
      const productData = {
        ...formData,
        price: Number(formData.price),
        rating: Number(formData.rating),
      };

      if (isEditMode) {
        // Оновити існуючий товар
        await updateProduct(id, productData, token);
        alert('Товар успішно оновлено!');
      } else {
        // Створити новий товар
        await createProduct(productData, token);
        alert('Товар успішно створено!');
      }

      // Перенаправити на адмін панель
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Помилка при збереженні товару');
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditMode) {
    return (
      <div className="product-form-page">
        <div className="container">
          <div className="loading">
            <div className="spinner"></div>
            <p>Завантаження товару...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-form-page">
      <div className="container">
        <div className="product-form-container">
          
          <h1>
            {isEditMode ? '✏️ Редагувати товар' : '➕ Додати товар'}
          </h1>

          {error && (
            <div className="error-message">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="product-form">
            
            <div className="form-group">
              <label>Назва товару: *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="iPhone 15 Pro Max"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Ціна (₴): *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="45999"
                  required
                  min="0"
                  step="0.01"
                />
              </div>

              <div className="form-group">
                <label>Категорія: *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="Смартфони">Смартфони</option>
                  <option value="Ноутбуки">Ноутбуки</option>
                  <option value="Планшети">Планшети</option>
                  <option value="Навушники">Навушники</option>
                  <option value="Годинники">Годинники</option>
                  <option value="Аксесуари">Аксесуари</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>URL зображення: *</label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                required
              />
              {formData.image && (
                <div className="image-preview">
                  <img src={formData.image} alt="Попередній перегляд" />
                </div>
              )}
            </div>

            <div className="form-group">
              <label>Опис:</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Детальний опис товару..."
                rows="4"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Рейтинг (1-5):</label>
                <input
                  type="number"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  min="1"
                  max="5"
                  step="0.1"
                />
              </div>

              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="inStock"
                    checked={formData.inStock}
                    onChange={handleChange}
                  />
                  <span>В наявності</span>
                </label>
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                onClick={() => navigate('/admin')}
                className="btn btn-secondary"
              >
                Скасувати
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? 'Збереження...' : isEditMode ? 'Оновити' : 'Створити'}
              </button>
            </div>

          </form>

        </div>
      </div>
    </div>
  );
}

export default ProductForm;