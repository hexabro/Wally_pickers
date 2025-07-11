"use client";
import { motion } from "motion/react";

import { Check } from "lucide-react";
/**
 * TextCarousel
 * ----------------------------------------------------------------
 * • Recibe un array de strings en la prop `items`.
 * • Desplaza el texto de derecha a izquierda en bucle infinito.
 * • Duplica la lista para que no se vea “corte” cuando reinicia.
 */
type TextCarouselProps = {
  items: string[];
  speedSec?: number; // duración de un ciclo completo
};

export const TextCarousel: React.FC<TextCarouselProps> = ({
  items,
  speedSec = 20,
}) => {
  // Duplicamos los ítems para un loop perfecto
  const cuadrupled = [...items, ...items, ...items, ...items];

  return (
    <div className="w-full overflow-hidden bg-neutral-900 pb-0 mb-0 ">
      <motion.div
        className="flex whitespace-nowrap "
        // Desplazamos desde 0 % a -50 % del ancho total (porque hay el doble de ítems)
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: speedSec,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {cuadrupled.map((text, idx) => (
          <span
            key={idx}
            className="mx-8 text font-semibold text-white shrink-0 flex text-xl"
          >
            <Check className = "mr-2"></Check>
            
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
};
