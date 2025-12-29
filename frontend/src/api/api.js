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


export const createProduct = async (productData) => {
  try {
    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    
    if (!response.ok) {
      throw new Error('Помилка при створенні товару');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Помилка createProduct:', error);
    throw error;
  }
};


export const updateProduct = async (id, productData) => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    
    if (!response.ok) {
      throw new Error('Помилка при оновленні товару');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Помилка updateProduct:', error);
    throw error;
  }
};


export const deleteProduct = async (id) => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Помилка при видаленні товару');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Помилка deleteProduct:', error);
    throw error;
  }
};