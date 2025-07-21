"use client"
import Image from 'next/image'
import { motion } from 'framer-motion'
import ContactForm from '@/components/sections/contactForm'

export default function ContactPage() {
  return (
    <main className="bg-gray-50">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center py-16 px-6 md:px-12 h-screen bg-cover bg-center"
       style={{ backgroundImage: "url('images/contact/bg.jpg')" }}
      >
        <motion.div
          className="md:w-1/2 space-y-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            ¡Hablemos!
          </h1>
          <p className="text-xl text-gray-300  max-w-xl">
            ¿Te interesa alguno de nuestros productos o crees que podríamos colaborar? Ya sabes lo que hacer
          </p>
        </motion.div>
        <motion.div
          className="md:w-1/2 mt-8 md:mt-0"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <ContactForm />
        </motion.div>
      </section>

      {/* Visit Us Section */}
      <section className="flex flex-col md:flex-row-reverse items-center bg-white py-16 px-6 md:px-12 h-screen ">
        <motion.div
          className="md:w-1/2 space-y-4 ml-6"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-semibold text-blue-800">
            ¡También puedes venir a vernos!
          </h2>
          <p className="text-gray-700">
            Nuestras oficinas están abiertas de 9:00 a 15:00
          </p>
        </motion.div>
        <motion.div
          className="md:w-1/2 mt-8 md:mt-0"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24484.84437256829!2d-3.157817294093077!3d40.63489003336719!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd43abbb4efeab6f%3A0x201eb55be9bc779a!2sLaborawi!5e1!3m2!1ses!2ses!4v1753015947673!5m2!1ses!2ses"
             width= {700} 
             height={500} 
             style={{border:0}}
             loading="lazy" 
             referrerPolicy="no-referrer-when-downgrade"
             allowFullScreen ={true}
             className = "object-fill"
             
             >
             
             </iframe>
            
          </div>
        </motion.div>
      </section>
    </main>
  )
}
