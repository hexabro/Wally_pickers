"use client"

import { useTranslations } from 'next-intl';


const ContactForm = () => {
    const t = useTranslations('contact.form');

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
            <form   onSubmit={async (e) => {
            e.preventDefault();
            // Call the function to submit the order

            
            const nombre = (document.getElementById("name") as HTMLInputElement).value;
            const correo = (document.getElementById("email") as HTMLInputElement).value;
            const telefono = (document.getElementById("phone") as HTMLInputElement).value;
            const tipoNegocio = (document.getElementById("business-type") as HTMLSelectElement).value;
            const mensaje = (document.getElementById("message") as HTMLTextAreaElement).value;

            const endpoint = "https://script.google.com/macros/s/AKfycbx0dXA_HD8iLd59h-AzeBRAOFSugALL-mhRFr4fxPLpjrEeA9SbRzOLYyjTMWr4OKbAdw/exec"

            try{
              const formData = new URLSearchParams();
              formData.append("nombre", nombre);
              formData.append("correo", correo);
              formData.append("telefono", telefono);
              formData.append("tipoNegocio", tipoNegocio);
              formData.append("mensaje", mensaje);
              formData.append("tipo", "info" );

              await fetch(endpoint, {
              method: "POST",
              body: formData,
              });

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
            </form>
        </section>

    );
}

export default ContactForm;
