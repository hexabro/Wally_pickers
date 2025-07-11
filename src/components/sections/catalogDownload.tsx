"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function CatalogSection() {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", email: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Formulario enviado:", form);
    setShowModal(false);
  };

  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-8 py-16 bg-[#0e344f] gap-8">
      {/* Izquierda: Título + Botón */}
      <div className="flex flex-col items-center  text-center md:text-left max-w-lg">
        <h2 className="block text-3xl font-bold mb-6 text-center  text-white">
          Descubre +300 productos esperándote!
        </h2>
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-3 rounded-full text-white font-semibold bg-radial from-green-400  to-blue-400 hover:scale-105 transition-transform hover:cursor-pointer"
        >
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
                  autoComplete = "email"
                  placeholder="Tu correo"
                  className="border p-2 rounded"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  required
                />
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
