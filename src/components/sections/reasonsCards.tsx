"use client"
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ShieldCheck, Globe, Truck, CheckCircle, Headset } from 'lucide-react';


export default function ImmersiveSection() {
  const [count, setCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.2, duration: 0.5 }
    }),
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } }
  };

    const headerVariants = {
    center: { y: 0 },
    top: { y: '-50%', transition: { duration: 0.5 } }
  };
 const cards = [
    {
      id: 1,
      title: 'Más de 25 años de experiencia',
      description: 'Importando productos FMCG desde 1998 con profundo conocimiento de mercado global.',
      Icon: Award
    },
    {
      id: 2,
      title: 'Certificaciones internacionales',
      description: 'Cumplimos con ISO 9001 e ISO 22000 para garantizar calidad y seguridad alimentaria.',
      Icon: ShieldCheck
    },
    {
      id: 3,
      title: 'Red logística global',
      description: 'Distribución eficiente en más de 60 países con socios de transporte de primer nivel.',
      Icon: Globe
    },
    {
      id: 4,
      title: 'Alianzas con marcas líderes',
      description: 'Socios oficiales de proveedores top en el sector FMCG, avalados por referencias de clientes.',
      Icon: Truck
    },
    {
      id: 5,
      title: 'Control de calidad riguroso',
      description: 'Procesos de inspección multietapa y trazabilidad completa de lotes.',
      Icon: CheckCircle
    },
    {
      id: 6,
      title: 'Atención personalizada',
      description: 'Equipo experto en regulaciones, aduanas y soporte postventa dedicado.',
      Icon: Headset
    }
  ];


  const handleClick = () => {
    if (count < cards.length) {
      setCount((prev) => prev + 1);
    } else {
      setCount(0);
    }
  };

  useEffect(() => {
    if (count > 0 && containerRef.current) {
      const child = containerRef.current.children[count - 1] as HTMLElement;
      if (child) {
        child.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }, [count]);

  return (
    <section className="w-full flex flex-col items-center bg-gray-50 p-8 min-h-[60vh]">
      {/* Animated header text always visible */}
      <motion.div
        className="text-center w-full flex flex-col justify-center items-center"
        initial="center"
        animate={count ==0 ? 'center': 'top'}
        style={{ flex: count === 0 ? 1 : 'none' }}
      >
        <h3 className="text-3xl font-bold mb-2">¿Necesitas más razones?</h3>
        <p className="text-lg text-gray-700">Descúbrelas con el siguiente botón.</p>
        <button onClick = {handleClick}
        className = {`mt-8 px-6 py-3 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-blue-400
          ${count > 0 ? 'hidden' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
          Comenzar
        </button>
      </motion.div>

      {/* Scrollable cards row */}
      <div
        ref={containerRef}
        className="w-full max-w-5xl flex space-x-4 overflow-x-auto scroll-snap-x scroll-snap-mandatory py-4"
      >
        <AnimatePresence>
          {cards.slice(0, count).map((card, index) => {
            const IconComp = card.Icon;
            return (
              <motion.div
                key={card.id}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-64 bg-white rounded-2xl shadow-lg p-6 flex-shrink-0 scroll-snap-center transform transition-transform md:hover:-translate-y-2 md:hover:shadow-xl md:cursor-pointer"
              >
                <IconComp className="mx-auto mb-4 w-12 h-12 text-blue-600" />
                <h4 className="text-xl font-semibold mb-2 text-center">{card.title}</h4>
                <p className="text-gray-600 text-center">{card.description}</p>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Button */}
      <button
        onClick={handleClick}
        className={`mt-8 px-6 py-3 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-blue-400
          ${count === 0 ? 'hidden' : count < cards.length ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-green-600 text-white hover:bg-green-700'}`}
      >
        {count === 0 ? 'Comenzar' : count < cards.length ? 'Siguiente tarjeta' : 'Reiniciar'}
      </button>
    </section>
  );
}
