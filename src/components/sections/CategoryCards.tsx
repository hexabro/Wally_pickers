"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import ProfileCard from "../ui/profileCard";

const categories = [
  {
    name: "Alimentación",
    handle: "Othon",
    avatarUrl: "/images/categorias/alimentacion.jpg",
    profileLink: "https://www.linkedin.com/in/othon-ansatu%C3%B1a-gomes-86297624b/"
  },
  {
    name: "Limpieza",
    handle: "Jhonatan",
    avatarUrl: "/images/categorias/limpieza.jpg",
    profileLink: "https://www.linkedin.com/in/othon-ansatu%C3%B1a-gomes-86297624b/"
  },
  {
    name: "Cosmética",
    handle: "Pablo",
    avatarUrl: "/images/categorias/cosmetica.jpg",
    profileLink: "https://www.linkedin.com/in/pablo-lopez-hernandez-/"
  },
];

export default function CategoryCards() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      {/* ======== MÓVIL: imagen de fondo + overlays ======== */}
      <div
        className="md:hidden flex space-x-6 overflow-x-auto snap-x snap-mandatory px-2 py-4"
        style={{ touchAction: 'pan-x', WebkitOverflowScrolling: 'touch' }}
      >
        {categories.map(cat => (
          <div
            key={cat.name}
            className="snap-start flex-shrink-0 min-w-[280px] h-[360px] rounded-xl overflow-hidden shadow-lg border-2  relative"
          > 
            <div className="px-4 py-3 absolute top-0 left-0 right-0 z-10">
              <h3 className="text-2xl font-semibold text-gray-800 text-center">
                {cat.name}
              </h3>
            </div>

            {/* Imagen de fondo */}
            <Image
              src={cat.avatarUrl}
              alt={cat.name}
              fill
              className="object-cover"
            />

            {/* Capa degradada para legibilidad */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

            {/* Contenido superpuesto */}
            <div className="absolute inset-0 flex flex-col justify-end items-center p-4">
              
              <button
                onClick={() => window.open(cat.profileLink, "_blank")}
                className="
                  bg-gray-300 hover:bg-blue-700
                  text-black font-medium
                  rounded-full
                  w-full
                  px-6 py-2
                  shadow-lg
                  transition
                  focus:outline-none focus:ring-2 focus:ring-green-500
                "
              >
                Ver más
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ======== ESCRITORIO (md+): layout original con ProfileCard ======== */}
      <div
        className="
          hidden md:flex gap-4 overflow-x-auto snap-x snap-mandatory 
          px-2 py-4 -mx-2  md:grid-cols-3 md:gap-6 md:-mx-0
        "
        style={{
          touchAction: 'pan-x',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {categories.map(cat => (
          <div
            key={cat.name}
            className="snap-start flex-shrink-0 w-64 md:flex-shrink md:w-auto"
          >
            <ProfileCard
              name={cat.name}
              title=""
              handle={cat.handle}
              status="Online"
              contactText="Descúbrelos todos"
              avatarUrl={cat.avatarUrl}
              showBehindGradient={false}
              showUserInfo={true}
              enableTilt={!isMobile}
              onContactClick={() => window.open(cat.profileLink, "_blank")}
              innerGradient="linear-gradient(to bottom, #0e344f, #0b2533, #081821)"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
