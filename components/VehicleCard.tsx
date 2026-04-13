import Link from 'next/link';
import { Battery, Zap, Navigation } from 'lucide-react';

interface Vehicle {
  slug: string;
  name: string;
  maker: string;
  batteryKwh: number;
  rangeMiles: number;
  maxChargingKw: number;
  port: string;
  chargeTime10to80: number;
}

interface Props {
  vehicle: Vehicle;
  locale: string;
}

export default function VehicleCard({ vehicle, locale }: Props) {
  const portColor =
    vehicle.port === 'NACS' ? 'connector-nacs' :
    vehicle.port === 'CCS' ? 'connector-ccs' :
    vehicle.port === 'CHAdeMO' ? 'connector-chademo' : 'connector-j1772';

  return (
    <Link href={`/${locale}/vehicles/${vehicle.slug}`}>
      <div className="bg-white rounded-2xl border border-green-100 p-5 hover:shadow-md hover:border-green-300 transition-all cursor-pointer h-full">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-xs text-gray-500 font-medium">{vehicle.maker}</p>
            <h3 className="font-bold text-[#052e16] text-base leading-tight">{vehicle.name}</h3>
          </div>
          <span className={`connector-badge ${portColor}`}>{vehicle.port}</span>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="text-center">
            <div className="flex justify-center mb-1">
              <Battery className="w-4 h-4 text-[#22c55e]" />
            </div>
            <p className="text-sm font-bold text-[#052e16]">{vehicle.batteryKwh}</p>
            <p className="text-xs text-gray-400">kWh</p>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-1">
              <Navigation className="w-4 h-4 text-[#22c55e]" />
            </div>
            <p className="text-sm font-bold text-[#052e16]">{vehicle.rangeMiles}</p>
            <p className="text-xs text-gray-400">mi</p>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-1">
              <Zap className="w-4 h-4 text-[#22c55e]" />
            </div>
            <p className="text-sm font-bold text-[#052e16]">{vehicle.maxChargingKw}</p>
            <p className="text-xs text-gray-400">kW</p>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-green-50 text-xs text-gray-500 text-center">
          10% → 80% in <span className="font-semibold text-[#052e16]">{vehicle.chargeTime10to80} min</span>
        </div>
      </div>
    </Link>
  );
}
