"use client";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useRouter, usePathname, useParams } from 'next/navigation';

type Lang = "es" | "en" | "fr" | "de";

const languages: { code: Lang; label: string }[] = [
  { code: "es", label: "ES" },
  { code: "en", label: "EN" }, 
  { code: "fr", label: "FR" },
  { code: "de", label: "DE" }
];

const flagSrc: Record<Lang, string> = {
  es: "/images/flags/es.svg",
  en: "/images/flags/en.svg", 
  fr: "/images/flags/fr.svg",
  de: "/images/flags/de.svg",
};

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLocale, setCurrentLocale] = useState<Lang>('es');
  const dropDownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  
  console.log('LanguageSelector render - Current pathname:', pathname, 'Params:', params);
  
  // Get current locale from URL pathname
  const getCurrentLocale = (): Lang => {
    // First try to get from params
    if (params.locale && ['es', 'en', 'fr', 'de'].includes(params.locale as string)) {
      return params.locale as Lang;
    }
    
    // Fallback to pathname parsing
    const segments = pathname.split('/').filter(Boolean);
    const firstSegment = segments[0];
    
    // Check if the first segment is a valid locale
    if (['es', 'en', 'fr', 'de'].includes(firstSegment)) {
      return firstSegment as Lang;
    }
    
    // Default fallback
    return 'es';
  };

  // Update locale state when pathname or params change
  useEffect(() => {
    const newLocale = getCurrentLocale();
    console.log('LanguageSelector useEffect - Old locale:', currentLocale, 'New locale:', newLocale);
    setCurrentLocale(newLocale);
  }, [pathname, params]);

  const locale = currentLocale;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (lang: Lang) => {
    setIsOpen(false);
    
    // Extract the path without locale
    const segments = pathname.split('/').filter(Boolean);
    const currentLocale = segments[0];
    
    // Check if first segment is a valid locale
    const isLocaleInPath = ['es', 'en', 'fr', 'de'].includes(currentLocale);
    
    let pathWithoutLocale = '/';
    if (isLocaleInPath && segments.length > 1) {
      pathWithoutLocale = '/' + segments.slice(1).join('/');
    } else if (!isLocaleInPath && segments.length > 0) {
      pathWithoutLocale = '/' + segments.join('/');
    }
    
    const newPath = `/${lang}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`;
    
    router.push(newPath);
  };

  return (
    <div ref={dropDownRef} className="relative inline-block text-left">
      {/* BOTÓN PRINCIPAL */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex text-sm items-center gap-2 rounded-md bg-[#184c71] px-4 py-2 text-white font-medium hover:bg-[#0e344f] transition"
      >
        <Image
          key={locale} // Force re-render when locale changes
          src={flagSrc[locale]}
          alt={`Bandera ${locale}`}
          width={15}
          height={20}
          className="rounded-sm"
        />
        {locale.toUpperCase()}
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* LISTA DESPLEGABLE */}
      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <ul className="py-1 text-sm text-gray-700">
            {languages.map((lang) => (
              <li key={lang.code}>
                <button
                  onClick={() => handleSelect(lang.code)}
                  className={`flex w-full px-4 py-2 text-left hover:bg-gray-100 ${
                    locale === lang.code ? 'bg-gray-50 font-medium' : ''
                  }`}
                >
                  <Image
                    src={flagSrc[lang.code]}
                    alt={`Bandera ${lang.code}`}
                    width={20}
                    height={15}
                    className="mr-2 rounded-sm"
                  />
                  {lang.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}


