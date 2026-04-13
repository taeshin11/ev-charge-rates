import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import '../globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    default: 'EVChargeRates — EV Charging Prices & Speeds by Network',
    template: '%s | EVChargeRates',
  },
  description:
    'Compare EV charging prices, speeds, and availability across all major US networks. Find the cheapest charging for your electric vehicle.',
  metadataBase: new URL('https://ev-charge-rates.vercel.app'),
  openGraph: {
    type: 'website',
    siteName: 'EVChargeRates',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as never)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className="h-full">
      <body className="min-h-full flex flex-col bg-[#f0fdf4] text-[#052e16]">
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
