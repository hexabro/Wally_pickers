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
import { px } from "motion";




const reasons = [
  {
    icon: <Package className="h-8 w-8" />,
    title: "Catálogo Diverso",
    desc: "Miles de referencias asiáticas y americanas cuidadosamente seleccionadas para tu negocio.",
  },
  {
    icon: <TrendingUp className="h-8 w-8" />,
    title: "Logística Just‑In‑Time",
    desc: "Centros de distribución en Europa que aseguran entregas en 24‑72 h y disponibilidad constante de stock.",
  },
  {
    icon: <Globe className="h-8 w-8" />,
    title: "Cumplimiento Normativo UE",
    desc: "Etiquetado multilingüe, trazabilidad y estándares de seguridad alimentaria certificados.",
  },
  {
    icon: <DollarSign className="h-8 w-8" />,
    title: "Precios Competitivos",
    desc: "Escalamos descuentos por volumen y acuerdos anuales a medida para maximizar tu margen.",
  },
  {
    icon: <ShieldCheck className="h-8 w-8" />,
    title: "Calidad Garantizada",
    desc: "Auditorías de proveedores y controles de calidad internos que aseguran consistencia en cada lote.",
  },
  {
    icon: <Layers className="h-8 w-8" />,
    title: "Integraciones Digitales",
    desc: "Conéctate vía EDI o API para reposiciones automáticas y seguimiento de pedidos en tiempo real.",
  },
];

export default function BecomeCustomerPage() {
  return (
    <div>
      {/* CUSTOMERS RECTANGLE */}
      <CustomersRectangle  />

        <section className = "max-w-7xl  text-center mx-auto p-10">
          <h2 className = "text-center text-[#0e344f] font-semibold text-4xl  "> Escoge <AnimatedCircleWord word = "calidad" className = "text-4xl"/></h2>
          <p className = "mt-6 max-w-5xl  mx-auto text-gray-700 text-lg leading-relaxed"> En Wally Pickers te ofrecemos una cuidada selección de productos de todo el mundo, escogidos para garantizar la <span className = "font-medium"> excelencia </span>.</p>
          {/* <p className = "mt-6 max-w-5xl  mx-auto text-gray-700 text-lg leading-relaxed">Con más de 40 fuertes vínculos, hemos creado una red robusta de clientes de todo tipo: supermercados convencionales, foodservice, exportación e industria... y tu negocio puede ser uno de ellos</p> */}
        </section>


        

        {/* SECTION WITH A MAP ON THE LEFT AND HEADING AND TEXT ON THE RIGHT */}
        <section
          className="relative mx-auto py-20 px-5  grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full "
        >
          {/* Gradient background for border blending */}
          <div className="absolute inset-0 pointer-events-none z-0">
            {/* fallback hard black */}
            <div className="w-full h-full bg-black" />
            {/* custom gradient: white → white 30%, black 30–70%, white after */}
            <div
              className="absolute inset-0
                  md:bg-[linear-gradient(to_bottom,white_0%,black_10%,black_10%,black_90%,black_90%,white_100%)]"              
            />
          </div>

          {/* Content */}
          <video
            src="/videos/animacion_globo.mp4"
            autoPlay
            playsInline
            muted
            className="w-full h-auto rounded-lg shadow-lg object-cover relative z-10"
            style={{ aspectRatio: "16/9" }}
            aria-label="Animación de un globo terráqueo girando"
          />
          <div className="space-y-6 relative z-10 ">
            <h3 className="text-2xl font-semibold text-[#2b95e1]">¿Por qué elegirnos?</h3>
            <p className="text-gray-300">
              Hemos llevado productos de todo el mundo a los estantes de nuestros clientes. Desde supermercados hasta restaurantes y tiendas especializadas. Nuestra experiencia y red global nos permiten ofrecerte una selección inigualable de productos de alta calidad.
            </p>
          </div>
        </section>


        {/* REASONS CARDS SECTION */}
        <div className = "py-10 ">
          <ReasonsCards/>
        </div>

        {/* REVIEWS SECTION */}
        <ReviewsSection />

        {/* VERTICAL TIMELINE SECTION */}
        <div className = "pt-10">
          <VerticalTimelineSection />
        </div>

        

        {/* SECCIÓN DE FORMULARIO DE CONTACTO, FORMULARIO A LA DRECHA Y SECCIÓN DE TEXTO A LA IZQUIERDA */}
        <div className="mx-auto p-10 flex flex-col md:flex-row items-stretch gap-8 bg-[#eeeff1] ">
          
          {/* IZQUIERDA  */}

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
    </div>
      
  );
}
