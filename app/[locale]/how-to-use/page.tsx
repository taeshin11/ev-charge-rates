import { getTranslations } from 'next-intl/server';
import { ChevronRight, Zap } from 'lucide-react';
import Link from 'next/link';

const BASE_URL = 'https://ev-charge-rates.vercel.app';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    title: 'How to Use EVChargeRates | EV Charging FAQ',
    description:
      'Learn how to compare EV charging costs, calculate cost per mile, and find the cheapest charging options. FAQ: Level 1/2/3 charging, Tesla vs Electrify America, home vs public charging, and more.',
    alternates: {
      canonical: `${BASE_URL}/${locale}/how-to-use`,
    },
    openGraph: {
      title: 'How to Use EVChargeRates | EV Charging FAQ',
      description:
        'Everything you need to know about EV charging costs, speeds, and how to find the cheapest option for your electric vehicle.',
      url: `${BASE_URL}/${locale}/how-to-use`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'EV Charging FAQ | EVChargeRates',
      description: 'Level 1 vs 2 vs 3, cost per mile, Tesla vs Electrify America — all your EV charging questions answered.',
    },
  };
}

const faqs = [
  {
    q: 'What is Level 1, Level 2, and Level 3 (DC Fast) charging?',
    a: `<strong>Level 1</strong> uses a standard 120V household outlet and delivers 3–5 miles of range per hour. It's the slowest method but requires no special equipment — just plug in at home.<br/><br/><strong>Level 2</strong> uses a 240V circuit (like a dryer outlet) and delivers 15–30 miles of range per hour. Most home EV chargers and public destination chargers are Level 2.<br/><br/><strong>Level 3 (DC Fast Charging)</strong> bypasses the car's onboard charger and delivers power directly to the battery. Speeds range from 50 kW to 350 kW, adding 100–200+ miles of range in 20–40 minutes. Tesla Superchargers, Electrify America, and EVgo are primarily DC fast charging networks.`,
  },
  {
    q: 'How much does it cost to charge an EV?',
    a: `Charging costs vary widely depending on the network, your location, and the time of day.<br/><br/><strong>Home charging:</strong> Typically $0.09–$0.37/kWh depending on your state's electricity rates. Charging a 75 kWh battery from empty to full costs roughly $7–$28 at home.<br/><br/><strong>Public Level 2:</strong> Often $0.20–$0.45/kWh, or a flat hourly rate of $1–$3/hour.<br/><br/><strong>DC Fast Charging:</strong> Usually $0.25–$0.60/kWh. A 20–30 minute fast charge to add 100 miles typically costs $8–$20 depending on the network and your vehicle's efficiency.`,
  },
  {
    q: 'Tesla Supercharger vs Electrify America — which is cheaper?',
    a: `It depends on your membership status and location.<br/><br/><strong>Tesla Supercharger</strong> rates average $0.25–$0.50/kWh for non-members. Tesla owners who charge regularly can reduce costs through billing tiers.<br/><br/><strong>Electrify America</strong> charges $0.43–$0.48/kWh for pay-as-you-go users, but the EA Pass+ membership ($4/month) drops this to $0.25–$0.32/kWh — often making it cheaper than Superchargers for frequent users.<br/><br/>For occasional road trips, Tesla Superchargers tend to have better reliability and more locations. For cost-conscious drivers with an EA Pass+, Electrify America can be the better value.`,
  },
  {
    q: 'How do I calculate cost per mile for EV charging?',
    a: `Use this formula:<br/><br/><code style="background:#f3f4f6;padding:4px 8px;border-radius:4px;font-size:0.9em;">(kWh rate × battery size) ÷ range = cost per mile</code><br/><br/>Example: You drive a Tesla Model 3 Long Range (75 kWh, 358-mile range) and pay $0.13/kWh at home:<br/><br/>(0.13 × 75) ÷ 358 = <strong>$0.027 per mile</strong> (~2.7 cents/mile)<br/><br/>At a public fast charger at $0.45/kWh:<br/>(0.45 × 75) ÷ 358 = <strong>$0.094 per mile</strong> (~9.4 cents/mile)<br/><br/>Use our <a href="/en/calculator" style="color:#22c55e;text-decoration:underline;">Cost Calculator</a> to run these numbers for your specific vehicle and network.`,
  },
  {
    q: 'Is home charging cheaper than public charging?',
    a: `Almost always yes — by a significant margin.<br/><br/>Home charging costs typically range from $0.09 to $0.37/kWh depending on your state. Even in high-rate states like California (~$0.29/kWh), home charging is usually 30–60% cheaper than public DC fast charging.<br/><br/>The exception: some workplaces offer free Level 2 charging, and a few networks (like Volta) offer ad-supported free charging at retail locations.<br/><br/>For most EV owners who can charge at home, 80–90% of their charging happens overnight at home rates. Public fast charging is mainly for long road trips.`,
  },
  {
    q: 'What states have the cheapest electricity for EV charging?',
    a: `As of 2025–2026, the states with the lowest average residential electricity rates include:<br/><br/><ul style="margin-left:1rem;list-style:disc;"><li><strong>Louisiana</strong> — ~$0.09/kWh</li><li><strong>Oklahoma</strong> — ~$0.10/kWh</li><li><strong>Arkansas</strong> — ~$0.10/kWh</li><li><strong>Washington</strong> — ~$0.11/kWh (hydropower heavy)</li><li><strong>North Dakota</strong> — ~$0.11/kWh</li></ul><br/>States with the highest rates include Hawaii (~$0.37/kWh), California (~$0.29/kWh), and Massachusetts (~$0.27/kWh).<br/><br/>Check the <a href="/en/states" style="color:#22c55e;text-decoration:underline;">States page</a> for current rates across all 50 states.`,
  },
  {
    q: 'How long does it take to charge an EV?',
    a: `Charging time depends on three factors: charger speed (kW), your battery size (kWh), and your car's maximum charge rate acceptance.<br/><br/><strong>Level 1 (1.2–1.4 kW):</strong> 40–50+ hours for a full charge — practical only for top-ups overnight.<br/><br/><strong>Level 2 (7–19 kW):</strong> 4–12 hours for a full charge. Most home setups and workplace chargers.<br/><br/><strong>DC Fast Charging (50–350 kW):</strong> 20–60 minutes to reach 80%. (Charging slows above 80% to protect battery.)<br/><br/>Example: A Tesla Model Y (75 kWh battery, 250 kW max charge rate) at a 250 kW Supercharger can add 200 miles in about 25 minutes.`,
  },
  {
    q: 'What is kWh and why does it matter for EV charging?',
    a: `A <strong>kilowatt-hour (kWh)</strong> is the standard unit of electrical energy — equivalent to using 1,000 watts of power for one hour.<br/><br/>For EV charging, kWh matters in two ways:<br/><br/><strong>Battery size:</strong> EV batteries are rated in kWh (e.g., a 75 kWh battery). A larger battery = more range, but also means a longer or more expensive charge.<br/><br/><strong>Charging cost:</strong> Most public networks charge per kWh (e.g., $0.35/kWh). Some charge per minute instead — which can be more expensive if your car charges slowly.<br/><br/><strong>Why per-kWh pricing is better for consumers:</strong> You pay for actual energy delivered, regardless of how fast your car charges. Per-minute pricing can penalize owners of vehicles with slower onboard chargers.`,
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.a.replace(/<[^>]+>/g, ''),
    },
  })),
};

