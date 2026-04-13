import Link from 'next/link';
import { Zap, MapPin, Users } from 'lucide-react';

interface Network {
  slug: string;
  name: string;
  type: string;
  pricePerKwh: number | null;
  pricePerSession: number | null;
  maxKw: number;
  stations: number;
  connectors: string[];
  membership: boolean;
  coverage: string;
}

interface Props {
  network: Network;
  locale: string;
}

export default function NetworkCard({ network, locale }: Props) {
  const priceDisplay =
    network.pricePerKwh !== null
      ? `$${network.pricePerKwh.toFixed(2)}/kWh`
      : network.pricePerSession === 0
      ? 'Free'
      : 'Varies';

  const priceColor =
    network.pricePerKwh !== null && network.pricePerKwh < 0.30
      ? 'text-green-600'
      : network.pricePerSession === 0
      ? 'text-green-600'
      : network.pricePerKwh !== null && network.pricePerKwh < 0.40
      ? 'text-yellow-600'
      : 'text-red-500';

  return (
    <Link href={`/${locale}/networks/${network.slug}`}>
      <div className="bg-white rounded-2xl border border-green-100 p-5 hover:shadow-md hover:border-green-300 transition-all cursor-pointer h-full">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-bold text-[#052e16] text-base leading-tight">{network.name}</h3>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
            network.type === 'DC Fast' ? 'bg-yellow-100 text-yellow-800' :
            network.type === 'Level 2' ? 'bg-blue-100 text-blue-800' :
            'bg-purple-100 text-purple-800'
          }`}>
            {network.type}
          </span>
        </div>

        <div className={`text-2xl font-bold mb-3 ${priceColor}`}>{priceDisplay}</div>

        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#22c55e]" />
            <span>Up to {network.maxKw} kW</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#22c55e]" />
            <span>{network.stations.toLocaleString()} stations</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[#22c55e]" />
            <span>{network.membership ? 'Membership available' : 'No membership needed'}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mt-3">
          {network.connectors.map((c) => (
            <span
              key={c}
              className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                c === 'NACS' ? 'connector-nacs' :
                c === 'CCS' ? 'connector-ccs' :
                c === 'CHAdeMO' ? 'connector-chademo' :
                'connector-j1772'
              }`}
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
