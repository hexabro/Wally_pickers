'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Calendar, User, ArrowLeft, Share2, Heart, BookOpen, Tag, Clock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Types
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image?: string;
  tags: string[];
  readTime?: number;
}

// Mock data - in a real app, this would come from a database
const mockPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Cómo detectar productos en tendencia antes que tu competencia',
    excerpt: 'Descubre las técnicas y herramientas más efectivas para identificar productos trending antes de que se vuelvan mainstream y obtener ventaja competitiva en tu negocio.',
    content: `
      <h2>Introducción</h2>
      <p>En el competitivo mundo del retail y el comercio, detectar tendencias antes que la competencia puede ser la diferencia entre el éxito y el fracaso. La capacidad de identificar productos que están por explotar en popularidad te permite posicionarte como líder en el mercado y maximizar tus beneficios.</p>
      
      <h2>Herramientas clave para detectar tendencias</h2>
      <h3>1. Google Trends y análisis de búsquedas</h3>
      <p>Google Trends es tu mejor aliado para detectar el crecimiento en búsquedas de productos específicos. Analiza patrones estacionales, picos de interés y compara términos relacionados para identificar oportunidades emergentes.</p>
      
      <h3>2. Redes sociales como termómetro</h3>
      <p>Instagram, TikTok y Pinterest son laboratorios de tendencias. Observa qué productos aparecen frecuentemente en posts de influencers, qué hashtags están creciendo y qué contenido genera más engagement.</p>
      
      <h3>3. Análisis de la competencia</h3>
      <p>Monitorea qué hacen tus competidores más exitosos, pero no te limites a copiar. Busca patrones en sus lanzamientos y anticípate a sus próximos movimientos.</p>
      
      <h2>Estrategias de investigación de mercado</h2>
      <h3>Ferias y eventos del sector</h3>
      <p>Las ferias comerciales son ventanas al futuro. Los expositores suelen presentar productos que estarán en el mercado en 6-12 meses. Networking con proveedores te dará acceso a información privilegiada.</p>
      
      <h3>Consumo en mercados avanzados</h3>
      <p>Lo que es popular en Japón, Corea del Sur o California hoy, podría ser tendencia en España en 6 meses. Estudia mercados que suelen marcar tendencias globales.</p>
      
      <h3>Análisis generacional</h3>
      <p>La Generación Z y los millennials son los principales impulsores de nuevas tendencias. Entiende sus valores, preocupaciones y aspiraciones para anticipar qué productos resonarán con ellos.</p>
      
      <h2>Indicadores tempranos de éxito</h2>
      <p>Busca productos que muestren crecimiento sostenido en búsquedas durante 2-3 meses, aparición en múltiples plataformas sociales, y endorsement de micro-influencers antes que macro-influencers.</p>
      
      <h2>Conclusión</h2>
      <p>Detectar tendencias es una combinación de análisis de datos, intuición de mercado y timing perfecto. Desarrolla un sistema de monitoreo constante y no tengas miedo de apostar por productos innovadores cuando todos los indicadores apunten en la misma dirección.</p>
    `,
    
    category: 'Estrategia',
    image: '/images/buy-guide/trends.jpg',
    tags: ['tendencias', 'estrategia', 'competencia', 'análisis'],
    readTime: 6
  },
  {
    id: '2',
    title: 'Errores más comunes al comprar productos en tendencia',
    excerpt: 'Evita los errores más costosos que cometen los compradores al seleccionar productos trending. Una guía práctica para tomar mejores decisiones de compra.',
    content: `
      <h2>Los errores que pueden hundir tu negocio</h2>
      <p>Comprar productos en tendencia puede ser extremadamente lucrativo, pero también arriesgado. Los errores en este proceso pueden costar miles de euros y dañar la reputación de tu negocio. Aprende de los errores más comunes para evitar caer en las mismas trampas.</p>
      
      <h2>Error #1: Llegar demasiado tarde a la tendencia</h2>
      <h3>El problema</h3>
      <p>Muchos compradores esperan a que una tendencia esté completamente establecida antes de actuar. Para entonces, el mercado ya está saturado y los márgenes se han reducido drasticamente.</p>
      
      <h3>La solución</h3>
      <p>Desarrolla un sistema de alerta temprana y acepta que no todos los productos serán éxitos. Es mejor apostar por 10 productos emergentes y que 3 sean exitosos, que apostar por 1 producto establecido con márgenes mínimos.</p>
      
      <h2>Error #2: Sobreestimar la demanda</h2>
      <h3>El problema</h3>
      <p>Ver las primeras señales de éxito de un producto y asumir que la demanda será masiva e ilimitada. Esto lleva a sobrestock y productos que no rotan.</p>
      
      <h3>La solución</h3>
      <p>Comienza con pedidos pequeños y escala gradualmente. Analiza la curva de adopción típica en tu mercado y ajusta tus expectativas a la realidad de tu audiencia.</p>
      
      <h2>Error #3: Ignorar la estacionalidad</h2>
      <h3>El problema</h3>
      <p>Muchos productos trending tienen componentes estacionales que se ignoran. Comprar productos de verano en abril puede parecer inteligente, pero si la tendencia murió en febrero, te quedarás con stock invendible.</p>
      
      <h3>La solución</h3>
      <p>Estudia patrones históricos de productos similares y considera factores externos como el clima, eventos sociales y calendarios comerciales.</p>
      
      <h2>Error #4: No verificar la calidad del proveedor</h2>
      <p>La prisa por capitalizar una tendencia lleva a muchos a trabajar con proveedores no verificados. Esto resulta en productos defectuosos, retrasos en la entrega y clientes insatisfechos.</p>
      
      <h2>Error #5: Falta de diferenciación</h2>
      <p>Copiar exactamente lo que hace la competencia no es una estrategia. Busca formas de diferenciar tu oferta: mejor precio, mejor calidad, mejor servicio o mejor presentación.</p>
      
      <h2>Cómo evitar estos errores</h2>
      <p>Desarrolla un proceso de evaluación sistemático, mantén relaciones sólidas con proveedores confiables, y siempre ten un plan B. La clave está en equilibrar la velocidad de decisión con la diligencia debida.</p>
    `,
    category: 'Compras',
    image: '/images/buy-guide/errors.jpg',
    tags: ['errores', 'compras', 'tendencias', 'consejos'],
    readTime: 7
  },
  {
    id: '3',
    title: 'Cómo montar un corner de productos de impulso en tu tienda física',
    excerpt: 'Aprende a diseñar y organizar un corner de productos de impulso que maximice tus ventas y mejore la experiencia de compra de tus clientes.',
    content: `
      <h2>El poder de la compra por impulso</h2>
      <p>Los productos de impulso pueden representar hasta el 30% de las ventas totales de una tienda física bien organizada. Un corner de impulso efectivo no solo incrementa tus ingresos, sino que también mejora la percepción de variedad y novedad de tu establecimiento.</p>
      
      <h2>Ubicación estratégica del corner</h2>
      <h3>Cerca de la caja registradora</h3>
      <p>El área más efectiva para productos de impulso es junto a la zona de pago. Los clientes tienen tiempo para observar mientras esperan y están en modo "compra", facilitando decisiones rápidas.</p>
      
      <h3>Zonas de tráfico alto</h3>
      <p>Pasillos principales, entrada de la tienda y cerca de productos ancla (productos que la gente viene a buscar específicamente) son ubicaciones ideales para captar atención.</p>
      
      <h3>Alturas visuales óptimas</h3>
      <p>Los productos deben estar entre 90cm y 160cm de altura - la zona de visión natural del cliente. Lo que está muy alto se ignora, lo que está muy bajo no se ve.</p>
      
      <h2>Selección de productos ideales</h2>
      <h3>Características del producto perfecto de impulso</h3>
      <p>Precio bajo (menos de 20€), utilidad inmediata, empaque atractivo, producto complementario a compras principales, y novedad o factor "wow".</p>
      
      <h3>Categorías que funcionan mejor</h3>
      <p>Snacks y bebidas, accesorios tecnológicos, productos de belleza y cuidado personal, artículos de temporada, y productos curiosos o divertidos.</p>
      
      <h2>Diseño y presentación del corner</h2>
      <h3>Principio de la pirámide</h3>
      <p>Coloca los productos más atractivos a la altura de los ojos, productos complementarios en el nivel medio, y stock adicional en la parte inferior.</p>
      
      <h3>Iluminación efectiva</h3>
      <p>Usa iluminación LED direccional para destacar productos. La luz cálida (3000K) es ideal para productos alimentarios, mientras que la luz fría (4000K) funciona mejor para tecnología.</p>
      
      <h3>Señalización clara</h3>
      <p>Precios visibles, beneficios del producto en pocas palabras, y ofertas especiales claramente marcadas. Evita sobrecargar con información.</p>
      
      <h2>Rotación y renovación constante</h2>
      <p>Cambia al menos el 30% de los productos cada 2-3 semanas. Los clientes habituales deben encontrar siempre algo nuevo que los sorprenda.</p>
      
      <h2>Métricas de éxito</h2>
      <p>Mide la rotación por producto, el ticket promedio, y la frecuencia de compra de productos de impulso. Un corner exitoso debe tener una rotación de al menos 8 veces al año.</p>
      
      <h2>Errores comunes a evitar</h2>
      <p>No sobrecargar el espacio, mantener el corner limpio y organizado, evitar productos demasiado caros para impulso, y no descuidar la reposición de stock.</p>
    `,
    
    category: 'Retail',
    image: '/images/buy-guide/corner.jpg',
    tags: ['retail', 'merchandising', 'impulso', 'tienda'],
    readTime: 8
  }
];

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    // Simulate API call
    const foundPost = mockPosts.find(p => p.id === params.id);
    setPost(foundPost || null);
    setLoading(false);
  }, [params.id]);

  const handleShare = async () => {
    if (navigator.share && post) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        // Fallback to copying URL
        navigator.clipboard.writeText(window.location.href);
        alert('URL copiada al portapapeles');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('URL copiada al portapapeles');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#4b68e8]"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Artículo no encontrado</h1>
          <p className="text-gray-600 mb-8">El artículo que buscas no existe o ha sido eliminado.</p>
          <Link
            href="/guia-compra"
            className="bg-[#4b68e8] hover:bg-[#6581ff] text-white px-6 py-3 rounded-lg transition-colors"
          >
            Volver a la Guía de Compra
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[400px] md:h-96 overflow-hidden">
        <Image
          src={post.image || '/images/img-error.jpg'}
          alt={post.title}
          fill
          className="object-cover blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10"></div>
        
        {/* Back Button */}
        <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 bg-white/90 hover:bg-white text-gray-900 px-3 py-1 md:px-4 md:py-2 rounded-lg transition-colors backdrop-blur-sm text-sm md:text-base"
          >
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
            Volver
          </button>
        </div>

        {/* Article Meta */}
        <div className="absolute bottom-1/4 md:bottom-6 left-4 right-4 md:left-6 md:right-6 overflow-hidden">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-2 md:mb-4">
              <span className="bg-[#4b68e8] text-white px-2 py-0.5 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-medium">
                {post.category}
              </span>
              
              {post.readTime && (
                <div className="flex items-center gap-1 text-white/90">
                  <Clock className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="text-xs md:text-sm">{post.readTime} min lectura</span>
                </div>
              )}
            </div>
            
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-2 md:mb-4 line-clamp-2 md:line-clamp-none">
              {post.title}
            </h1>
            
            <p className="text-base md:text-xl text-white/90 mb-3 md:mb-6 line-clamp-2 md:line-clamp-none">
              {post.excerpt}
            </p>
            
            <div className="flex items-center justify-end md:justify-between">
              <div className="flex items-center gap-2 md:gap-3">
                <button
                  onClick={handleShare}
                  className="p-2 md:p-3 bg-white/20 text-white hover:bg-white/30 rounded-full transition-colors"
                >
                  <Share2 className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          
          {/* Tags */}
          <div className="border-t pt-8 mt-12">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Tag className="w-5 h-5" />
              Etiquetas
            </h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
          
          
        </div>
      </div>

      {/* Back to Blog */}
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <div className="text-center">
          <Link
            href="/guia-compra"
            className="inline-flex items-center gap-2 bg-[#4b68e8] hover:bg-[#6581ff] text-white px-6 py-3 rounded-lg transition-colors"
          >
            <BookOpen className="w-5 h-5" />
            Ver más artículos
          </Link>
        </div>
      </div>
    </div>
  );
}
