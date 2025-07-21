"use client"
import Image from 'next/image'
import { motion } from 'framer-motion'
import ContactForm from '@/components/sections/contactForm'

export default function ContactPage() {
  return (
    <main className="bg-gray-50">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center py-16 px-6 md:px-12 h-auto md:h-screen bg-cover bg-center"
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
          className="w-full md:w-1/2 mt-8 md:mt-0 px-10"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <ContactForm />
        </motion.div>
      </section>

      {/* Visit Us Section */}
      <section className="bg-white py-16 h-screen">
        {/* MAP SECTION */}
      <div className="container mx-auto p-10 lg:flex lg:space-x-8 h-[75vh]">
        {/* Left Column: Contact Info Only */}
        <div className="lg:w-1/4 space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-blue-600">Central Grupo Atlanta</h2>
            <p className="text-gray-700">
              C/ Rey Pastor 7 BC<br />
              28914 Leganés (Madrid) – Spain
            </p>
          </div>
          <div className="space-y-2 text-gray-700">
            <p><span className="font-semibold">Teléfono:</span> (+34) 91 680 55 25</p>
            <p><span className="font-semibold">Fax:</span> (+34) 91 686 16 28</p>
            <p><span className="font-semibold">Pedidos:</span> (+34) 902 18 19 49</p>
            <p><span className="font-semibold">Email:</span> <a href="mailto:atlanta@grupoatlanta.es" className="text-blue-600 hover:underline">atlanta@grupoatlanta.es</a></p>
          </div>
          
        </div>

        {/* Right Column: Map */}
        <div className="lg:w-3/4 mt-12 lg:mt-0">
          <div className="relative w-full h-full rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2739.8275803949077!2d-3.1672051245054607!3d40.63852544211121!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd43abbb4efeab6f%3A0x201eb55be9bc779a!2sLaborawi!5e1!3m2!1ses!2ses!4v1753087012070!5m2!1ses!2ses"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M3 8a1 1 0 011-1h3a1 1..." /></svg>
              <div>
                <p className="font-semibold">Teléfono:</p>
                <p>(+34) 91 680 55 25</p>
                <p className="font-semibold mt-2">Fax:</p>
                <p>(+34) 91 686 16 28</p>
                <p className="font-semibold mt-2">Pedidos:</p>
                <p>(+34) 902 18 19 49</p>
                <p className="font-semibold mt-2">Email:</p>
                <p>atlanta@grupoatlanta.es</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13..." /></svg>
              <div>
                <p className="font-semibold">Dirección:</p>
                <p>C/ Rey Pastor 7 BC</p>
                <p>28914 Leganés (Madrid)</p>
                <p>Spain</p>
              </div>
            </div>
          </div>
          <a
            href="https://goo.gl/maps/your-map-link"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition"
          >
            Ver Mapa
          </a>
    </section>
    </main>
  )
}
