'use client';

import { useContext } from 'react';

import  ProductsContext  from '@/context/ProductsProvider';
import {useProductsContextType} from '@/context/ProductsProvider';
import { useState, useEffect } from 'react';

import { Product } from '@/lib/load-products';

const useProducts = () : useProductsContextType =>{
  return useContext(ProductsContext);
}

export default useProducts;

