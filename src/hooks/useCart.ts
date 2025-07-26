'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/lib/load-products';

export interface CartItem extends Product {
  quantity: number;
}

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Cargar carrito desde localStorage al montar el componente
  useEffect(() => {
    const savedCart = localStorage.getItem('wally-cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('wally-cart', JSON.stringify(cartItems));
    }
  }, [cartItems, isLoaded]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.REF === product.REF);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.REF === product.REF
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  const removeFromCart = (ref: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.REF !== ref));
  };

  const updateQuantity = (ref: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(ref);
      return;
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.REF === ref ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotal = () => {
    // Si tienes precios en tus productos, puedes calcular el total aquí
    // return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    return cartItems.length; // Por ahora solo devolvemos la cantidad de productos únicos
  };

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getCartTotal,
    isLoaded
  };
};
