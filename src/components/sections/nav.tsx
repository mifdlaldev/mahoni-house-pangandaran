'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { List, X } from '@phosphor-icons/react/dist/ssr';
import { LocaleSwitcher } from '@/components/shared/locale-switcher';
import type { Locale } from '@/i18n/routing';
import { cn } from '@/lib/utils';

const NAV_IDS = ['villa', 'amenities', 'gallery', 'experience', 'pricing', 'contact'] as const;

export function Nav({ locale }: { locale: Locale }) {
  const t = useTranslations('nav');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isSidebarOpen]);

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <>
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        isScrolled
          ? 'border-b border-forest-900/10 bg-forest-900/95 backdrop-blur-sm'
          : 'bg-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:h-20 lg:px-12">
        <button
          onClick={() => {
            setIsSidebarOpen(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="cursor-pointer font-display text-xl tracking-tight text-cream-50 transition-colors hover:text-cream-200 lg:text-2xl"
        >
          Mahoni House
        </button>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
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
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md text-cream-50 transition-colors hover:bg-cream-50/10 lg:hidden"
            aria-label="Toggle menu"
          >
            <List size={24} weight="regular" />
          </button>
        </div>
      </div>

    </header>

      <aside
        className={cn(
          'fixed inset-y-0 right-0 z-[60] flex w-72 flex-col bg-forest-900 shadow-2xl transition-transform duration-300 ease-out lg:hidden',
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="flex items-center justify-between border-b border-cream-50/10 px-6 py-5">
          <span className="font-display text-lg text-cream-50">Menu</span>
          <button
            onClick={closeSidebar}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md text-cream-50 transition-colors hover:bg-cream-50/10"
            aria-label="Close menu"
          >
            <X size={24} weight="regular" />
          </button>
        </div>

        <nav className="mt-2 flex flex-col gap-1 px-3 py-4" aria-label="Mobile navigation">
          {NAV_IDS.map((id) => {
            const href = id === 'contact' ? '#booking' : `#${id}`;
            return (
              <a
                key={id}
                href={href}
                onClick={closeSidebar}
                className="rounded-lg px-4 py-3.5 text-base font-medium text-cream-50/85 transition-colors hover:bg-cream-50/10 hover:text-cream-50"
              >
                {t(id)}
              </a>
            );
          })}
        </nav>

        <div className="mt-auto border-t border-cream-50/10 px-6 py-6">
          <div className="flex items-center justify-between">
            <span className="text-sm text-cream-200/70">{t('book')}</span>
            <LocaleSwitcher currentLocale={locale} />
          </div>
          <a
            href="#booking"
            onClick={closeSidebar}
            className="mt-4 flex w-full items-center justify-center rounded-lg bg-cream-50 px-4 py-3.5 text-sm font-medium text-forest-900 transition-all hover:bg-cream-100 active:scale-[0.97]"
          >
            {t('book')}
          </a>
        </div>
      </aside>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-[55] bg-forest-900/60 backdrop-blur-sm lg:hidden"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}
    </>
  );
}
