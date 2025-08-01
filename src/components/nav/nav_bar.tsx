'use client';

import Link from 'next/link';
import Image from 'next/image';
import LanguageSelector from '../ui/LanguageSelector';
import { useState, useEffect } from 'react';
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
  { href: '/guia-compra', label: 'Guía de Compra' },
/*   { href: '/noticias', label: 'Noticias' },
 */  { href: '/contacto', label: 'Contacto' },
];

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showFixedNav, setShowFixedNav] = useState(false);
  const pathname = usePathname(); 

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show fixed nav when scrolling up and not at the top (past 100px)
      if (currentScrollY < lastScrollY && currentScrollY > 100) {
        setShowFixedNav(true);
      } else {
        setShowFixedNav(false);
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const NavContent = ({ isMobile = false }) => (
    <>
      {/* ---------- Botón hamburguesa (solo móvil) ---------- */}
      <button onClick={() => setIsOpen(true)} className="lg:hidden hover:cursor-pointer" aria-label="Abrir menú">
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
    </>
  );

  return (
    <>
      {/* Original Navigation Bar */}
      <header className="w-full bg-white relative z-[60]">
        <nav className="mx-auto flex items-center justify-between gap-6 px-6 py-4 h-20">
          <NavContent />
        </nav>
      </header>

      {/* Fixed Navigation Bar (appears when scrolling up) */}
      <header className={`w-full bg-white fixed top-0 left-0 right-0 z-[60] transition-transform duration-300 ease-in-out shadow-lg ${
        showFixedNav ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <nav className="mx-auto flex items-center justify-between gap-6 px-6 py-4 h-20">
          <NavContent />
        </nav>
      </header>

      {/* ---------- Menú lateral móvil ---------- */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-[60] ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <span className="text-xl font-semibold">Menú</span>
          <button onClick={() => setIsOpen(false)} className="text-gray-600 hover:cursor-pointer" aria-label="Cerrar menú">
            <X size={24} />
          </button>
        </div>
        <ul className="flex flex-col px-6 py-4 gap-4 text-base font-medium z-[60]">
          {navItems.map(({ href, label }) => {
            const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
            return (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'block transition-colors text-2xl ',
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
    </>
  );
}

export default NavBar;