export default async function HowToUsePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <div className="min-h-screen bg-[#f0fdf4]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#052e16] to-[#166534] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-[#22c55e]/20 rounded-full p-3">
              <Zap className="w-8 h-8 text-[#22c55e]" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">How to Use EVChargeRates</h1>
          <p className="text-lg text-green-200 max-w-2xl mx-auto">
            Compare EV charging costs, calculate cost per mile, and find the cheapest charging options near you.
          </p>
        </div>
      </section>

      {/* How to Use Steps */}
      <section className="py-14 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#052e16] mb-8">Getting Started</h2>
          <div className="space-y-6">
            {[
              {
                step: '1',
                title: 'Browse Charging Networks',
                desc: 'Visit the Networks page to see per-kWh rates, charging speeds, connector types, and station counts for Tesla Supercharger, ChargePoint, Electrify America, Blink, EVgo, and more.',
                href: `/${locale}/networks`,
                cta: 'View Networks',
              },
              {
                step: '2',
                title: 'Check Your State\'s Electricity Rate',
                desc: 'See your state\'s average residential electricity rate to calculate your home charging cost and compare it against public network prices.',
                href: `/${locale}/states`,
                cta: 'View States',
              },
              {
                step: '3',
                title: 'Use the Cost Calculator',
                desc: 'Select your vehicle, charging network, and session details to calculate an estimated charging cost. Get your cost per mile for home vs. public charging.',
                href: `/${locale}/calculator`,
                cta: 'Open Calculator',
              },
              {
                step: '4',
                title: 'Compare by Vehicle',
                desc: 'Look up your specific EV model to see its battery size, range, and maximum charging speed — which affects how much you pay on per-minute pricing networks.',
                href: `/${locale}/vehicles`,
                cta: 'View Vehicles',
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-5">
                <div className="flex-shrink-0 w-10 h-10 bg-[#22c55e] text-white rounded-full flex items-center justify-center font-bold text-lg">
                  {item.step}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-[#052e16] mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{item.desc}</p>
                  <Link href={item.href} className="text-sm text-[#22c55e] font-medium hover:underline inline-flex items-center gap-1">
                    {item.cta} <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 bg-[#f0fdf4]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#052e16] mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group border border-green-100 rounded-xl overflow-hidden bg-white">
                <summary className="flex justify-between items-center px-5 py-4 cursor-pointer font-medium text-[#052e16] hover:bg-green-50 transition-colors list-none">
                  {faq.q}
                  <ChevronRight className="w-4 h-4 text-gray-400 group-open:rotate-90 transition-transform flex-shrink-0 ml-2" />
                </summary>
                <div
                  className="px-5 pb-4 pt-2 text-sm text-gray-600 bg-green-50/50 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: faq.a }}
                />
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl font-bold text-[#052e16] mb-4">Ready to Find the Cheapest Charging?</h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={`/${locale}/networks`}
              className="bg-[#22c55e] text-white px-6 py-3 rounded-full font-semibold hover:bg-green-400 transition-colors"
            >
              Compare Networks
            </Link>
            <Link
              href={`/${locale}/calculator`}
              className="bg-white border border-green-200 text-[#052e16] px-6 py-3 rounded-full font-semibold hover:bg-green-50 transition-colors"
            >
              Use Calculator
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
