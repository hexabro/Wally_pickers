"use client"
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ShieldCheck, Globe, Truck, CheckCircle, Headset } from 'lucide-react';

import { useTranslations } from 'next-intl';

export default function ReasonsCards() {
  const t = useTranslations('become-client');
  const reasons = t.raw('reasonsCards') as Array<{title:string, description: string}>;

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
      title: reasons[0].title,
      description: reasons[0].description,
      Icon: Award
    },
    {
      id: 2,
      title: reasons[1].title,
      description: reasons[1].description,
      Icon: ShieldCheck
    },
    {
      id: 3,
      title: reasons[2].title,
      description: reasons[2].description,
      Icon: Globe
    },
    {
      id: 4,
      title: reasons[3].title,
      description: reasons[3].description,
      Icon: Truck
    },
    {
      id: 5,
      title: reasons[4].title,
      description: reasons[4].description,
      Icon: CheckCircle
    },
    {
      id: 6,
      title: reasons[5].title,
      description: reasons[5].description,
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
    <section className="w-full flex flex-col items-center bg-white p-8 min-h-[60vh]">
      {/* Animated header text always visible */}
      <motion.div
        className="text-center w-full flex flex-col justify-center items-center"
        initial="center"
        animate={count ==0 ? 'center': 'top'}
        style={{ flex: count === 0 ? 1 : 'none' }}
      >
        <h3 className="text-3xl font-bold mb-2">{t('reasonsTitle')}</h3>
        <p className="text-lg text-gray-700">{t('reasonsDescription')}</p>
        <button onClick = {handleClick}
        className = {`mt-8 px-6 py-3 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-blue-400
          ${count > 0 ? 'hidden' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
          {t('reasonsStartButton')}
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
        className={`mt-8 px-6 py-3 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-blue-400 hover:cursor-pointer
          ${count === 0 ? 'hidden' : count < cards.length ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-[#d68a49] text-white hover:bg-[#d1a47d]'}`}
      >
        {count === 0 ? t('reasonsStartButton') : count < cards.length ? t('reasonsNextButton') : t('reasonsRestartButton')}
      </button>
    </section>
  );
}
