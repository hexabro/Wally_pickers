import Image from "next/image";
import Link from "next/link";

const categories = [
  { id: "charcuteria", label: "Charcutería" },
  { id: "quesos", label: "Quesos" },
  { id: "salsas", label: "Salsas & Condimentos" },
  { id: "pasta", label: "Pasta" },
  { id: "dulces", label: "Dulces" },
];
export default function CategorySection() {
  return (
    <section className="py-20 px-6 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
      <Image src="/images/compra.png" alt="Cesta de productos" width={450} height={350} className="rounded-lg shadow-md" />

      <div className="flex-1 space-y-6 text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-bold text-sky-900">Explora nuestras categorías</h2>
        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`#${c.id}`}
              className="px-4 py-2 bg-sky-900 text-white rounded-full hover:bg-sky-700 transition"
            >
              {c.label}
            </Link>
          ))}
        </div>
        <Link href="/catalogo" className="inline-block px-6 py-3 rounded-full bg-green-600 text-white font-semibold hover:bg-green-500 transition">
          Ver catálogo completo
        </Link>
      </div>
    </section>
  );
}