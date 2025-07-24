"use client"
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, LucideIcon } from 'lucide-react';
import AnimatedColumns from "@/components/ui/AnimatedColumns"

import {
  Candy,
  Cookie,
  Nut,
  SprayCan,
  Droplets,
  Sparkles,
  ShowerHead,
  Smile,
  ShieldCheck
} from "lucide-react";


interface FlipCardProps {
  href: string;
  label: string;
  icon: LucideIcon;
}

export const FlipCard: React.FC<FlipCardProps> = ({ href, label, icon: Icon}) => (
  <Link key={href} href={href} className="block">
    <motion.div
      initial={{ opacity: 0.8, y: 5 }}
      whileHover={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.1, ease: "linear" }}
      className="text-base text-center font-semibold  text-white hover:underline underline-offset-4 transition duration-200 ease-in-out"
    >
      <Icon className = "inline mr-2 "></Icon>
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
      { href: '#chocolates', label: 'Chocolates', icon: Candy },
      { href: '#snacks', label: 'Snacks', icon: Cookie },
      { href: '#chicles', label: 'Chicles', icon: Cookie },
      { href: '#frutos-secos', label: 'Frutos secos', icon: Nut },
    ],
  },
  {
    label: 'Limpieza',
    items: [
      { href: '#detergentes', label: 'Detergentes', icon: SprayCan },
      { href: '#multiusos', label: 'Multiusos', icon: SprayCan },
      { href: '#desinfectantes', label: 'Desinfectantes', icon: ShieldCheck },
      { href: '#suavizantes', label: 'Suavizantes', icon: Droplets },
    ],
  },
  {
    label: 'Cosmética',
    items: [
      { href: '#champu', label: 'Champú', icon: Sparkles },
      { href: '#gel-bano', label: 'Gel de baño', icon: ShowerHead },
      { href: '#crema-facial', label: 'Crema facial', icon: Smile },
      { href: '#desodorante', label: 'Desodorante', icon: Sparkles },
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
                    <motion.div
                      key={item.href}
                      whileHover={{ scale: 1.03 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    > 
                      <Link key = {item.href} href= {item.href} className = "block ">
                        <item.icon size = {18} className = "text-blue-500 inline mr-2"></item.icon>
                        {item.label}
                        <div className = "border-1 border-dashed mt-2 "></div>
                      </Link>
                    </motion.div>
                    
                  ))}
                </div>
              </div>
            ))}
          </div>


          <div className="pt-4 text-center lg:text-left">
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
              <Link
                key="ver-todos-productos"
                href="/catalogo"
                className="inline-flex items-center px-6 py-3 rounded-full bg-[#d68a49] text-white font-semibold hover:bg transition-shadow shadow-lg hover:shadow-xl"
              >
                Ver todos nuestros productos
                <ArrowRight size={20} className="ml-2 mt-1" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
      
    </section>
  );
}
