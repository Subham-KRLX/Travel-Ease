import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStoredCart();
  }, []);

  const loadStoredCart = async () => {
    try {
      const storedCart = await AsyncStorage.getItem('travelease_cart');
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    }
    setLoading(false);
  };

  const saveCart = async (items) => {
    try {
      await AsyncStorage.setItem('travelease_cart', JSON.stringify(items));
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  };

  const addToCart = async (item) => {
    const newItems = [...cartItems];
    const existingItem = newItems.find(cartItem => 
      cartItem.id === item.id && cartItem.type === item.type
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      newItems.push({ ...item, quantity: 1 });
    }

    setCartItems(newItems);
    await saveCart(newItems);
  };

  const removeFromCart = async (id, type) => {
    const newItems = cartItems.filter(item => 
      !(item.id === id && item.type === type)
    );
    setCartItems(newItems);
    await saveCart(newItems);
  };

  const updateQuantity = async (id, type, quantity) => {
    if (quantity <= 0) {
      await removeFromCart(id, type);
      return;
    }

    const newItems = cartItems.map(item =>
      item.id === id && item.type === type
        ? { ...item, quantity }
        : item
    );
    
    setCartItems(newItems);
    await saveCart(newItems);
  };

  const clearCart = async () => {
    setCartItems([]);
    await saveCart([]);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const isInCart = (id, type) => {
    return cartItems.some(item => item.id === id && item.type === type);
  };

  const getItemQuantity = (id, type) => {
    const item = cartItems.find(item => item.id === id && item.type === type);
    return item ? item.quantity : 0;
  };

  const value = {
    cartItems,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
    isInCart,
    getItemQuantity
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
