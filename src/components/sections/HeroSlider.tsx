'use client'

import Image from "next/image";
import { useState, useEffect } from "react";

/* ====================== 1 · HERO SLIDER ===================== */
const heroSlides = [
  { src: "/images/hero/1.jpg", alt: "Jamón Ibérico" },
  { src: "/images/hero/1.jpg", alt: "Jamón Ibérico" },
  { src: "/images/hero/1.jpg", alt: "Jamón Ibérico" },
  { src: "/images/hero/1.jpg", alt: "Jamón Ibérico" },
  { src: "/images/hero/1.jpg", alt: "Jamón Ibérico" },
  { src: "/images/hero/1.jpg", alt: "Jamón Ibérico" },

];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % heroSlides.length), 4000);
    return () => clearInterval(id);
  }, []);

  const prevSlide = () => {
    setIndex((i) => (i - 1 + heroSlides.length) % heroSlides.length);
  };

  const nextSlide = () => {
    setIndex((i) => (i + 1) % heroSlides.length);
  };

  return (
    <section className="relative h-[85vh] overflow-hidden py-20">
      {/* Imágenes del slider */}
      {heroSlides.map(({ src, alt }, i) => (
        <Image
          key={i}
          src={src}
          alt={alt}
          fill
          priority={i === 0}
          className={`object-cover object-center transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Botón anterior */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/70 hover:bg-white text-sky-900 rounded-full w-10 h-10 flex items-center justify-center shadow transition z-10"
        aria-label="Anterior"
      >
        ‹
      </button>

      {/* Botón siguiente */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/70 hover:bg-white text-sky-900 rounded-full w-10 h-10 flex items-center justify-center shadow transition z-10"
        aria-label="Siguiente"
      >
        ›
      </button>
    </section>
  );
}
