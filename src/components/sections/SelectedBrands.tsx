"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const brands = [
  { name: "Calypso", logo: "/images/brands/calypso.svg" },
  { name: "Chilerito", logo: "/images/brands/chilerito.svg" },
  { name: "Coca-Cola", logo: "/images/brands/coca-cola.svg" },
  { name: "Costenya", logo: "/images/brands/costenya.svg" },
  { name: "Cream of Wheat", logo: "/images/brands/cream-of-wheat.svg" },
  { name: "Dubai", logo: "/images/brands/dubai.svg" },
  { name: "Feastables", logo: "/images/brands/feastables.svg" },
  { name: "General Mills", logo: "/images/brands/general-mills.svg" },
  { name: "Hershey", logo: "/images/brands/hershey.svg" },
  { name: "Honey Maid", logo: "/images/brands/honey-maid.svg" },
  { name: "Indomie", logo: "/images/brands/indomie.svg" },
  { name: "Jinro", logo: "/images/brands/jinro.svg" },
  { name: "Juan Valdez", logo: "/images/brands/juan-valdez.svg" },
  { name: "Kellogg's", logo: "/images/brands/kelloggs.svg" },
  { name: "Kikkoman", logo: "/images/brands/kikkoman.svg" },
  { name: "Lee Kum Kee", logo: "/images/brands/lee-kum-kee.svg" },
  { name: "Nerds", logo: "/images/brands/nerds.svg" },
  { name: "Nin Jiom", logo: "/images/brands/nin-jiom.svg" },
  { name: "Nissin", logo: "/images/brands/nissin.svg" },
  { name: "Nongshim", logo: "/images/brands/nongshim.svg" },
  { name: "PepsiCo", logo: "/images/brands/pepsico.svg" },
  { name: "Prime", logo: "/images/brands/prime.svg" },
  { name: "Reese's", logo: "/images/brands/reeses.svg" },
  { name: "Samyang", logo: "/images/brands/samyang.svg" },
  { name: "Sarape", logo: "/images/brands/sarape.svg" },
  { name: "Sempio", logo: "/images/brands/sempio.svg" },
  { name: "Sour Patch", logo: "/images/brands/sour-patch.svg" },
  { name: "Tajín", logo: "/images/brands/tajin.svg" },
  { name: "Toxic Waste", logo: "/images/brands/toxic-waste.svg" },
  { name: "Valentina", logo: "/images/brands/valentina.svg" },
];

export default function SelectedBrands() {
  return (
    <section className=" bg-gradient-to-b from-gray-50 to-white">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#0e344f] mb-4">
            Marcas que confían en nosotros
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Trabajamos con las marcas más reconocidas del mundo para ofrecerte productos de la más alta calidad
          </p>
          <div className="mt-6 w-24 h-0.5 bg-[#d68a49] mx-auto rounded-full"></div>
        </motion.div>

        {/* Brands Grid */}
        <motion.div
          className="flex flex-wrap justify-start items-start "
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {brands.map((brand, index) => (
            <motion.div
              key={brand.name}
              className="group flex items-center justify-center   bg-white   transition-all duration-300   w-32 h-20 sm:w-36 sm:h-24 md:w-40 md:h-28 lg:w-44 lg:h-32"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
              }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  fill
                  className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 "
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

    

        
      </div>
    </section>
  );
}
