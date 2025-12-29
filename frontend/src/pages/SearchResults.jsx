import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getAllProducts } from '../api/api';
import { searchProducts, sortProducts, filterByPrice, filterByStock } from '../utils/searchUtils';
import './SearchResults.css';

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Завантаження товарів з API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Помилка:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Пошук і фільтрація при зміні параметрів
  useEffect(() => {
    if (!products.length) return;  // Не фільтруємо якщо товарів ще немає

    let results = searchProducts(products, query);
    results = filterByPrice(results, Number(minPrice), Number(maxPrice));
    results = filterByStock(results, inStockOnly);
    results = sortProducts(results, sortBy);

    setFilteredProducts(results);
  }, [query, sortBy, minPrice, maxPrice, inStockOnly, products]); 

  const resetFilters = () => {
    setSortBy('');
    setMinPrice('');
    setMaxPrice('');
    setInStockOnly(false);
  };

  
  if (loading) {
    return (
      <div className="search-results-page">
        <div className="container">
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Завантаження...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="search-results-page">
      <div className="container">

        <div className="breadcrumbs">
          <Link to="/">Головна</Link>
          <span> / </span>
          <span>Пошук</span>
        </div>

        <div className="search-header">
          <h1>
            Результати пошуку {query && (
              <>за запитом: <span className="search-query">"{query}"</span></>
            )}
          </h1>
          <p className="results-count">
            Знайдено: <strong>{filteredProducts.length}</strong> товарів
          </p>
        </div>

        <div className="filters-section">
          
          <div className="filter-group">
            <label>Сортування:</label>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="">За замовчуванням</option>
              <option value="price-asc">Ціна: від дешевих</option>
              <option value="price-desc">Ціна: від дорогих</option>
              <option value="name-asc">Назва: А-Я</option>
              <option value="name-desc">Назва: Я-А</option>
              <option value="rating">За рейтингом</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Ціна:</label>
            <div className="price-range">
              <input
                type="number"
                placeholder="Від"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="price-input"
              />
              <span>—</span>
              <input
                type="number"
                placeholder="До"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="price-input"
              />
            </div>
          </div>

          <div className="filter-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
              />
              <span>Тільки в наявності</span>
            </label>
          </div>

          <button onClick={resetFilters} className="btn btn-secondary reset-btn">
            Скинути фільтри
          </button>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="products-grid">
            {filteredProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <h2>😔 Нічого не знайдено</h2>
            <p>Спробуйте змінити пошуковий запит або фільтри</p>
            <Link to="/products" className="btn btn-primary">
              Переглянути всі товари
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}

export default SearchResults;