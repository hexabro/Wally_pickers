'use client';

import { useContext } from 'react';

import { CartContext } from '@/context/CartProvider';
import {useCartContextType} from '@/context/CartProvider';
import { useState, useEffect } from 'react';

import { Product } from '@/lib/load-products';

const useCart = () : useCartContextType =>{
  return useContext(CartContext);
}

export default useCart;

