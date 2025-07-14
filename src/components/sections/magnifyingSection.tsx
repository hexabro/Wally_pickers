"use client";
import React, { useState, useRef } from 'react';
import styles from './magnifyingSection.module.css';

export default function MagnifyingSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pointer, setPointer] = useState<{ x: number; y: number }>({ x: -100, y: -100 });

  // Lógica compartida para actualizar posición
  const updatePointer = (clientX: number, clientY: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setPointer({
        x: clientX - rect.left,
        y: clientY - rect.top
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) =>
    updatePointer(e.clientX, e.clientY);

  const handleMouseLeave = () =>
    setPointer({ x: -100, y: -100 });

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const t = e.touches[0];
    updatePointer(t.clientX, t.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const t = e.touches[0];
    updatePointer(t.clientX, t.clientY);
  };

  const handleTouchEnd = () =>
    setPointer({ x: -100, y: -100 });

  const clip = `circle(80px at ${pointer.x}px ${pointer.y}px)`;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      // 1) usando Tailwind: touch-none
      // 2) o estilo inline:
      style={{ touchAction: 'none' }}
      className={`
        p-5 mx-auto 
        md:px-20 md:flex md:flex-row flex-col items-center gap-10 
        text-center md:text-left 
        relative overflow-visible 
        cursor-none 
        h-auto md:h-80
      `}
    >
      {/* Texto difuminado */}
      <div className="absolute inset-0 md:filter blur-sm">
        <div className="flex flex-col items-center md:items-start p-4 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-50 underline underline-offset-13 decoration-dashed">
            Calidad garantizada
          </h2>
          <p className="text-[#f7f7f7] leading-relaxed">
            Trabajamos con fabricantes y distribuidores líderes en Asia, América, Europa y Reino Unido.<br />
            Contamos con más de 300 productos internacionales listos para tu negocio, con alta rotación,<br />
            márgenes competitivos y distribución eficiente.
          </p>
        </div>
      </div>

      {/* Spotlight clear layer */}
      <div
        className="absolute inset-0"
        style={{ clipPath: clip, WebkitClipPath: clip }}
      >
        <div className="flex flex-col items-center md:items-start p-4 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-50 underline underline-offset-13 decoration-dashed">
            Calidad garantizada
          </h2>
          <p className="text-[#f7f7f7] leading-relaxed">
            Trabajamos con fabricantes y distribuidores líderes en Asia, América, Europa y Reino Unido.<br />
            Contamos con más de 300 productos internacionales listos para tu negocio, con alta rotación,<br />
            márgenes competitivos y distribución eficiente.
          </p>
        </div>
      </div>

      {/* Lupa */}
      <div
        className="absolute w-40 h-40 rounded-full border-2 border-white pointer-events-none"
        style={{ left: pointer.x - 80, top: pointer.y - 80 }}
      />
      <div
        className="absolute w-2 h-20 bg-white pointer-events-none"
        style={{
          left: pointer.x - 60,
          top: pointer.y + 50,
          transform: 'rotate(45deg)',
          transformOrigin: 'top left'
        }}
      />
    </div>
  );
}
