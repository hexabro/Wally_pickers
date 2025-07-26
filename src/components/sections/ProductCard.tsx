'use client';

import { Product } from '@/lib/load-products';
import Link from 'next/link';
import { useCart } from '@/hooks/useCart';
import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevenir navegación del Link
    e.stopPropagation();
    
    setIsAdding(true);
    addToCart(product);
    
    // Animación visual
    setTimeout(() => {
      setIsAdding(false);
    }, 500);
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow hover:shadow-md transition-all duration-300 bg-white">
      <Link href={`/catalogo/${product.REF}`}>
        <img
          src={'/images/products/p2.jpg'} // temporal image to make tests
          alt={product.NOMBRE}
          className="w-full h-40 object-cover hover:scale-105 transition-transform duration-300"
        />
      </Link>
      <div className="p-4">
        <Link href={`/catalogo/${product.REF}`}>
          <h3 className="text-lg font-semibold hover:text-blue-600 transition-colors">{product.NOMBRE}</h3>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.DESCRIPCION}</p>
        </Link>
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500">
            <span className="bg-gray-100 px-2 py-1 rounded">{product.MARCA}</span>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              isAdding 
                ? 'bg-green-500 text-white scale-95' 
                : 'bg-blue-600 hover:bg-blue-700 text-white hover:scale-105'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>{isAdding ? 'Agregado!' : 'Agregar'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
