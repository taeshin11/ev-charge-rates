import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import vehicles from '@/data/vehicles-fallback.json';
import VehicleCard from '@/components/VehicleCard';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'vehicles' });
  return {
    title: t('title'),
    description: t('subtitle'),
    alternates: {
      canonical: `https://ev-charge-rates.vercel.app/${locale}/vehicles`,
    },
  };
}

function VehiclesContent({ locale }: { locale: string }) {
  const t = useTranslations('vehicles');

  const makers = [...new Set(vehicles.map((v) => v.maker))].sort();
  const grouped = makers.map((maker) => ({
    maker,
    vehicles: vehicles.filter((v) => v.maker === maker),
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#052e16] mb-2">{t('title')}</h1>
        <p className="text-gray-600">{t('subtitle')}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        <div className="bg-white rounded-xl border border-green-100 p-4 text-center">
          <p className="text-2xl font-bold text-[#22c55e]">{vehicles.length}</p>
          <p className="text-xs text-gray-500 mt-1">EV Models</p>
        </div>
        <div className="bg-white rounded-xl border border-green-100 p-4 text-center">
          <p className="text-2xl font-bold text-[#22c55e]">{makers.length}</p>
          <p className="text-xs text-gray-500 mt-1">Manufacturers</p>
        </div>
        <div className="bg-white rounded-xl border border-green-100 p-4 text-center">
          <p className="text-2xl font-bold text-[#22c55e]">
            {Math.max(...vehicles.map((v) => v.maxChargingKw))} kW
          </p>
          <p className="text-xs text-gray-500 mt-1">Fastest Charging</p>
        </div>
      </div>

      {/* Grouped by maker */}
      {grouped.map(({ maker, vehicles: makerVehicles }) => (
        <div key={maker} className="mb-10">
          <h2 className="text-xl font-bold text-[#052e16] mb-4 flex items-center gap-2">
            {maker}
            <span className="text-sm font-normal text-gray-400">({makerVehicles.length} model{makerVehicles.length > 1 ? 's' : ''})</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {makerVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.slug} vehicle={vehicle} locale={locale} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function VehiclesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <VehiclesContent locale={locale} />;
}
