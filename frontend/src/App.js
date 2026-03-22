import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import SearchResults from './pages/SearchResults';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute, { AdminRoute } from './components/PrivateRoute';
import Profile from './pages/Profile';
import AdminPanel from './pages/AdminPanel';
import ProductForm from './pages/ProductForm';
import './App.css';
import './animations.css'; 

function App() {
  return (
    <AuthProvider>
    <CartProvider>
      <Router>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Захищений маршрут - тільки для авторизованих */}
          <Route path="/profile" element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } />

          <Route path="/admin" element={
            <AdminRoute>
            <AdminPanel />
          </AdminRoute>
          } />


          {/* Створення товару - тільки для admin */}
          <Route path="/admin/product/new" element={
          <AdminRoute>
            <ProductForm />
          </AdminRoute>
          } />

          {/* Редагування товару - тільки для admin */}
          <Route path="/admin/product/:id" element={
          <AdminRoute>
            <ProductForm />
           </AdminRoute>
          } />
        </Routes>
        
      </Router>
    </CartProvider>
    </AuthProvider>
  );
}

export default App;