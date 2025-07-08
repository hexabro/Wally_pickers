import React from "react";
import classNames from "classnames";
import { Factory, Handshake, Warehouse, Leaf, Users } from "lucide-react";

import "./timeline.css"; // Importa los estilos de la línea de tiempo
import { style } from "framer-motion/client";

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
  icon: React.ElementType;
};

const events: TimelineEvent[] = [
  {
    year: "2015",
    title: "Fundación",
    description: "Nacemos conectando sabores del mundo con Europa.",
    icon: Factory
  },
  {
    year: "2017",
    title: "Primer acuerdo",
    description: "Alianzas clave con productores artesanos.",
    icon: Handshake
  },
  {
    year: "2019",
    title: "Hub Róterdam",
    description: "Abrimos nuestro centro logístico para optimizar entregas.",
    icon: Warehouse
  },
  {
    year: "2021",
    title: "Sostenibilidad",
    description: "Envases 100 % reciclables y -30 % de huella de CO₂.",
    icon: Leaf
  },
  {
    year: "2025",
    title: "Hoy",
    description: "5K+ clientes disfrutan de productos auténticos a precios justos.",
    icon: Users
  }
];


const VerticalTimelineSection: React.FC = () => {
  return (
    <section className="py-8  w-full">

      <h2 className="text-3xl font-bold text-center mb-6 text-neutral-50">Nuestra Historia</h2>

      <div className="timeline">
        {events.map((event, index) => (
          <div key = {index} 
          className={`timeline-container ${index % 2 === 0 ? "left-container" : "right-container"}`}
          /* ANIMATE 1S AFTER FOR EVERY INDEX */
          style={{ animationDelay: `${index}s` }}>
            <event.icon
              className={`absolute w-[40px] rounded-[50%] right-[-20px] top-[32px] z-2 bg-green-400 left-[10px] 
                ${index % 2 === 0 
                  ? 'sm:left-full sm:translate-x-[-50%]'
                  : 'sm:left-[-20px]'
                }
              `}
            />
            <div className={`textbox `} >
              <h3 className="text-xl font-semibold">{event.title}</h3>
              <small className="text-gray-500 inline-block mb-[15px]">{event.year}</small>
              <p className="mt-2 text-gray-700">{event.description}</p>
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