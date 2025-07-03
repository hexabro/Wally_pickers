import CustomersRectangle from "@/components/sections/rectangle";
import Image from "next/image";

import {
  Package,
  TrendingUp,
  Globe,
  ShieldCheck,
  DollarSign,
  Layers,
} from "lucide-react";
import { div } from "framer-motion/client";
import AnimatedUnderline from "@/components/ui/animatedUnderline";

const stats = [
  { label: "Clientes satisfechos", value: "3.200+" },
  { label: "Unidades vendidas", value: "7,8M" },
  { label: "Países servidos", value: "18" },
];

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
      <CustomersRectangle
        tagline="Ser cliente"
        title="Crezcamos juntos"
        paragraph="Nos enorgullecemos de apoyar el éxito de nuestros clientes proporcionando productos de alta calidad y un servicio excepcional."
        imageSrc="/images/imagen_robada.jpg"
        imageAlt="Clientes disfrutando de comida juntos"
        />

        <section className = "max-w-7xl p-10 text-center mx-auto ">
          <h2 className = "text-center text-[#0e344f] font-semibold text-4xl  "> Escoge <AnimatedUnderline> calidad </AnimatedUnderline></h2>
          <p className = "mt-6 max-w-5xl  mx-auto text-gray-700 text-lg leading-relaxed"> En Wally Pickers te ofrecemos una cuidada selección de productos de todo el mundo, escogidos para garantizar la <span className = "font-medium"> excelencia </span>.</p>
          {/* <p className = "mt-6 max-w-5xl  mx-auto text-gray-700 text-lg leading-relaxed">Con más de 40 fuertes vínculos, hemos creado una red robusta de clientes de todo tipo: supermercados convencionales, foodservice, exportación e industria... y tu negocio puede ser uno de ellos</p> */}
        </section>

        <hr className="my-8 border-t border-gray-300"/>

        {/* SECTION WITH A MAP ON THE LEFT AND HEADING AND TEXT ON THE RIGHT */}
        <section className="max-w-7xl mx-auto p-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <Image
           src="/images/mapaEuropa.jpg" 
           alt="Mapa de colaboradores de Wally Pickers" 
            width={600}
            height={400}
           className="w-full h-auto object-cover rounded-lg shadow-md"
            />
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-sky-900">¿Por qué elegirnos?</h3>
            <p className="text-gray-700">
              Con más de 40 fuertes vínculos, hemos creado una red robusta de clientes de todo tipo: supermercados convencionales, foodservice, exportación e industria... y tu negocio puede ser uno de ellos.
            </p>
          </div>
          
        </section>
    </div>
      
  );
}
