'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

const logos = [
  'logo_template.svg',
  'logo_template.svg',
  'logo_template.svg',
  'logo_template.svg',
  'logo_template.svg',
  'logo_template.svg',
  'logo_template.svg',
  'logo_template.svg',
]

interface BrandCarouselProps {
  direction?: 'left' | 'right'
}

export default function BrandCarousel({ direction = 'right' }: BrandCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const updateScroll = () => {
      if (!container) return

      const scrollArea = container.scrollWidth / 3
      const speed = direction === 'left' ? 1 : -1

      container.scrollLeft += speed

      const min = 1
      const max = scrollArea * 2 - 1

      if (direction === 'left' && container.scrollLeft >= max) {
        container.style.transition = 'none' // Disable transition for reset
        container.scrollLeft = scrollArea
        setTimeout(() => container.style.transition = '', 0) // Re-enable transition
      } else if (direction === 'right' && container.scrollLeft <= min) {
        container.style.transition = 'none' // Disable transition for reset
        container.scrollLeft = scrollArea
        setTimeout(() => container.style.transition = '', 0) // Re-enable transition
      }
    }

    const scrollAreaInit = container.scrollWidth / 3
    container.scrollLeft = scrollAreaInit

    const interval = setInterval(updateScroll, 16)
    return () => clearInterval(interval)
  }, [direction])


  return (
    <section id="marcas" className="py-5 overflow-hidden bg-neutral-100">
      <div
        ref={containerRef}
        className="overflow-hidden whitespace-nowrap select-none"
      >
        <div className="flex gap-12 w-max">
          {[...logos, ...logos, ...logos, ...logos, ...logos, ...logos].map((logo, i) => (
            <Image
              key={i}
              src={`/images/brands/${logo}`}
              alt={logo}
              width={140}
              height={80}
              className="object-contain md:grayscale md:hover:grayscale-0"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
