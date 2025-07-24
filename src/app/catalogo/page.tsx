import { getProducts } from '@/lib/load-products';
import ProductCard from '@/components//sections/ProductCard';
import Link from 'next/link';
import Image from 'next/image';
const categories = [
  { name: 'Alimentación', value: 'Alimentacion' },
  { name: 'Limpieza', value: 'Limpieza' },
  { name: 'Cosmetica', value: 'Cosmetica' },
];

export default async function CatalogPage({ searchParams }: { searchParams?: { category?: string } }) {
  const products = await getProducts();
  const selectedCategory = searchParams?.category;

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
  const filteredProducts = products.filter(
    (product) => product.CATEGORIA === selectedCategory.toLowerCase()
  );

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        {selectedCategory} - Catálogo de Productos
      </h1>
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
        <Link
          href="/catalogo"
          className="text-blue-600 hover:underline"
        >
          ← Volver a categorías
        </Link>
      </div>
    </main>
  );
}
