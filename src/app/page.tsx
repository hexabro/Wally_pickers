"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

/** -------------------------------------------------------------
 *  Wally Pickers – Página de inicio (tipo landing)            
 *  Estructura solicitada por el cliente:                      
 *    1. Hero slider                                           
 *    2. Procedencia + CTA a marcas                            
 *    3. Métricas destacadas                                   
 *    4. Carrusel de marcas colaboradoras                      
 *    5. Categorías de producto + CTA catálogo                 
 *    6. Formulario descarga de catálogo                       
 *  Tailwind CSS + Next Image + React (sin librerías extra).   
 *  ----------------------------------------------------------*/

/* ====================== 1 · HERO SLIDER ===================== */
const heroSlides = [
  { src: "/images/hero/1.jpg", alt: "Jamón Ibérico" },
  { src: "/images/hero/2.jpg", alt: "Queso Manchego" },
  { src: "/images/hero/3.jpg", alt: "Aceite de Oliva" },
  { src: "/images/hero/4.jpg", alt: "Aceite de Oliva" },
  { src: "/images/hero/5.jpg", alt: "Aceite de Oliva" },
  { src: "/images/hero/6.jpg", alt: "Aceite de Oliva" },
  { src: "/images/hero/7.jpg", alt: "Aceite de Oliva" },
  { src: "/images/hero/8.jpg", alt: "Aceite de Oliva" },
  { src: "/images/hero/9.jpg", alt: "Aceite de Oliva" },
];

function HeroSlider() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % heroSlides.length), 4000);
    return () => clearInterval(id);
  }, []);
  return (
    <section className="relative h-[85vh] overflow-hidden">
      {heroSlides.map(({ src, alt }, i) => (
        <Image
          key={src}
          src={src}
          alt={alt}
          fill
          priority={i === 0}
          className={`object-cover object-center transition-opacity duration-1000 ${i === index ? "opacity-100" : "opacity-0"}`}
        />
      ))}
      
    </section>
  );
}

/* =============== 2 · PROCEDENCIA + CTA MARCAS =============== */
function OriginSection() {
  return (
    <section id="procedencia" className="py-20 px-6 max-w-6xl mx-auto text-center md:text-left flex flex-col md:flex-row items-center gap-10">
      <div className="flex-1 space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold text-sky-900">Origen garantizado</h2>
        <p>
          Seleccionamos productores certificados en Europa, América, Asia y Oceanía para asegurar la mejor calidad y trazabilidad.
          Nuestro catálogo incluye charcutería gourmet, quesos con D.O.P., salsas asiáticas auténticas y mucho más.
        </p>
        <Link href="#marcas" className="inline-block mt-4 px-6 py-3 rounded-full bg-sky-900 text-white hover:bg-sky-700 transition">
          Conoce todas nuestras marcas
        </Link>
      </div>

      <Image src="/images/world-map.svg" alt="Mapa procedencia" width={500} height={350} className="flex-1" />
    </section>
  );
}

/* =============== 3 · MÉTRICAS DESTACADAS ==================== */
const metrics = [
  { label: "Toneladas vendidas", value: "12K+" },
  { label: "Países abastecidos", value: "27" },
  { label: "Marcas exclusivas", value: "45" },
  { label: "Clientes B2B", value: "600+" },
];
function StatsStrip() {
  return (
    <section className="bg-green-600 py-12 text-white">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {metrics.map((m) => (
          <div key={m.label} className="space-y-1">
            <div className="text-3xl md:text-4xl font-extrabold">{m.value}</div>
            <div className="text-sm md:text-base opacity-80">{m.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* =============== 4 · CARRUSEL DE MARCAS ===================== */
const brandLogos = [
  "acme.svg",
  "delizia.svg",
  "soyland.svg",
  "oriental.svg",
  "pasta-bella.svg",
  "mediterraneo.svg",
];
function BrandCarousel() {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setOffset((o) => (o + 1) % brandLogos.length), 2500);
    return () => clearInterval(id);
  }, []);
  return (
    <section id="marcas" className="py-16 bg-neutral-100">
      <h2 className="text-3xl font-bold text-center mb-8 text-sky-900">Marcas que confían en nosotros</h2>
      <div className="overflow-hidden">
        <div
          className="flex gap-12 transition-transform duration-700"
          style={{ transform: `translateX(-${offset * 160}px)` }}
        >
          {brandLogos.concat(brandLogos).map((logo, i) => (
            <Image
              key={i}
              src={`/images/brands/${logo}`}
              alt={logo.replace(".svg", "")}
              width={140}
              height={80}
              className="object-contain"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* =============== 5 · CATEGORÍAS DE PRODUCTO ================= */
const categories = [
  { id: "charcuteria", label: "Charcutería" },
  { id: "quesos", label: "Quesos" },
  { id: "salsas", label: "Salsas & Condimentos" },
  { id: "pasta", label: "Pasta" },
  { id: "dulces", label: "Dulces" },
];
function CategorySection() {
  return (
    <section className="py-20 px-6 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
      <Image src="/images/categories-basket.jpg" alt="Cesta de productos" width={450} height={350} className="rounded-lg shadow-md" />

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

/* =============== 6 · FORMULARIO DE DESCARGA ================= */
function CatalogDownload() {
  return (
    <section className="py-16 bg-neutral-100" id="catalogo">
      <div className="max-w-lg mx-auto text-center space-y-6">
        <h2 className="text-3xl font-bold text-sky-900">Descarga nuestro catálogo 2025</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("¡Enlace de descarga enviado a tu correo!");
          }}
          className="flex flex-col gap-4"
        >
          <input
            type="text"
            placeholder="Nombre"
            required
            className="p-3 border rounded-md"
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            required
            className="p-3 border rounded-md"
          />
          <button type="submit" className="px-6 py-3 bg-green-600 text-white rounded-full font-semibold hover:bg-green-500 transition">
            Descargar catálogo
          </button>
        </form>
      </div>
    </section>
  );
}

/* ========================== EXPORT ========================== */
export default function HomePage() {
  return (
    <main>
      <HeroSlider />
      <OriginSection />
      <StatsStrip />
      <BrandCarousel />
      <CategorySection />
      <CatalogDownload />
    </main>
  );
}
