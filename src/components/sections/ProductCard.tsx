'use client';

import {ProductType} from '@/context/ProductsProvider';
import { ReducerActionType, ReducerAction } from '@/context/CartProvider';
import Image from 'next/image';

import { ReactElement, useState, memo} from 'react';
import { Container, ShoppingBag, ShoppingBasket, ShoppingCart, Expand, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  
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

  const content = (
    <>
      <article className="product-card bg-white rounded-lg shadow-lg p-6 flex flex-col items-center transition hover:shadow-xl relative">

        <h3 className="text-xl font-bold mb-4 text-center text-gray-800 ">
          {product.NOMBRE}
        </h3>

      <motion.div
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="cursor-pointer"
        onClick={() => setIsPopupOpen(true)}
        title="Ver más información"
      >
        <Image
          src={img}
          width={160}
          height={160}
          alt={product.NOMBRE}
          className="product-img w-40 h-40 object-cover rounded-lg mb-4 transition-transform"
          onError={handleImageError}
        />
      </motion.div>

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
              className="px-4 py-2 bg-[#4b68e8] hover:bg-[#6581ff] disabled:cursor-not-allowed transition-colors"
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
              className="px-4 py-2 bg-[#4b68e8] hover:bg-[#6581ff]  transition-colors"
            >
              +
            </button>
          </div>
        </div>
      </div>

      </article>

      {/* Popup Modal */}
      <AnimatePresence>
        {isPopupOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0  bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-[60] p-4"
            onClick={() => setIsPopupOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b bg-gray-50 flex-shrink-0">
                <h2 className="text-2xl font-bold text-gray-800">
                  {product.NOMBRE}
                </h2>
                {/* PRODUCT NAV INFO */}
                <div className="flex flex-wrap gap-3 ">
                  <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                    {product.MARCA}
                  </span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {product.CATEGORIA}
                  </span>
                  {product.TIPO && (
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      {product.TIPO}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setIsPopupOpen(false)}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-full transition-colors"
                  title="Cerrar"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col md:flex-row gap-6 flex-1 overflow-y-auto">
                {/* Left Column - Image and Details */}
                <div className="flex-1">
                  <Image
                    src={img}
                    width={300}
                    height={300}
                    alt={product.NOMBRE}
                    className="w-full max-w-sm h-64 object-cover rounded-lg mb-6 mx-auto"
                    onError={handleImageError}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold">Marca:</span> {product.MARCA}
                      </p>
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold">Categoría:</span> {product.CATEGORIA}
                      </p>
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold">Tipo:</span> {product.TIPO}
                      </p>
                    </div>
                    <div className="space-y-3">
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold">Formato:</span> {product.FORMATO}
                      </p>
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold">Unidades por caja:</span> {product.UDS_CAJA}
                      </p>
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold">REF:</span> {product.REF}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Column - Description and Controls */}
                <div className="flex-1 flex flex-col">
                  {/* Description */}
                  <div className="flex-1 mb-6">
                    <h3 className="font-semibold text-gray-800 mb-3 text-lg">Descripción</h3>
                    <div className="overflow-y-auto">
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {product.DESCRIPCION || 'No hay descripción disponible para este producto.'}
                      </p>
                    </div>
                  </div>

                  {/* Container Controls */}
                  <div className="border-t pt-6 space-y-4">
                    {/* Container checkbox */}
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={inCart}
                        onChange={onRemoveFromCart}
                        className="w-5 h-5 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2 cursor-pointer"
                      />
                      <span className="text-base font-medium text-gray-800">En el container</span>
                    </div>

                    {/* Quantity controls */}
                    <div className="space-y-3">
                      <label htmlFor="popup-quantity" className="text-base font-medium text-gray-800 block">
                        Cantidad:
                      </label>
                      <div className="flex items-center border-2 rounded-lg overflow-hidden max-w-xs">
                        <button
                          type="button"
                          onClick={decreaseQuantity}
                          disabled={typeof selectedQuantity === 'number' && selectedQuantity <= 0}
                          className="px-6 py-3 text-white bg-[#4b68e8] hover:bg-[#6581ff] disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors text-lg font-semibold"
                        >
                          −
                        </button>
                        <input
                          id="popup-quantity"
                          type="number"
                          min="0"
                          max="50"
                          value={selectedQuantity === '' ? '' : selectedQuantity}
                          onChange={handleQuantityChange}
                          className="flex-1 px-6 py-3 text-center border-0 focus:outline-none focus:ring-0 appearance-none text-lg font-semibold"
                          style={{ MozAppearance: 'textfield' }}
                        />
                        <button
                          type="button"
                          onClick={increaseQuantity}
                          className="px-6 py-3 bg-[var(--principal)] text-white hover:bg-[#6581ff] disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors text-lg font-semibold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  return content;
}

function areProductCardsEqual({product: prevProduct, inCart: prevInCart}: PropsType, {product: nextProduct, inCart: nextInCart}: PropsType) {
  return Object.keys(prevProduct).every(key => {

    return prevProduct[key as keyof ProductType] === nextProduct[key as keyof ProductType];
  
  }) && prevInCart === nextInCart;
}

const MemoizedProductCard = memo(ProductCard, areProductCardsEqual);

export default MemoizedProductCard;
