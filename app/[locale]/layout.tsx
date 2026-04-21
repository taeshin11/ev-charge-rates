import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import '../globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Script from 'next/script';
import { FeedbackButton } from '@/components/FeedbackButton';
import { AdSocialBar } from '@/components/ads/AdSocialBar';

export const metadata: Metadata = {
  verification: {
    google: "WddgcbVJsL2BGHNAje5m6DK56IcR0Mw5UOqozI2Xtrc",
  },
  title: {
    default: 'EV Charging Costs by Network & State | EVChargeRates',
    template: '%s | EVChargeRates',
  },
  description:
    'Compare EV charging prices across Tesla Supercharger, ChargePoint, Electrify America, and more. Find the cheapest electric vehicle charging near you.',
  keywords: [
    'EV charging cost',
    'electric car charging price',
    'Tesla Supercharger cost',
    'EV charging comparison',
    'electric vehicle charging rates',
    'home EV charging cost',
  ],
  metadataBase: new URL('https://ev-charge-rates.vercel.app'),
  openGraph: {
    type: 'website',
    siteName: 'EVChargeRates',
    locale: 'en_US',
    title: 'EV Charging Costs by Network & State | EVChargeRates',
    description:
      'Compare EV charging prices across Tesla Supercharger, ChargePoint, Electrify America, and more. Find the cheapest electric vehicle charging near you.',
    url: 'https://ev-charge-rates.vercel.app',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EV Charging Costs by Network & State | EVChargeRates',
    description:
      'Compare EV charging prices across Tesla Supercharger, ChargePoint, Electrify America, and more.',
  },
  alternates: {
    canonical: 'https://ev-charge-rates.vercel.app',
    languages: {
      en: 'https://ev-charge-rates.vercel.app/en',
      ko: 'https://ev-charge-rates.vercel.app/ko',
      ja: 'https://ev-charge-rates.vercel.app/ja',
      zh: 'https://ev-charge-rates.vercel.app/zh',
      es: 'https://ev-charge-rates.vercel.app/es',
      fr: 'https://ev-charge-rates.vercel.app/fr',
      de: 'https://ev-charge-rates.vercel.app/de',
      pt: 'https://ev-charge-rates.vercel.app/pt',
    },
  },
  other: {
    'google-adsense-account': 'ca-pub-7098271335538021',
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
      <AdSocialBar />
      <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7098271335538021" crossOrigin="anonymous" strategy="afterInteractive" />
      <FeedbackButton siteName="EVChargeRates" />
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
