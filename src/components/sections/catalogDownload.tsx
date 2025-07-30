"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function CatalogSection() {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", tipoNegocio: "" });

  const handleSubmit = (async (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(false);
    // Call the function to submit the order

    const nombre = (document.getElementById("name") as HTMLInputElement).value;
    const correo = (document.getElementById("email") as HTMLInputElement).value;
    const telefono = (document.getElementById("phone") as HTMLInputElement).value;
    const tipoNegocio = (document.getElementById("business-type") as HTMLSelectElement).value;
    const mensaje ="Descarga de catálogo 2025";

    const endpoint = "https://script.google.com/macros/s/AKfycbx0dXA_HD8iLd59h-AzeBRAOFSugALL-mhRFr4fxPLpjrEeA9SbRzOLYyjTMWr4OKbAdw/exec"



    try{
      const formData = new URLSearchParams();
      formData.append("nombre", nombre);
      formData.append("correo", correo);
      formData.append("telefono", telefono);
      formData.append("tipoNegocio", tipoNegocio);
      formData.append("mensaje", mensaje);
      formData.append("tipo", "info");

      await fetch(endpoint, {
      method: "POST",
      body: formData,
      });

    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }

    const downloadPDF = () => {
      const link = document.createElement('a');
      link.href = '/files/Wally-pickers-catalog.pdf'; // Update this path to your actual PDF file
      link.download = 'Catalogo-Wally-2025.pdf';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    // Trigger download
    downloadPDF();
  });

  return (
    <section className="flex flex-col-reverse md:flex-row items-center justify-between px-8 py-16 bg-[#0e344f] gap-8">
      {/* Izquierda: Título + Botón */}
      <div className="flex flex-col items-center  text-center md:text-left max-w-lg">
        <h2 className="block text-3xl font-bold mb-6 text-center  text-white">
          ¡Descubre +300 productos esperándote!
        </h2>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold bg-gradient-to-r from-blue-700 to-blue-400 hover:from-blue-800 hover:to-blue-500 transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300 hover:cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16"
            />
          </svg>
          Descargar catálogo 2025
        </button>
      </div>

      {/* Derecha: Imagen decorativa */}
      <div className="relative w-full md:w-1/2 h-[40vh]">
        <Image
          src="/images/uis/catalogo.jpg"
          alt="Catálogo productos internacionales Wally Pickers"
          fill
          className="object-cover rounded-xl shadow-lg"
        />
      </div>

      {/* Modal con Animación */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0   flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-8 rounded-xl shadow-lg w-96"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <h3 className="text-2xl font-semibold mb-4 text-center">
                Descargar Catálogo
              </h3>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  name= "name"
                  id="name"
                  autoComplete="name"
                  placeholder="Tu nombre"
                  className="border p-2 rounded"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  required
                />
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  placeholder="Tu correo"
                  className="border p-2 rounded"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  required
                />
                <input
                  type="text"
                  id="phone"
                  autoComplete="tel"
                  placeholder="Tu teléfono"
                  className="border p-2 rounded"
                  value={form.phone}
                  onChange={(e) =>
                    setForm({ ...form, phone: e.target.value })
                  }
                  required
                />
                <select
                  id="business-type"
                  className="border p-2 rounded"
                  value={form.tipoNegocio}
                  onChange={(e) =>
                    setForm({ ...form, tipoNegocio: e.target.value })
                  }
                  required
                >
                   <option value="Restaurante / Bar / Cafetería">Restaurante / Bar / Cafetería</option>
                  <option value="Tienda de alimentación / Supermercado">Tienda de alimentación / Supermercado</option>
                  <option value="Distribuidor/Mayorista">Distribuidor/Mayorista</option>
                  <option value="Hotel / Catering">Hotel / Catering</option>
                  <option value="Tienda especializada (gourmet, internacional, etc.)">Tienda especializada (gourmet, internacional, etc.)</option>
                  <option value="Otro">Otro</option>
                </select>
                <button
                  type="submit"
                  className="bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
                >
                  Enviar y descargar
                </button>
                <button
                  type="button"
                  className="text-sm text-gray-500 underline mt-2"
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
