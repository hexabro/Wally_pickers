import { Product } from '@/lib/load-products';
import Link from 'next/link';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/catalogo/${product.REF}`} className="border rounded-lg p-4 shadow hover:shadow-md transition">
      <img
        src={'/images/products/p2.jpg'} // temporal image to make tests
        alt={product.NOMBRE}
        className="w-full h-40 object-cover mb-4"
      />
      <h3 className="text-lg font-semibold">{product.NOMBRE}</h3>
      <p className="text-sm text-gray-600">{product.DESCRIPCION}</p>
    </Link>
  );
}
