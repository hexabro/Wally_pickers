import Image from "next/image";

export default function AutoritySection() {
  return (
    <section id="procedencia" className="px-5 my-0 mx-auto md:px-20 md:text-left flex md:flex-row flex-col-reverse items-center gap-10 bg-[#2c81be]">
      <div className="flex-1 space-y-4 md:flex-1/2">
        <h2 className="text-3xl md:text-4xl font-bold text-amber-50 underline underline-offset-13 decoration-dashed ">Calidad garantizada</h2>
        <p className = "text-[#f7f7f7]">
          Trabajamos con fabricantes y distribuidores líderes en Asia, América, Europa y Reino Unido.
          Contamos con más de 300 productos internacionales listos para tu negocio, con alta rotación,
          márgenes competitivos y distribución eficiente. 
        </p>
      </div>

      <Image src="/images/mapa_wally.png" alt="Mapa procedencia" width={400} height ={400} className="md:flex-1/2 " />
    </section>
  );
}
