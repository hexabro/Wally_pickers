"use client";
import React, { useRef, useLayoutEffect, useEffect, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

interface AnimatedCircleWordProps {
  word: string;
  className?: string;
}

const AnimatedCircleWord: React.FC<AnimatedCircleWordProps> = ({ word, className = "" }) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  // Hook para controlar la animación
  const controls = useAnimation();
  // Devuelve true cuando el elemento entra en el viewport
  const isInView = useInView(containerRef, { once: true, amount: 0.5 });
  const [diameter, setDiameter] = useState(0);

  // Calculamos el diámetro del contorno basándonos en el texto
  useLayoutEffect(() => {
    if (textRef.current) {
      const { width, height } = textRef.current.getBoundingClientRect();
      const paddingX = 6;
      const paddingY = 4;
      const diam = Math.max(width + paddingX * 2, height + paddingY * 2);
      setDiameter(diam);
    }
  }, [word]);

  // Cuando `isInView` pasa a true lanzamos la animación
  useEffect(() => {
    if (isInView) {
      controls.start({ strokeDashoffset: 0 });
    }
  }, [isInView, controls]);

  // Radios y dimensiones
  const margin = 0;
  const baseRx = diameter / 2;
  const rx = baseRx + margin;
  const ry = rx * 0.6;
  const svgWidth = rx * 2;
  const svgHeight = ry * 2;

  // Aproximación de Ramanujan para la circunferencia de la elipse
  const ellipseCircumference = Math.PI * (
    3 * (rx + ry) -
    Math.sqrt((3 * rx + ry) * (rx + 3 * ry))
  );

  return (
    <span
      ref={containerRef}
      className={`inline-block relative whitespace-nowrap overflow-visible ${className}`}
    >
      {diameter > 0 && (
        <motion.svg
          width={svgWidth}
          height={svgHeight}
          className="absolute z-10 overflow-visible"
          style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
        >
          <motion.ellipse
            cx={svgWidth / 2}
            cy={svgHeight / 2}
            rx={rx}
            ry={ry}
            stroke="#d68a49"
            strokeWidth={2}
            fill="transparent"
            initial={{ strokeDasharray: ellipseCircumference, strokeDashoffset: ellipseCircumference }}
            // Usamos `controls` en lugar de `animate`
            animate={controls}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
        </motion.svg>
      )}
      <span ref={textRef} className="relative z-10 px-1">
        {word}
      </span>
    </span>
  );
};

export default AnimatedCircleWord;
