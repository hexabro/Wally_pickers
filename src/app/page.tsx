import HeroSlider from "@/components/sections/HeroSlider";
import AutoritySection from "@/components/sections/autority"
import StatsStrip from "@/components/sections/metrics";
import CategorySection from "@/components/sections/categories";
import  BrandCarousel  from "@/components/sections/brandCarousel";
import CatalogDownload from "@/components/sections/catalogDownload";


import AnimatedUnderline from "@/components/ui/animatedUnderline";
/** -------------------------------------------------------------
 *  Wally Pickers – Página de inicio (tipo landing)            
 *  Estructura solicitada por el cliente:                      
 *    1. Hero slider                                           
 *    2. Procedencia + CTA a marcas                            
 *    3. Métricas destacadas                                   
 *    4. Carrusel de marcas colaboradoras                      
 *    5. Categorías de producto + CTA catálogo                 
 *    6. Formulario descarga de catálogo                       
 *  Tailwind CSS + Next Image + React (sin librerías extra).   
 *  ----------------------------------------------------------*/


/* PRESENTACIÓN */
function Presentacion() {


  return (
    <section className="text-center py-16 px-4 bg-white">
      <h2 className="text-3xl md:text-4xl font-bold text-sky-950">
        Traemos los mejores alimentos de{' '}
        <AnimatedUnderline>  Asia y América </AnimatedUnderline>
        {' '}a Europa
      </h2>

      <p className="mt-6 max-w-5xl  mx-auto text-gray-700 text-lg leading-relaxed">
        Importamos los mejores alimentos de Latinoamérica para miles de clientes en toda Europa.
      </p>
      <p className="hidden md:block mt-6 max-w-5xl  mx-auto text-gray-700 text-lg leading-relaxed">
        Con un firme compromiso por la calidad, la autenticidad y la confianza, acercamos los sabores, colores y tradiciones de nuestra tierra al mundo.
      </p>
    </section>  
  )
}









/* ========================== EXPORT ========================== */
export default function HomePage() {
  return (
    <main>
      {/* <Lupa /> */}
      <HeroSlider />
      <Presentacion />
      <AutoritySection />
      <StatsStrip />
      <div className = "bg-neutral-100 pt-10 pb-5 ">
        <h2 className="text-3xl font-bold text-center text-sky-900 bg-neutral-100">
          Marcas que confían en nosotros
        </h2>
        <p className = "text-center pt-3.5 ">Con más de 200 productos diferentes, traemos sabores de todo el planeta a tus manos</p>
      </div>
      
      <BrandCarousel direction="right"/>
      <BrandCarousel direction ="left"/>
      <CategorySection />
      <CatalogDownload />
    </main>
  );
}
