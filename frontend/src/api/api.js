const API_URL = 'http://localhost:5000/api';

// ========================================
// PRODUCTS API
// ========================================


export const getAllProducts = async () => {
  try {
    const response = await fetch(`${API_URL}/products`);
    
    if (!response.ok) {
      throw new Error('Помилка при завантаженні товарів');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Помилка getAllProducts:', error);
    throw error;
  }
};


export const getProductById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`);
    
    if (!response.ok) {
      throw new Error('Товар не знайдено');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Помилка getProductById:', error);
    throw error;
  }
};


export const createProduct = async (productData, token) => {
  try {
    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(productData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Помилка при створенні товару');
    }

    return data;
  } catch (error) {
    console.error('Помилка createProduct:', error);
    throw error;
  }
};


export const updateProduct = async (id, productData, token) => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(productData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Помилка при оновленні товару');
    }

    return data;
  } catch (error) {
    console.error('Помилка updateProduct:', error);
    throw error;
  }
};



export const deleteProduct = async (id, token) => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Помилка при видаленні товару');
    }

    return data;
  } catch (error) {
    console.error('Помилка deleteProduct:', error);
    throw error;
  }
};


// ========================================
// AUTH API
// ========================================

// Реєстрація користувача
export const register = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Помилка при реєстрації');
    }

    return data;
  } catch (error) {
    console.error('Помилка register:', error);
    throw error;
  }
};

// Логін користувача
export const login = async (credentials) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Помилка при вході');
    }

    return data;
  } catch (error) {
    console.error('Помилка login:', error);
    throw error;
  }
};

// Отримати профіль користувача (потрібен токен)
export const getProfile = async (token) => {
  try {
    const response = await fetch(`${API_URL}/auth/profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Помилка при отриманні профілю');
    }

    return data;
  } catch (error) {
    console.error('Помилка getProfile:', error);
    throw error;
  }
};