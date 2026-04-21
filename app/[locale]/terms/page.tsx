import { FileText } from 'lucide-react';

const BASE_URL = 'https://ev-charge-rates.vercel.app';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    title: 'Terms of Use | EVChargeRates',
    description:
      'Terms of use for EVChargeRates. EV charging pricing data is for informational purposes only. Always verify rates with charging networks before use.',
    alternates: {
      canonical: `${BASE_URL}/${locale}/terms`,
    },
    robots: { index: false },
  };
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  await params;

  const lastUpdated = 'April 13, 2026';

  return (
    <div className="min-h-screen bg-[#f0fdf4]">
      {/* Header */}
      <section className="bg-gradient-to-br from-[#052e16] to-[#166534] text-white py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-[#22c55e]/20 rounded-full p-3">
              <FileText className="w-7 h-7 text-[#22c55e]" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Terms of Use</h1>
          <p className="text-green-300 text-sm">Last updated: {lastUpdated}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-14 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Important Notice */}
          <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-5 mb-10">
            <h2 className="font-bold text-yellow-800 mb-2">Important: Pricing Is Informational Only</h2>
            <p className="text-sm text-yellow-700 leading-relaxed">
              EV charging rates change frequently without notice. All pricing information on EVChargeRates is provided for informational and comparison purposes only. <strong>Always verify current rates directly with the charging network before beginning a charging session.</strong> EVChargeRates is not responsible for any discrepancies between the rates shown and actual charges applied at the point of charging.
            </p>
          </div>

          <div className="space-y-10 text-gray-700 leading-relaxed">

            <div>
              <h2 className="text-xl font-bold text-[#052e16] mb-3">1. Acceptance of Terms</h2>
              <p>
                By accessing or using EVChargeRates at ev-charge-rates.vercel.app (the &quot;Service&quot;), you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use the Service. These terms apply to all visitors, users, and others who access or use the Service.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#052e16] mb-3">2. Description of Service</h2>
              <p className="mb-3">
                EVChargeRates provides an informational platform that:
              </p>
              <ul className="list-disc ml-6 space-y-1 text-sm">
                <li>Aggregates and displays EV charging cost data from public sources and network websites</li>
                <li>Provides comparison tools to help users evaluate charging options</li>
                <li>Tracks residential electricity rates by U.S. state for home charging cost estimation</li>
                <li>Offers a charging cost calculator for educational and planning purposes</li>
              </ul>
              <p className="mt-3 text-sm">
                EVChargeRates is an independent information service and is not a charging network operator, energy provider, or vehicle manufacturer.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#052e16] mb-3">3. Accuracy of Charging Rate Information</h2>
              <p className="mb-3">
                <strong>EV charging rates are subject to change at any time without notice.</strong> Factors that affect actual charging costs include:
              </p>
              <ul className="list-disc ml-6 space-y-1 text-sm mb-4">
                <li>Network membership status and tier</li>
                <li>Location-specific pricing (some networks vary rates by state, city, or even individual station)</li>
                <li>Time-of-use pricing and peak hour surcharges</li>
                <li>Session fees, idle fees, and overstay fees</li>
                <li>Promotional pricing or partnership agreements</li>
                <li>Changes in network pricing policy</li>
              </ul>
              <p className="text-sm">
                We strive to keep our data current and accurate, but <strong>we cannot guarantee that the rates shown on this site match the rates you will be charged</strong> at any specific charging station. Always confirm pricing through the charging network&apos;s official app, website, or station display before charging.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#052e16] mb-3">4. No Affiliation with Charging Networks</h2>
              <p>
                EVChargeRates is an independent service and is <strong>not affiliated with, endorsed by, or connected to</strong> any charging network including but not limited to Tesla (Supercharger), ChargePoint, Electrify America, Blink, EVgo, Volta, Shell Recharge, Rivian, or any other network mentioned on this site. All trademarks and brand names belong to their respective owners and are used for identification purposes only.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#052e16] mb-3">5. Disclaimer of Warranties</h2>
              <p className="mb-3">
                The Service is provided on an &quot;as is&quot; and &quot;as available&quot; basis without any warranties of any kind, either express or implied, including but not limited to:
              </p>
              <ul className="list-disc ml-6 space-y-1 text-sm">
                <li>Accuracy, completeness, or timeliness of pricing data</li>
                <li>Fitness for a particular purpose</li>
                <li>Uninterrupted or error-free operation</li>
                <li>Results that will be obtained from use of the Service</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#052e16] mb-3">6. Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by applicable law, EVChargeRates and its operators shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of or inability to use the Service — including any damages resulting from reliance on charging rate information that differs from actual rates charged by a network. Your sole remedy for dissatisfaction with the Service is to stop using it.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#052e16] mb-3">7. Permitted Use</h2>
              <p className="mb-3">You may use the Service for personal, non-commercial purposes. You may not:</p>
              <ul className="list-disc ml-6 space-y-1 text-sm">
                <li>Scrape, crawl, or systematically download content from the Service without prior written permission</li>
                <li>Reproduce, redistribute, or resell data from the Service for commercial purposes</li>
                <li>Use the Service in any way that could damage, disable, or impair the Service</li>
                <li>Attempt to gain unauthorized access to any part of the Service</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#052e16] mb-3">8. Third-Party Links</h2>
              <p>
                The Service may contain links to third-party websites including charging network sites. These links are provided for convenience only. EVChargeRates has no control over the content or practices of third-party sites and assumes no responsibility for them.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#052e16] mb-3">9. Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms of Use at any time. Changes will be effective immediately upon posting the updated terms with a revised &quot;Last updated&quot; date. Continued use of the Service after changes constitutes your acceptance of the revised terms.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#052e16] mb-3">10. Governing Law</h2>
              <p>
                These Terms of Use are governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#052e16] mb-3">11. Contact</h2>
              <p>
                For questions about these Terms of Use, contact us at: <strong>legal@ev-charge-rates.vercel.app</strong>
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
