import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import networks from '@/data/networks-fallback.json';
import vehicles from '@/data/vehicles-fallback.json';
import { MapPin, Zap, CreditCard, ExternalLink, CheckCircle, XCircle } from 'lucide-react';

export async function generateStaticParams() {
  return networks.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const network = networks.find((n) => n.slug === slug);
  if (!network) return {};
  const t = await getTranslations({ locale, namespace: 'networks' });

  return {
    title: `${network.name} Charging Prices — Rates, Speed & Locations (2026)`,
    description: `Compare ${network.name} charging prices: ${network.pricePerKwh ? `$${network.pricePerKwh}/kWh` : 'varies'}, up to ${network.maxKw}kW. See costs for your vehicle, station locations, and how it compares to competitors.`,
    alternates: {
      canonical: `https://ev-charge-rates.vercel.app/${locale}/networks/${slug}`,
    },
  };
}

export default async function NetworkDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const network = networks.find((n) => n.slug === slug);
  if (!network) notFound();

  const t = await getTranslations({ locale, namespace: 'networks' });

  // Compatible vehicles (ones whose port matches network connectors)
  const compatibleVehicles = vehicles.filter((v) =>
    network.connectors.includes(v.port)
  ).slice(0, 8);

  // Calculate costs for top vehicles
  const vehicleCosts = compatibleVehicles.map((v) => {
    const kwhNeeded = v.batteryKwh * 0.7; // 10-80%
    const effectiveKw = Math.min(v.maxChargingKw, network.maxKw);
    const timeMin = (kwhNeeded / effectiveKw) * 60;
    let cost = 0;
    if (network.pricePerKwh !== null) cost += kwhNeeded * network.pricePerKwh;
    if (network.pricePerMin !== null) cost += timeMin * network.pricePerMin;
    if (network.pricePerSession !== null && network.pricePerKwh === null) cost = network.pricePerSession;
    return { ...v, cost, timeMin };
  });

  const pros = [
    network.pricePerKwh !== null && network.pricePerKwh < 0.35 ? `Competitive pricing at $${network.pricePerKwh}/kWh` : null,
    network.maxKw >= 150 ? `High-speed charging up to ${network.maxKw}kW` : null,
    network.stations > 5000 ? `Large network with ${network.stations.toLocaleString()}+ stations` : null,
    !network.membership ? 'No membership required — pay as you go' : null,
    network.connectors.includes('NACS') ? 'NACS connector for Tesla compatibility' : null,
    network.connectors.includes('CCS') ? 'CCS connector for wide vehicle compatibility' : null,
  ].filter(Boolean);

  const cons = [
    network.pricePerKwh !== null && network.pricePerKwh > 0.40 ? `Higher pricing at $${network.pricePerKwh}/kWh` : null,
    network.membership ? 'Membership required for best rates' : null,
    network.maxKw < 100 ? `Lower max charging speed (${network.maxKw}kW)` : null,
    network.stations < 1000 ? `Limited station count (${network.stations})` : null,
  ].filter(Boolean);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: network.name,
    url: network.applyUrl,
    description: `${network.name} EV charging network — ${network.type} charging, up to ${network.maxKw}kW, ${network.stations.toLocaleString()} stations`,
    priceRange: network.pricePerKwh ? `$${network.pricePerKwh}/kWh` : 'Varies',
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-6">
        <Link href={`/${locale}`} className="hover:text-[#22c55e]">Home</Link>
        {' / '}
        <Link href={`/${locale}/networks`} className="hover:text-[#22c55e]">Networks</Link>
        {' / '}
        <span className="text-[#052e16]">{network.name}</span>
      </nav>

      {/* Header */}
      <div className="bg-white rounded-2xl border border-green-100 p-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                network.type === 'DC Fast' ? 'bg-yellow-100 text-yellow-800' :
                network.type === 'Level 2' ? 'bg-blue-100 text-blue-800' :
                'bg-purple-100 text-purple-800'
              }`}>{network.type}</span>
            </div>
            <h1 className="text-3xl font-bold text-[#052e16] mb-2">{network.name}</h1>
            <p className="text-gray-500 flex items-center gap-1">
              <MapPin className="w-4 h-4" /> {network.coverage}
            </p>
          </div>
          <div className="text-right">
            {network.pricePerKwh !== null ? (
              <>
                <p className="text-4xl font-bold text-[#22c55e]">${network.pricePerKwh.toFixed(2)}</p>
                <p className="text-sm text-gray-400">per kWh</p>
              </>
            ) : network.pricePerSession === 0 ? (
              <>
                <p className="text-4xl font-bold text-[#22c55e]">Free</p>
                <p className="text-sm text-gray-400">Level 2 charging</p>
              </>
            ) : (
              <>
                <p className="text-4xl font-bold text-gray-400">Varies</p>
                <p className="text-sm text-gray-400">by location</p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-green-100 p-5 text-center">
          <Zap className="w-5 h-5 text-[#22c55e] mx-auto mb-2" />
          <p className="text-xl font-bold text-[#052e16]">{network.maxKw} kW</p>
          <p className="text-xs text-gray-400">Max Speed</p>
        </div>
        <div className="bg-white rounded-xl border border-green-100 p-5 text-center">
          <MapPin className="w-5 h-5 text-[#22c55e] mx-auto mb-2" />
          <p className="text-xl font-bold text-[#052e16]">{network.stations.toLocaleString()}</p>
          <p className="text-xs text-gray-400">Stations</p>
        </div>
        <div className="bg-white rounded-xl border border-green-100 p-5 text-center">
          <CreditCard className="w-5 h-5 text-[#22c55e] mx-auto mb-2" />
          <p className="text-xl font-bold text-[#052e16]">{network.membership ? 'Yes' : 'No'}</p>
          <p className="text-xs text-gray-400">Membership</p>
        </div>
        <div className="bg-white rounded-xl border border-green-100 p-5 text-center">
          <div className="flex justify-center mb-2 gap-1 flex-wrap">
            {network.connectors.map((c) => (
              <span key={c} className={`text-xs px-1.5 py-0.5 rounded font-medium ${
                c === 'NACS' ? 'connector-nacs' : c === 'CCS' ? 'connector-ccs' : c === 'CHAdeMO' ? 'connector-chademo' : 'connector-j1772'
              }`}>{c}</span>
            ))}
          </div>
          <p className="text-xs text-gray-400">Connectors</p>
        </div>
      </div>

      {/* Pricing detail */}
      <div className="bg-white rounded-2xl border border-green-100 p-6 mb-8">
        <h2 className="text-xl font-bold text-[#052e16] mb-4">Pricing Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 rounded-xl p-4">
            <p className="text-sm text-gray-500 mb-1">Per kWh</p>
            <p className="text-2xl font-bold text-[#052e16]">
              {network.pricePerKwh !== null ? `$${network.pricePerKwh.toFixed(2)}` : 'N/A'}
            </p>
          </div>
          <div className="bg-green-50 rounded-xl p-4">
            <p className="text-sm text-gray-500 mb-1">Per Minute</p>
            <p className="text-2xl font-bold text-[#052e16]">
              {network.pricePerMin !== null ? `$${network.pricePerMin.toFixed(2)}` : 'N/A'}
            </p>
          </div>
          <div className="bg-green-50 rounded-xl p-4">
            <p className="text-sm text-gray-500 mb-1">Per Session</p>
            <p className="text-2xl font-bold text-[#052e16]">
              {network.pricePerSession !== null ? (network.pricePerSession === 0 ? 'Free' : `$${network.pricePerSession.toFixed(2)}`) : 'N/A'}
            </p>
          </div>
        </div>
      </div>

      {/* Pros & Cons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl border border-green-100 p-6">
          <h3 className="font-bold text-[#052e16] mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" /> Pros
          </h3>
          <ul className="space-y-2">
            {pros.map((pro, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                {pro}
              </li>
            ))}
            {pros.length === 0 && <li className="text-sm text-gray-400">See network details</li>}
          </ul>
        </div>
        <div className="bg-white rounded-2xl border border-green-100 p-6">
          <h3 className="font-bold text-[#052e16] mb-4 flex items-center gap-2">
            <XCircle className="w-5 h-5 text-red-400" /> Cons
          </h3>
          <ul className="space-y-2">
            {cons.map((con, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <XCircle className="w-4 h-4 text-red-300 flex-shrink-0 mt-0.5" />
                {con}
              </li>
            ))}
            {cons.length === 0 && <li className="text-sm text-gray-400">No major drawbacks identified</li>}
          </ul>
        </div>
      </div>

      {/* Compatible vehicles + costs */}
      {vehicleCosts.length > 0 && (
        <div className="bg-white rounded-2xl border border-green-100 p-6 mb-8">
          <h2 className="text-xl font-bold text-[#052e16] mb-4">Cost to Charge on {network.name}</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-green-50">
                  <th className="px-4 py-2 text-left text-[#052e16]">Vehicle</th>
                  <th className="px-4 py-2 text-right text-[#052e16]">Battery</th>
                  <th className="px-4 py-2 text-right text-[#052e16]">Cost (10-80%)</th>
                  <th className="px-4 py-2 text-right text-[#052e16]">Time</th>
                </tr>
              </thead>
              <tbody>
                {vehicleCosts.map((v) => (
                  <tr key={v.slug} className="border-t border-green-50 hover:bg-green-50 transition-colors">
                    <td className="px-4 py-2">
                      <Link href={`/${locale}/vehicles/${v.slug}`} className="font-medium text-[#052e16] hover:text-[#22c55e]">
                        {v.name}
                      </Link>
                    </td>
                    <td className="px-4 py-2 text-right text-gray-500">{v.batteryKwh} kWh</td>
                    <td className="px-4 py-2 text-right font-semibold text-[#22c55e]">${v.cost.toFixed(2)}</td>
                    <td className="px-4 py-2 text-right text-gray-500">{Math.round(v.timeMin)} min</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="flex flex-col sm:flex-row gap-4">
        <a
          href={network.applyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-[#22c55e] text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 transition-colors"
        >
          Visit {network.name} <ExternalLink className="w-4 h-4" />
        </a>
        <Link
          href={`/${locale}/calculator`}
          className="flex items-center justify-center gap-2 bg-white border border-green-200 text-[#052e16] px-6 py-3 rounded-full font-semibold hover:bg-green-50 transition-colors"
        >
          Calculate My Cost
        </Link>
      </div>
    </div>
  );
}
