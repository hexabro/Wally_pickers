import React from "react";

import "./timeline.css"; // Importa los estilos de la línea de tiempo
import Image from "next/image";
/**
 * Vertical Timeline – Tarjetas alternando derecha / izquierda
 * ─────────────────────────────────────────────────────────────
 * • Línea vertical centrada.
 * • Tarjetas pequeñas que se expanden al pasar el ratón.
 * • Alternan lateral automáticamente según el índice.
 */

export type TimelineEvent = {
  year: string;
  title: string;
  description: string;
  icon: string; // Cambiado a string para usar iconos SVG
};

const events: TimelineEvent[] = [
  {
    year: "",
    title: "1. Descubrimiento",
    description: "Nos reunimos contigo para conocer tus necesidades específicas de abastecimiento, volumen y frecuencia. Queremos entender lo que hace único tu negocio.",
    icon: "/images/timeline/lupa.svg"
  },
  {
    year: "",
    title: "2. Planificamos tu suministro",
    description: "Diseñamos una estrategia personalizada de abastecimiento para que siempre tengas los productos que necesitas, al mejor precio y en el momento justo.",
    icon: "/images/timeline/plan.svg"
  },
  {
    year: "",
    title: "3. Gestionamos tu pedido",
    description: "Procesamos y preparamos tu pedido con rapidez y precisión, asegurando que la calidad y las condiciones de almacenamiento se mantengan siempre óptimas.",
    icon: "/images/timeline/pedido.svg"
  },
  {
    year: "",
    title: "4. Entrega y seguimiento",
    description: "Realizamos la entrega en el tiempo acordado, y te ofrecemos un seguimiento continuo para adaptarnos a tus futuras necesidades de stock.",
    icon: "/images/timeline/seguimiento.svg"
  },
  
];


const VerticalTimelineSection: React.FC = () => {
  return (
    <section className="  w-full">

      <h2 className="text-3xl font-bold text-center mb-6 text-[#0e344f]"> Nuestra manera de trabajar </h2>

      <div className="timeline">
        {events.map((event, index) => (
          <div key = {index} 
          className={`timeline-container ${index % 2 === 0 ? "left-container" : "right-container"}`}
          /* ANIMATE 1S AFTER FOR EVERY INDEX */
          style={{ animationDelay: `${index}s` }}>
            <Image
              src= {event.icon}
              alt={event.title}
              width={20}
              height={20}
              className={`absolute w-[40px] rounded-[50%] right-[-20px] top-[32px] z-2 bg-green-400 left-[10px] 
                ${index % 2 === 0 
                  ? 'sm:left-full sm:translate-x-[-50%]'
                  : 'sm:left-[-20px]'
                }
              `}
            />
            
            <div className={`textbox `} >
              <h3 className="text-xl font-semibold text-neutral-100">{event.title}</h3>
              <small className="text-gray-300 inline-block mb-[15px]">{event.year}</small>
              <p className = "text-[#eee]"> {event.description}</p>
              <span className= {`${index %2 == 0 ? "left-container-arrow": "right-container-arrow"}`}></span>
            </div>
            
          </div>
        ))}
        
      </div>
    </section>
  );
};

export default VerticalTimelineSection;
// Usage in a page
// import VerticalTimelineSection from "@/components/sect