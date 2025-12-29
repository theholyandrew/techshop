import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

// Хук для використання контексту в інших компонентах
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

// Provider - обгортка яка надає доступ до кошика всім компонентам
export const CartProvider = ({ children }) => {
  // Стан кошика - масив товарів
  // Спробуємо завантажити з localStorage при старті
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('techshop-cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      return [];
    }
  });

  // Зберігаємо кошик в localStorage при кожній зміні
  useEffect(() => {
    try {
      localStorage.setItem('techshop-cart', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cartItems]);

 
  const addToCart = (product) => {
    setCartItems(prevItems => {
      // Перевіряємо чи товар вже є в кошику
      const existingItem = prevItems.find(item => item._id === product._id);
      
      if (existingItem) {
        // Якщо є - збільшуємо кількість
        return prevItems.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Якщо немає - додаємо новий товар з quantity = 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };



  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item._id !== productId));
  };

 
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      // Якщо кількість менше 1 - видаляємо товар
      removeFromCart(productId);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item._id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  
  const clearCart = () => {
    setCartItems([]);
  };

  // Підрахунок загальної кількості товарів
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Підрахунок загальної суми
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Перевірка чи товар вже в кошику
  const isInCart = (productId) => {
    return cartItems.some(item => item._id === productId);
  };

  // Отримання кількості конкретного товару
  const getItemQuantity = (productId) => {
    const item = cartItems.find(item => item._id === productId);
    return item ? item.quantity : 0;
  };

  // Значення які будуть доступні всім компонентам
  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    isInCart,
    getItemQuantity
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};