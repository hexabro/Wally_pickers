"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, ArrowRight } from 'lucide-react';
import AnimatedColumns from "@/components/ui/AnimatedColumns"

interface FlipCardProps {
  href: string;
  label: string;
}

export const FlipCard: React.FC<FlipCardProps> = ({ href, label }) => (
  <Link href={href} className="block">
    <motion.div
      initial={{ opacity: 0.8, y: 5 }}
      whileHover={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="text-base font-semibold text-gray-700 hover:underline underline-offset-4 transition duration-200 ease-in-out"
    >
      {label}
    </motion.div>
  </Link>
);

export interface CategoryColumn {
  label: string;
  items: FlipCardProps[];
}

export default function CategorySection() {
  const columns: CategoryColumn[] = [
    {
      label: 'Alimentación',
      items: [
        { href: '#chocolates', label: 'Chocolates'},
        { href: '#snacks', label: 'Snacks' },
        { href: '#chicles', label: 'Chicles' },
        { href: '#frutos-secos', label: 'Frutos secos' },
      ],
    },
    {
      label: 'Limpieza',
      items: [
        { href: '#detergentes', label: 'Detergentes' },
        { href: '#multiusos', label: 'Multiusos' },
        { href: '#desinfectantes', label: 'Desinfectantes' },
        { href: '#suavizantes', label: 'Suavizantes' },
      ],
    },
    {
      label: 'Cosmética',
      items: [
        { href: '#champu', label: 'Champú' },
        { href: '#gel-bano', label: 'Gel de baño' },
        { href: '#crema-facial', label: 'Crema facial' },
        { href: '#desodorante', label: 'Desodorante' },
      ],
    },
  ];

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto flex flex-col items-center justify-center gap-8">

      <motion.h2
        className="text-4xl font-extrabold text-slate-800 text-center lg:text-left"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <span className="bg-clip-text text-blue-500">
          Explora nuestras categorías
        </span>
      </motion.h2>

      <div className = "flex flex-col lg:flex-row items-center gap-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2 w-full rounded-xl overflow-hidden shadow-xl"
        >
          <Image
            src="/images/categorias/imagen_trabajadora.jpg"
            alt="Cesta de productos"
            width={600}
            height={400}
            className="object-cover w-full h-full"
          />
        </motion.div>

        <div className="lg:w-1/2 w-full flex flex-col space-y-8">
          

          {/* Versión para móviles: cada columna es un <details> */}
          <div className = "lg:hidden">
            <AnimatedColumns CategoryColumns={columns}></AnimatedColumns>
          </div>


          {/* Versión para escritorio: 3 columnas visibles */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-6">
            {columns.map((col) => (
              <div key={col.label} className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-700 border-b-2 border-sky-300 pb-1">
                  {col.label}
                </h3>
                <div className="space-y-4">
                  {col.items.map((item) => (
                    <FlipCard key={item.href} {...item} />
                  ))}
                </div>
              </div>
            ))}
          </div>


          <div className="pt-4 text-center lg:text-left">
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
              <Link
                href="/catalogo"
                className="inline-flex items-center px-6 py-3 rounded-full bg-[#1470b1] text-white font-semibold hover:bg transition-shadow shadow-lg hover:shadow-xl"
              >
                Ver todos nuestros productos
                <ArrowRight size={20} className="ml-2" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
      
    </section>
  );
}
