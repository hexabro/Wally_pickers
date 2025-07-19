import React from "react";
import Image from "next/image";

import AboutHero from "@/components/sections/about-hero";
import ContactForm from "@/components/sections/contactForm";
import FeaturesSection from "@/components/sections/featuresSection";
import ReviewsSection from "@/components/sections/ReviewsSection";

import { TextCarousel } from "@/components/ui/textCarousel";
import CatalogDownload from "@/components/sections/catalogDownload";
import ChatMessagesSection from "@/components/sections/FoundersSection";
/**
 * Página "Quiénes Somos"
 * ────────────────────────────────────────────────────────────────────────────
 * -   Sección 1: Imagen derecha, texto izquierda.
 * -   Sección 2: Misión – Imagen izquierda, texto derecha.
 * -   Sección 3: Historia – Timeline vertical.
 */


const AboutUsPage: React.FC = () => {
  return (
    <main className="space-y-8">
      {/* HERO */}

      <div className = "pb-0 mb-0">
       <AboutHero></AboutHero>

      </div>

      {/* CARROUSEL DE TEXTO  AUTOMÁTICO*/}
      <TextCarousel  items = {[
        "Precios competitivos", 
        "Envíos en 72 horas",
        "Productos en tendencia",
        "Procedencia internacional"
      ]}/>

      {/* FEATURES SECTION */}
      <FeaturesSection />



      {/* SECCIÓN DE PRESENTACIÓN */}
      <section className="flex items-center h-[80vh] mb-0 pb-0 ">
        

        <div className="relative flex-1 h-full m-0 p-0">
          <Image
            src="/images/about/fundadores.jpg"
            alt="Trabajador de Wally Pickers sonriendo"
            fill
            className="object-cover m-0-0 p-0"
          />
        </div>

        <div id="presentación" className="flex flex-col flex-1 pt-0 mt-0">
          <h1 className="font-semibold text-4xl mt-3 ml-7 mb-0 max-w-xl">
            ¿De dónde surge Wally Pickers?
          </h1>
          <p className="m-7 mt-4">
            Los fundadores detectaron un problema: muchos negocios tienen dificultades para identificar productos en tendencia, aún cuando estos cuentan con una gran demanda.
            <br /><br />
            Dando solución a esta necesidad nace Wally Pickers, que además de ofrecer productos en tendencia, garantiza un abastecimiento constante y eficiente.
          </p>
        </div>
      </section>


      {/* REVIEWS */}
      <div className = "bg-sky-900 mb-0 py-10">
        <ReviewsSection title = "Lo que opinan nuestros clientes" titleColor="white" backgroundColor=""></ReviewsSection>
      </div>
      {/* EL EQUIPO FUNDADOR */}
      <div className = "bg-neutral-100 pt-10 pb-5 mt-0">

        <ChatMessagesSection />

      </div>

      {/* CATALOG DOWNLOAD */}
      <CatalogDownload></CatalogDownload>
      

      {/* SECCIÓN DE FORMULARIO DE CONTACTO, FORMULARIO A LA DRECHA Y SECCIÓN DE TEXTO A LA IZQUIERDA */}
        <div className="mx-auto p-10 pt-0 flex flex-col md:flex-row items-stretch gap-8 ">
          <div className="relative  bg-center flex-1 rounded-lg text-center md:text-left flex flex-col justify-center h-auto" 
            style = {{ backgroundImage: "url(/images/contact/background.jpg)", }}>
          {/* DARK OVERLAY */}
          <div className="absolute inset-0 bg-black/30 z-0 rounded-lg" aria-hidden= "true"></div>
            {/* CONTENT INSIDE THE OVERLAY */}
            <div className="p-10 relative z-10">
              <h3 className="text-2xl font-semibold text-white mb-8">
                ¿Listo para empezar?
              </h3>
              <p className="text-white/80 mb-4">
                Rellena el formulario y nos pondremos en contacto contigo para ofrecerte una propuesta personalizada.
              </p>
              <p className="text-white/80 mb-4 flex-1">
                Nuestro equipo está listo para ayudarte a encontrar los productos perfectos para tu negocio y responder a todas tus preguntas.
              </p>
            </div>
          </div>

            <div className = "flex-1 h-full">
               <ContactForm />
            </div>
        </div>
    </main>
  );
};

export default AboutUsPage;
