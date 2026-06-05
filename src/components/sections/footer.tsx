'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export function Footer() {
  const t = useTranslations('footer');
  const nav = useTranslations('nav');
  const year = new Date().getFullYear();

  const links = [
    { href: '#villa', label: nav('villa') },
    { href: '#amenities', label: nav('amenities') },
    { href: '#pricing', label: nav('pricing') },
    { href: '#faq', label: nav('faq') },
  ];

  return (
    <footer className="border-t border-forest-900/10 bg-cream-100 px-6 py-12 sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Link
            href="/"
            className="font-display text-2xl tracking-tight text-forest-900"
          >
            Mahoni House
          </Link>
          <p className="mt-3 max-w-sm text-sm text-ink-600">{t('tagline')}</p>
          <p className="mt-6 text-xs text-ink-600">
            {t('copyright').replace('2026', String(year))}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-forest-900">
            {t('quickLinks')}
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-ink-600">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-forest-700">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-forest-900">
            {t('contact')}
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-ink-600">
            <li>Pangandaran, West Java</li>
            <li>+62 812-3456-7890</li>
            <li>hello@mahonihouse.id</li>
          </ul>
        </div>
      </div>

      <p className="mt-10 text-center text-xs text-ink-600">{t('builtWith')}</p>
    </footer>
  );
}
