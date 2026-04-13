import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface StateData {
  state: string;
  abbr: string;
  stations: number;
  avgRatePerKwh: number;
}

interface Props {
  states: StateData[];
  locale: string;
}

export default function StateTable({ states, locale }: Props) {
  const t = useTranslations('states');

  const sorted = [...states].sort((a, b) => b.stations - a.stations);

  return (
    <div className="overflow-x-auto rounded-xl shadow-sm border border-green-100">
      <table className="w-full text-sm bg-white">
        <thead>
          <tr className="bg-green-50 text-[#052e16]">
            <th className="px-4 py-3 text-left font-semibold">#</th>
            <th className="px-4 py-3 text-left font-semibold">{t('state')}</th>
            <th className="px-4 py-3 text-left font-semibold">{t('stations')}</th>
            <th className="px-4 py-3 text-left font-semibold">{t('avg_rate')}</th>
            <th className="px-4 py-3 text-left font-semibold"></th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((s, i) => (
            <tr key={s.abbr} className={`border-t border-green-50 hover:bg-green-50 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-green-50/30'}`}>
              <td className="px-4 py-3 text-gray-400 font-medium">{i + 1}</td>
              <td className="px-4 py-3 font-medium text-[#052e16]">
                <span className="font-bold mr-2 text-gray-400">{s.abbr}</span>
                {s.state}
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <div
                    className="h-2 rounded bg-green-400"
                    style={{ width: `${Math.min(120, (s.stations / 14500) * 120)}px` }}
                  />
                  <span className="font-semibold">{s.stations.toLocaleString()}</span>
                </div>
              </td>
              <td className="px-4 py-3">
                <span className={`font-semibold ${
                  s.avgRatePerKwh < 0.12 ? 'text-green-600' :
                  s.avgRatePerKwh < 0.20 ? 'text-yellow-600' : 'text-red-500'
                }`}>
                  ${s.avgRatePerKwh.toFixed(3)}/kWh
                </span>
              </td>
              <td className="px-4 py-3">
                <Link
                  href={`/${locale}/states/${s.abbr.toLowerCase()}`}
                  className="text-xs bg-[#22c55e] text-white px-3 py-1 rounded-full hover:bg-green-600 transition-colors font-medium"
                >
                  {t('view_state')}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
