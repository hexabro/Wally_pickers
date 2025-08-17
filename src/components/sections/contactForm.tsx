"use client"

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Cross } from 'lucide-react';
import { motion } from 'motion/react';

const ContactForm = () => {
    const t = useTranslations('contact.form');
    const [submitted, setSubmitted] = useState(false);
    const companyTypes: string[] = t.raw('companyTypes');

    const handleInvalidInput = (e: React.FormEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const target = e.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
      target.setCustomValidity(t('required') || 'This field is required.');
    };

    const handleInput = (e: React.FormEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const target = e.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
      target.setCustomValidity('');
    };

    return(
        <section  id = "contact" className="mx-auto  bg-gray-50 rounded-lg shadow-md">
            <form onSubmit={async (e) => {
            e.preventDefault();
            
            const nameInput = document.getElementById("name") as HTMLInputElement;
            const emailInput = document.getElementById("email") as HTMLInputElement;
            const phoneInput = document.getElementById("phone") as HTMLInputElement;
            const businessTypeInput = document.getElementById("business-type") as HTMLSelectElement;
            const messageInput = document.getElementById("message") as HTMLTextAreaElement;

            const nombre = nameInput.value;
            const correo = emailInput.value;
            const telefono = phoneInput.value;
            const tipoNegocio = businessTypeInput.value;
            const mensaje = messageInput.value;

            const endpoint = "https://script.google.com/macros/s/AKfycbx0dXA_HD8iLd59h-AzeBRAOFSugALL-mhRFr4fxPLpjrEeA9SbRzOLYyjTMWr4OKbAdw/exec"

            try{
              const formData = new URLSearchParams();
              formData.append("nombre", nombre);
              formData.append("correo", correo);
              formData.append("telefono", telefono);
              formData.append("tipoNegocio", tipoNegocio);
              formData.append("mensaje", mensaje);
              formData.append("tipo", "info" );

              //mostrar mensaje de agradecimiento
              setSubmitted(true);

              await fetch(endpoint, {
              method: "POST",
              body: formData,
              });
              
              // Clear form inputs after successful submission
              nameInput.value = '';
              emailInput.value = '';
              phoneInput.value = '';
              businessTypeInput.value = '';
              messageInput.value = '';

            } catch (error) {
              console.error("Error al enviar los datos:", error);
            }
              }} className="max-w-3xl mx-auto p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">{t('name')}</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  autoComplete="name"
                  required
                  className="mt-1 block w-full border-gray-300 p-2 rounded-md shadow-sm focus:border-sky-500 focus:ring-sky-500"
                  onInvalid={handleInvalidInput}
                  onInput={handleInput}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">{t('email')}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  required
                  className="mt-1 block w-full border-gray-300 p-2 rounded-md shadow-sm focus:border-sky-500 focus:ring-sky-500"
                  onInvalid={handleInvalidInput}
                  onInput={handleInput}
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">{t('phone')}</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  autoComplete="tel"
                  required
                  className="mt-1 block w-full border-gray-300 p-2 rounded-md shadow-sm focus:border-sky-500 focus:ring-sky-500"
                  onInvalid={handleInvalidInput}
                  onInput={handleInput}
                />
              </div>
              <div>
                <label htmlFor="business-type" className="block text-sm font-medium text-gray-700">{t('companyType')}</label>
                <select
                  id="business-type"
                  name="business-type"
                  required
                  className="mt-1 block w-full border-gray-300 p-2 rounded-md shadow-sm focus:border-sky-500 focus:ring-sky-500"
                  onInvalid={handleInvalidInput}
                  onInput={handleInput}
                >
                  <option value="">{t('select')}</option>
                  {companyTypes && companyTypes.length > 0 ? (
                    companyTypes.map((type, index) => (
                      <option key={index} value={type}>
                        {type}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>
                      No hay opciones disponibles
                    </option>
                  )}
                </select>
              </div>

            </div>
            <div className="my-6">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">{t('message')}</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm focus:border-sky-500 focus:ring-sky-500"
                onInvalid={handleInvalidInput}
                onInput={handleInput}
              ></textarea>
            </div>
            <button type="submit" className="w-full bg-[#0e344f] text-white font-semibold py-3 rounded-lg hover:bg-blue-800 transition-colors">{t('send')}</button>
            
            {submitted && (
                <div 
                className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50 px-4" 
                onClick={() => setSubmitted(false)}
                >
                <motion.div 
                  className="bg-white rounded-lg p-8 max-w-md w-full shadow-xl relative"
                  onClick={(e) => e.stopPropagation()}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                    <button 
                    onClick={() => setSubmitted(false)}
                    className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="Close"
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                    </button>
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('thankYou')}</h3>
                    <p className="text-gray-600 mb-6">{t('contactSoon')}</p>
                  </div>
                </motion.div>
                </div>
            )}
            </form>
        </section>

    );
}

export default ContactForm;
