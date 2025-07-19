"use client";
import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * ──────────────────────────────────────────────────────────────────────────────
 * TYPES & DATA
 * ──────────────────────────────────────────────────────────────────────────────
 */
type Review = {
  author: string;
  rating: number; // 1…5
  text: string;
};

const reviews: Review[] = [
  {
    author: "Juan Pérez",
    rating: 5,
    text: "Excelente proveedor, siempre cumplen con los plazos de entrega y la calidad de los productos es excepcional.",
  },
  {
    author: "María Gómez",
    rating: 5,
    text: "El trato al cliente es inmejorable. Nos ayudaron a encontrar los productos perfectos para nuestro negocio.",
  },
  {
    author: "Carlos Ruiz",
    rating: 4,
    text: "Gran variedad de productos y precios competitivos. Muy satisfecho con el servicio.",
  },
  {
    author: "Lucía Fernández",
    rating: 5,
    text: "La logística es rápida y eficiente. Recibimos nuestros pedidos siempre a tiempo.",
  },
  {
    author: "Pedro Martínez",
    rating: 5,
    text: "La calidad de los productos nunca decepciona. Recomendado al 100%.",
  },
  {
    author: "Ana Torres",
    rating: 4,
    text: "Muy buena atención y respuesta rápida ante cualquier consulta.",
  },
  {
    author: "Sofía López",
    rating: 5,
    text: "Nos ofrecieron soluciones digitales que facilitaron mucho la gestión de pedidos.",
  },
  {
    author: "Miguel Sánchez",
    rating: 5,
    text: "El equipo es muy profesional y siempre dispuesto a ayudar.",
  },
  {
    author: "Elena Navarro",
    rating: 5,
    text: "La integración con nuestro sistema fue sencilla y efectiva. Muy recomendable.",
  },
  {
    author: "Javier Ortega",
    rating: 4,
    text: "Buen servicio y productos de calidad. Volveremos a comprar sin duda.",
  },
];

interface ReviewsSectionProps  {
  title: string;
  backgroundColor?: string;
  titleColor?: string;  


};

/* ── COMPONENTE ────────────────────────────────────────────────────────────── */
const ReviewsSection: React.FC<ReviewsSectionProps> = ({ title, backgroundColor, titleColor }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateNav = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 0);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    updateNav();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateNav, { passive: true });
    return () => el.removeEventListener("scroll", updateNav);
  }, []);

  const scrollBy = (dir: "prev" | "next") => {
    const el = trackRef.current;
    if (!el) return;
    const amount = el.clientWidth;
    el.scrollBy({ left: dir === "next" ? amount : -amount, behavior: "smooth" });
  };

  return (
    <section className={`py-12 bg-${backgroundColor} relative`}>
      <div className="mx-auto px-4">
        <h2 className={`text-3xl font-semibold text-${titleColor} mb-8 text-center`}>
          {title || "Lo que dicen nuestros clientes"}
        </h2>

        {/* PISTA HORIZONTAL */}
        <div
          ref={trackRef}
          className="
            flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth
            [&>*]:shrink-0 scrollbar-hidden-lg
          "
        >
          {reviews.map((r, i) => (
            <article
              key={i}
              className="
                snap-center w-full sm:w-4/5 md:w-1/2 lg:w-1/3
                bg-transparent border border-white/20 rounded-lg p-6 mb-5 
              "
            >
              {/* estrellas */}
              <div className="flex mb-2">
                {[...Array(5)].map((_, ix) => (
                  <svg
                    key={ix}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className={`w-5 h-5 ${
                      ix < r.rating ? "text-green-400" : "text-green-400/30"
                    }`}
                  >
                    <path d="M12 17.27 18.18 21 16.54 13.97 22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>

              <p className="italic text-white/90">“{r.text}”</p>
              <p className="mt-4 text-sm text-white">– {r.author}</p>
            </article>
          ))}
        </div>
      </div>

      {/* BOTÓN PREV */}
      <button
        aria-label="Anterior"
        onClick={() => scrollBy("prev")}
        disabled={!canPrev}
        className="
          hidden lg:flex items-center justify-center
          absolute top-1/2 -translate-y-1/2 left-4
          w-10 h-10 rounded-full bg-white/10 hover:bg-white/20
          transition disabled:opacity-30 disabled:pointer-events-none
        "
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      {/* BOTÓN NEXT */}
      <button
        aria-label="Siguiente"
        onClick={() => scrollBy("next")}
        disabled={!canNext}
        className="
          hidden lg:flex items-center justify-center
          absolute top-1/2 -translate-y-1/2 right-4
          w-10 h-10 rounded-full bg-white/10 hover:bg-white/20
          transition disabled:opacity-30 disabled:pointer-events-none
        "
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>
    </section>
  );
};

export default ReviewsSection;
