import React from "react";
import Image from "next/image";

import ContactForm from "@/components/sections/contactForm";

import { TextCarousel } from "@/components/ui/textCarousel";
import ProfileCardsSection from "@/components/sections/ContactCards";
import CatalogDownload from "@/components/sections/catalogDownload";
/**
 * Página "Quiénes Somos"
 * ────────────────────────────────────────────────────────────────────────────
 * -   Sección 1: Imagen derecha, texto izquierda.
 * -   Sección 2: Misión – Imagen izquierda, texto derecha.
 * -   Sección 3: Historia – Timeline vertical.
 */


const AboutUsPage: React.FC = () => {
  return (
    <main className="space-y-24">
      {/* ── Sección 1 ─────────────────────────────────────────────────────── */}
      <section className="flex items-center h-[80vh]  mb-0 pb-0 ">
        <div id="presentación" className="flex flex-col flex-1  md-w-1/2 p-0 pr-0">
          <small className = "font-light text-2xl m-7 mb-0">¡HOLA!</small>

          <h1 className="font-bold text-4xl m-7 mb-0">
            Encantados de conocerte    
          </h1>
          <p className="m-7 mt-4 max-w-[500px]">
            Somos Wally Pickers, y tenemos un reto claro: transformar la forma en que los negocios gestionan sus productos de alta rotación.
          </p>
        </div>

        <div className="relative flex-1 h-full md:w-1/2 m-0 p-0">
          <Image
            src="/images/mozo.jpg"
            alt="Trabajador de Wally Pickers sonriendo"
            fill
            className="object-cover m-0 p-0"
          />
        </div>
      </section>

      {/* CARROUSEL DE TEXTO  AUTOMÁTICO*/}
      <TextCarousel  items = {[
        "Precios competitivos", 
        "Envíos en 72 horas",
        "Productos en tendencia",
        "Procedencia internacional"
      ]}/>



      {/* ── Sección 3: Misión ─────────────────────────────────────────────── */}
      <section className="flex items-center h-[80vh] mb-0 pb-0 ">
        

        <div className="relative flex-1 h-full m-0 p-0">
          <Image
            src="/images/about/mission.png"
            alt="Trabajador de Wally Pickers sonriendo"
            fill
            className="object-cover m-0-0 p-0"
          />
        </div>

        <div id="presentación" className="flex flex-col flex-1  pr-0">
          <small className = "font-light text-2xl m-7 mb-0">EL PROBLEMA</small>
          <h1 className="font-semibold text-4xl mt-3 ml-7 mb-0 max-w-xl">
            Las tendencias son menospreciadas
          </h1>
          <p className="m-7 mt-4">
            Muchos negocios tienen dificultades para identificar los productos en tendencia. <br />
            Aunque estos productos generan gran demanda, suelen tener un ciclo de vida muy corto, lo que complica su aprovechamiento.
          </p>
        </div>
      </section>

      {/* SOLUCIÓN */}
      <section className = "relative flow flow-row bg-radial from-blue-400  to-green-400 ">
        <small className = "block font-light text-2xl pt-20 text-center text-gray-200">LA SOLUCIÓN </small>
        <h2 className=" block font-semibold text-4xl mt-3 m-7 text-center text-white" >PROVEEDORES QUE TE ASISTEN</h2>
        <p className = "block max-w-2xl mx-auto text-center pb-20 text-gray-200"> En Wally Pickers somos expertos en encontrar productos en tendencia por todo el mundo. <br />
        Te proveemos de lo que necesitas y de lo que aún no sabes que necesitas
        </p>
      </section>

      {/* EL EQUIPO FUNDADOR */}
      <ProfileCardsSection></ProfileCardsSection>


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
