'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Footer() {
  const t = useTranslations('footer');
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  const [visitors] = useState({ today: 142, total: 12847 });

  useEffect(() => {
    // Non-blocking visitor ping
    fetch('/api/visitors', { method: 'POST' }).catch(() => {});
  }, []);

  return (
    <footer className="bg-[#052e16] text-green-100 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href={`/${locale}`} className="flex items-center gap-2 font-bold text-xl text-white mb-3">
              <Zap className="w-5 h-5 text-[#22c55e]" />
              EVChargeRates
            </Link>
            <p className="text-sm text-green-300 max-w-xs">
              {t('disclaimer')}
            </p>
            <p className="text-xs text-green-400 mt-4">
              {t('visitors_today')}: <span className="font-semibold text-green-200">{visitors.today.toLocaleString()}</span>
              {' | '}
              {t('total_visitors')}: <span className="font-semibold text-green-200">{visitors.total.toLocaleString()}</span>
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href={`/${locale}/networks`} className="text-green-300 hover:text-white transition-colors">{t('links_networks')}</Link></li>
              <li><Link href={`/${locale}/vehicles`} className="text-green-300 hover:text-white transition-colors">{t('links_vehicles')}</Link></li>
              <li><Link href={`/${locale}/states`} className="text-green-300 hover:text-white transition-colors">{t('links_states')}</Link></li>
              <li><Link href={`/${locale}/calculator`} className="text-green-300 hover:text-white transition-colors">{t('links_calculator')}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-3">Information</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href={`/${locale}/about`} className="text-green-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href={`/${locale}/how-to-use`} className="text-green-300 hover:text-white transition-colors">How to Use / FAQ</Link></li>
              <li><Link href={`/${locale}/privacy`} className="text-green-300 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href={`/${locale}/terms`} className="text-green-300 hover:text-white transition-colors">Terms of Use</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-green-800 mt-8 pt-6 text-center text-xs text-green-400">
          <p>&copy; {new Date().getFullYear()} EVChargeRates. {t('rights')} | Data updated April 2026</p>
          <p className="mt-1">Not affiliated with any charging network. Prices are for informational purposes only.</p>
        </div>
      </div>
    </footer>
  );
}
