import Image from "next/image";
import React from "react";
import Link from "next/link";


const CustomersRectangle: React.FC = () => {
  return (
    <section className="w-full  px-6  py-6 sm:py-12 lg:py-20 sm:px-6 lg:px-20h[80vh] ">
      <div className="overflow-hidden rounded-2xl grid grid-cols-1 md:grid-cols-2 min-h-[60vh]">
        
        {/* Texto */}
        <div
          className="
            flex flex-col justify-center py-4 md:px-8
             md:bg-[#0e344f]
          "
        >
          <span className="text-black md:text-white/80 uppercase tracking-widest sm:text-sm md:text-base font-semibold">
            Ser cliente
          </span>
          <h2 className=" md:inline text-black md: md:text-white mt-4 sm:mt-6 font-serif  text-6xl leading-tight whitespace-pre-line">
            Crezcamos juntos
          </h2>
          
           
          <p className="mt-3 sm:mt-4  text-xl md:text-lg text-black/80 md:text-white/80">
            Nos enorgullecemos de apoyar el éxito de nuestros clientes proporcionando productos de alta calidad y un servicio excepcional.
          </p>
          

          {/* BUTTON hide on mobile, show from sm+ */}
          
          <div className = "pb-4 ">
            <Link
            href='#contact'
            className="
              hidden md:inline-block  mt-6 sm:mt-8
              bg-white text-[#0e344f] font-semibold
              rounded-lg
              px-4 py-2 sm:px-6 sm:py-3
              shadow-md hover:bg-gray-100
              transition-colors
              
            "
          >
            Contacta con nosotros
          </Link>
          </div>
          
        </div>

        {/* Imagen ordenador*/}
        <div className="hidden md:block relative h-64 md:h-auto md:rounded-tl-none md:rounded-bl-none rounded-2xl overflow-hidden ">
          <Image
            src="/images/become-client/trabajadora-buena.png"
            alt={"imagen de mujer sonriendo"}
            fill
            loading = "eager"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
            className="object-cover"
            priority
          />
        </div>
        {/* IMAGEN MOVIL */}
        <div className="md:hidden relative h-64 md:h-auto w-full  rounded-2xl overflow-hidden ">
          <Image
            src="/images/become-client/trabajadora-buena.png"
            alt={"imagen de mujer sonriendo"}
            fill
            loading = "eager"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
            className="object-cover"
            priority
          />
        </div>

        {/* button on mobile only, below image */}
        <div className="flex items-center justify-center md:hidden pt-8 ">
          <Link
            href="#contact"
            className="
              sm:inline-block 
              bg-[#0e344f] text-white font-semibold
              rounded-2xl
              px-4 py-2 sm:px-6 sm:py-3
              shadow-md hover:bg-[#6b96b4]
              transition-colors
              text-center w-full
            "
          >
            Contacta con nosotros
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CustomersRectangle;
