'use client'

import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";

/* ----------------------------------------------------------------------
   HERO SLIDER CON ARRASTRE – v6️⃣  (carrusel infinito robusto)
   ----------------------------------------------------------------------
   • Bug report: a veces hace la animación cuando no debe.
   • Causas encontradas:
       1) Se empezaba en índice 0 (que es el cloneLast)           → parpadeo.
       2) Se esperaba 500 ms con setTimeout —si el usuario arrastra más
          rápido que la animación o cambia `duration‑500`, el salto se ve.
       3) `animate` podía quedarse en false si el efecto coincidía con
          otro re-render.
   • Arreglo:
       ✦ Partimos en index = 1 (primer slide real).
       ✦ Detectamos fin de transición con  onTransitionEnd  (evento real).
       ✦ Al «teleportar» al índice real quitamos transición, hacemos el
         cambio en el mismo frame con  requestAnimationFrame, y luego
         volvemos a activarla ⇒ cero parpadeo.
   ------------------------------------------------------------------- */

/* ====================== 1 · ARRAY ORIGINAL ========================== */
const heroSlides = [
  { src: "/images/hero/tmpl1.jpg", alt: "Jamón Ibérico" },
  { src: "/images/hero/tmpl2.jpg", alt: "Jamón Ibérico" },
  { src: "/images/hero/tmpl3.jpg", alt: "Jamón Ibérico" },
  
  ];

/* Array extendido con clones (cloneLast, originals…, cloneFirst) */
const extendedSlides = [
  heroSlides[heroSlides.length - 1],
  ...heroSlides,
  heroSlides[0]
];

/* ====================== 2 · COMPONENTE PRINCIPAL ==================== */
export default function HeroSlider() {
  const [index, setIndex] = useState(1);      // ⟵ comenzamos en primer real
  const [offset, setOffset] = useState(0);    // px arrastre
  const [animate, setAnimate] = useState(true); // transición activa
  const autoRef = useRef<NodeJS.Timeout | null> (null); // reiniciar autoavance  

  const slideWidth = 100; // vw por slide
  const total = extendedSlides.length;


  /* ------------------ RESETEO DEL AUTOAVANCE ----------------------- */
  const restartAutoSlide = () => {
    if (autoRef.current) clearInterval(autoRef.current);  // limpiar anterior
    autoRef.current = setInterval(nextSlide, 4000); // reiniciar autoavance
  }
  /* ---------------------- AUTO‑AVANCE ------------------------------ */
  useEffect(() => {
    restartAutoSlide(); // iniciar autoavance al montar

    return () => {
      if (autoRef.current) {
        clearInterval(autoRef.current);
      }
    }; // limpiar al desmontar
  }, []); // solo una vez

  /* ---------------- FUNCIONES DE NAVEGACIÓN ------------------------ */
  const prevSlide = useCallback(() => setIndex((i) => i - 1), []);
  const nextSlide = useCallback(() => setIndex((i) => i + 1), []);

  /* ------------------- GESTO DE ARRASTRE --------------------------- */
  const startX = useRef<number | null>(null);
  const threshold = 60;

  const handlePointerDown = (e: React.PointerEvent<HTMLElement>) => {
    restartAutoSlide(); // reiniciar autoavance
    startX.current = e.clientX; // guardar posición inicial

    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (startX.current === null) return;
    setOffset(e.clientX - startX.current);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLElement>) => {
    if (startX.current === null) return;
    const diff = e.clientX - startX.current;
    if (Math.abs(diff) > threshold) (diff > 0 ? prevSlide : nextSlide)();
    setOffset(0);
    startX.current = null;
    (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
  };

  /* -------------- NORMALIZACIÓN TRAS TRANSICIÓN -------------------- */
  const handleTransitionEnd = () => {
    // Si estamos en un clone, teleportamos al real sin transición
    if (index === 0) {
      teleport(total - 2); // último real
    } else if (index === total - 1) {
      teleport(1); // primer real
    }
    else if (index < 0 || index >= total) {
      teleport(1); // siempre al primer real
    }
  };

  /** Teleporta al índice dado sin animación en el mismo frame */
  const teleport = (realIndex: number) => {
    setAnimate(false);   // quita transición
    requestAnimationFrame(() => {
      setIndex(realIndex); // mueve instantáneo
      // A la siguiente cola de frames reactivamos la animación
      requestAnimationFrame(() => setAnimate(true));
    });
  };

  /* --------------------------- RENDER ------------------------------ */
  return (
    <section
      className="relative overflow-hidden w-full  h-[30vh] xl:h-screen min-h-[220px] select-none touch-none cursor-grab active:cursor-grabbing"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* Contenedor deslizante */}
      <div
        className={`flex h-full ${animate ? "transition-transform duration-250 ease-out" : ""}`}
        style={{
          transform: `translateX(calc(${-index * slideWidth}vw + ${offset}px))`
        }}
        onTransitionEnd={handleTransitionEnd}
        onDragStart={(e) => e.preventDefault()}
      >
        {extendedSlides.map(({ src, alt }, i) => (
            <div key={i} className="flex relative flex-shrink-0 w-screen h-full items-center justify-center">
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
              src={src}
              alt={alt}
              fill
              draggable={false}
              className="select-none pointer-events-none object-contain"
              sizes="100vw"
              style={{ objectFit: "contain" }}
              />
            </div>
            </div>
        ))}
      </div>

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
