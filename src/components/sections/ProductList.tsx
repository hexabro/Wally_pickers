import React, { ReactElement } from 'react'
import useProducts from '@/hooks/useProducts';
import useProductsContextType from '@/context/ProductsProvider';
import useCart from '@/hooks/useCart';
import ProductCard from './ProductCard';
import { main } from 'motion/react-client';

export const ProductList = () => {
  const { dispatch, REDUCER_ACTIONS, cart } = useCart(); 
  const { products } = useProducts() ;

  let pageContent: ReactElement | ReactElement[] = <p> Loading ... </p>
  if (products?.length) {
    pageContent = products.map(product => {
      const inCart: boolean = cart.some(item => item.product.REF === product.REF)

      return (
        <ProductCard key={product.REF} 
          product={product}
          dispatch={dispatch} 
          REDUCER_ACTIONS = {REDUCER_ACTIONS} 
          inCart = {inCart}
           />
      )
    });
  }

  const content = (
    <main className="main main--products">
      <div className="products-grid">
        {pageContent}
      </div>
    </main>
  );

  return content;
}

export default ProductList;
