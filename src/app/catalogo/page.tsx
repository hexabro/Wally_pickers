import { getProducts } from '@/lib/load-products';
import ProductCard from '@/components/sections/ProductCard';
import CartSidebar from '@/components/sections/CartSidebar';
import Link from 'next/link';
import Image from 'next/image';
const categories = [
  { name: 'Alimentación', value: 'Alimentacion', image: 'alimentacionCatalog' },
  { name: 'Limpieza', value: 'Limpieza', image: 'limpiezaCatalogo' },
  { name: 'Cosmética', value: 'Cosmetica', image: 'cosmeticaCatalog' },
];

export default async function CatalogPage({ searchParams }: {
  searchParams?: Promise<{ category?: string; type?: string; brand?: string }>;
}) {
  const awaitedSearchParams = await searchParams;
  const selectedCategory = awaitedSearchParams?.category;
  const selectedType = awaitedSearchParams?.type;
  const selectedBrand = awaitedSearchParams?.brand;
  const products = await getProducts();

  if (!selectedCategory) {
    // Show category cards
    return (
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
        <CartSidebar />
      </main>
    );
  }

  // Filter products by selected category
  const filteredByCategory = products.filter(
    (product) => product.CATEGORIA === selectedCategory.toLowerCase()
  );

  // Extract unique types for sidebar
  const types = Array.from(
    new Set(filteredByCategory.map((product) => product.TIPO))
  ).filter(Boolean);

  // Extract unique brands for dropdown
  const brands = Array.from(
    new Set(filteredByCategory.map((product) => product.MARCA))
  ).filter(Boolean);

  // Further filter by selected type if present
  let filteredProducts = selectedType
    ? filteredByCategory.filter((product) => product.TIPO === selectedType)
    : filteredByCategory;

  // Further filter by selected brand if present
  filteredProducts = selectedBrand
    ? filteredProducts.filter((product) => product.MARCA === selectedBrand)
    : filteredProducts;

  return (
    <main className="p-6 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 md:mr-8 mb-6 md:mb-0">
        <div className="bg-white rounded-xl shadow p-4 sticky top-6">
          {/* FILTRAR POR MARCA */}
        <form
          action="/catalogo"
          method="get"
          className="mb-6"
        >
          <input type="hidden" name="category" value={selectedCategory} />
          {selectedType && (
            <input type="hidden" name="type" value={selectedType} />
          )}
          <label htmlFor="brand" className="block text-lg font-bold mb-4">
            Filtrar por marca:
          </label>
          <div className="flex gap-2 items-center">
            <select
              id="brand"
              name="brand"
              defaultValue={selectedBrand || ''}
              className="border rounded px-3 py-2 w-full max-w-xs"
            >
              <option value="">Todas</option>
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Filtrar
            </button>
          </div>
        </form>
          {/* FILTRAR POR TIPO */}
          <h2 className="text-lg font-bold mb-4">Filtrar por tipo</h2>
          <ul>
            <li>
              <Link
                href={`/catalogo?category=${encodeURIComponent(selectedCategory)}`}
                className={`block py-2 px-3 rounded hover:bg-gray-100 ${
                  !selectedType ? 'font-semibold text-blue-600' : ''
                }`}
              >
                Todos
              </Link>
            </li>
            {types.map((type) => (
              <li key={type}>
                <Link
                  href={`/catalogo?category=${encodeURIComponent(selectedCategory)}&type=${encodeURIComponent(type)}${selectedBrand ? `&brand=${encodeURIComponent(selectedBrand)}` : ''}`}
                  className={`block py-2 px-3 rounded hover:bg-gray-100 ${
                    selectedType === type ? 'font-semibold text-blue-600' : ''
                  }`}
                >
                  {type}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      {/* Products grid */}
      <section className="flex-1">
        <h1 className="text-2xl font-bold mb-6">
          {selectedCategory} - Catálogo de Productos
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.REF} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No hay productos en esta categoría.
            </div>
          )}
        </div>
        <div className="mt-8">
          <Link href="/catalogo" className="text-blue-600 hover:underline">
            ← Volver a categorías
          </Link>
        </div>
      </section>
      
      {/* Carrito flotante - solo visible en el catálogo */}
      <CartSidebar />
    </main>
  );
}
