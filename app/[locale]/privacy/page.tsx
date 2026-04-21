import { Shield } from 'lucide-react';

const BASE_URL = 'https://ev-charge-rates.vercel.app';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    title: 'Privacy Policy | EVChargeRates',
    description:
      'Privacy policy for EVChargeRates. Learn how we collect, use, and protect your information when you use our EV charging cost comparison service.',
    alternates: {
      canonical: `${BASE_URL}/${locale}/privacy`,
    },
    robots: { index: false },
  };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  // Await params even if unused, per Next.js 16 requirement
  await params;

  const lastUpdated = 'April 13, 2026';

  return (
    <div className="min-h-screen bg-[#f0fdf4]">
      {/* Header */}
      <section className="bg-gradient-to-br from-[#052e16] to-[#166534] text-white py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-[#22c55e]/20 rounded-full p-3">
              <Shield className="w-7 h-7 text-[#22c55e]" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-green-300 text-sm">Last updated: {lastUpdated}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-14 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-sm max-w-none">

          <div className="space-y-10 text-gray-700 leading-relaxed">

            <div>
              <h2 className="text-xl font-bold text-[#052e16] mb-3">1. Introduction</h2>
              <p>
                EVChargeRates (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates the website at ev-charge-rates.vercel.app (the &quot;Service&quot;). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our Service. Please read this policy carefully. If you disagree with its terms, please discontinue use of the Site.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#052e16] mb-3">2. Information We Collect</h2>
              <h3 className="font-semibold text-[#052e16] mb-2">Automatically Collected Information</h3>
              <p className="mb-3">
                When you visit our Service, we may automatically collect certain information about your device and usage, including:
              </p>
              <ul className="list-disc ml-6 space-y-1 text-sm mb-4">
                <li>IP address (anonymized)</li>
                <li>Browser type and version</li>
                <li>Pages visited and time spent</li>
                <li>Referring URL</li>
                <li>Device type and operating system</li>
              </ul>
              <h3 className="font-semibold text-[#052e16] mb-2">Information You Provide</h3>
              <p>
                EVChargeRates does not require account registration or collect personal information such as your name or email address in order to use the Service. If you contact us voluntarily (e.g., via email), we will collect the information you choose to provide.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#052e16] mb-3">3. Cookies and Tracking Technologies</h2>
              <p className="mb-3">
                We use cookies and similar tracking technologies to improve your experience and analyze site usage. These include:
              </p>
              <ul className="list-disc ml-6 space-y-2 text-sm">
                <li><strong>Essential cookies:</strong> Required for basic site functionality such as language preference.</li>
                <li><strong>Analytics cookies:</strong> Help us understand how visitors interact with our site (e.g., Google Analytics). Data is anonymized where possible.</li>
                <li><strong>Advertising cookies:</strong> We use Google AdSense to display relevant advertisements. Google may use cookies to serve ads based on your browsing history on other sites. You can opt out via <a href="https://www.google.com/settings/ads" className="text-[#22c55e] hover:underline" target="_blank" rel="noopener noreferrer">Google Ad Settings</a>.</li>
              </ul>
              <p className="mt-3 text-sm">
                You can control cookies through your browser settings. Disabling cookies may affect certain features of the Service.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#052e16] mb-3">4. How We Use Your Information</h2>
              <p className="mb-3">We use the information we collect to:</p>
              <ul className="list-disc ml-6 space-y-1 text-sm">
                <li>Operate and maintain the Service</li>
                <li>Analyze usage patterns to improve content and functionality</li>
                <li>Display relevant advertisements via Google AdSense</li>
                <li>Detect and prevent technical issues or fraudulent activity</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#052e16] mb-3">5. Third-Party Services</h2>
              <p className="mb-3">
                Our Service may integrate with third-party services that have their own privacy policies. We are not responsible for the privacy practices of these services:
              </p>
              <ul className="list-disc ml-6 space-y-2 text-sm">
                <li><strong>Google Analytics</strong> — Usage analytics. <a href="https://policies.google.com/privacy" className="text-[#22c55e] hover:underline" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a></li>
                <li><strong>Google AdSense</strong> — Advertisement delivery. Governed by Google&apos;s Privacy Policy.</li>
                <li><strong>Vercel</strong> — Hosting provider. May collect server logs. <a href="https://vercel.com/legal/privacy-policy" className="text-[#22c55e] hover:underline" target="_blank" rel="noopener noreferrer">Vercel Privacy Policy</a></li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#052e16] mb-3">6. Data Retention</h2>
              <p>
                We retain automatically collected data for a maximum of 26 months for analytics purposes, after which it is aggregated or deleted. We do not retain personal information beyond the period necessary for the purposes described in this policy.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#052e16] mb-3">7. Your Rights</h2>
              <p className="mb-3">
                Depending on your location, you may have the following rights regarding your data:
              </p>
              <ul className="list-disc ml-6 space-y-1 text-sm">
                <li>Right to access the personal data we hold about you</li>
                <li>Right to correct inaccurate data</li>
                <li>Right to request deletion of your data</li>
                <li>Right to opt out of data sales (we do not sell data)</li>
                <li>Right to withdraw consent for optional data processing</li>
              </ul>
              <p className="mt-3 text-sm">
                To exercise these rights, contact us at the email below.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#052e16] mb-3">8. Children&apos;s Privacy</h2>
              <p>
                The Service is not directed to children under the age of 13. We do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a child, please contact us immediately.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#052e16] mb-3">9. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will post the updated policy on this page with a revised &quot;Last updated&quot; date. Continued use of the Service after changes constitutes acceptance of the revised policy.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#052e16] mb-3">10. Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy, please contact us at: <strong>privacy@ev-charge-rates.vercel.app</strong>
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
