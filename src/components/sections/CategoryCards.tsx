"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import ProfileCard from "../ui/profileCard";
import {ExternalLink} from "lucide-react"
const categories = [
  {
    name: "Alimentación",
    handle: "Othon",
    avatarUrl: "/images/categorias/alimentacion.jpg",
    avatarUrl2: "/images/categorias/alimentacion2.jpg",
    profileLink: "https://www.linkedin.com/in/othon-ansatu%C3%B1a-gomes-86297624b/"
  },
  {
    name: "Limpieza",
    handle: "Jhonatan",
    avatarUrl: "/images/categorias/limpieza.jpg",
    avatarUrl2: "/images/categorias/limpieza2.jpg",
    profileLink: "https://www.linkedin.com/in/othon-ansatu%C3%B1a-gomes-86297624b/"
  },
  {
    name: "Cosmética",
    handle: "Pablo",
    avatarUrl: "/images/categorias/cosmetica.jpg",
    avatarUrl2: "/images/categorias/cosmetica2.jpg",
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
    <section className="py-12 px-4 max-w-7xl mx-auto ">
      {/* ======== MÓVIL: imagen de fondo + overlays ======== */}
      <div className="lg:hidden flex flex-col space-y-4 hide-scrollbar">
        {categories.map(cat => (
          <div
            key={cat.name}
            className="w-full h-40 rounded-xl overflow-hidden shadow-lg  relative"
          >

            {/* Imagen de fondo */}
            <Image
              src={cat.avatarUrl2}
              alt={cat.name}
              fill
              className="object-cover blur-xs"
            />

            {/* Capa degradada para legibilidad */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent " />

            {/* Contenido superpuesto */}
            <div className="absolute inset-0 flex flex-col justify-center items-center p-4">
              <button
                onClick={() => window.open(cat.profileLink, "_blank")}
                className="
                  text-3xl
                  text-white font-medium
                  rounded-full
                  stroke-black
                  px-6 py-2
                  transition
                  focus:outline-none   focus:ring-2 focus:ring-green-500
                "
              >
                {cat.name} <ExternalLink className = "inline t"/>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ======== ESCRITORIO (md+): layout original con ProfileCard ======== */}
      <div
          className="
          hidden lg:flex gap-4 overflow-x-auto snap-x snap-mandatory
          px-6 py-4                /* más padding a ambos lados */
          scroll-pl-6 scroll-pr-6  /* scroll-padding para snap */
          hide-scrollbar
        "
        style={{
          touchAction: 'pan-x',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {categories.map(cat => (
          <div
            key={cat.name}
            className="snap-start flex-shrink-0 w-64 md:flex-shrink md:w-auto hover: z-50"
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
