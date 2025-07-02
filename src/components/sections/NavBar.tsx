'use client';
import Link from 'next/link';
import Image from 'next/image';
import LanguageSelector from '../ui/LanguageSelector';
import { useState } from 'react';
import { Menu, X } from 'lucide-react'; // o cualquier ícono de hamburguesa que uses

const navItems = [
  { href: '/', label: 'Inicio' },
  { href: '/marcas', label: 'Marcas' },
  { href: '/ser-cliente', label: 'Ser Cliente' },
  { href: '/quienes-somos', label: 'Quiénes Somos' },
  { href: '/noticias', label: 'Noticias' },
  { href: '/contacto', label: 'Contacto' },
];

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full bg-white relative z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 h-20">
        {/* ---------- Botón hamburguesa (solo móvil) ---------- */}
        <button
          onClick={() => setIsOpen(true)}
          className="lg:hidden"
          aria-label="Abrir menú"
        >
          <Menu size={28} />
        </button>

        {/* ---------- Logo (solo desktop) ---------- */}
        <Link href="/" className="hidden lg:flex items-center gap-2">
          <Image
            src="/images/logo_wally.svg"
            alt="Wally pickers logo"
            width={130}
            height={40}
            priority
          />
        </Link>

        {/* ---------- Links navegación (desktop) ---------- */}
        <ul className="hidden lg:flex items-center gap-10 text-lg font-medium text-[#070707]">
          {navItems.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="relative hover:text-[#798ea6] hover:underline hover:decoration-2 underline-offset-32"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* ---------- Selector de idioma ---------- */}
        <LanguageSelector />
      </nav>

      {/* ---------- Menú lateral móvil ---------- */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <span className="text-xl font-semibold">Menú</span>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-600"
            aria-label="Cerrar menú"
          >
            <X size={24} />
          </button>
        </div>
        <ul className="flex flex-col px-6 py-4 gap-4 text-base">
          {navItems.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={() => setIsOpen(false)}
                className="block text-gray-800 hover:text-[#798ea6] font-medium"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* ---------- Overlay al abrir menú ---------- */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </header>
  );
}
