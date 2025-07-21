"use client"
import Image from 'next/image'
import { motion } from 'framer-motion'
import ContactForm from '@/components/sections/contactForm'
import Link from 'next/link'
import { useState } from 'react'

export default function ContactPage() {
    const [copied, setCopied] = useState(false);
    const email = 'info@wally-pickers.com';

    const handleCopyEmail = async () => {
      try {
        await navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Error copying email: ', err);
      }
    };

  return (
    <main className="bg-gray-50">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center py-16 px-6 md:px-12 h-auto lg:h-screen bg-cover bg-center"
       style={{ backgroundImage: "url('images/contact/bg.jpg')" }}
      >
        <motion.div
          className="md:w-1/2 space-y-6 "
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
          className="w-full md:w-1/2 mt-8 md:mt-0 "
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <ContactForm />
        </motion.div>
      </section>

      {/* Visit Us Section */}
     <section className="bg-white py-16 ">
      <div className="container mx-auto px-4 xl:px-16 2xl:px-4 flex flex-col-reverse xl:flex-row space-y-8 xl:space-y-0 xl:space-x-8 ">
        {/* Left Column: Contact Info */}
        <div className="w-full xl:w-1/4 space-y-8 flex flex-col items-start  justify-center py-16">
          <div className="space-y-4">
            <h2 className="text-5xl font-bold text-[#0e344f]">Central de Wally Pickers</h2>
             <Link href = "https://www.google.com/maps/place/Wally+Pickers+Trading+S.L./@40.6037937,-3.2232876,629m/data=!3m2!1e3!4b1!4m6!3m5!1s0xd43ade45f6f9797:0x8c4dd2487a6cddae!8m2!3d40.6037897!4d-3.2207127!16s%2Fg%2F11xml5f319?entry=ttu&g_ep=EgoyMDI1MDcxNi4wIKXMDSoASAFQAw%3D%3D"
                  target = "_blank"
                  rel= "noopener noreferrer"
             >
              <p className="text-gray-700 underline text-xl lg:text-sm">
                  C/Francisco de Medina y Mendoza 50, <br />
                  19171 Cabanillas del Campo (Guadalajara) – España
                
                </p>
             </Link> 
              
          </div>
          <div className="space-y-2 text-gray-700 lg:text-xl text-2xl ">
            <p><span className="font-semibold">Teléfono:</span> (+34) 640 69 05 04</p>
            <p><span className="font-semibold">Pedidos:</span> (+34) 634 65 34 75</p>
            <p className="flex items-center space-x-2">
              <span className="font-semibold">Email:</span>
              <button
                onClick={handleCopyEmail}
                className="underline focus:outline-none hover:cursor-pointer "
              >
                {email}
              </button>
              {copied && <span className="text-sm text-[#0e344f]">¡Copiado!</span>}

            </p>
            
          </div>
         
        </div>

        {/* Right Column: Map */}
        <div className="w-full xl:w-3/4">
          <div className="relative w-full h-[50vh] 2xl:h-[80vh]  rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2741.2525233398937!2d-3.223287624507281!3d40.603793744233876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd43ade45f6f9797%3A0x8c4dd2487a6cddae!2sWally%20Pickers%20Trading%20S.L.!5e1!3m2!1ses!2ses!4v1753092901195!5m2!1ses!2ses"              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
    </main>
  )
}
