"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Mail, Phone, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
// Simple helper to join classes
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}



export default function Footer() {
  const t = useTranslations("navigation");
  const f = useTranslations("footer");
  const navItems = [
  { href: t('homeHref'), label: t('home') },
  { href: t('catalogHref'), label: t('catalog') },
  { href: t('becomeClientHref'), label: t('becomeClient') },
  { href: t('aboutUsHref'), label: t('aboutUs') },
  { href: t('buyGuideHref'), label: t('buyGuide') },
  { href: t('contactHref'), label: t('contact') },
  
];
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
            <h3 className="text-lg font-semibold mb-4 text-blue-300">{f('contact.title')}</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 mt-0.5 text-blue-400 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">{f('contact.direction')}:</p>
                  <p className="text-white">
                    C/Francisco de Medina y Mendoza 50<br />
                    19171 Cabanillas del Campo (Guadalajara) – España
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">{f('contact.phone')}:</p>
                  <a href="tel:+34123456789" className="text-white hover:text-blue-300 transition-colors">
                    +34 640 69 05 04
                  </a>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">{f('contact.email')}:</p>
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
                {f('CompanyInfo.p1')}
              </p>
              <p>
                {f('CompanyInfo.p2')}
              </p>
            </div>
          </div>

          {/* Quality Certifications */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-300">{f('Coverage.title')}</h3>
            <div className="space-y-4">
              <p className="text-sm text-gray-300 mb-3">{f('Coverage.description')}</p>

              <ul className="space-y-2 text-xs text-gray-400">
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></div>
                  {f('Coverage.businesses.0')}
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></div>
                  {f('Coverage.businesses.1')}
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></div>
                  {f('Coverage.businesses.2')}
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></div>
                  {f('Coverage.businesses.3')}
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></div>
                  {f('Coverage.businesses.4')}
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></div>
                  {f('Coverage.businesses.5')}
                </li>
                </ul>
              
              <p className="text-xs text-gray-400 mt-3">
                {f('Coverage.worry')}
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
              {f('bottom.text')}
            </div>
            <div className="flex space-x-6 text-sm">
              <Link
                href={f('bottom.links.0.href')}
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                {f('bottom.links.0.label')}
              </Link>
              <Link
                href={f('bottom.links.1.href')}
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                {f('bottom.links.1.label')}
              </Link>
              <Link
                href={f('bottom.links.2.href')}
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                {f('bottom.links.2.label')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
