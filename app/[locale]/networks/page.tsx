import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import networks from '@/data/networks-fallback.json';
import NetworkTable from '@/components/NetworkTable';
import NetworkCard from '@/components/NetworkCard';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'networks' });
  return {
    title: t('title'),
    description: t('subtitle'),
    alternates: {
      canonical: `https://ev-charge-rates.vercel.app/${locale}/networks`,
    },
  };
}

function NetworksContent({ locale }: { locale: string }) {
  const t = useTranslations('networks');

  const sortedNetworks = [...networks].sort((a, b) => {
    const pa = a.pricePerKwh ?? 999;
    const pb = b.pricePerKwh ?? 999;
    return pa - pb;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#052e16] mb-2">{t('title')}</h1>
        <p className="text-gray-600">{t('subtitle')}</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="bg-white rounded-xl border border-green-100 p-4 text-center">
          <p className="text-2xl font-bold text-[#22c55e]">{networks.length}</p>
          <p className="text-xs text-gray-500 mt-1">Networks tracked</p>
        </div>
        <div className="bg-white rounded-xl border border-green-100 p-4 text-center">
          <p className="text-2xl font-bold text-[#22c55e]">
            ${Math.min(...networks.filter(n => n.pricePerKwh !== null).map(n => n.pricePerKwh as number)).toFixed(2)}
          </p>
          <p className="text-xs text-gray-500 mt-1">Lowest per kWh</p>
        </div>
        <div className="bg-white rounded-xl border border-green-100 p-4 text-center">
          <p className="text-2xl font-bold text-[#22c55e]">350 kW</p>
          <p className="text-xs text-gray-500 mt-1">Max charging speed</p>
        </div>
        <div className="bg-white rounded-xl border border-green-100 p-4 text-center">
          <p className="text-2xl font-bold text-[#22c55e]">
            {networks.reduce((sum, n) => sum + n.stations, 0).toLocaleString()}+
          </p>
          <p className="text-xs text-gray-500 mt-1">Total stations</p>
        </div>
      </div>

      {/* Table view */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-[#052e16] mb-4">Network Comparison Table</h2>
        <NetworkTable networks={sortedNetworks} locale={locale} />
      </div>

      {/* Card grid */}
      <div>
        <h2 className="text-xl font-bold text-[#052e16] mb-4">All Networks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {sortedNetworks.map((network) => (
            <NetworkCard key={network.slug} network={network} locale={locale} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default async function NetworksPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <NetworksContent locale={locale} />;
}
