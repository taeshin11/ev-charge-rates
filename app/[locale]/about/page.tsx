import { getTranslations } from 'next-intl/server';
import { Zap, TrendingDown, MapPin, Shield, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const BASE_URL = 'https://ev-charge-rates.vercel.app';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    title: 'About EVChargeRates | EV Charging Cost Comparison',
    description:
      'Learn how EVChargeRates helps EV drivers compare charging costs across Tesla Supercharger, ChargePoint, Electrify America, Blink, EVgo, and more. Track home charging electricity rates by state.',
    alternates: {
      canonical: `${BASE_URL}/${locale}/about`,
    },
    openGraph: {
      title: 'About EVChargeRates | EV Charging Cost Comparison',
      description:
        'Compare EV charging prices across all major US networks and find the cheapest electricity rates for home charging by state.',
      url: `${BASE_URL}/${locale}/about`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'About EVChargeRates',
      description: 'Your guide to EV charging costs across networks and states.',
    },
  };
}

const networks = [
  {
    name: 'Tesla Supercharger',
    description:
      'The largest fast-charging network in the US with over 20,000 stations. Prices vary by location and peak hours, typically ranging from $0.25–$0.60/kWh. Non-Tesla vehicles can now access most Superchargers via NACS adapters.',
    color: 'bg-red-50 border-red-200',
    accent: 'text-red-600',
  },
  {
    name: 'ChargePoint',
    description:
      'The largest network by station count with both Level 2 and DC fast charging. Pricing is set by station hosts and varies widely — typically $0.20–$0.45/kWh or flat session fees. Requires ChargePoint membership for best rates.',
    color: 'bg-blue-50 border-blue-200',
    accent: 'text-blue-600',
  },
  {
    name: 'Electrify America',
    description:
      'Volkswagen-backed network offering 150–350 kW ultra-fast charging. Rates typically run $0.43–$0.48/kWh for non-members. The EA Pass+ subscription ($4/month) reduces costs significantly, often $0.25–$0.32/kWh.',
    color: 'bg-purple-50 border-purple-200',
    accent: 'text-purple-600',
  },
  {
    name: 'Blink',
    description:
      'A widely distributed network spanning both Level 2 and DC fast chargers at retail locations, hotels, and parking garages. Pricing ranges from $0.04–$0.08/min for Level 2 to $0.39–$0.79/kWh for DC fast charging.',
    color: 'bg-green-50 border-green-200',
    accent: 'text-green-600',
  },
  {
    name: 'EVgo',
    description:
      'Fast-charging focused network with 900+ locations, primarily at retail centers. Standard rates are $0.27–$0.42/kWh. EVgo+ members pay a $6.99/month fee for reduced per-kWh pricing and free session starts.',
    color: 'bg-yellow-50 border-yellow-200',
    accent: 'text-yellow-700',
  },
  {
    name: 'Other Networks',
    description:
      'We also track Volta, Shell Recharge, Francis Energy, Rivian Adventure Network, and regional networks. Pricing and availability differ significantly, especially outside major metro areas.',
    color: 'bg-gray-50 border-gray-200',
    accent: 'text-gray-600',
  },
];

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <div className="min-h-screen bg-[#f0fdf4]">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#052e16] to-[#166534] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-[#22c55e]/20 rounded-full p-3">
              <Zap className="w-8 h-8 text-[#22c55e]" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">About EVChargeRates</h1>
          <p className="text-lg text-green-200 max-w-2xl mx-auto">
            Your independent source for comparing EV charging costs across every major US network — and tracking home electricity rates by state.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-14 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#052e16] mb-6">Our Mission</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            EV charging costs are confusing. Networks use different pricing models — per-kWh, per-minute, flat session fees, and membership tiers — making it nearly impossible to know what you&apos;ll actually pay before you plug in.
          </p>
          <p className="text-gray-700 mb-4 leading-relaxed">
            EVChargeRates was built to fix that. We aggregate and normalize pricing data from all major US charging networks so you can compare apples to apples: cost per kilowatt-hour, cost per mile, and total session cost for your specific vehicle.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We also track residential electricity rates across all 50 states, because for most EV owners, home charging is the primary — and often cheapest — option. Knowing your state&apos;s average electricity cost helps you calculate your true cost-per-mile for everyday driving.
          </p>
        </div>
      </section>

      {/* Networks */}
      <section className="py-14 bg-[#f0fdf4]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#052e16] mb-2">Networks We Track</h2>
          <p className="text-gray-600 mb-8">
            We monitor pricing, speed, and availability for all major US EV charging networks.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {networks.map((n) => (
              <div key={n.name} className={`card border rounded-xl p-5 ${n.color}`}>
                <h3 className={`font-bold text-lg mb-2 ${n.accent}`}>{n.name}</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{n.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link
              href={`/${locale}/networks`}
              className="inline-flex items-center gap-1 bg-[#22c55e] text-white px-6 py-3 rounded-full font-semibold hover:bg-green-400 transition-colors"
            >
              View All Network Rates <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Home Charging */}
      <section className="py-14 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <MapPin className="w-6 h-6 text-[#22c55e]" />
            <h2 className="text-2xl font-bold text-[#052e16]">Home Charging by State</h2>
          </div>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Home charging is where most EV owners do the bulk of their charging — overnight, at off-peak rates. But electricity prices vary dramatically by state. Louisiana averages around $0.09/kWh while Hawaii can exceed $0.37/kWh.
          </p>
          <p className="text-gray-700 mb-4 leading-relaxed">
            We track average residential electricity rates across all 50 states using data from the U.S. Energy Information Administration (EIA), updated regularly. This lets you calculate your real home-charging cost and compare it directly against public network pricing.
          </p>
          <div className="mt-6">
            <Link
              href={`/${locale}/states`}
              className="inline-flex items-center gap-1 text-[#22c55e] font-semibold hover:underline"
            >
              Browse electricity rates by state <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* What We Provide */}
      <section className="py-14 bg-[#f0fdf4]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#052e16] mb-8 text-center">What EVChargeRates Provides</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card bg-white rounded-xl p-6 text-center shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingDown className="w-6 h-6 text-[#22c55e]" />
              </div>
              <h3 className="font-bold text-[#052e16] mb-2">Real Pricing Data</h3>
              <p className="text-sm text-gray-500">Current per-kWh and per-minute rates from all major networks, normalized for easy comparison.</p>
            </div>
            <div className="card bg-white rounded-xl p-6 text-center shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-[#22c55e]" />
              </div>
              <h3 className="font-bold text-[#052e16] mb-2">Cost Calculator</h3>
              <p className="text-sm text-gray-500">Enter your vehicle and charging scenario to get an estimated cost for any charging session.</p>
            </div>
            <div className="card bg-white rounded-xl p-6 text-center shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-[#22c55e]" />
              </div>
              <h3 className="font-bold text-[#052e16] mb-2">Independent & Free</h3>
              <p className="text-sm text-gray-500">No affiliations with any charging network. We provide unbiased data to help you make better charging decisions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-10 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5">
            <h3 className="font-semibold text-yellow-800 mb-2">Data Accuracy Disclaimer</h3>
            <p className="text-sm text-yellow-700 leading-relaxed">
              EV charging rates change frequently without notice. The pricing information on EVChargeRates is for informational purposes only. Always verify current rates with the charging network before beginning a session. EVChargeRates is not affiliated with any charging network or vehicle manufacturer.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
