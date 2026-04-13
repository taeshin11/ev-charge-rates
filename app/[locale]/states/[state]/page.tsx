import { notFound } from 'next/navigation';
import Link from 'next/link';
import states from '@/data/states-fallback.json';
import networks from '@/data/networks-fallback.json';
import { MapPin, Zap, DollarSign } from 'lucide-react';

export async function generateStaticParams() {
  return states.map((s) => ({ state: s.abbr.toLowerCase() }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; state: string }> }) {
  const { locale, state: stateParam } = await params;
  const stateData = states.find((s) => s.abbr.toLowerCase() === stateParam.toLowerCase());
  if (!stateData) return {};

  return {
    title: `EV Charging Stations in ${stateData.state} — Networks, Prices & Rates (2026)`,
    description: `Find EV charging stations in ${stateData.state}: ${stateData.stations.toLocaleString()} stations, avg electricity rate $${stateData.avgRatePerKwh.toFixed(3)}/kWh. Compare all major networks.`,
    alternates: {
      canonical: `https://ev-charge-rates.vercel.app/${locale}/states/${stateParam}`,
    },
  };
}

export default async function StateDetailPage({ params }: { params: Promise<{ locale: string; state: string }> }) {
  const { locale, state: stateParam } = await params;
  const stateData = states.find((s) => s.abbr.toLowerCase() === stateParam.toLowerCase());
  if (!stateData) notFound();

  const rank = [...states].sort((a, b) => b.stations - a.stations).findIndex((s) => s.abbr === stateData.abbr) + 1;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Place',
    name: stateData.state,
    description: `EV charging infrastructure in ${stateData.state} — ${stateData.stations.toLocaleString()} charging stations`,
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-6">
        <Link href={`/${locale}`} className="hover:text-[#22c55e]">Home</Link>
        {' / '}
        <Link href={`/${locale}/states`} className="hover:text-[#22c55e]">States</Link>
        {' / '}
        <span className="text-[#052e16]">{stateData.state}</span>
      </nav>

      <div className="bg-white rounded-2xl border border-green-100 p-8 mb-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#052e16] mb-2">
              EV Charging in {stateData.state}
            </h1>
            <p className="text-gray-500 flex items-center gap-1">
              <MapPin className="w-4 h-4" /> Rank #{rank} in station count nationally
            </p>
          </div>
          <div className="text-right">
            <p className="text-4xl font-bold text-[#22c55e]">{stateData.stations.toLocaleString()}</p>
            <p className="text-sm text-gray-400">charging stations</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-green-100 p-5">
          <MapPin className="w-5 h-5 text-[#22c55e] mb-2" />
          <p className="text-2xl font-bold text-[#052e16]">{stateData.stations.toLocaleString()}</p>
          <p className="text-sm text-gray-500">Charging stations</p>
          <p className="text-xs text-gray-400 mt-1">Rank #{rank} of 50 states</p>
        </div>
        <div className="bg-white rounded-xl border border-green-100 p-5">
          <DollarSign className="w-5 h-5 text-[#22c55e] mb-2" />
          <p className="text-2xl font-bold text-[#052e16]">${stateData.avgRatePerKwh.toFixed(3)}</p>
          <p className="text-sm text-gray-500">Avg home electricity rate</p>
          <p className="text-xs text-gray-400 mt-1">per kWh (residential)</p>
        </div>
        <div className="bg-white rounded-xl border border-green-100 p-5">
          <Zap className="w-5 h-5 text-[#22c55e] mb-2" />
          <p className="text-2xl font-bold text-[#052e16]">{networks.length}</p>
          <p className="text-sm text-gray-500">Networks with coverage</p>
          <p className="text-xs text-gray-400 mt-1">nationwide + regional</p>
        </div>
      </div>

      {/* Home vs Public charging comparison */}
      <div className="bg-white rounded-2xl border border-green-100 p-6 mb-8">
        <h2 className="text-xl font-bold text-[#052e16] mb-4">
          Home vs Public Charging in {stateData.state}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-green-50">
                <th className="px-4 py-2 text-left text-[#052e16]">Network</th>
                <th className="px-4 py-2 text-right text-[#052e16]">Rate/kWh</th>
                <th className="px-4 py-2 text-right text-[#052e16]">vs Home (${ stateData.avgRatePerKwh.toFixed(3)})</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-green-50 bg-green-50/50">
                <td className="px-4 py-2 font-medium text-[#052e16]">
                  Home Charging ({stateData.state})
                </td>
                <td className="px-4 py-2 text-right font-semibold text-green-600">
                  ${stateData.avgRatePerKwh.toFixed(3)}
                </td>
                <td className="px-4 py-2 text-right text-green-600 font-medium">Baseline</td>
              </tr>
              {networks
                .filter((n) => n.pricePerKwh !== null)
                .sort((a, b) => (a.pricePerKwh as number) - (b.pricePerKwh as number))
                .map((n) => {
                  const diff = ((n.pricePerKwh as number) - stateData.avgRatePerKwh) / stateData.avgRatePerKwh * 100;
                  return (
                    <tr key={n.slug} className="border-t border-green-50 hover:bg-green-50 transition-colors">
                      <td className="px-4 py-2">
                        <Link href={`/${locale}/networks/${n.slug}`} className="font-medium text-[#052e16] hover:text-[#22c55e]">
                          {n.name}
                        </Link>
                      </td>
                      <td className="px-4 py-2 text-right font-semibold">
                        ${(n.pricePerKwh as number).toFixed(3)}
                      </td>
                      <td className="px-4 py-2 text-right">
                        <span className={`text-xs font-medium ${diff > 0 ? 'text-red-500' : 'text-green-600'}`}>
                          {diff > 0 ? '+' : ''}{diff.toFixed(0)}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href={`/${locale}/calculator`}
          className="flex items-center justify-center gap-2 bg-[#22c55e] text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 transition-colors"
        >
          Calculate Charging Cost
        </Link>
        <Link
          href={`/${locale}/networks`}
          className="flex items-center justify-center gap-2 bg-white border border-green-200 text-[#052e16] px-6 py-3 rounded-full font-semibold hover:bg-green-50 transition-colors"
        >
          Compare All Networks
        </Link>
      </div>
    </div>
  );
}
