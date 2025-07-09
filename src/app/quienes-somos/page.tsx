import React from "react";
import Image from "next/image";


import VerticalTimeLineSection from "@/components/sections/timeline";
import ContactForm from "@/components/sections/contactForm";
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
      <section className="container  mx-auto px-4 flex flex-col md:flex-row items-center gap-10 bg-[#f7f7f7]" >
        {/* Texto */}
        <div className="md:w-1/2 space-y-4 order-2 md:order-1 p-8">
          <h1 className="text-4xl font-bold text-primary">Sobre nosotros</h1>
          <p className="text-lg leading-relaxed text-gray-700">
            En Wally pickers, la calidad de nuestro trato se equivale a la de nuestros productos. 
            Tu éxito es nuestro éxito.
          </p>
        </div>
        {/* Imagen */}
        <div className="md:w-1/2 order-1 md:order-2">
          <Image
            src="/images/about/presentacion.png"
            alt="Equipo trabajando"
            width={300}
            height={400}
            className="w-full max-h-[400px] h-auto rounded-4xl  object-cover p-6"
          />
        </div>
      </section>

      {/* ── Sección 2: Misión ─────────────────────────────────────────────── */}
      <section className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-10">
        {/* Imagen */}
        <div className="md:w-1/2">
          <img
            src="/images/about/mission.png"
            alt="Nuestra misión"
            className="w-full h-auto rounded-lg shadow-md object-cover"
          />
        </div>
        {/* Texto */}
        <div className="md:w-1/2 space-y-4">
          <h2 className="text-3xl font-semibold text-primary">Nuestra misión</h2>
          <p className="text-lg leading-relaxed text-gray-700">
            Proporcionar una cadena de suministro eficiente, sostenible y
            accesible, impulsada por tecnología de vanguardia y un servicio al
            cliente excepcional.
          </p>
        </div>
      </section>

      {/* ── Sección 3: Historia / Timeline ─────────────────────────────────── */}
      <section className=" w-full bg-[#0e344f] ">
        <VerticalTimeLineSection />
      </section>

      {/* SECCIÓN DE FORMULARIO DE CONTACTO, FORMULARIO A LA DRECHA Y SECCIÓN DE TEXTO A LA IZQUIERDA */}
        <div className="mx-auto p-10 flex flex-col md:flex-row items-stretch gap-8 ">
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
