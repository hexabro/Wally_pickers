"use client"
import Image from 'next/image'
import { motion } from 'framer-motion'

const founders = [
  {
    name: 'Othon Ansatuña',
    title: 'Co-Fundador & CEO',
    message: 'Somos tu equipo de confianza en la importación de todo tipo de productos de alta rotación. Estamos aquí para atenderte 24/7 y asegurarnos de que cada pedido llegue rápido y sin sorpresas',
    image: '/images/about/ceo.jpg',
  },
  {
    name: 'Jhonatan López',
    title: 'Co-Fundador & CTO',
    message: 'Sabemos que el mercado FMCG se mueve a mil por hora. Por eso te ofrecemos un canal directo con nuestro equipo joven y apasionado, dispuesto a resolverte cualquier tema en minutos. Dinos, ¿qué necesitas hoy?',
    image: '/images/about/ceo2.jpg',
  },
]

const cardVariants = (alignLeft: boolean) => ({
  hidden: { x: alignLeft ? -100 : 100, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.6 } },
})

export default function FoundersSection() {
  return (
    <section className="bg-white py-16 px-8 " >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-[#0e344f] mb-12">
          Mensaje de los Fundadores
        </h2>
        {founders.map((founder, index) => {
          const alignLeft = index % 2 === 1
          return (
            <motion.div
              key={founder.name}
              className="flex flex-col-reverse md:flex-row items-center my-12"
              variants={cardVariants(alignLeft)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <div
                className={`md:w-1/2 p-6 px-0 md:px-6 space-y-4  ${
                  alignLeft ? '' : 'md:order-2'
                }`}
              >
                <h3 className="text-2xl font-semibold text-blue-900">
                  {founder.name}
                </h3>
                <p className="italic text-[#d68a49]">{founder.title}</p>
                <p className="text-gray-700 leading-relaxed">
                  {founder.message}
                </p>
              </div>
              <div
                className={`md:w-1/2 flex justify-center ${
                  alignLeft ? '' : 'md:order-1'
                }`}
              >
                <Image
                  src={founder.image}
                  alt={founder.name}
                  width={600}
                  height={300}
                  className="rounded-2xl shadow-xl object-fill  "
                />
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
