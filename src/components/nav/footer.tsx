"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Mail, Phone, MapPin } from "lucide-react";

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
    <footer className="bg-[#0e344f] text-white px-4">
      {/* Main footer content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-300">Navegación</h3>
            <nav className="flex flex-col space-y-3">
              {navItems.map(({ href, label }) => {
                const isActive =
                  pathname === href || (href !== "/" && pathname.startsWith(href));
                return (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      "text-sm transition-colors hover:text-blue-300",
                      isActive ? "text-blue-400" : "text-gray-300"
                    )}
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-300">Contacto</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 mt-0.5 text-blue-400 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">Dirección:</p>
                  <p className="text-white">
                    C/Francisco de Medina y Mendoza 50<br />
                    19171 Cabanillas del Campo (Guadalajara) – España
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">Teléfono:</p>
                  <a href="tel:+34123456789" className="text-white hover:text-blue-300 transition-colors">
                    +34 640 69 05 04
                  </a>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">Email:</p>
                  <a href="mailto:ventas@wallypickers.com" className="text-white hover:text-blue-300 transition-colors">
                    ventas@wallypickers.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-300">Wally Pickers</h3>
            <div className="space-y-3 text-sm text-gray-300">
              <p>
                Especialistas en importación y distribución de productos internacionales de calidad.
              </p>
              <p>
                Más de 300 productos en tendencia esperando ser descubiertos.
              </p>
            </div>
          </div>

          {/* Quality Certifications */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-300">Cobertura</h3>
            <div className="space-y-4">
              <p className="text-sm text-gray-300 mb-3">Negocios que apoyamos con calidad:</p>
              
              {/* Placeholder for certification images */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/10 rounded-lg p-3 flex items-center justify-center min-h-[60px] border border-gray-600">
                  <span className="text-xs text-center text-gray-400">
                    Restaurantes / Bares / Cafeterías
                  </span>
                </div>
                <div className="bg-white/10 rounded-lg p-3 flex items-center justify-center min-h-[60px] border border-gray-600">
                  <span className="text-xs text-center text-gray-400">
                    Supermercados
                  </span>
                </div>
                <div className="bg-white/10 rounded-lg p-3 flex items-center justify-center min-h-[60px] border border-gray-600">
                  <span className="text-xs text-center text-gray-400">
                    Distribuidores o mayoristas
                  </span>
                </div>
                <div className="bg-white/10 rounded-lg p-3 flex items-center justify-center min-h-[60px] border border-gray-600">
                  <span className="text-xs text-center text-gray-400">
                    Hoteles 
                  </span>
                </div>
                <div className="bg-white/10 rounded-lg p-3 flex items-center justify-center min-h-[60px] border border-gray-600">
                  <span className="text-xs text-center text-gray-400">
                    Catering
                  </span>
                </div>
                <div className="bg-white/10 rounded-lg p-3 flex items-center justify-center min-h-[60px] border border-gray-600">
                  <span className="text-xs text-center text-gray-400">
                    Tiendas especializadas
                  </span>
                </div>
              </div>
              
              <p className="text-xs text-gray-400 mt-3">
                * ¿No ves tu negocio aquí? ¡Contáctanos! Estamos en constante expansión y buscamos nuevos socios.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom footer */}
      <div className="border-t border-[#091f2f]">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © 2025 Wally Pickers S.L. Todos los derechos reservados.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link
                href="/terminos-y-condiciones"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Términos y Condiciones
              </Link>
              <Link
                href="/politica-privacidad"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Política de Privacidad
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
