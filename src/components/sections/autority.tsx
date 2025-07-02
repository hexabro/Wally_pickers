import Image from "next/image";
import Link from "next/link";

export default function AutoritySection() {
  return (
    <section id="procedencia" className="px-5 pb-10 mx-auto md:px-20 md:text-left flex md:flex-row flex-col-reverse items-center gap-10 bg-[#0e344f]">
      <div className="flex-1 space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold text-amber-50 underline underline-offset-13 decoration-dashed ">Calidad garantizada</h2>
        <p className = "text-[#f7f7f7]">
          Contamos con gran variedad de productos como salsas, bebidas, especias, pulpas congeladas, cafés, golosinas y muchos más sabores de Asia y América. <br /><br />

          Somos una referencia en la importación, distribución y comercialización de alimentos <span className= "font-bold"> exóticos </span> en Europa. <br /><br />

          Esta experiencia nos ha otorgado una sólida posición en el mercado, permitiéndonos satisfacer las necesidades de nuestros clientes.
        </p>
        <Link href="#marcas" className="inline-block mt-4 px-6 py-3 rounded-full bg-[#4b68e8] text-white hover:bg-sky-700 transition">
          Echa un vistazo a nuestros productos
        </Link>
      </div>

      <Image src="/images/culturas.png" alt="Mapa procedencia" width={400} height ={400} className="flex-0 " />
    </section>
  );
}
