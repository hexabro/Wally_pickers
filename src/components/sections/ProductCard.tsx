'use client';

import {ProductType} from '@/context/ProductsProvider';
import { ReducerActionType, ReducerAction } from '@/context/CartProvider';
import Image from 'next/image';

import { ReactElement, useState, memo} from 'react';
import { Container, ShoppingBag, ShoppingBasket, ShoppingCart } from 'lucide-react';

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
  const [selectedQuantity, setSelectedQuantity] = useState<number | ''>(0);
  
  const handleImageError = () => {
    if (!imageError) {
      setImageError(true);
      setImg('/images/img-error.jpg'); // Fallback to img-error.jpg
    }
  };

  /* Quantity options from 0 to infinity */
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const parsedValue = parseInt(value);
    const newQuantity = value === '' ? 0 : Math.max(0, parsedValue || 0);
    setSelectedQuantity(value === '' ? '' : newQuantity);
    
    // Update cart in real time
    if (newQuantity === 0) {
      dispatch({type: REDUCER_ACTIONS.REMOVE, payload: { product, quantity: 0 }});
    } else if (inCart) {
      dispatch({type: REDUCER_ACTIONS.UPDATE_QUANTITY, payload: { product, quantity: newQuantity }});
    } else {
      dispatch({type: REDUCER_ACTIONS.ADD, payload: { product, quantity: newQuantity }});
    }
  };

  const increaseQuantity = () => {
    const newQuantity = (typeof selectedQuantity === 'number' ? selectedQuantity : 0) + 1;
    setSelectedQuantity(newQuantity);
    // Update cart in real time
    if (inCart) {
      dispatch({type: REDUCER_ACTIONS.UPDATE_QUANTITY, payload: { product, quantity: newQuantity }});
    } else {
      dispatch({type: REDUCER_ACTIONS.ADD, payload: { product, quantity: newQuantity }});
    }
  };

  const decreaseQuantity = () => {
    const newQuantity = Math.max(0, (typeof selectedQuantity === 'number' ? selectedQuantity : 0) - 1);
    setSelectedQuantity(newQuantity);
    
    // Update cart in real time
    if (newQuantity === 0) {
      dispatch({type: REDUCER_ACTIONS.REMOVE, payload: { product, quantity: 0 }});
    } else if (inCart) {
      dispatch({type: REDUCER_ACTIONS.UPDATE_QUANTITY, payload: { product, quantity: newQuantity }});
    } else {
      dispatch({type: REDUCER_ACTIONS.ADD, payload: { product, quantity: newQuantity }});
    }
  };

  const onRemoveFromCart = () => {
    setSelectedQuantity(0);
    dispatch({type: REDUCER_ACTIONS.REMOVE, payload: { product, quantity: 0 }});
  };

  const content = 
    <article className="product-card bg-white rounded-lg shadow-lg p-6 flex flex-col items-center transition hover:shadow-xl">
      
      <h3 className="text-xl font-bold mb-4 text-center text-gray-800">
        {product.NOMBRE}
      </h3>

      <Image
        src={img}
        width={160}
        height={160}
        alt={product.NOMBRE}
        className="product-img w-40 h-40 object-cover rounded-lg mb-4"
        onError={handleImageError}
      />

      {/* Product details */}
      <div className="text-left w-full mb-4">
        <p className="text-sm text-gray-700 mb-1">
          <span className="font-semibold">Marca:</span> {product.MARCA}
        </p>
        <p className="text-sm text-gray-700 mb-1">
          <span className="font-semibold">Formato:</span> {product.FORMATO}
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Unidades por caja:</span> {product.UDS_CAJA}
        </p>
      </div>

      <div className="flex items-center gap-2 mb-4 h-5 self-start">
        <input
          type="checkbox"
          checked={inCart}
          onChange={onRemoveFromCart}
          className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2 cursor-pointer"
        />
        <span className="text-sm text-gray-700">En el container</span>
      </div>

      <div className="flex flex-col gap-3 justify-start w-full">
        <div className="flex flex-col gap-2">
          <label htmlFor="quantity" className="text-sm font-medium text-gray-800">
            Cantidad:
          </label>
          <div className="flex items-center border rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={decreaseQuantity}
              disabled={typeof selectedQuantity === 'number' && selectedQuantity <= 0}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              −
            </button>
            <input
              id="quantity"
              type="number"
              min="0"
              max="50"
              value={selectedQuantity === '' ? '' : selectedQuantity}
              onChange={handleQuantityChange}
              className="flex-1 px-4 py-2 text-center border-0 focus:outline-none focus:ring-0 appearance-none"
              style={{ MozAppearance: 'textfield' }} // Hide spinner in Firefox
            />
            <button
              type="button"
              onClick={increaseQuantity}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              +
            </button>
          </div>
        </div>
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
