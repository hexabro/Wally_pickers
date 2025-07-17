"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, ArrowRight } from 'lucide-react';

interface FlipCardProps {
  href: string;
  label: string;
  emoji: string;
}

const FlipCard: React.FC<FlipCardProps> = ({ href, label, emoji }) => (
  <Link href={href} className="block">
    <motion.div
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className="relative w-full h-16 rounded-xl shadow-lg overflow-hidden transform-gpu group"
    >
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-sky-600 to-indigo-500 text-white rounded-xl">
        <span className="text-lg font-semibold opacity-100 group-hover:opacity-0 transition-opacity duration-200">
          {label}
        </span>
        <span className="text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute">
          {emoji}
        </span>
      </div>
    </motion.div>
  </Link>
);

interface CategoryColumn {
  label: string;
  items: FlipCardProps[];
}

export default function CategorySection() {
  const columns: CategoryColumn[] = [
    {
      label: 'Alimentación',
      items: [
        { href: '#chocolates', label: 'Chocolates', emoji: '🍫' },
        { href: '#snacks', label: 'Snacks', emoji: '🍿' },
        { href: '#chicles', label: 'Chicles', emoji: '🍬' },
        { href: '#frutos-secos', label: 'Frutos secos', emoji: '🥜' },
      ],
    },
    {
      label: 'Limpieza',
      items: [
        { href: '#detergentes', label: 'Detergentes', emoji: '🧼' },
        { href: '#multiusos', label: 'Multiusos', emoji: '🧴' },
        { href: '#desinfectantes', label: 'Desinfectantes', emoji: '🧴' },
        { href: '#suavizantes', label: 'Suavizantes', emoji: '🧺' },
      ],
    },
    {
      label: 'Cosmética',
      items: [
        { href: '#champu', label: 'Champú', emoji: '🧴' },
        { href: '#gel-bano', label: 'Gel de baño', emoji: '🛁' },
        { href: '#crema-facial', label: 'Crema facial', emoji: '🥒' },
        { href: '#desodorante', label: 'Desodorante', emoji: '🧊' },
      ],
    },
  ];

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto flex flex-col items-center justify-center gap-8">

      <h2 className="text-4xl font-extrabold text-slate-800 text-center lg:text-left">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
            Explora nuestras categorías
          </span>
      </h2>

      <div className = "flex flex-col lg:flex-row items-center gap-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
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
          

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {columns.map((col) => (
              <div key={col.label} className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-700 border-b-2 border-sky-300 pb-1">
                  {col.label}
                </h3>
                <div className="space-y-4">
                  {col.items.map((item) => (
                    <FlipCard
                      key={item.href}
                      href={item.href}
                      label={item.label}
                      emoji={item.emoji}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 text-center lg:text-left">
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
              <Link
                href="/catalogo"
                className="inline-flex items-center px-6 py-3 rounded-full bg-green-600 text-white font-semibold hover:bg-green-500 transition-shadow shadow-lg hover:shadow-xl"
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
