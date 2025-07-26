"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Simple helper to join classes
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/ser-cliente", label: "Ser Cliente" },
  { href: "/quienes-somos", label: "Sobre Nosotros" },
  { href: "/contacto", label: "Contacto" },
  { href: "/blog", label: "Noticias" },
  
];

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="bg-[#0e344f] text-white">
      {/* Top footer nav */}
      <nav className="container mx-auto flex flex-wrap items-center justify-center gap-6 py-8 px-4">
        {navItems.map(({ href, label }) => {
          const isActive =
            pathname === href || (href !== "/" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "relative text-base font-medium transition-colors",
                isActive ? "text-blue-400" : "text-white hover:text-blue-300"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              {label}
              {/* underline */}
              <span
                className={cn(
                  "absolute -bottom-1 left-0 h-0.5 w-full scale-x-0 bg-blue-400 transition-transform origin-left",
                  isActive && "scale-x-100"
                )}
              />
            </Link>
          );
        })}
      </nav>

      {/* Legal link */}
      <div className="border-t border-[#091f2f] py-4">
        <div className="container mx-auto text-center text-sm">
          <Link
            href="/terminos-y-condiciones"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            Términos y Condiciones
          </Link>
        </div>
      </div>
    </footer>
  );
}
