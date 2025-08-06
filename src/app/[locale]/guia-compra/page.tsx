'use client';

import { useState } from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

// Types for blog posts
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image?: string;
}

export default function GuiaCompraPage() {
  const t = useTranslations('buy-guide');
  const posts: BlogPost[] = t.raw('posts');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#0e344f] to-[#4b68e8] py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t('hero.title')}
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            {t('hero.description')}
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
