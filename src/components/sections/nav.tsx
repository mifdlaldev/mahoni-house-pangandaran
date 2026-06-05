'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { LocaleSwitcher } from '@/components/shared/locale-switcher';
import type { Locale } from '@/i18n/routing';
import { cn } from '@/lib/utils';

const NAV_IDS = ['villa', 'amenities', 'gallery', 'experience', 'pricing', 'contact'] as const;

export function Nav({ locale }: { locale: Locale }) {
  const t = useTranslations('nav');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        isScrolled
          ? 'border-b border-forest-900/10 bg-forest-900/95 backdrop-blur-sm'
          : 'bg-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:h-20 lg:px-12">
        <Link
          href="/"
          className="font-display text-xl tracking-tight text-cream-50 lg:text-2xl"
        >
          Mahoni House
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {NAV_IDS.map((id) => {
            const href = id === 'contact' ? '#booking' : `#${id}`;
            return (
              <a
                key={id}
                href={href}
                className="text-sm font-medium text-cream-50/85 transition-colors hover:text-cream-50"
              >
                {t(id)}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <LocaleSwitcher currentLocale={locale} />
          <a
            href="#booking"
            className="hidden rounded-md bg-cream-50 px-4 py-2 text-sm font-medium text-forest-900 transition-all hover:bg-cream-100 active:scale-[0.97] sm:inline-flex"
          >
            {t('book')}
          </a>
        </div>
      </div>
    </header>
  );
}
