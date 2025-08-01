'use client';

import { getProductByRef } from '@/lib/load-products';
import { notFound } from 'next/navigation';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Product } from '@/lib/load-products';
import CartSidebar from '@/components/nav/CartSidebar';
import { useProducts } from '@/context/ProductsProvider';
import useCart from '@/hooks/useCart';

export default function Page({
  params,
}: {
  params: Promise<{ REF: string }>;
}) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedQuantity, setSelectedQuantity] = useState<number | ''>(0);
  const [viewCart, setViewCart] = useState(false);
  
  const { dispatch, REDUCER_ACTIONS, cart } = useCart();
  
  // Check if product is in cart and get current quantity
  const cartItem = product ? cart.find(item => item.product.REF === product.REF) : null;
  const inCart = !!cartItem;
  const currentQuantity = cartItem?.quantity || 0;

  // Update selectedQuantity when cart changes
  useEffect(() => {
    setSelectedQuantity(currentQuantity);
  }, [currentQuantity]);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const { REF } = await params;
        const productData = await getProductByRef(REF);
        setProduct(productData);
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [params]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!product) return;
    
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
    if (!product) return;
    
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
    if (!product) return;
    
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
    if (!product) return;
    
    setSelectedQuantity(0);
    dispatch({type: REDUCER_ACTIONS.REMOVE, payload: { product, quantity: 0 }});
  };

  if (loading) {
    return (
      <main className="max-w-2xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="w-full h-64 bg-gray-200 rounded mb-6"></div>
          <div className="h-8 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded mb-4"></div>
        </div>
      </main>
    );
  }

  if (!product) return notFound();

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Link 
            href="/catalogo" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al catálogo
          </Link>
          
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>Catálogo</span>
            <span>/</span>
            <span>{product.CATEGORIA}</span>
            <span>/</span>
            <span className="text-gray-900 font-medium">{product.NOMBRE}</span>
          </div>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Left Column - Image */}
            <div className="relative">
              <div className="aspect-square bg-gray-100 overflow-hidden">
                <img
                  src={`/images/products/${product.REF}.jpg`}
                  alt={product.NOMBRE}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.src = '/images/img-error.jpg';
                  }}
                />
              </div>
            </div>

            {/* Right Column - Product Info */}
            <div className="p-8 flex flex-col">
              
              {/* Product Header */}
              <div className="mb-6">
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  {product.NOMBRE}
                </h1>
                
                <div className="flex flex-wrap gap-3 mb-4">
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
              </div>

              {/* Product Description */}
              <div className="mb-8 flex-grow">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Descripción</h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {product.DESCRIPCION || 'No hay descripción disponible para este producto.'}
                </p>
              </div>

              {/* Product Details Grid */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Detalles del Producto</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <dt className="text-sm font-medium text-gray-500 mb-1">Referencia</dt>
                    <dd className="text-lg font-semibold text-gray-900">{product.REF}</dd>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <dt className="text-sm font-medium text-gray-500 mb-1">Marca</dt>
                    <dd className="text-lg font-semibold text-gray-900">{product.MARCA}</dd>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <dt className="text-sm font-medium text-gray-500 mb-1">Formato</dt>
                    <dd className="text-lg font-semibold text-gray-900">{product.FORMATO}</dd>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <dt className="text-sm font-medium text-gray-500 mb-1">Unidades por caja</dt>
                    <dd className="text-lg font-semibold text-gray-900">{product.UDS_CAJA}</dd>
                  </div>
                </div>
              </div>

              {/* Cart Controls */}
              <div className="mt-auto space-y-4">
                {/* Container checkbox */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={inCart}
                    onChange={onRemoveFromCart}
                    className="w-5 h-5 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2 cursor-pointer"
                  />
                  <span className="text-lg font-medium text-gray-800">En el container</span>
                </div>

                {/* Quantity controls */}
                <div className="space-y-3">
                  <label htmlFor="quantity" className="text-lg font-medium text-gray-800 block">
                    Cantidad:
                  </label>
                  <div className="flex items-center border-2 rounded-lg overflow-hidden max-w-xs">
                    <button
                      type="button"
                      onClick={decreaseQuantity}
                      disabled={typeof selectedQuantity === 'number' && selectedQuantity <= 0}
                      className="px-6 py-3 bg-[#4b68e8] hover:bg-[#6581ff] text-white disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors text-lg font-semibold"
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
                      className="flex-1 px-6 py-3 text-center border-0 focus:outline-none focus:ring-0 appearance-none text-lg font-semibold"
                      style={{ MozAppearance: 'textfield' }}
                    />
                    <button
                      type="button"
                      onClick={increaseQuantity}
                      className="px-6 py-3 bg-[#4b68e8] hover:bg-[#6581ff] text-white disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors text-lg font-semibold"
                    >
                      +
                    </button>
                  </div>
                </div>
                
                {/* View Cart Button */}
                {inCart && (
                  <button
                    onClick={() => setViewCart(true)}
                    className="w-4xs flex items-center justify-center space-x-2 px-8 py-3 rounded-lg font-medium text-[#4b68e8] border-2 border-[#4b68e8] hover:bg-[#4b68e8] hover:text-white transition-all duration-300"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>Ver carrito ({currentQuantity} {currentQuantity === 1 ? 'producto' : 'productos'})</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information Section */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Shipping Info */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Información de Envío</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>• Entrega en 24-48 horas</p>
              <p>• Disponible en toda España</p>
            </div>
          </div>

          {/* Quality Info */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Calidad Garantizada</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>• Productos con certificación internacional</p>
              <p>• Control de calidad riguroso</p>
              <p>• Garantía de satisfacción</p>
            </div>
          </div>

          {/* Support Info */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Soporte al Cliente</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>• Atención personalizada</p>
              <p>• Soporte técnico especializado</p>
              <p>• Asesoramiento comercial</p>
            </div>
          </div>
        </div>
      </div>
      <CartSidebar isOpen={viewCart} setIsOpen={setViewCart} />
    </main>
  );
}

