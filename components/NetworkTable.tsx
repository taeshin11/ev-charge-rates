'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface Network {
  slug: string;
  name: string;
  type: string;
  pricePerKwh: number | null;
  pricePerMin: number | null;
  pricePerSession: number | null;
  membership: boolean;
  maxKw: number;
  connectors: string[];
  stations: number;
  coverage: string;
  applyUrl: string;
}

interface Props {
  networks: Network[];
  locale: string;
}

function ConnectorBadge({ connector }: { connector: string }) {
  const classes: Record<string, string> = {
    NACS: 'connector-nacs',
    CCS: 'connector-ccs',
    CHAdeMO: 'connector-chademo',
    J1772: 'connector-j1772',
  };
  return (
    <span className={`connector-badge ${classes[connector] || 'bg-gray-100 text-gray-600'}`}>
      {connector}
    </span>
  );
}

export default function NetworkTable({ networks, locale }: Props) {
  const t = useTranslations('networks');

  return (
    <div className="overflow-x-auto rounded-xl shadow-sm border border-green-100">
      <table className="w-full text-sm bg-white">
        <thead>
          <tr className="bg-green-50 text-[#052e16]">
            <th className="px-4 py-3 text-left font-semibold">Network</th>
            <th className="px-4 py-3 text-left font-semibold">{t('type')}</th>
            <th className="px-4 py-3 text-left font-semibold">{t('price_kwh')}</th>
            <th className="px-4 py-3 text-left font-semibold">{t('max_speed')}</th>
            <th className="px-4 py-3 text-left font-semibold">{t('connectors')}</th>
            <th className="px-4 py-3 text-left font-semibold">{t('stations')}</th>
            <th className="px-4 py-3 text-left font-semibold">{t('membership')}</th>
            <th className="px-4 py-3 text-left font-semibold"></th>
          </tr>
        </thead>
        <tbody>
          {networks.map((network, i) => (
            <tr
              key={network.slug}
              className={`border-t border-green-50 hover:bg-green-50 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-green-50/30'}`}
            >
              <td className="px-4 py-3 font-medium text-[#052e16]">
                <Link href={`/${locale}/networks/${network.slug}`} className="hover:text-[#22c55e] transition-colors">
                  {network.name}
                </Link>
              </td>
              <td className="px-4 py-3 text-gray-600">
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                  network.type === 'DC Fast' ? 'bg-yellow-100 text-yellow-800' :
                  network.type === 'Level 2' ? 'bg-blue-100 text-blue-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  {network.type}
                </span>
              </td>
              <td className="px-4 py-3">
                {network.pricePerKwh !== null ? (
                  <span className={`font-semibold ${
                    network.pricePerKwh < 0.30 ? 'text-green-600' :
                    network.pricePerKwh < 0.40 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    ${network.pricePerKwh.toFixed(2)}
                  </span>
                ) : network.pricePerSession === 0 ? (
                  <span className="font-semibold text-green-600">Free</span>
                ) : (
                  <span className="text-gray-400">Varies</span>
                )}
              </td>
              <td className="px-4 py-3 font-medium">{network.maxKw} kW</td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-1">
                  {network.connectors.map((c) => (
                    <ConnectorBadge key={c} connector={c} />
                  ))}
                </div>
              </td>
              <td className="px-4 py-3 text-gray-600">{network.stations.toLocaleString()}</td>
              <td className="px-4 py-3">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  network.membership ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
                }`}>
                  {network.membership ? t('required') : t('not_required')}
                </span>
              </td>
              <td className="px-4 py-3">
                <Link
                  href={`/${locale}/networks/${network.slug}`}
                  className="text-xs bg-[#22c55e] text-white px-3 py-1 rounded-full hover:bg-green-600 transition-colors font-medium"
                >
                  {t('view_details')}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
