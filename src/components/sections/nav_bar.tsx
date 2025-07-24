'use client';

import Link from 'next/link';
import Image from 'next/image';
import LanguageSelector from '../ui/LanguageSelector';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

// Helper opcional para concatenar clases
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

const navItems = [
  { href: '/', label: 'Inicio' },
  { href: '/catalogo', label: 'Catálogo' },
  { href: '/ser-cliente', label: 'Ser Cliente' },
  { href: '/quienes-somos', label: 'Quiénes Somos' },
  { href: '/noticias', label: 'Noticias' },
  { href: '/contacto', label: 'Contacto' },
];

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); 

  return (
    <header className="w-full bg-white relative z-50">
      <nav className="mx-auto flex  items-center justify-between gap-6 px-6 py-4 h-20">
        {/* ---------- Botón hamburguesa (solo móvil) ---------- */}
        <button onClick={() => setIsOpen(true)} className="lg:hidden" aria-label="Abrir menú">
          <Menu size={28} />
        </button>

        {/* ---------- Logo (solo desktop) ---------- */}
        <Link href="/" className="hidden lg:flex  ml-4">
          <Image
            src="/images/logo_wally.svg"
            alt="Wally pickers logo"
            width={130}
            height={40}
            priority
          />
        </Link>

        {/* ---------- Links navegación (desktop) ---------- */}
        <ul className="hidden lg:flex items-center gap-10 text-lg font-medium">
          {navItems.map(({ href, label }) => {
            const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    'relative transition-colors font-semibold',
                    isActive
                      ? 'text-[#1a5a85] underline decoration-2 underline-offset-8'
                      : 'text-[#070707] hover:text-[#6b80c1] hover:underline hover:decoration-2 underline-offset-8'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {label}
                </Link>
              </li>
            );
          })}
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
          <button onClick={() => setIsOpen(false)} className="text-gray-600" aria-label="Cerrar menú">
            <X size={24} />
          </button>
        </div>
        <ul className="flex flex-col px-6 py-4 gap-4 text-base font-medium">
          {navItems.map(({ href, label }) => {
            const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
            return (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'block transition-colors',
                    isActive ? 'text-blue-600' : 'text-gray-800 hover:text-[#798ea6]'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* ---------- Overlay al abrir menú ---------- */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setIsOpen(false)} />
      )}
    </header>
  );
}

export default NavBar;
