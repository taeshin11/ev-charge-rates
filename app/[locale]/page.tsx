import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { Zap, TrendingDown, MapPin, ChevronRight } from 'lucide-react';
import networks from '@/data/networks-fallback.json';
import vehicles from '@/data/vehicles-fallback.json';
import states from '@/data/states-fallback.json';
import NetworkCard from '@/components/NetworkCard';
import CostCalculator from '@/components/CostCalculator';
import StateTable from '@/components/StateTable';
import { AdsterraNativeBanner } from '@/components/ads/AdsterraNativeBanner';
import { AdsterraDisplay } from '@/components/ads/AdsterraDisplay';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });
  return {
    title: 'EVChargeRates — EV Charging Prices & Speeds by Network',
    description: t('hero_subtitle'),
    alternates: {
      canonical: `https://ev-charge-rates.vercel.app/${locale}`,
    },
  };
}

function FAQSection() {
  const t = useTranslations('home');
  const faqs = [
    { q: t('faq_q1'), a: t('faq_a1') },
    { q: t('faq_q2'), a: t('faq_a2') },
    { q: t('faq_q3'), a: t('faq_a3') },
    { q: t('faq_q4'), a: t('faq_a4') },
    { q: t('faq_q5'), a: t('faq_a5') },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-[#052e16] mb-8 text-center">{t('faq_title')}</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details key={i} className="group border border-green-100 rounded-xl overflow-hidden">
              <summary className="flex justify-between items-center px-5 py-4 cursor-pointer font-medium text-[#052e16] hover:bg-green-50 transition-colors list-none">
                {faq.q}
                <ChevronRight className="w-4 h-4 text-gray-400 group-open:rotate-90 transition-transform flex-shrink-0 ml-2" />
              </summary>
              <div className="px-5 pb-4 pt-2 text-sm text-gray-600 bg-green-50/50">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomeContent({ locale }: { locale: string }) {
  const t = useTranslations('home');
  const topNetworks = networks.slice(0, 6);
  const topStates = states.slice(0, 10);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'EVChargeRates',
    url: 'https://ev-charge-rates.vercel.app',
    description: 'Compare EV charging prices, speeds, and availability across all major US networks.',
    potentialAction: {
      '@type': 'SearchAction',
      target: `https://ev-charge-rates.vercel.app/${locale}/networks?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t('faq_q1'), acceptedAnswer: { '@type': 'Answer', text: t('faq_a1') } },
      { '@type': 'Question', name: t('faq_q2'), acceptedAnswer: { '@type': 'Answer', text: t('faq_a2') } },
      { '@type': 'Question', name: t('faq_q3'), acceptedAnswer: { '@type': 'Answer', text: t('faq_a3') } },
      { '@type': 'Question', name: t('faq_q4'), acceptedAnswer: { '@type': 'Answer', text: t('faq_a4') } },
      { '@type': 'Question', name: t('faq_q5'), acceptedAnswer: { '@type': 'Answer', text: t('faq_a5') } },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#052e16] to-[#166534] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-[#22c55e]/20 rounded-full p-3">
              <Zap className="w-8 h-8 text-[#22c55e]" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            {t('hero_title')}
          </h1>
          <p className="text-lg md:text-xl text-green-200 mb-8 max-w-2xl mx-auto">
            {t('hero_subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={`/${locale}/networks`}
              className="bg-[#22c55e] text-white px-6 py-3 rounded-full font-semibold hover:bg-green-400 transition-colors"
            >
              {t('cta_compare')}
            </Link>
            <Link
              href={`/${locale}/calculator`}
              className="bg-white/10 text-white border border-white/30 px-6 py-3 rounded-full font-semibold hover:bg-white/20 transition-colors"
            >
              {t('cta_calculate')}
            </Link>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-6 mt-12 max-w-lg mx-auto">
            <div>
              <p className="text-2xl font-bold text-[#22c55e]">{networks.length}</p>
              <p className="text-xs text-green-300">Networks</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#22c55e]">50</p>
              <p className="text-xs text-green-300">States</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#22c55e]">{vehicles.length}</p>
              <p className="text-xs text-green-300">Vehicles</p>
            </div>
          </div>
        </div>
      </section>

      {/* Top Networks */}
      <section className="py-16 bg-[#f0fdf4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-[#052e16]">{t('section_networks')}</h2>
            <Link href={`/${locale}/networks`} className="text-sm text-[#22c55e] hover:underline font-medium flex items-center gap-1">
              View all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {topNetworks.map((network) => (
              <NetworkCard key={network.slug} network={network} locale={locale} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Use EV Charging Cards */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingDown className="w-6 h-6 text-[#22c55e]" />
              </div>
              <h3 className="font-bold text-[#052e16] mb-2">Compare Prices</h3>
              <p className="text-sm text-gray-500">See exact per-kWh rates across all networks before you plug in</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-[#22c55e]" />
              </div>
              <h3 className="font-bold text-[#052e16] mb-2">Know Charging Speed</h3>
              <p className="text-sm text-gray-500">Understand how fast each network charges your specific vehicle</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-[#22c55e]" />
              </div>
              <h3 className="font-bold text-[#052e16] mb-2">Find Local Stations</h3>
              <p className="text-sm text-gray-500">Discover station counts and coverage in every state</p>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-16 bg-[#f0fdf4]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#052e16] mb-8 text-center">{t('section_calculator')}</h2>
          <CostCalculator vehicles={vehicles} networks={networks} />
        </div>
      </section>

      {/* States */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-[#052e16]">{t('section_states')}</h2>
            <Link href={`/${locale}/states`} className="text-sm text-[#22c55e] hover:underline font-medium flex items-center gap-1">
              View all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <StateTable states={topStates} locale={locale} />
        </div>
      </section>
      <AdsterraNativeBanner />
      <AdsterraDisplay />

      <FAQSection />
    </>
  );
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <HomeContent locale={locale} />;
}
