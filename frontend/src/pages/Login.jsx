import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Валідація
    if (!email || !password) {
      setError('Будь ласка, заповніть всі поля');
      return;
    }

    try {
      setLoading(true);
      await login({ email, password });
      
      // Успішний вхід - перенаправити на головну
      navigate('/');
    } catch (err) {
      setError(err.message || 'Помилка при вході. Перевірте дані.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="container">
        <div className="login-container">
          
          <h1>🔐 Вхід</h1>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                required
              />
            </div>

            <div className="form-group">
              <label>Пароль:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Введіть пароль"
                required
                minLength="6"
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary btn-full"
              disabled={loading}
            >
              {loading ? 'Вхід...' : 'Увійти'}
            </button>

          </form>

          <p className="register-link">
            Ще немає акаунту? <Link to="/register">Зареєструватись</Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Login;