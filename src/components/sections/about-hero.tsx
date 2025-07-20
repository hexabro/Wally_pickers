'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function AboutHero() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, when: 'beforeChildren' }
    },
  }
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <section className="relative w-full h-[70vh] md:h-[80vh] lg:h-[90vh] overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/about/hero-img-tmpl.jpg"
        alt="Hero background"
        fill
        className="object-cover object-bottom"
        priority
      />
      {/* Optional dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/30 z-10" />

      {/* Animated text card, aligned left-center */}
      <motion.div
        className="absolute inset-0 z-20 flex flex-col items-center md:flex-row md:justify-start justify-center px-6 md:px-16"
        variants={container}
        initial="hidden"
        animate="show"
        >
        <div className = "flex flex-col items-center md:items-start">
            <div className="bg-gray-800/90 p-8 rounded-lg shadow-xl max-w-xl">
                <motion.h2
                    className="text-4xl md:text-6xl font-semibold text-sky-600 mb-4"
                    variants={fadeInUp}
                    >
                    Confiables, rápidos, seguros y competitivos
                </motion.h2>
                <motion.p
                    className="text-gray-200 text-xl mb-6"
                    variants={fadeInUp}
                > 
                 En Wally Pickers garantizamos productos de máxima calidad y seguridad, entregados puntualmente y al mejor precio.
                </motion.p>
            </div>
            <motion.a
            href="#contact"
            className="inline-block bg-white text-gray-900 font-medium px-6 py-2 rounded shadow hover:bg-gray-100"
            variants={fadeInUp}
        >
            Contacta con nosotros
        </motion.a>
        </div>
        
        
        </motion.div>
    </section>
  )
}
