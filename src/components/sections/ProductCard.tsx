'use client';

import {ProductType} from '@/context/ProductsProvider';
import { ReducerActionType, ReducerAction } from '@/context/CartProvider';

import { Product } from '@/lib/load-products';
import Link from 'next/link';
import  useCart from '@/hooks/useCart';
import { ShoppingCart } from 'lucide-react';
import { ReactElement, useState, memo} from 'react';


type PropsType = {
  product: ProductType,
  dispatch: React.ActionDispatch<[action: ReducerAction]>,
  REDUCER_ACTIONS: ReducerActionType,
  inCart: boolean,
}

const ProductCard = ({ product, dispatch, REDUCER_ACTIONS, inCart }: PropsType): ReactElement => {

  // In Next.js, static assets in public/ directory can be referenced with absolute paths
  // Try to use the product's REF for the image, fallback to p1.jpg if image doesn't exist
  const [img, setImg] = useState<string>(`/images/products/${product.REF}.jpg`);
  const [imageError, setImageError] = useState<boolean>(false);
  const [selectedQuantityRange, setSelectedQuantityRange] = useState<string>('20-50');
  
  const handleImageError = () => {
    if (!imageError) {
      setImageError(true);
      setImg('/images/products/p1.jpg'); // Fallback to p1.jpg
    }
  };

  /* Quantity ranges */
  const quantityRanges = [
    { label: '20-50', min: 20, max: 50 },
    { label: '50-100', min: 50, max: 100 },
    { label: '100-200', min: 100, max: 200 },
    { label: '200-500', min: 200, max: 500 },
    { label: '500+', min: 500, max: 1000 }
  ];

  const options: ReactElement[] = quantityRanges.map(range => {
    return <option key={range.label} value={range.label}>{range.label}</option>
  });

  const onQuantityRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedQuantityRange(e.target.value);
  };
  
  const onAddToCart = () => {
    dispatch({type: REDUCER_ACTIONS.ADD, payload: { product, interestedRange: selectedQuantityRange }});
  };

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

      <div className="flex flex-col gap-2 w-full">
        <select
          value={selectedQuantityRange}
          onChange={onQuantityRangeChange}
          className="border rounded px-2 py-1 text-sm"
          aria-label="quantity range"
        >
          {options}
        </select>
        
        <button
          onClick={onAddToCart}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center justify-center gap-2 transition"
        >
          <ShoppingCart size={18} />
          Agregar al carrito
        </button>
      </div>

    </article>

  return content;
}

function areProductCardsEqual({product: prevProduct, inCart: prevInCart}: PropsType, {product: nextProduct, inCart: nextInCart}: PropsType) {
  return Object.keys(prevProduct).every(key => {

    return prevProduct[key as keyof ProductType] === nextProduct[key as keyof ProductType];
  
  }) && prevInCart === nextInCart;
}

const MemoizedProductCard = memo(ProductCard, areProductCardsEqual);

export default MemoizedProductCard;
