'use client'

import { useState, useEffect } from "react";
import Image from "next/image";


const brandLogos = [
  "logo_template.jpg",
  "logo_template.jpg",
  "logo_template.jpg",
  "logo_template.jpg",
  "logo_template.jpg",
  "logo_template.jpg",
  "logo_template.jpg",
  "logo_template.jpg",
];



export default function BrandCarousel() {
  const brandLogos = [
    'logo_template.jpg',
    'logo_template.jpg',
    'logo_template.jpg',
    'logo_template.jpg',
    'logo_template.jpg',
    'logo_template.jpg',
    'logo_template.jpg',
  ]

  const [offset, setOffset] = useState(0)
  const [direction, setDirection] = useState(1)
  const logoWidth = 160 // 140px ancho + ~20px gap
  const visibleCount = 3 // ajusta según tu diseño

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => {
        const maxOffset = (brandLogos.length - visibleCount) * logoWidth
        const next = prev + direction * logoWidth

        if (next >= maxOffset || next <= 0) {
          setDirection((d) => -d) // cambia dirección
        }

        return Math.min(Math.max(next, 0), maxOffset)
      })
    }, 2500)

    return () => clearInterval(interval)
  }, [direction])

  return (
    <section id="marcas" className="py-16 bg-neutral-100">
      <h2 className="text-3xl font-bold text-center mb-8 text-sky-900">
        Marcas que confían en nosotros
      </h2>

      <div className="overflow-hidden">
        <div
          className="flex gap-12 transition-transform duration-700"
          style={{ transform: `translateX(-${offset}px)` }}
        >
          {brandLogos.map((logo, i) => (
            <Image
              key={i}
              src={`/images/brands/${logo}`}
              alt={logo.replace('.svg', '')}
              width={140}
              height={80}
              className="object-contain"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
