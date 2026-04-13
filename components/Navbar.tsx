'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Zap } from 'lucide-react';

export default function Navbar() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';

  const navLinks = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/networks`, label: t('networks') },
    { href: `/${locale}/vehicles`, label: t('vehicles') },
    { href: `/${locale}/states`, label: t('states') },
    { href: `/${locale}/calculator`, label: t('calculator') },
  ];

  const locales = ['en', 'ko', 'ja', 'zh', 'es', 'fr', 'de', 'pt'];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-green-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href={`/${locale}`} className="flex items-center gap-2 font-bold text-xl text-[#052e16]">
            <Zap className="w-6 h-6 text-[#22c55e]" />
            <span>EVChargeRates</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'bg-green-100 text-[#052e16]'
                    : 'text-gray-600 hover:bg-green-50 hover:text-[#052e16]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <select
              className="text-xs border border-green-200 rounded px-2 py-1 bg-white text-[#052e16]"
              value={locale}
              onChange={(e) => {
                const newLocale = e.target.value;
                const segments = pathname.split('/');
                segments[1] = newLocale;
                window.location.href = segments.join('/');
              }}
            >
              {locales.map((l) => (
                <option key={l} value={l}>
                  {l.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Mobile nav */}
        <div className="md:hidden flex gap-1 pb-2 overflow-x-auto">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-1 rounded text-xs font-medium whitespace-nowrap transition-colors ${
                pathname === link.href
                  ? 'bg-green-100 text-[#052e16]'
                  : 'text-gray-600 hover:bg-green-50'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
