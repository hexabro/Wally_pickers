import Image from "next/image";

const stats = [
  { label: "Clientes satisfechos", value: "3.200+", img: "apreton" },
  { label: "Unidades vendidas", value: "7,8M", img: "paqueterias" },
  { label: "Países servidos", value: "18" , img: "globo" },
  { label: "años de experiencia", value: "5" ,   img: "experience" },
  { label: "Productos", value: "200+", img: "estanteria" },
  { label: "Pedidos mensuales", value: "1.000+" ,   img: "paquete_recurrente" },
  { label: "Crecimiento mensual del catálogo", value: "20%" , img: "catalogo" },
  { label: "Kgs de alimentos importados", value: "1000+" , img: "alimentos" },
  { label: "Tasa de satisfacción", value: "98%" ,   img: "satisfaction" },
];

const ReasonsCards = () =>{
    return(
    <section className="max-w-7xl mx-auto p-10">
          <h3 className="text-2xl font-semibold text-sky-900 text-center mb-6">
            ¿Necesitas más razones?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {stats.map((stat) => (
              /* CARD */
              <div
                key={stat.label}
                className="bg-white rounded-lg shadow-md text-center hover:shadow-lg hover:shadow-[#0e344f] transition-all duration-500 group overflow-hidden "
              >
                <div className="grid grid-cols-2 md:grid-cols-1 group-hover:grid-cols-2 md:p-15 group-hover:p-0">
                  {/* Left side: original content */}
                  <div className="flex flex-col justify-center items-center">
                    <h4 className="text-xl font-bold text-sky-900 text-center mx-2">
                      {stat.value} {stat.label}
                    </h4>
                  </div>

                  {/* Right side: image appears on hover */}
                  <div className="md:h-0 md:opacity-0 group-hover:opacity-100 h-auto group-hover:h-auto transition-opacity duration-500">
                    <Image
                      src={`/images/reasons/${stat.img}.jpg`}
                      alt={`decoración de ${stat.label}`}
                      height={75} 
                      width={75}
                      className="w-full h-full object-contain  "
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
    );
}

export default ReasonsCards;