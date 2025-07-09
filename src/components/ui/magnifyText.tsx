"use client";
// components/sections/MagnifyText.tsx
import { useRef, useState } from 'react';
import styles from './magnifyText.module.css';

type MagnifyTextProps = {
  text: string;
  radius?: number;          // radio de la lupa (px)
  blur?: number;            // intensidad de desenfoque (px)
};

export default function MagnifyText({
  text,
  radius = 80,
  blur = 6,
}: MagnifyTextProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [lensPos, setLensPos] = useState({ x: -9999, y: -9999 }); // fuera de pantalla

  const handleMove = (e: React.MouseEvent) => {
    const rect = wrapperRef.current!.getBoundingClientRect();
    setLensPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={wrapperRef}
      className={styles.wrapper}
      style={
        {
          /** Pasamos datos CSS al módulo (radio, blur, posición) */
          '--radius': `${radius}px`,
          '--blur': `${blur}px`,
          '--x': `${lensPos.x}px`,
          '--y': `${lensPos.y}px`,
        } as React.CSSProperties
      }
      onMouseMove={handleMove}
      onMouseLeave={() => setLensPos({ x: -9999, y: -9999 })} // ocultar al salir
    >
      {/* Texto original sin desenfoque */}
      <p className={styles.text}>{text}</p>

      {/* Capa borrosa clonada */}
      <p className={styles.textBlur} aria-hidden>
        {text}
      </p>

      {/* Lente que sigue al ratón */}
      <div className={styles.lens} aria-hidden />
    </div>
  );
}

// ejemplo de uso:
// <MagnifyText text="Texto que se magnifica al pasar el ratón" radius={80} blur={6} />
// Puedes ajustar el radio y el desenfoque según tus necesidades.