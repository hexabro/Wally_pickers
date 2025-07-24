import { getProducts } from '@/lib/load-products';
import ProductCard from '@/components//sections/ProductCard';
import Link from 'next/link';
import Image from 'next/image';
const categories = [
  { name: 'Alimentación', value: 'Alimentacion' },
  { name: 'Limpieza', value: 'Limpieza' },
  { name: 'Cosmetica', value: 'Cosmetica' },
];

export default async function CatalogPage({
  searchParams,
}: {
  searchParams?: { category?: string; type?: string; brand?: string };
}) {
  const products = await getProducts();
  const selectedCategory = searchParams?.category;
  const selectedType = searchParams?.type;
  const selectedBrand = searchParams?.brand;

  if (!selectedCategory) {
    // Show category cards
    return (
      <main className="flex flex-col items-center justify-center min-h-[60vh] p-6">
        <h1 className="text-2xl font-bold mb-10">Catálogo de Productos</h1>
        <div className="flex flex-col md:flex-row gap-8">
          {categories.map((cat) => (
            
            <Link
              key={cat.value}
              href={`/catalogo?category=${encodeURIComponent(cat.value)}`}
              className="bg-white shadow-lg rounded-xl flex flex-col items-center justify-center text-2xl font-semibold transition-transform hover:scale-105"
            >
              <Image
                src={`/images/categorias/${cat.value.toLowerCase()}.jpg`}
                alt={cat.name}
                width={200}
                height={200}
                className="rounded-t-xl object-fit"
              />
              {cat.name}
            </Link>
          ))}
        </div>
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
        {/* Brand filter dropdown */}
        <form
          action="/catalogo"
          method="get"
          className="mb-6"
        >
          <input type="hidden" name="category" value={selectedCategory} />
          {selectedType && (
            <input type="hidden" name="type" value={selectedType} />
          )}
          <label htmlFor="brand" className="block mb-2 font-medium">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.ID} product={product} />
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
    </main>
  );
}
