"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";

interface CustomerRectangleProps {
  tagline?: string;
  title: string;
  imageSrc: string;
  imageAlt?: string;
  paragraph?: string;
  buttonText?: string;
  buttonLink?: string;
}

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
    <section className="w-full py-6 sm:py-12 lg:py-20 px-4 sm:px-6 lg:px-20">
      <div className="overflow-hidden rounded-2xl grid grid-cols-1 md:grid-cols-2 min-h-[60vh]">
        {/* Texto */}
        <div className="bg-[#0e344f] flex flex-col justify-center px-4 sm:px-8 md:px-12 lg:px-16 py-6 sm:py-8 md:py-12">
          <span className="text-white/80 uppercase tracking-widest text-xs sm:text-sm md:text-base font-semibold">
            {tagline}
          </span>
          <h2 className="mt-4 sm:mt-6 font-serif text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight whitespace-pre-line">
            {title}
          </h2>
          {paragraph && (
            <p className="mt-3 sm:mt-4 text-white/80 text-sm sm:text-base md:text-lg">
              {paragraph}
            </p>
          )}
          <Link
            href={buttonLink}
            className="
              inline-block mt-6 sm:mt-8
              bg-white text-[#0e344f] font-semibold
              rounded-lg
              px-4 py-2 sm:px-6 sm:py-3
              shadow-md hover:bg-gray-100
              transition-colors
            "
          >
            {buttonText}
          </Link>
        </div>

        {/* Imagen */}
        <div className="relative h-48 sm:h-64 md:h-auto rounded-b-2xl md:rounded-bl-none overflow-hidden">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default CustomersRectangle;
