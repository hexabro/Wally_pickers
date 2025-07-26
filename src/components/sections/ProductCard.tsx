'use client';

import {ProductType} from '@/context/ProductsProvider';
import { ReducerActionType, ReducerAction } from '@/context/CartProvider';

import { Product } from '@/lib/load-products';
import Link from 'next/link';
import  useCart from '@/hooks/useCart';
import { ShoppingCart } from 'lucide-react';
import { ReactElement, useState } from 'react';


type PropsType = {
  product: ProductType,
  dispatch: React.ActionDispatch<[action: ReducerAction]>,
  REDUCER_ACTIONS: ReducerActionType,
  inCart: boolean,
}

export default function ProductCard({ product, dispatch, REDUCER_ACTIONS, inCart }: PropsType): ReactElement {
  
  // In Next.js, static assets in public/ directory can be referenced with absolute paths
  // Try to use the product's REF for the image, fallback to p1.jpg if image doesn't exist
  const [img, setImg] = useState<string>(`/images/products/$p1.jpg`);
  const [imageError, setImageError] = useState<boolean>(false);
  
  const handleImageError = () => {
    if (!imageError) {
      setImageError(true);
      setImg('/images/products/p1.jpg'); // Fallback to p1.jpg
    }
  };
  
  const onAddToCart = ()  => dispatch({type: REDUCER_ACTIONS.ADD, payload: { product, quantity: 1 }});

  const ItemInCart = inCart ? ' ✅ Producto añadido' : null;

  const content = 
    <article className="product-card bg-white rounded-lg shadow-md p-4 flex flex-col items-center transition hover:shadow-lg">
      
      <h3 className="text-lg font-semibold mb-2 text-center">
        {product.NOMBRE}
      </h3>

      <img
        src={img}
        alt={product.NOMBRE}
        className="product-img w-32 h-32 object-cover rounded-md mb-3 border"
        onError={handleImageError}
      />

      <p className="product-description text-sm text-green-600 mb-2 h-5">
        {ItemInCart}
      </p>
      
      <button
        onClick={onAddToCart}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2 transition"
        >
          <ShoppingCart size={18} />
          Agregar al carrito
      </button>

    </article>

  return content;
}
