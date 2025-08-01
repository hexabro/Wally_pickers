'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useProducts } from '@/context/ProductsProvider';
import CartSidebar from '@/components/nav/CartSidebar';
import Link from 'next/link';
import Image from 'next/image';
import ProductList from '@/components/sections/ProductList';
import SelectedBrands from '../sections/SelectedBrands';
import { Link as LinkIcon, ChevronUp } from 'lucide-react';

const categories = [
  { name: 'Alimentación', value: 'Alimentacion', image: 'alimentacionCatalog', mobileImage: "/images/categorias/alimentacion2.jpg", link: "/catalogo?category=Alimentacion" },
  { name: 'Limpieza', value: 'Limpieza', image: 'limpiezaCatalogo', mobileImage: "/images/categorias/limpieza2.jpg", link: "/catalogo?category=Limpieza" },
  { name: 'Cosmética', value: 'Cosmetica', image: 'cosmeticaCatalog', mobileImage: "/images/categorias/cosmetica2.jpg", link: "/catalogo?category=Cosmetica" },
];

export default function CatalogContent() {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get('category');
  const selectedType = searchParams.get('type');
  const selectedBrand = searchParams.get('brand');

  const { products } = useProducts();
  const [viewCart, setViewCart] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Handle scroll to show/hide scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setShowScrollTop(scrollTop > 300); // Show button after scrolling 300px
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Get filtered products based on selected category
  const categoryProducts = products.filter(product => 
    selectedCategory ? product.CATEGORIA.toLowerCase() === selectedCategory.toLowerCase() : true
  );

  // Search functionality
  const searchFilteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return categoryProducts;
    
    const query = searchQuery.toLowerCase().trim();
    return categoryProducts.filter(product => 
      product.NOMBRE.toLowerCase().includes(query) ||
      product.DESCRIPCION.toLowerCase().includes(query) ||
      product.MARCA.toLowerCase().includes(query) ||
      product.TIPO.toLowerCase().includes(query) ||
      product.REF.toLowerCase().includes(query)
    );
  }, [categoryProducts, searchQuery]);

  // Get unique brands and types for the filtered products within the selected category
  const availableBrands = [...new Set(categoryProducts.map(product => product.MARCA))].sort();
  const availableTypes = [...new Set(categoryProducts.map(product => product.TIPO))].sort();

  // Apply additional filters
  const filteredProducts = searchFilteredProducts.filter(product => {
    const matchesBrand = selectedBrand ? product.MARCA === selectedBrand : true;
    const matchesType = selectedType ? product.TIPO === selectedType : true;
    return matchesBrand && matchesType;
  });

  const unSelectedCategoryContent = (
    <>
      <main className="flex flex-col items-center justify-center min-h-[60vh] p-6 pt-20 bg-gray-50 ">

        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#0e344f] mb-4">Catálogo de Wally Pickers</h1>
          <p className="text-lg text-gray-600 mb-6 max-w-3xl">Selecciona una categoría para explorar nuestros productos o usa el buscador para encontrar exactamente lo que necesites</p>
          
          {/* Global Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg 
                  className="h-5 w-5 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Buscar en todo el catálogo..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 bg-white shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Show search results if there's a search query */}
        {searchQuery ? (
          <div className="w-full max-w-7xl mx-auto">
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Resultados de búsqueda
              </h2>
              <p className="text-gray-600">
                {searchFilteredProducts.length} productos encontrados para "{searchQuery}"
              </p>
            </div>
            <ProductList filteredProducts={searchFilteredProducts} />
          </div>
        ) : (
          /* Category Grid */
          <div className = "w-full h-full">
            {/* DESKTOP */}
              <div className="hidden md:grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {categories.map((cat) => (
                <Link
                  key={cat.value}
                  href={`/catalogo?category=${encodeURIComponent(cat.value)}`}
                  className="group bg-white shadow-lg rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-gray-100 hover:border-sky-400 hover:border-2"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={`/images/categorias/${cat.image}.jpg`}
                      alt={cat.name}
                      width={300}
                      height={192}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 "
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300"></div>
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4">
                      <h3 className="text-xl font-bold text-white  mb-2 drop-shadow-lg ">
                        {cat.name}
                      </h3>
                      <div className="inline-flex items-center text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute bottom-3">
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
          {/* MOBILE */}
            <div className="md:hidden w-full h-full flex flex-col space-y-4 hide-scrollbar">
                  {categories.map((cat) => (
                    <div
                      key={cat.name}
                      className={`w-full h-40 rounded-xl overflow-hidden shadow-lg  relative `}
                    >
          
                      {/* Imagen de fondo */}
                      <Image
                        src={cat.mobileImage}
                        alt={cat.name}
                        fill
                        className="object-cover blur-xs"
                      />
          
                      {/* Capa degradada para legibilidad */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent " />
          
                      {/* Contenido superpuesto */}
                      <div className="absolute inset-0 flex flex-col justify-center items-center p-4 hover:cursor-pointer">
                        <Link
                          href={cat.link}
                          className="
                            text-3xl
                            text-white font-medium
                            rounded-full
                            stroke-black
                            px-6 py-2
                            transition
                            focus:outline-none
                            hover:cursor-pointer
                          "
                        >
                          {cat.name} <LinkIcon className = "inline t"/>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
          </div>
          

                
        )}
        
        {/* Carrito flotante - también visible en la vista de categorías */}
        <CartSidebar isOpen={viewCart} setIsOpen={setViewCart} />
        
        {/* BRANDS THAT TRUST WALLY PICKERS S.L */}
        <div className = "bg-gray-50 py-16 mt-20">
          <SelectedBrands></SelectedBrands>
        </div>
      </main>
    </>
  );

  const selectedCategoryContent = (
    <div className="min-h-screen bg-gray-50">
      <CartSidebar isOpen={viewCart} setIsOpen={setViewCart} />
      
      {/* Header */}
      <div className="bg-[#0e344f] shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/catalogo" className="text-[#d68a49] hover:text-[#bf9066] mb-2 inline-block">
                ← Volver a categorías
              </Link>
              <h1 className="text-3xl font-bold text-gray-200">{selectedCategory}</h1>
              <p className="text-gray-400 mt-1">
                {filteredProducts.length} productos encontrados
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Switcher Panel */}
      <div className="lg:hidden bg-white border-b shadow-sm  top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 flex-wrap">
        {categories.map((cat) => (
          <Link
            key={cat.value}
            href={`/catalogo?category=${encodeURIComponent(cat.value)}`}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
          selectedCategory === cat.value
            ? 'bg-[#0e344f] text-white shadow-md'
            : 'bg-gray-100 text-gray-700 hover:bg-[#0e344f] hover:text-white shadow-sm'
            }`}
          >
            {cat.name}
          </Link>
        ))}
          </div>
        </div>
      </div>

      {/* Mobile Search Bar and Filters (visible only on mobile) */}
      <div className="lg:hidden">
        {/* Search Bar */}
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg 
                  className="h-5 w-5 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Buscar productos por nombre, marca, tipo o descripción..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            {searchQuery && (
              <div className="mt-2 text-sm text-gray-600">
                Mostrando resultados para: <span className="font-medium">"{searchQuery}"</span>
              </div>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="max-w-7xl mx-auto px-4 pb-6">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Filtros</h3>
            <div className="grid grid-cols-2 gap-4">
              
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
        </div>
      </div>

      {/* Desktop Layout with Sidebar */}
      <div className="hidden lg:flex max-w-7xl mx-auto px-4 py-6 gap-6">
        {/* Left Sidebar - Search and Filters */}
        <div className="w-80 flex-shrink-0">
          <div className="sticky top-6 space-y-6">
            {/* Search Bar */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="text-lg font-semibold mb-4">Búsqueda</h3>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg 
                    className="h-5 w-5 text-gray-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
              {searchQuery && (
                <div className="mt-2 text-sm text-gray-600">
                  Resultados para: <span className="font-medium">"{searchQuery}"</span>
                </div>
              )}
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Filtros</h3>
              
              {/* Brand Filter */}
              <div className="mb-4">
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
              <div className="mb-4">
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

              {/* Active Filters */}
              {(selectedBrand || selectedType) && (
                <div className="mt-4">
                  <span className="text-sm text-gray-600 block mb-2">Filtros activos:</span>
                  <div className="flex flex-col gap-2">
                    {selectedBrand && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 w-fit">
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
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 w-fit">
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
                </div>
              )}
            </div>

            {/* Category Switcher */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="text-lg font-semibold mb-4">Categorías</h3>
              <div className="flex flex-col gap-2">
                {categories.map((cat) => (
                  <Link
                    key={cat.value}
                    href={`/catalogo?category=${encodeURIComponent(cat.value)}`}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 text-center ${
                      selectedCategory === cat.value
                        ? 'bg-[#0e344f] text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-[#0e344f] hover:text-white'
                    }`}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Products Grid */}
        <div className="flex-1">
          <ProductList filteredProducts={filteredProducts} />
        </div>
      </div>

      {/* Mobile Products Grid */}
      <div className="lg:hidden  mx-auto px-4">
        <ProductList filteredProducts={filteredProducts} />
      </div>
      
      {/* Scroll to Top Button - Mobile Only */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 md:hidden bg-[#4b68e8] hover:bg-[#6581ff] text-white p-3 rounded-full shadow-lg z-50 transition-all duration-300 hover:scale-110"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );

  if(!selectedCategory) {
    return unSelectedCategoryContent;
  } else {
    return selectedCategoryContent;
  }
}
