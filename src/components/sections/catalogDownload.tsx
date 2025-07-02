'use client' //porque necesita interactividad
/* =============== 6 · FORMULARIO DE DESCARGA ================= */
export default function CatalogDownload() {
  return (
    <section className="py-16 bg-neutral-100" id="catalogo">
      <div className="max-w-lg mx-auto text-center space-y-6">
        <h2 className="text-3xl font-bold text-sky-900 px-4">Descarga nuestro catálogo 2025</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("¡Enlace de descarga enviado a tu correo!");
          }}
          className="flex flex-col gap-4 px-auto sm:px-6 md:px-8 lg:px-10  p-6 rounded-lg shadow-md"
        >
          <input
            type="text"
            name="name"
            autoComplete="name"
            placeholder="Nombre"
            required
            className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="email"
            name="email"
            autoComplete="email"
            placeholder="Correo electrónico"
            required
            className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button type="submit" className="px-6 py-3 bg-green-600 text-white rounded-full font-semibold hover:bg-green-500 transition">
            Descargar catálogo
          </button>
        </form>
      </div>
    </section>
  );
}
