'use client';

import { getProductById } from '@/lib/load-products';
import { notFound } from 'next/navigation';
import { useCart } from '@/hooks/useCart';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Product } from '@/lib/load-products';

export default function Page({
  params,
}: {
  params: Promise<{ REF: string }>;
}) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const { REF } = await params;
        const productData = await getProductById(REF);
        setProduct(productData);
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [params]);

  const handleAddToCart = () => {
    if (!product) return;
    
    setIsAdding(true);
    addToCart(product);
    
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
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
    <main className="max-w-2xl mx-auto p-6">
      <Link 
        href="/catalogo" 
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Volver al catálogo
      </Link>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img
          src={'/images/products/p1.jpg'} /* Cambiar esto cuando hayan imágenes reales */
          alt={product.NOMBRE}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold mb-2">{product.NOMBRE}</h1>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span className="bg-gray-100 px-2 py-1 rounded">
                  <strong>Marca:</strong> {product.MARCA}
                </span>
                <span className="bg-blue-100 px-2 py-1 rounded text-blue-800">
                  <strong>Categoría:</strong> {product.CATEGORIA}
                </span>
              </div>
            </div>
          </div>
          
          <p className="text-gray-600 mb-6">{product.DESCRIPCION}</p>
          
          <div className="border-t pt-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                <span className="font-medium">Referencia:</span> {product.REF}
                {product.TIPO && (
                  <span className="ml-4">
                    <span className="font-medium">Tipo:</span> {product.TIPO}
                  </span>
                )}
              </div>
              
              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  isAdding 
                    ? 'bg-green-500 text-white scale-95' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white hover:scale-105'
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                <span>{isAdding ? '¡Agregado al carrito!' : 'Agregar al carrito'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

