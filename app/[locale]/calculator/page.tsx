import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import vehicles from '@/data/vehicles-fallback.json';
import networks from '@/data/networks-fallback.json';
import CostCalculator from '@/components/CostCalculator';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'calculator' });
  return {
    title: t('title'),
    description: t('subtitle'),
    alternates: {
      canonical: `https://ev-charge-rates.vercel.app/${locale}/calculator`,
    },
  };
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'EV Charging Cost Calculator',
  description: 'Calculate exactly how much it costs to charge your EV on any major US network',
  applicationCategory: 'UtilityApplication',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
};

function CalculatorContent() {
  const t = useTranslations('calculator');

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-[#052e16] mb-2">{t('title')}</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">{t('subtitle')}</p>
      </div>

      <CostCalculator vehicles={vehicles} networks={networks} />

      {/* How it works */}
      <div className="mt-12 bg-white rounded-2xl border border-green-100 p-8">
        <h2 className="text-xl font-bold text-[#052e16] mb-6">How the Calculator Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="w-8 h-8 bg-[#22c55e] text-white rounded-full flex items-center justify-center font-bold text-sm mb-3">1</div>
            <h3 className="font-semibold text-[#052e16] mb-1">Select Your Vehicle</h3>
            <p className="text-sm text-gray-500">We know your vehicle's battery capacity and max charging speed from our database.</p>
          </div>
          <div>
            <div className="w-8 h-8 bg-[#22c55e] text-white rounded-full flex items-center justify-center font-bold text-sm mb-3">2</div>
            <h3 className="font-semibold text-[#052e16] mb-1">Choose Charge Amount</h3>
            <p className="text-sm text-gray-500">Set your starting and target battery percentage to calculate kWh needed.</p>
          </div>
          <div>
            <div className="w-8 h-8 bg-[#22c55e] text-white rounded-full flex items-center justify-center font-bold text-sm mb-3">3</div>
            <h3 className="font-semibold text-[#052e16] mb-1">Compare All Networks</h3>
            <p className="text-sm text-gray-500">We calculate cost and time for every compatible network, sorted from cheapest to most expensive.</p>
          </div>
        </div>
      </div>

      {/* Pricing notes */}
      <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm text-yellow-800">
        <strong>Note:</strong> Prices are estimates based on published rates as of April 2026. Actual costs may vary by location, time of day, membership status, and network promotions. Always verify current rates before charging.
      </div>
    </div>
  );
}

export default async function CalculatorPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <CalculatorContent />;
}
