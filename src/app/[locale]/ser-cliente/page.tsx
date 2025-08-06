"use client";
import CustomersRectangle from "@/components/ui/rectangle";
import ContactForm from "@/components/sections/contactForm";
import Image from "next/image";
import ReasonsSection from "@/components/sections/reasonsCards";
import VerticalTimelineSection from "@/components/sections/timeline";


import {
  Package,
  TrendingUp,
  Globe,
  ShieldCheck,
  DollarSign,
  Layers,
} from "lucide-react";

import AnimatedCircleWord from "@/components/ui/animatedCircleWord";
import ReviewsSection from "@/components/sections/ReviewsSection";
import ReasonsCards from "@/components/sections/reasonsCards";

import { useTranslations } from "next-intl";
import ContactSection from "@/components/sections/ContactSection";





export default function BecomeCustomerPage() {
  const t = useTranslations("become-client");
  
  return (
    <div>
      {/* CUSTOMERS RECTANGLE */}
      <CustomersRectangle  />

        <section className = "max-w-7xl  text-center mx-auto p-10">
          <h2 className = "text-center text-[#0e344f] font-semibold text-4xl  "> {t("pick")} <AnimatedCircleWord word = {t("quality")} className = "text-4xl"/></h2>
          <p className = "mt-6 max-w-5xl  mx-auto text-gray-700 text-lg leading-relaxed">{t("beforeCircleText")}<span className = "font-medium"> {t("circleText")} </span>.</p>
          {/* <p className = "mt-6 max-w-5xl  mx-auto text-gray-700 text-lg leading-relaxed">Con más de 40 fuertes vínculos, hemos creado una red robusta de clientes de todo tipo: supermercados convencionales, foodservice, exportación e industria... y tu negocio puede ser uno de ellos</p> */}
        </section>


        

        {/* SECTION WITH A GLOBE */}
        <section
          className="relative  mt-20 pb-20 md:pb-0  grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full "
        >
          {/* Gradient background for border blending */}
          <div className="absolute inset-0 pointer-events-none z-0">
            {/* fallback hard black */}
            <div className="w-full h-full bg-[#0e2f46]" />

          </div>

          {/* Content */}
          <video
            src="/videos/canva-anim-bbg.mp4"
            autoPlay
            playsInline
            muted
            className="w-full h-auto rounded-lg  object-cover relative z-10 "
            style={{ aspectRatio: "16/9" }}
            aria-label="Animación de un globo terráqueo girando"
          />
          <div className="space-y-6 relative z-10 px-7">
            <h3 className="text-2xl font-semibold text-sky-600">{t('chooseUs')}</h3>
            <p className="text-white/80">
              {t('chooseUsDescription')}
            </p>
          </div>
        </section>


        {/* REASONS CARDS SECTION */}
        <div className = "py-10 ">
          <ReasonsCards/>
        </div>

        {/* REVIEWS SECTION */}
        <div className = "bg-[#0e344f]">
          <ReviewsSection titleColor="white" backgroundColor=""></ReviewsSection>
        </div>

        {/* VERTICAL TIMELINE SECTION */}
        <div className = "pt-10">
          <VerticalTimelineSection />
        </div>

        

        {/* SECCIÓN DE FORMULARIO DE CONTACTO, FORMULARIO A LA DRECHA Y SECCIÓN DE TEXTO A LA IZQUIERDA */}
        <ContactSection bgColor="bg-gray-200" ></ContactSection>
    </div>
      
  );
}
