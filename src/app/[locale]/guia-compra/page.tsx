'use client';

import { useState } from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Types for blog posts
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image?: string;
}

// Mock data - in a real app, this would come from a database or CMS
const mockPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Cómo detectar productos en tendencia antes que tu competencia',
    excerpt: 'Descubre las técnicas y herramientas más efectivas para identificar productos trending antes de que se vuelvan mainstream y obtener ventaja competitiva en tu negocio.',
    content: 'En esta guía completa, exploramos las estrategias más efectivas para detectar tendencias...',
    image: '/images/buy-guide/trends.jpg',
  },
  {
    id: '2',
    title: '¿Cuáles son los errores más comunes al comprar productos en tendencia?',
    excerpt: 'Evita los errores más costosos que cometen los compradores al seleccionar productos trending. Una guía práctica para tomar mejores decisiones de compra.',
    content: 'Los errores en la compra de productos trending pueden ser muy costosos...',
    image: '/images/buy-guide/errors.jpg',
  },
  {
    id: '3',
    title: 'Cómo montar un corner de productos de impulso en tu tienda física',
    excerpt: 'Aprende a diseñar y organizar un corner de productos de impulso que maximice tus ventas y mejore la experiencia de compra de tus clientes.',
    content: 'El merchandising de productos de impulso es un arte que puede transformar tu tienda...',
    image: '/images/buy-guide/corner.jpg',
  }
];

export default function GuiaCompraPage() {
  const [posts] = useState<BlogPost[]>(mockPosts);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#0e344f] to-[#4b68e8] py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Guía de Compra
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Descubre consejos, tendencias y guías de compra de nuestros expertos. 
            Encuentra todo lo que necesitas saber para hacer las mejores elecciones comerciales.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Articles */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <FeaturedPostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

// Featured Post Card Component
function FeaturedPostCard({ post }: { post: BlogPost }) {
  return (
    <Link
          href={`/guia-compra/${post.id}`}
          className="inline-flex items-center gap-2 text-[#4b68e8] hover:text-[#6581ff] font-medium transition-colors"
        >
            <article className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                <div className="relative h-64 overflow-hidden">
                    <Image
                        src={post.image || '/images/img-error.jpg'}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                </div>
                
                <div className="p-6">
                    
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#4b68e8] transition-colors">
                    {post.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                    </p>
                    
                    
                    
                    
                </div>
            </article>
    </Link>
    
  );
}
