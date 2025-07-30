"use client"



const ContactForm = () => {
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
                <label htmlFor="business-type" className="block text-sm font-medium text-gray-700">Tipo de Negocio</label>
                <select id="business-type" name="business-type" required className="mt-1 block w-full border-gray-300 p-2 rounded-md shadow-sm focus:border-sky-500 focus:ring-sky-500">
                  <option value=""></option>
                  <option value="Restaurante / Bar / Cafetería">Restaurante / Bar / Cafetería</option>
                  <option value="Tienda de alimentación / Supermercado">Tienda de alimentación / Supermercado</option>
                  <option value="Distribuidor/Mayorista">Distribuidor/Mayorista</option>
                  <option value="Hotel / Catering">Hotel / Catering</option>
                  <option value="Tienda especializada (gourmet, internacional, etc.)">Tienda especializada (gourmet, internacional, etc.)</option>
                  <option value="Otro">Otro (especificar)</option>
                </select>
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
