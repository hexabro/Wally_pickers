'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/sections/ProductCard';
import CartSidebar from '@/components/nav/CartSidebar';
import Link from 'next/link';
import Image from 'next/image';
import ProductList from '@/components/sections/ProductList';

const categories = [
  { name: 'Alimentación', value: 'Alimentacion', image: 'alimentacionCatalog' },
  { name: 'Limpieza', value: 'Limpieza', image: 'limpiezaCatalogo' },
  { name: 'Cosmética', value: 'Cosmetica', image: 'cosmeticaCatalog' },
];

export default function CatalogContent() {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get('category');
  const selectedType = searchParams.get('type');
  const selectedBrand = searchParams.get('brand');

  const [viewCart, setViewCart] = useState(false);

  const unSelectedCategoryContent = (
    <>
      <main className="flex flex-col items-center justify-center min-h-[60vh] p-6 bg-gray-50 ">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#0e344f] mb-4">Catálogo de Wally Pickers</h1>
          <p className="text-lg text-gray-600">Selecciona una categoría para explorar nuestros productos</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
          {categories.map((cat) => (
            <Link
              key={cat.value}
              href={`/catalogo?category=${encodeURIComponent(cat.value)}`}
              className="group bg-white shadow-lg rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-gray-100 hover:border-sky-400 hover:border-2"
            >
              <div className="relative  overflow-hidden">
                <Image
                  src={`/images/categorias/${cat.image}.jpg`}
                  alt={cat.name}
                  width={300}
                  height={200}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 "
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300"></div>
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6">
                  <h3 className="text-2xl font-bold text-neutral-200  mb-2 drop-shadow-lg ">
                    {cat.name}
                  </h3>
                  <div className="inline-flex items-center text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute bottom-4">
                    Ver productos
                    <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Carrito flotante - también visible en la vista de categorías */}
        <CartSidebar isOpen={viewCart} setIsOpen={setViewCart} />
      </main>
    </>
  );

  const selectedCategoryContent = (
    <div>
      <CartSidebar isOpen={viewCart} setIsOpen={setViewCart} />
      <h2 className="text-3xl font-bold mb-4">{selectedCategory}</h2>
      <ProductList />
    </div>
  );

  if(!selectedCategory) {
    return unSelectedCategoryContent;
  } else {
    return selectedCategoryContent;
  }
}
