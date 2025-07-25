"use client"
import { useState } from 'react';

export function useCart() {
  const [cart, setCart] = useState<{ id: string; name: string; quantity: number }[]>([]);

  const addToCart = (product: { id: string; name: string }) => {
    setCart(prev => {
      const existing = prev.find(p => p.id === product.id);
      if (existing) {
        return prev.map(p => p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p);
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(p => p.id !== productId));
  };

  const clearCart = () => setCart([]);

  return { cart, addToCart, removeFromCart, clearCart };
}
