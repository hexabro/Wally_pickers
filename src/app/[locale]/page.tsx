"use client";
import MagnifyingSection from "@/components/sections/magnifyingSection"
import StatsStrip from "@/components/sections/metrics";
import CategorySection from "@/components/sections/categories";
import  BrandCarousel  from "@/components/sections/brandCarousel";
import CatalogDownload from "@/components/sections/catalogDownload";
import CategoryCards from "@/components/sections/CategoryCards";

import AnimatedUnderline from "@/components/ui/animatedUnderline";
import Image from "next/image";
import { SwipeCarousel } from "@/components/sections/SwipeCarousel";
import ContactSection from "@/components/sections/ContactSection";

import { useTranslations } from "next-intl";

/** -------------------------------------------------------------
 *  Wally Pickers – Página de inicio (tipo landing)            
 *  Estructura solicitada por el cliente:                      
 *    1. Hero slider                                           
 *    2. Procedencia + CTA a marcas                            
 *    3. Métricas destacadas                                   
 *    4. Carrusel de marcas colaboradoras                      
 *    5. Categorías de producto + CTA catálogo                 
 *    6. Formulario descarga de catálogo                       
 *  Tailwind CSS + Next Image + React (sin librerías extra).   
 *  ----------------------------------------------------------*/


/* PRESENTACIÓN */


function Presentacion() {

  const t = useTranslations('home.presentation');
  return (
    <section className="text-center py-16 px-4 bg-white">
      <h2 className="text-3xl md:text-4xl font-bold text-sky-950">
        {t('title')} {' '}
        <AnimatedUnderline>  {t('span')} </AnimatedUnderline>
        {' '}
      </h2>

      <p className="mt-6 max-w-5xl  mx-auto text-gray-700 text-lg leading-relaxed">
        {t('description')}
      </p>

      <CategoryCards/>
      
      
    </section>  
  )
}










/* ========================== EXPORT ========================== */
export default function HomePage() {
  const t = useTranslations('home');

  return (
    <main>
      {/* CAROUSEL */}
      <div className = "mx-auto">
        <SwipeCarousel></SwipeCarousel>
      </div>  


      
      <Presentacion />
      
      <section className="flex flex-col md:flex-row bg-[#2c81be] items-center justify-center">
        <div className="w-full md:w-1/2 h-64 my-20">
          <MagnifyingSection  
            title = {t('magnifySection.title')}
            description = {t('magnifySection.description')}
            titleColor="white" 
            descColor= "white"
            magnifyColor="border-white" 
            stickColor="bg-white"
            textCentered={false}
            bgColor="bg-[#2c81be]"/>

        </div>
        <div className="w-full md:w-1/2">
          <Image
            src="/images/mapa_wally.png"
            alt="Mapa de proveedores de Wally Pickers"
            loading = "lazy"
            width={600}
            height={500}
            className="h-auto object-cover md:rounded-lg mb-10"
          />
        </div>
      </section>

      <StatsStrip />
      <div className = "bg-neutral-100 pt-10 pb-5 ">
        <h2 className="text-3xl font-bold text-center text-sky-900 bg-neutral-100">
          {t('brandCarousel.title')}
        </h2>
        <p className = "text-center pt-3.5 ">{t('brandCarousel.description')}</p>
      </div>
      
      <BrandCarousel 
        direction="right" 
        brands={[
          'calypso.svg',
          'chilerito.svg',
          'coca-cola.svg',
          'costenya.svg',
          'cream-of-wheat.svg',
          'dubai.svg',
          'feastables.svg',
          'general-mills.svg',
          'hershey.svg',
          'honey-maid2.svg',
          'indomie.svg',
          'jinro.svg',
          'juan-valdez2.svg',
          'kelloggs.svg',
          'kikkoman.svg',
          'lee-kum-kee.svg'
        ]} 
      />
      <BrandCarousel 
        direction="left" 
        brands={[
          'nerds.svg',
          'nin-jiom.svg',
          'nissin.svg',
          'nongshim.svg',
          'pepsico.svg',
          'prime.svg',
          'reeses.svg',
          'samyang.svg',
          'sarape.svg',
          'sempio.svg',
          'sour-patch.svg',
          'tajin.svg',
          'toxic-waste.svg',
          'valentina.svg',
          'yucateco.svg'
        ]} 
      />
      
      <CategorySection />

      <CatalogDownload />

      {/* SECCIÓN DE FORMULARIO DE CONTACTO, FORMULARIO A LA DRECHA Y SECCIÓN DE TEXTO A LA IZQUIERDA */}
      <ContactSection></ContactSection>  
    </main>
  );
}
