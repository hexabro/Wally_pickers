'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useProducts } from '@/context/ProductsProvider';
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

  const { products } = useProducts();
  const [viewCart, setViewCart] = useState(false);

  // Get filtered products based on selected category
  const categoryProducts = products.filter(product => 
    selectedCategory ? product.CATEGORIA.toLowerCase() === selectedCategory.toLowerCase() : true
  );

  // Get unique brands and types for the selected category
  const availableBrands = [...new Set(categoryProducts.map(product => product.MARCA))].sort();
  const availableTypes = [...new Set(categoryProducts.map(product => product.TIPO))].sort();

  // Apply additional filters
  const filteredProducts = categoryProducts.filter(product => {
    const matchesBrand = selectedBrand ? product.MARCA === selectedBrand : true;
    const matchesType = selectedType ? product.TIPO === selectedType : true;
    return matchesBrand && matchesType;
  });

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
    <div className="min-h-screen bg-gray-50">
      <CartSidebar isOpen={viewCart} setIsOpen={setViewCart} />
      
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/catalogo" className="text-blue-600 hover:text-blue-800 mb-2 inline-block">
                ← Volver a categorías
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">{selectedCategory}</h1>
              <p className="text-gray-600 mt-1">
                {filteredProducts.length} productos encontrados
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Filtros</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Brand Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Marca
              </label>
              <select
                value={selectedBrand || ''}
                onChange={(e) => {
                  const newParams = new URLSearchParams(searchParams.toString());
                  if (e.target.value) {
                    newParams.set('brand', e.target.value);
                  } else {
                    newParams.delete('brand');
                  }
                  window.history.pushState({}, '', `?${newParams.toString()}`);
                }}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Todas las marcas</option>
                {availableBrands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo
              </label>
              <select
                value={selectedType || ''}
                onChange={(e) => {
                  const newParams = new URLSearchParams(searchParams.toString());
                  if (e.target.value) {
                    newParams.set('type', e.target.value);
                  } else {
                    newParams.delete('type');
                  }
                  window.history.pushState({}, '', `?${newParams.toString()}`);
                }}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Todos los tipos</option>
                {availableTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Filters */}
          {(selectedBrand || selectedType) && (
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-sm text-gray-600">Filtros activos:</span>
              {selectedBrand && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                  Marca: {selectedBrand}
                  <button
                    onClick={() => {
                      const newParams = new URLSearchParams(searchParams.toString());
                      newParams.delete('brand');
                      window.history.pushState({}, '', `?${newParams.toString()}`);
                    }}
                    className="ml-1 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedType && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                  Tipo: {selectedType}
                  <button
                    onClick={() => {
                      const newParams = new URLSearchParams(searchParams.toString());
                      newParams.delete('type');
                      window.history.pushState({}, '', `?${newParams.toString()}`);
                    }}
                    className="ml-1 text-green-600 hover:text-green-800"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Products Grid */}
        <ProductList filteredProducts={filteredProducts} />
      </div>
    </div>
  );

  if(!selectedCategory) {
    return unSelectedCategoryContent;
  } else {
    return selectedCategoryContent;
  }
}
