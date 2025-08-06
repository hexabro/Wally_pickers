"use client"; 
import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import AboutHero from "@/components/sections/about-hero";
import ContactForm from "@/components/sections/contactForm";
import FeaturesSection from "@/components/sections/featuresSection";
import ReviewsSection from "@/components/sections/ReviewsSection";

import { TextCarousel } from "@/components/ui/textCarousel";
import CatalogDownload from "@/components/sections/catalogDownload";
import FoundersSection from "@/components/sections/FoundersSection";
/**
 * Página "Quiénes Somos"
 * ────────────────────────────────────────────────────────────────────────────
 * -   Sección 1: Imagen derecha, texto izquierda.
 * -   Sección 2: Misión – Imagen izquierda, texto derecha.
 */


const AboutUsPage: React.FC = () => {
  const t = useTranslations('about-us');
  
  return (
    <main className="space-y-8">
      {/* HERO */}

      <div className = "pb-0 mb-0">
       <AboutHero></AboutHero>

      </div>

    

      {/* FEATURES SECTION */}
      <FeaturesSection />

      {/* SECCIÓN DE PRESENTACIÓN */}
      <section className="flex flex-col sm:flex-row items-center justify-center h-auto sm:h-[80vh] mb-0  sm:p-16 p-8 gap-8">
        <div className="relative flex justify-center items-center w-full sm:w-1/2 h-64 sm:h-full mb-6 sm:mb-0">
          <Image
            src="/images/about/othon&jhonny.jpg"
            alt="Trabajador de Wally Pickers sonriendo"
            width={600}
            height={500}
            className="object-cover rounded-4xl shadow-lg w-full h-full"
            style={{ maxHeight: "600px" }}
          />
        </div>

        <div id="presentación" className="flex flex-col w-full sm:w-1/2 pt-0 mt-0">
          <h1 className="font-semibold text-3xl sm:text-4xl mt-3 sm:ml-7 mb-0 max-w-xl text-[#0e344f]">
            {t('presentation.title')}
          </h1>
          <p className="m-0 sm:m-7 mt-4">
            {t('presentation.description')}
            <br /><br />
            {t('presentation.description2')}
          </p>
        </div>
      </section>


      {/* REVIEWS */}
      <div className = "bg-sky-900 mb-0 py-10">
        <ReviewsSection titleColor="white" backgroundColor=""></ReviewsSection>
      </div>

      {/* EL EQUIPO FUNDADOR */}{/* 
      <div className = "bg-neutral-100   mt-0">

        <FoundersSection />

      </div> */}

      

      {/* SECCIÓN DE FORMULARIO DE CONTACTO, FORMULARIO A LA DRECHA Y SECCIÓN DE TEXTO A LA IZQUIERDA */}
        <div id="contact" className="mx-auto p-10 pt-10 flex flex-col md:flex-row items-stretch gap-8 ">
          <div className="relative  bg-center flex-1 rounded-lg text-center md:text-left flex flex-col justify-center h-auto" 
            style = {{ backgroundImage: "url(/images/contact/background.jpg)", }}>
          {/* DARK OVERLAY */}
          <div className="absolute inset-0 bg-black/30 z-0 rounded-lg" aria-hidden= "true"></div>
            {/* CONTENT INSIDE THE OVERLAY */}
            <div className="p-10 relative z-10">
              <h3 className="text-2xl font-semibold text-white mb-8">
                {t('contactSection.title')}
              </h3>
              <p className="text-white/80 mb-4">
                {t('contactSection.description1')}
              </p>
              <p className="text-white/80 mb-4 flex-1">
                {t('contactSection.description2')}
              </p>
            </div>
          </div>

            <div className = "flex-1 h-full">
               <ContactForm />
            </div>
        </div>

      {/* SECCIÓN DE DESCARGA DE CATÁLOGO */}
      <CatalogDownload textColor = "text-[#0e344f]" bgColor="bg-gray-50"/>

    </main>
  );
};

export default AboutUsPage;
