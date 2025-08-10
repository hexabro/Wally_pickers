'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

const defaultLogos = [
  'calypso.svg',
  'chilerito.svg',
  'coca-cola.svg',
  'costenya.svg',
  'cream-of-wheat.svg',
  'dubai.svg',
  'feastables.svg',
  'general-mills.svg',
  'hershey.svg',
  'honey-maid.svg',
  'indomie.svg',
  'jinro.svg',
  'juan-valdez.svg',
  'kelloggs.svg',
  'kikkoman.svg',
  'lee-kum-kee.svg',
  'nerds.svg',
  'nin-jiom.svg',
  'nissin.svg',
  'nongshim.svg',
  'pepsico.svg',
  'prime.svg',
  'reeses.svg',
  'samyang.svg',
  'sarape.svg',
  'sempio.svg',
  'sour-patch.svg',
  'tajin.svg',
  'toxic-waste.svg',
  'valentina.svg',
  'yucateco.svg',
]

interface BrandCarouselProps {
  direction?: 'left' | 'right'
  brands?: string[]
}

export default function BrandCarousel({ direction = 'right', brands = defaultLogos }: BrandCarouselProps) {
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
          {[...brands, ...brands, ...brands, ...brands, ...brands, ...brands].map((logo, i) => (
            <Image
              key={i}
              src={`/images/brands/${logo}`}
              alt={logo}
              loading = "lazy"
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
