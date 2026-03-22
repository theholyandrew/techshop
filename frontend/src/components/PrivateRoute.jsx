import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// ========================================
// PrivateRoute - для авторизованих
// ========================================
function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '60vh' 
      }}>
        <div className="spinner"></div>
        <p style={{ marginLeft: '15px', fontSize: '18px' }}>Завантаження...</p>
      </div>
    );
  }

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

// ========================================
// AdminRoute - тільки для admin
// ========================================
export function AdminRoute({ children }) {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '60vh' 
      }}>
        <div className="spinner"></div>
        <p style={{ marginLeft: '15px', fontSize: '18px' }}>Завантаження...</p>
      </div>
    );
  }

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin()) {
    return (
      <div style={{ 
        padding: '100px 20px', 
        textAlign: 'center',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>🚫</h1>
        <h2>Доступ заборонено</h2>
        <p style={{ marginTop: '20px', color: '#666' }}>
          Ця сторінка доступна тільки для адміністраторів.
        </p>
        <Link to="/" className="btn btn-primary" style={{ marginTop: '30px', display: 'inline-block' }}>
          Повернутись на головну
        </Link>
      </div>
    );
  }

  return children;
}

export default PrivateRoute;