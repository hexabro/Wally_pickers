import { getProductById } from '@/lib/load-products';
import { notFound } from 'next/navigation';

export default async function Page({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProductById(params.id);

  if (!product) return notFound();

  return (
    <main className="max-w-2xl mx-auto p-6">
      <img
        src={'/images/products/p1.jpg'}
        alt={product.NOMBRE}
        className="w-full h-64 object-cover rounded mb-6"
      />
      <h1 className="text-2xl font-bold mb-2">{product.NOMBRE}</h1>
      <p className="text-gray-600 mb-4">{product.DESCRIPCION}</p>
    </main>
  );
}
