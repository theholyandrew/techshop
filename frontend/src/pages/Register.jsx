import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Register.css';

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Валідація
    if (!name || !email || !password || !confirmPassword) {
      setError('Будь ласка, заповніть всі поля');
      return;
    }

    if (password !== confirmPassword) {
      setError('Паролі не співпадають');
      return;
    }

    if (password.length < 6) {
      setError('Пароль має бути мінімум 6 символів');
      return;
    }

    try {
      setLoading(true);
      await register({ name, email, password });
      
      // Успішна реєстрація - перенаправити на головну
      navigate('/');
    } catch (err) {
      setError(err.message || 'Помилка при реєстрації. Спробуйте інший email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="container">
        <div className="register-container">
          
          <h1>✨ Реєстрація</h1>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="register-form">
            
            <div className="form-group">
              <label>Ім'я:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ваше ім'я"
                required
              />
            </div>

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
                placeholder="Мінімум 6 символів"
                required
                minLength="6"
              />
            </div>

            <div className="form-group">
              <label>Підтвердіть пароль:</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Введіть пароль ще раз"
                required
                minLength="6"
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary btn-full"
              disabled={loading}
            >
              {loading ? 'Реєстрація...' : 'Зареєструватись'}
            </button>

          </form>

          <p className="login-link">
            Вже є акаунт? <Link to="/login">Увійти</Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Register;