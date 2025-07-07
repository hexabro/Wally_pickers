import Image from "next/image";
import React from "react";
import Link from "next/link";
import { button } from "framer-motion/client";

interface CustomerRectangleProps {
  /**
   * Texto pequeño en la parte superior (p. ej. "OUR CUSTOMERS")
   */
  tagline?: string;
  /**
   * Título principal (puede contener saltos de línea usando "\n")
   */
  title: string;
  /**
   * Ruta de la imagen (puede ser estática en /public o remota habilitando next.config)
   */
  imageSrc: string;
  /**
   * Texto alternativo para accesibilidad
   */
  imageAlt?: string;

  paragraph?: string; 

  buttonText?: string;
  /**
   * Enlace del botón (puede ser una ruta interna o externa)
   */
  buttonLink?: string;
}

/**
 * Sección de héroe en dos columnas con fondo de color y una imagen.
 * Adaptable y accesible.
 */
const CustomersRectangle: React.FC<CustomerRectangleProps> = ({
  tagline = "OUR CUSTOMERS",
  title,
  paragraph,
  imageSrc,
  imageAlt = "People enjoying food together",
  buttonText = "Contacta con nosotros",
  buttonLink = "#contacto",
}) => {
  return (
    <section className="w-full  p-20">
      {/* Contenedor con esquina redondeada y desbordamiento oculto para recortar la imagen */}
      <div className="overflow-hidden min-h-[60vh] rounded-2xl grid md:grid-cols-2">
        {/* Columna izquierda: texto sobre fondo rojo */}
        <div className="bg-[#0e344f] px-8 py-12 md:px-16 flex flex-col justify-center">
          <span className="text-white/80 uppercase tracking-widest text-xs md:text-sm font-semibold">
            {tagline}
          </span>
          <h2 className="mt-6 font-serif text-white text-4xl md:text-6xl leading-tight whitespace-pre-line">
            {title}
          </h2>
            {paragraph && (
                <p className="mt-4 text-white/80 text-base md:text-lg">
                {paragraph}
                </p>
            )}
          <Link  href = {buttonLink} className="mt-8 px-6 py-3 bg-white text-[#0e344f] font-semibold rounded-lg shadow hover:bg-gray-100 transition-colors">
            {buttonText}
          </Link>
        </div>

        {/* Columna derecha: imagen */}
        <div className="relative h-80 md:h-auto">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default CustomersRectangle;
           