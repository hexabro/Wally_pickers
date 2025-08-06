"use client";
import React , {useRef} from "react";
import "./timeline.css";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";


export type TimelineEvent = {
  year: string;
  title: string;
  description: string;
  icon: string;
};

const VerticalTimelineSection: React.FC = () => {
  const t = useTranslations('become-client.timeline');
  const events: TimelineEvent[] = t.raw('events');
    
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  console.log(isInView);
  return (
    <section className="w-full">
      <h2 className="text-3xl font-bold text-center mb-6 text-[#0e344f]">
        {t('title')}
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
              className={`absolute w-[40px] rounded-[50%] right-[-20px] top-[32px] z-2 bg-[#777] left-[10px] 
                  ${
                    index % 2 === 0
                      ? "sm:left-full sm:translate-x-[-50%]"
                      : "sm:left-[-20px]"
                  }
                `}
            />
            <motion.div
              className="textbox"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? "visible" : "hidden"}
              variants={{
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeInOut", delay: index * 1.2 } },
                hidden: { opacity: 0, y: 50 }
              }}
              custom={index}
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
