"use client";
import React , {useRef} from "react";
import "./timeline.css";
import Image from "next/image";
import { motion, useInView } from "framer-motion";


export type TimelineEvent = {
  year: string;
  title: string;
  description: string;
  icon: string;
};

const events: TimelineEvent[] = [
  {
    year: "",
    title: "1. Descubrimiento",
    description:
      "Nos reunimos contigo para conocer tus necesidades específicas de abastecimiento, volumen y frecuencia. Queremos entender lo que hace único tu negocio.",
    icon: "/images/timeline/lupa.svg",
  },
  {
    year: "",
    title: "2. Planificamos tu suministro",
    description:
      "Diseñamos una estrategia personalizada de abastecimiento para que siempre tengas los productos que necesitas, al mejor precio y en el momento justo.",
    icon: "/images/timeline/plan.svg",
  },
  {
    year: "",
    title: "3. Gestionamos tu pedido",
    description:
      "Procesamos y preparamos tu pedido con rapidez y precisión, asegurando que la calidad y las condiciones de almacenamiento se mantengan siempre óptimas.",
    icon: "/images/timeline/pedido.svg",
  },
  {
    year: "",
    title: "4. Entrega y seguimiento",
    description:
      "Realizamos la entrega en el tiempo acordado, y te ofrecemos un seguimiento continuo para adaptarnos a tus futuras necesidades de stock.",
    icon: "/images/timeline/seguimiento.svg",
  },
];


const VerticalTimelineSection: React.FC = () => {
    
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  console.log(isInView);
  return (
    <section className="w-full">
      <h2 className="text-3xl font-bold text-center mb-6 text-[#0e344f]">
        Nuestra manera de trabajar
      </h2>

      <div ref ={ref}

        className={`timeline ${isInView ? "animate-line" : ""}`}
      >
        {events.map((event, index) => (
          <div
            key={index}
            className={`timeline-container ${
              index % 2 === 0 ? "left-container" : "right-container"
            }`}
          >
            <Image
              src={event.icon}
              alt={event.title}
              width={20}
              height={20}
              className={`absolute w-[40px] rounded-[50%] right-[-20px] top-[32px] z-2 bg-green-400 left-[10px] 
                  ${
                    index % 2 === 0
                      ? "sm:left-full sm:translate-x-[-50%]"
                      : "sm:left-[-20px]"
                  }
                `}
            />
            <motion.div className={`textbox`}
              initial = {{opacity:0, y: 50}}
              animate={isInView ? "visible" : "hidden"}
              transition={{ duration: 0.5, ease: "easeInOut" , delay: index * 1.2}}
              whileInView={{opacity: 1, y:0}}
              custom ={index}
            >
              <h3 className="text-xl font-semibold text-neutral-100">
                {event.title}
              </h3>
              <small className="text-gray-300 inline-block mb-[15px]">
                {event.year}
              </small>
              <p className="text-[#eee]">{event.description}</p>
              <span
                className={`${
                  index % 2 == 0
                    ? "left-container-arrow"
                    : "right-container-arrow"
                }`}
              ></span>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default VerticalTimelineSection;
