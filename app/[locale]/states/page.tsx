import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import states from '@/data/states-fallback.json';
import StateTable from '@/components/StateTable';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'states' });
  return {
    title: t('title'),
    description: t('subtitle'),
    alternates: {
      canonical: `https://ev-charge-rates.vercel.app/${locale}/states`,
    },
  };
}

function StatesContent({ locale }: { locale: string }) {
  const t = useTranslations('states');

  const totalStations = states.reduce((sum, s) => sum + s.stations, 0);
  const avgRate = states.reduce((sum, s) => sum + s.avgRatePerKwh, 0) / states.length;
  const topState = [...states].sort((a, b) => b.stations - a.stations)[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#052e16] mb-2">{t('title')}</h1>
        <p className="text-gray-600">{t('subtitle')}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="bg-white rounded-xl border border-green-100 p-4 text-center">
          <p className="text-2xl font-bold text-[#22c55e]">50</p>
          <p className="text-xs text-gray-500 mt-1">States covered</p>
        </div>
        <div className="bg-white rounded-xl border border-green-100 p-4 text-center">
          <p className="text-2xl font-bold text-[#22c55e]">{totalStations.toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-1">Total stations</p>
        </div>
        <div className="bg-white rounded-xl border border-green-100 p-4 text-center">
          <p className="text-2xl font-bold text-[#22c55e]">${avgRate.toFixed(3)}</p>
          <p className="text-xs text-gray-500 mt-1">Avg electricity rate</p>
        </div>
        <div className="bg-white rounded-xl border border-green-100 p-4 text-center">
          <p className="text-2xl font-bold text-[#22c55e]">{topState.abbr}</p>
          <p className="text-xs text-gray-500 mt-1">Most stations ({topState.stations.toLocaleString()})</p>
        </div>
      </div>

      <StateTable states={states} locale={locale} />
    </div>
  );
}

export default async function StatesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <StatesContent locale={locale} />;
}
