"use client"
import { useTranslations } from 'next-intl';

export default function PrivacyPolicyPage() {
  const t = useTranslations('legal.privacyPolicy');

  return (
    <main className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[#0e344f] mb-8 text-center">
            {t('title')}
          </h1>
          
          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-[#0e344f] mb-4">{t('section1.title')}</h2>
              <p className="mb-4">{t('section1.content')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#0e344f] mb-4">{t('section2.title')}</h2>
              <p className="mb-4">{t('section2.content')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#0e344f] mb-4">{t('section3.title')}</h2>
              <p className="mb-4">{t('section3.content')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#0e344f] mb-4">{t('section4.title')}</h2>
              <p className="mb-4">{t('section4.content')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#0e344f] mb-4">{t('section5.title')}</h2>
              <p className="mb-4">{t('section5.content')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#0e344f] mb-4">{t('section6.title')}</h2>
              <p className="mb-4">{t('section6.content')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#0e344f] mb-4">{t('section7.title')}</h2>
              <p className="mb-4">{t('section7.content')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#0e344f] mb-4">{t('section8.title')}</h2>
              <p className="mb-4">{t('section8.content')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#0e344f] mb-4">{t('section9.title')}</h2>
              <p className="mb-4">{t('section9.content')}</p>
            </section>

            <div className="mt-12 pt-8 border-t border-gray-200 text-sm text-gray-600">
              <p>{t('lastUpdated')}: {t('date')}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
