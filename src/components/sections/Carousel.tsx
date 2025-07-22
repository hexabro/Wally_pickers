"use client"

import { useEffect, useState, useRef } from "react";
import { motion, PanInfo, useMotionValue, useTransform } from "framer-motion";
import React, { JSX } from "react";
import { Transition } from "framer-motion";

/**
 * Hook que devuelve en tiempo real el ancho de la ventana.
 * Se define dentro del componente para no contaminar otros ficheros
 * con la directiva `"use client"`.
 */
function useWindowWidth() {
  const [width, setWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    // Escucha cambios de tamaño
    window.addEventListener("resize", handleResize);

    // Limpia el listener al desmontar
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}

export interface CarouselItem {
  /** Unique identifier for the slide */
  id: number;
  /** Image source (absolute or relative) */
  src: string;
  /** Optional alt text (important for accessibility) */
  alt?: string;
}

export interface CarouselProps {
  /** Array of images to show */
  items?: CarouselItem[];
  /** Width (and height if `round`) in pixels – si no se pasa se usa window.innerWidth */
  baseWidth?: number;
  /** Auto‑advance slides */
  autoplay?: boolean;
  /** Delay between auto‑advance (ms) */
  autoplayDelay?: number;
  /** Pause auto‑advance when hovering */
  pauseOnHover?: boolean;
  /** Loop back to first slide when the last finishes */
  loop?: boolean;
  /** Render the carousel as a perfect circle */
  round?: boolean;
}

// Demo images – replace with your own
const DEFAULT_ITEMS: CarouselItem[] = [
  { id: 1, src: "tmpl1", alt: "Random nature 1" },
  { id: 2, src: "tmpl2", alt: "Random nature 2" },
  { id: 3, src: "tmpl3", alt: "Random nature 3" },
];

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS: Transition = { type: "spring", stiffness: 300, damping: 30 };

export default function Carousel({
  items = DEFAULT_ITEMS,
  baseWidth,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
  round = false,
}: CarouselProps): JSX.Element {
  // Calcula el ancho efectivo: prop > windowWidth > fallback 300
  const windowWidth = useWindowWidth();
  const effectiveBaseWidth = (baseWidth ?? windowWidth) || 300;

  const containerPadding = 16;
  const itemWidth = effectiveBaseWidth - containerPadding * 2;
  const trackItemOffset = itemWidth + GAP;

  const carouselItems = loop ? [...items, items[0]] : items;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isResetting, setIsResetting] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (pauseOnHover && containerRef.current) {
      const container = containerRef.current;
      const handleMouseEnter = () => setIsHovered(true);
      const handleMouseLeave = () => setIsHovered(false);
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [pauseOnHover]);

  // Auto‑play behaviour
  useEffect(() => {
    if (autoplay && (!pauseOnHover || !isHovered)) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev === items.length - 1 && loop) {
            return prev + 1;
          }
          if (prev === carouselItems.length - 1) {
            return loop ? 0 : prev;
          }
          return prev + 1;
        });
      }, autoplayDelay);
      return () => clearInterval(timer);
    }
  }, [autoplay, autoplayDelay, isHovered, loop, items.length, carouselItems.length, pauseOnHover]);

  const effectiveTransition = isResetting ? { duration: 0 } : SPRING_OPTIONS;

  const handleAnimationComplete = () => {
    if (loop && currentIndex === carouselItems.length - 1) {
      setIsResetting(true);
      x.set(0);
      setCurrentIndex(0);
      setTimeout(() => setIsResetting(false), 50);
    }
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo): void => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
      if (loop && currentIndex === items.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex((prev) => Math.min(prev + 1, carouselItems.length - 1));
      }
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
      if (loop && currentIndex === 0) {
        setCurrentIndex(items.length - 1);
      } else {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
      }
    }
  };

  const dragProps = loop
    ? {}
    : {
        dragConstraints: {
          left: -trackItemOffset * (carouselItems.length - 1),
          right: 0,
        },
      };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden p-4 ${
        round ? "rounded-full border border-white" : "rounded-[24px] "
      }`}
      style={{
        width: `${effectiveBaseWidth}px`,
        ...(round && { height: `${effectiveBaseWidth}px` }),
      }}
    >
      <motion.div
        className="flex"
        drag="x"
        {...dragProps}
        style={{
          width: itemWidth,
          gap: `${GAP}px`,
          perspective: 1000,
          perspectiveOrigin: `${currentIndex * trackItemOffset + itemWidth / 2}px 50%`,
          x,
        }}
        onDragEnd={handleDragEnd}
        animate={{ x: -(currentIndex * trackItemOffset) }}
        transition={effectiveTransition}
        onAnimationComplete={handleAnimationComplete}
      >
        {carouselItems.map((item, index) => {
          const range = [-(index + 1) * trackItemOffset, -index * trackItemOffset, -(index - 1) * trackItemOffset];
          const outputRange = [90, 0, -90];
          const rotateY = useTransform(x, range, outputRange, { clamp: false });
          return (
            <motion.div
              key={index}
              className={`relative shrink-0 flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing ${
                round ? "bg-[#060010] border-0" : "bg-[#222] border border-[#222] rounded-[12px]"
              }`}
              style={{
                width: itemWidth,
                height: round ? itemWidth : "100%",
                rotateY,
                ...(round && { borderRadius: "50%" }),
              }}
              transition={effectiveTransition}
            >
              {/* SINGLE IMAGE ONLY */}
              <img
                src={`/images/hero/${item.src}.jpg`}
                alt={item.alt ?? `Carousel image ${index + 1}`}
                className="w-full h-full object-cover select-none pointer-events-none"
              />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Pagination Dots */}
      <div
        className={`flex w-full justify-center ${round ? "absolute z-20 bottom-12 left-1/2 -translate-x-1/2" : ""}`}
      >
        <div className="mt-4 flex w-[150px] justify-between px-8">
          {items.map((_, index) => (
            <motion.div
              key={index}
              className={`h-2 w-2 rounded-full cursor-pointer transition-colors duration-150 ${
                currentIndex % items.length === index
                  ? round
                    ? "bg-white"
                    : "bg-[#333333]"
                  : round
                    ? "bg-[#555]"
                    : "bg-[rgba(51,51,51,0.4)]"
              }`}
              animate={{ scale: currentIndex % items.length === index ? 1.2 : 1 }}
              onClick={() => setCurrentIndex(index)}
              transition={{ duration: 0.15 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
