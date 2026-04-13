'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Calculator } from 'lucide-react';

interface Vehicle {
  slug: string;
  name: string;
  batteryKwh: number;
  rangeMiles: number;
  maxChargingKw: number;
}

interface Network {
  slug: string;
  name: string;
  pricePerKwh: number | null;
  pricePerMin: number | null;
  pricePerSession: number | null;
  maxKw: number;
}

interface Props {
  vehicles: Vehicle[];
  networks: Network[];
}

export default function CostCalculator({ vehicles, networks }: Props) {
  const t = useTranslations('calculator');
  const [vehicleSlug, setVehicleSlug] = useState('');
  const [networkSlug, setNetworkSlug] = useState('');
  const [startPct, setStartPct] = useState(20);
  const [endPct, setEndPct] = useState(80);

  const vehicle = vehicles.find((v) => v.slug === vehicleSlug);
  const network = networks.find((n) => n.slug === networkSlug);

  const result = useMemo(() => {
    if (!vehicle || !network) return null;
    const kwhNeeded = (vehicle.batteryKwh * (endPct - startPct)) / 100;
    const effectiveKw = Math.min(vehicle.maxChargingKw, network.maxKw);
    const timeMin = (kwhNeeded / effectiveKw) * 60;

    let cost = 0;
    if (network.pricePerKwh !== null) {
      cost += kwhNeeded * network.pricePerKwh;
    }
    if (network.pricePerMin !== null) {
      cost += timeMin * network.pricePerMin;
    }
    if (network.pricePerSession !== null && network.pricePerKwh === null) {
      cost = network.pricePerSession;
    }

    const rangeAdded = vehicle.rangeMiles * ((endPct - startPct) / 100);
    const costPerMile = rangeAdded > 0 ? cost / rangeAdded : 0;

    return { cost, timeMin, kwhNeeded, costPerMile, rangeAdded };
  }, [vehicle, network, startPct, endPct]);

  const allNetworkResults = useMemo(() => {
    if (!vehicle) return [];
    const kwhNeeded = (vehicle.batteryKwh * (endPct - startPct)) / 100;
    return networks
      .map((n) => {
        const effectiveKw = Math.min(vehicle.maxChargingKw, n.maxKw);
        const timeMin = (kwhNeeded / effectiveKw) * 60;
        let cost = 0;
        if (n.pricePerKwh !== null) cost += kwhNeeded * n.pricePerKwh;
        if (n.pricePerMin !== null) cost += timeMin * n.pricePerMin;
        if (n.pricePerSession !== null && n.pricePerKwh === null) cost = n.pricePerSession;
        return { ...n, cost, timeMin };
      })
      .sort((a, b) => a.cost - b.cost);
  }, [vehicle, networks, startPct, endPct]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-6">
      <div className="flex items-center gap-2 mb-6">
        <Calculator className="w-5 h-5 text-[#22c55e]" />
        <h2 className="text-xl font-bold text-[#052e16]">{t('title')}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-[#052e16] mb-1">{t('select_vehicle')}</label>
          <select
            className="w-full border border-green-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-300"
            value={vehicleSlug}
            onChange={(e) => setVehicleSlug(e.target.value)}
          >
            <option value="">-- {t('select_vehicle')} --</option>
            {vehicles.map((v) => (
              <option key={v.slug} value={v.slug}>{v.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#052e16] mb-1">{t('select_network')}</label>
          <select
            className="w-full border border-green-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-300"
            value={networkSlug}
            onChange={(e) => setNetworkSlug(e.target.value)}
          >
            <option value="">-- {t('select_network')} --</option>
            {networks.map((n) => (
              <option key={n.slug} value={n.slug}>{n.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#052e16] mb-1">
            {t('start_percent')}: <span className="text-[#22c55e] font-bold">{startPct}%</span>
          </label>
          <input
            type="range" min="0" max="90" step="5"
            value={startPct}
            onChange={(e) => setStartPct(Number(e.target.value))}
            className="w-full accent-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#052e16] mb-1">
            {t('end_percent')}: <span className="text-[#22c55e] font-bold">{endPct}%</span>
          </label>
          <input
            type="range" min="10" max="100" step="5"
            value={endPct}
            onChange={(e) => setEndPct(Number(e.target.value))}
            className="w-full accent-green-500"
          />
        </div>
      </div>

      {result && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-green-50 rounded-xl p-4 text-center">
            <p className="text-xs text-gray-500 mb-1">{t('estimated_cost')}</p>
            <p className="text-2xl font-bold text-[#22c55e]">${result.cost.toFixed(2)}</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4 text-center">
            <p className="text-xs text-gray-500 mb-1">{t('estimated_time')}</p>
            <p className="text-2xl font-bold text-[#052e16]">{Math.round(result.timeMin)} {t('minutes')}</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4 text-center">
            <p className="text-xs text-gray-500 mb-1">{t('kwh_needed')}</p>
            <p className="text-2xl font-bold text-[#052e16]">{result.kwhNeeded.toFixed(1)} kWh</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4 text-center">
            <p className="text-xs text-gray-500 mb-1">{t('cost_per_mile')}</p>
            <p className="text-2xl font-bold text-[#052e16]">${result.costPerMile.toFixed(3)}</p>
          </div>
        </div>
      )}

      {vehicle && allNetworkResults.length > 0 && (
        <div>
          <h3 className="font-semibold text-[#052e16] mb-3">{t('results_title')}</h3>
          <div className="overflow-x-auto rounded-xl border border-green-100">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-green-50">
                  <th className="px-4 py-2 text-left text-[#052e16]">Network</th>
                  <th className="px-4 py-2 text-right text-[#052e16]">Cost</th>
                  <th className="px-4 py-2 text-right text-[#052e16]">Time</th>
                </tr>
              </thead>
              <tbody>
                {allNetworkResults.map((n, i) => (
                  <tr key={n.slug} className={`border-t border-green-50 ${i === 0 ? 'bg-green-50' : 'bg-white'}`}>
                    <td className="px-4 py-2 font-medium text-[#052e16]">
                      {i === 0 && <span className="text-xs bg-green-500 text-white px-1.5 py-0.5 rounded mr-2">Best</span>}
                      {n.name}
                    </td>
                    <td className="px-4 py-2 text-right font-semibold">
                      <span className={i === 0 ? 'text-green-600' : 'text-[#052e16]'}>
                        ${n.cost.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-right text-gray-500">{Math.round(n.timeMin)} min</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {!vehicle && (
        <p className="text-center text-gray-400 text-sm py-8">
          Select a vehicle to see charging cost estimates across all networks
        </p>
      )}
    </div>
  );
}
