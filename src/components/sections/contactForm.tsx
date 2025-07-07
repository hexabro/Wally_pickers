



const ContactForm = () => {
    return(
        <section  id = "contact" className="mx-auto  bg-gray-50 rounded-lg shadow-md">
          <form className="max-w-3xl mx-auto p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
                <input type="text" id="name" name="name" autoComplete = "name" required className="mt-1 block w-full border-gray-300 p-2 rounded-md shadow-sm focus:border-sky-500 focus:ring-sky-500"/>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo electrónico</label>
                <input type="email" id="email" name="email" autoComplete="email" required className="mt-1 block w-full border-gray-300 p-2 rounded-md shadow-sm focus:border-sky-500 focus:ring-sky-500"/>
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Teléfono</label>
                <input type="text" id="phone" name="phone" autoComplete ="tel" required className="mt-1 block w-full border-gray-300 p-2 rounded-md shadow-sm focus:border-sky-500 focus:ring-sky-500"/>
              </div>
              <div>
                <label htmlFor="business" className="block text-sm font-medium text-gray-700">Compañía</label>
                <input type="text" id="business" name="organization" autoComplete= "organization" required className="mt-1 block w-full border-gray-300 p-2 rounded-md shadow-sm focus:border-sky-500 focus:ring-sky-500"/>
              </div>
            </div>
            <div className="my-6">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Mensaje</label>
              <textarea id="message" name="message" rows={4} className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm focus:border-sky-500 focus:ring-sky-500"></textarea>
            </div>
            <button type="submit" className="w-full bg-[#0e344f] text-white font-semibold py-3 rounded-lg hover:bg-blue-800 transition-colors">Enviar</button>
          </form>
        </section>

    );
}

export default ContactForm;
