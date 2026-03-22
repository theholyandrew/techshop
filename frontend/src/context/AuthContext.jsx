import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as apiLogin, register as apiRegister, getProfile } from '../api/api';

// Створюємо Context
const AuthContext = createContext();

// Hook для використання AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

// Provider компонент
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // При завантаженні - перевірити чи є токен в localStorage
  useEffect(() => {
    const loadUser = async () => {
      const savedToken = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');

      if (savedToken && savedUser) {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
        
        // Опціонально: перевірити чи токен валідний
        try {
          const userData = await getProfile(savedToken);
          setUser(userData);
        } catch (error) {
          // Токен не валідний - очистити
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setToken(null);
          setUser(null);
        }
      }

      setLoading(false);
    };

    loadUser();
  }, []);

  // Функція реєстрації
  const register = async (userData) => {
    try {
      const data = await apiRegister(userData);
      
      // Зберегти токен і користувача
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({
        _id: data._id,
        name: data.name,
        email: data.email,
        role: data.role,
      }));

      setToken(data.token);
      setUser({
        _id: data._id,
        name: data.name,
        email: data.email,
        role: data.role,
      });

      return data;
    } catch (error) {
      throw error;
    }
  };

  // Функція логіну
  const login = async (credentials) => {
    try {
      const data = await apiLogin(credentials);
      
      // Зберегти токен і користувача
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({
        _id: data._id,
        name: data.name,
        email: data.email,
        role: data.role,
      }));

      setToken(data.token);
      setUser({
        _id: data._id,
        name: data.name,
        email: data.email,
        role: data.role,
      });

      return data;
    } catch (error) {
      throw error;
    }
  };

  // Функція logout
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  // Перевірка чи користувач авторизований
  const isAuthenticated = () => {
    return !!token && !!user;
  };

  // Перевірка чи користувач admin
  const isAdmin = () => {
    return user && user.role === 'admin';
  };

  const value = {
    user,
    token,
    loading,
    register,
    login,
    logout,
    isAuthenticated,
    isAdmin,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};