import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import vehicles from '@/data/vehicles-fallback.json';
import networks from '@/data/networks-fallback.json';
import { Battery, Zap, Navigation, Clock } from 'lucide-react';

export async function generateStaticParams() {
  return vehicles.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const vehicle = vehicles.find((v) => v.slug === slug);
  if (!vehicle) return {};

  return {
    title: `${vehicle.name} Charging Guide — Cost, Speed & Compatible Networks (2026)`,
    description: `${vehicle.name} charging guide: ${vehicle.batteryKwh}kWh battery, ${vehicle.rangeMiles}mi range, up to ${vehicle.maxChargingKw}kW charging via ${vehicle.port}. Compare costs across all major networks.`,
    alternates: {
      canonical: `https://ev-charge-rates.vercel.app/${locale}/vehicles/${slug}`,
    },
  };
}

export default async function VehicleDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const vehicle = vehicles.find((v) => v.slug === slug);
  if (!vehicle) notFound();

  const t = await getTranslations({ locale, namespace: 'vehicles' });

  // Compatible networks based on port
  const compatibleNetworks = networks.filter((n) => n.connectors.includes(vehicle.port));
  const allNetworkCosts = compatibleNetworks.map((n) => {
    const kwhNeeded = vehicle.batteryKwh * 0.7;
    const effectiveKw = Math.min(vehicle.maxChargingKw, n.maxKw);
    const timeMin = (kwhNeeded / effectiveKw) * 60;
    let cost = 0;
    if (n.pricePerKwh !== null) cost += kwhNeeded * n.pricePerKwh;
    if (n.pricePerMin !== null) cost += timeMin * n.pricePerMin;
    if (n.pricePerSession !== null && n.pricePerKwh === null) cost = n.pricePerSession;
    const costPerMile = vehicle.rangeMiles > 0 ? cost / (vehicle.rangeMiles * 0.7) : 0;
    return { ...n, cost, timeMin, costPerMile };
  }).sort((a, b) => a.cost - b.cost);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: vehicle.name,
    brand: { '@type': 'Brand', name: vehicle.maker },
    description: `${vehicle.name} EV — ${vehicle.batteryKwh}kWh battery, ${vehicle.rangeMiles}mi range`,
    additionalProperty: [
      { '@type': 'PropertyValue', name: 'Battery Capacity', value: `${vehicle.batteryKwh}kWh` },
      { '@type': 'PropertyValue', name: 'Range', value: `${vehicle.rangeMiles}mi` },
      { '@type': 'PropertyValue', name: 'Max Charging Speed', value: `${vehicle.maxChargingKw}kW` },
      { '@type': 'PropertyValue', name: 'Charging Port', value: vehicle.port },
    ],
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-6">
        <Link href={`/${locale}`} className="hover:text-[#22c55e]">Home</Link>
        {' / '}
        <Link href={`/${locale}/vehicles`} className="hover:text-[#22c55e]">Vehicles</Link>
        {' / '}
        <span className="text-[#052e16]">{vehicle.name}</span>
      </nav>

      {/* Header */}
      <div className="bg-white rounded-2xl border border-green-100 p-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div>
            <p className="text-sm text-gray-400 font-medium mb-1">{vehicle.maker}</p>
            <h1 className="text-3xl font-bold text-[#052e16] mb-3">{vehicle.name}</h1>
            <span className={`connector-badge text-sm ${
              vehicle.port === 'NACS' ? 'connector-nacs' :
              vehicle.port === 'CCS' ? 'connector-ccs' :
              vehicle.port === 'CHAdeMO' ? 'connector-chademo' : 'connector-j1772'
            }`}>
              {vehicle.port} Port
            </span>
          </div>
          <div className="text-right">
            {allNetworkCosts.length > 0 && (
              <>
                <p className="text-sm text-gray-400 mb-1">Cheapest 10-80% charge</p>
                <p className="text-3xl font-bold text-[#22c55e]">${allNetworkCosts[0].cost.toFixed(2)}</p>
                <p className="text-xs text-gray-400">at {allNetworkCosts[0].name}</p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-green-100 p-5 text-center">
          <Battery className="w-5 h-5 text-[#22c55e] mx-auto mb-2" />
          <p className="text-xl font-bold text-[#052e16]">{vehicle.batteryKwh} kWh</p>
          <p className="text-xs text-gray-400">Battery</p>
        </div>
        <div className="bg-white rounded-xl border border-green-100 p-5 text-center">
          <Navigation className="w-5 h-5 text-[#22c55e] mx-auto mb-2" />
          <p className="text-xl font-bold text-[#052e16]">{vehicle.rangeMiles} mi</p>
          <p className="text-xs text-gray-400">Range</p>
        </div>
        <div className="bg-white rounded-xl border border-green-100 p-5 text-center">
          <Zap className="w-5 h-5 text-[#22c55e] mx-auto mb-2" />
          <p className="text-xl font-bold text-[#052e16]">{vehicle.maxChargingKw} kW</p>
          <p className="text-xs text-gray-400">Max Charging</p>
        </div>
        <div className="bg-white rounded-xl border border-green-100 p-5 text-center">
          <Clock className="w-5 h-5 text-[#22c55e] mx-auto mb-2" />
          <p className="text-xl font-bold text-[#052e16]">{vehicle.chargeTime10to80} min</p>
          <p className="text-xs text-gray-400">10% to 80%</p>
        </div>
      </div>

      {/* Cost table */}
      <div className="bg-white rounded-2xl border border-green-100 p-6 mb-8">
        <h2 className="text-xl font-bold text-[#052e16] mb-4">{t('cost_to_charge')} — {vehicle.name}</h2>
        {allNetworkCosts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-green-50">
                  <th className="px-4 py-2 text-left text-[#052e16]">Network</th>
                  <th className="px-4 py-2 text-right text-[#052e16]">Cost (10-80%)</th>
                  <th className="px-4 py-2 text-right text-[#052e16]">Time</th>
                  <th className="px-4 py-2 text-right text-[#052e16]">$/mile</th>
                </tr>
              </thead>
              <tbody>
                {allNetworkCosts.map((n, i) => (
                  <tr key={n.slug} className={`border-t border-green-50 hover:bg-green-50 transition-colors ${i === 0 ? 'bg-green-50/50' : ''}`}>
                    <td className="px-4 py-2">
                      <Link href={`/${locale}/networks/${n.slug}`} className="font-medium text-[#052e16] hover:text-[#22c55e] flex items-center gap-1">
                        {i === 0 && <span className="text-xs bg-green-500 text-white px-1.5 py-0.5 rounded">Best</span>}
                        {n.name}
                      </Link>
                    </td>
                    <td className="px-4 py-2 text-right font-semibold">
                      <span className={i === 0 ? 'text-green-600' : 'text-[#052e16]'}>${n.cost.toFixed(2)}</span>
                    </td>
                    <td className="px-4 py-2 text-right text-gray-500">{Math.round(n.timeMin)} min</td>
                    <td className="px-4 py-2 text-right text-gray-500">${n.costPerMile.toFixed(3)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-400 text-sm">No compatible networks found for {vehicle.port} port.</p>
        )}
      </div>

      {/* Connector guide */}
      <div className="bg-white rounded-2xl border border-green-100 p-6">
        <h2 className="text-xl font-bold text-[#052e16] mb-4">Charging Port: {vehicle.port}</h2>
        <p className="text-sm text-gray-600 mb-4">
          {vehicle.port === 'NACS' && 'The North American Charging Standard (NACS) is Tesla\'s connector, now adopted by most major automakers. It works at Tesla Superchargers and increasingly at other networks via adapters.'}
          {vehicle.port === 'CCS' && 'Combined Charging System (CCS) is a widely supported standard with both AC and DC charging capability. Most non-Tesla EVs use CCS, and it\'s supported by ChargePoint, Electrify America, EVgo, and many others.'}
          {vehicle.port === 'CHAdeMO' && 'CHAdeMO is a DC fast-charging standard developed in Japan. While less common than CCS, it\'s used in Nissan LEAF and some older EVs. Network support is shrinking as NACS/CCS dominate.'}
          {vehicle.port === 'J1772' && 'J1772 (Type 1) is the standard for Level 2 AC charging in North America. It\'s widely supported at Level 2 stations, though limited to slower AC charging speeds.'}
        </p>
        <div className="flex gap-2 flex-wrap">
          {compatibleNetworks.map((n) => (
            <Link
              key={n.slug}
              href={`/${locale}/networks/${n.slug}`}
              className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded-full hover:bg-green-200 transition-colors font-medium"
            >
              {n.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
