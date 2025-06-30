"use client";
import Link from "next/link";
import Image from "next/image";
import LanguageSelector from "../ui/LanguageSelector";

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/marcas", label: "Marcas" },
  { href: "/ser-cliente", label: "Ser Cliente" },
  { href: "/quienes-somos", label: "Quiénes Somos" },
  { href: "/noticias", label: "Noticias" },
  { href: "/contacto", label: "Contacto"},
];

export default function NavBar() {
  return (
    <header className="w-full bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6">
        {/* ---------- Logo ---------- */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo_wally.svg" // cámbialo por tu ruta
            alt="Laborawi importación de comida del mundo"
            width={130}
            height={40}
            priority
          />
        </Link>

        {/* ---------- Links de navegación ---------- */}
        <ul className="lg:flex items-center gap-10 text-lg font-semibold text-[#070707]">
          {navItems.map(({ href, label}) => (
            <li key={href}>
              <Link
                href={href}
                className={`relative hover:text-[#0e344f] hover:underline hover:decoration-2 underline-offset-32`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* ---------- Selector de idioma ---------- */}
        <LanguageSelector/>
      </nav>
    </header>
  );
}
