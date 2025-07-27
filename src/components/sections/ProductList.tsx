import React, { ReactElement } from 'react'
import useProducts from '@/hooks/useProducts';
import { ProductType } from '@/context/ProductsProvider';
import useCart from '@/hooks/useCart';
import ProductCard from './ProductCard';
import { main } from 'motion/react-client';

type ProductListProps = {
  filteredProducts?: ProductType[];
};

export const ProductList = ({ filteredProducts }: ProductListProps) => {
  const { dispatch, REDUCER_ACTIONS, cart } = useCart(); 
  const { products } = useProducts();

  // Use filtered products if provided, otherwise use all products
  const productsToShow = filteredProducts || products;

  let pageContent: ReactElement | ReactElement[] = <p> Loading ... </p>
  if (productsToShow?.length) {
    pageContent = productsToShow.map(product => {
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
