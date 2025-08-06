'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Calendar, User, ArrowLeft, Share2, Heart, BookOpen, Tag, Clock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

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

export default function BlogPostPage() {
  const t = useTranslations('buy-guide');
  const posts: BlogPost[] = t.raw('posts');
  
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    // Find post from translations
    const foundPost = posts.find(p => p.id === params.id);
    setPost(foundPost || null);
    setLoading(false);
  }, [params.id, posts]);

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
        alert(t('postPage.urlCopied'));
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert(t('postPage.urlCopied'));
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('postPage.notFound.title')}</h1>
          <p className="text-gray-600 mb-8">{t('postPage.notFound.description')}</p>
          <Link
            href="/guia-compra"
            className="bg-[#4b68e8] hover:bg-[#6581ff] text-white px-6 py-3 rounded-lg transition-colors"
          >
            {t('postPage.notFound.backButton')}
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
            {t('postPage.backButton')}
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
                  <span className="text-xs md:text-sm">{post.readTime} {t('postPage.readTime')}</span>
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
              {t('postPage.tags')}
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
            {t('postPage.moreArticles')}
          </Link>
        </div>
      </div>
    </div>
  );
}
