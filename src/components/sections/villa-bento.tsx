'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { X } from '@phosphor-icons/react/dist/ssr';
import { Section } from '@/components/shared/section';
import { Reveal } from '@/components/shared/reveal';
import { getVillaBento } from '@/data/villa';
import type { Locale } from '@/i18n/routing';
import type { BentoCell } from '@/data/villa';
import { cn } from '@/lib/utils';

export function VillaBento() {
  const t = useTranslations('villa');
  const locale = useLocale() as Locale;
  const cells = getVillaBento();
  const [selected, setSelected] = useState<BentoCell | null>(null);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  const open = useCallback((cell: BentoCell) => {
    setSelected(cell);
    setIsAnimatingOut(false);
  }, []);

  const close = useCallback(() => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      setSelected(null);
      setIsAnimatingOut(false);
    }, 250);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    if (selected) {
      document.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [selected, close]);

  return (
    <Section id="villa" className="bg-cream-100">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.2em] text-wood-700">
          {t('eyebrow')}
        </p>
        <h2 className="mt-4 max-w-2xl font-display text-4xl leading-[1.1] tracking-tight text-forest-900 text-balance sm:text-5xl">
          {t('title')}
        </h2>
      </Reveal>

      <div className="mt-16 grid auto-rows-[280px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[260px]">
        {cells.map((cell, i) => (
          <Reveal
            key={cell.id}
            delay={i * 80}
            className={cn(
              cell.size === 'large' && 'sm:col-span-2 sm:row-span-2',
              cell.size === 'wide' && 'sm:col-span-2',
            )}
          >
            <button
              onClick={() => open(cell)}
              className="group relative h-full w-full overflow-hidden rounded-lg text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-100"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-105"
                style={{ backgroundImage: `url(${cell.imageUrl})` }}
                aria-hidden="true"
              />
              <div
                className={cn('absolute inset-0 bg-gradient-to-br opacity-60', cell.gradient)}
                aria-hidden="true"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-900/70 via-forest-900/10 to-transparent" />
              <div className="relative flex h-full flex-col justify-end p-6">
                <h3 className="font-display text-2xl text-cream-50">
                  {cell.title[locale]}
                </h3>
                <p className="mt-2 text-sm text-cream-100/85">
                  {cell.subtitle[locale]}
                </p>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      {(selected) && (
        <div
          className={cn(
            'fixed inset-0 z-[70] flex items-center justify-center bg-forest-900/70 p-4 backdrop-blur-sm transition-all duration-200 ease-out',
            isAnimatingOut ? 'opacity-0' : 'opacity-100',
          )}
          onClick={close}
        >
          <div
            className={cn(
              'relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-cream-50 shadow-2xl transition-all duration-200 ease-out',
              isAnimatingOut ? 'scale-95 opacity-0' : 'scale-100 opacity-100',
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={close}
              className="absolute right-4 top-4 z-10 flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-cream-50/90 text-forest-900 shadow-md transition-colors hover:bg-cream-100"
              aria-label="Close dialog"
            >
              <X size={20} weight="bold" />
            </button>

            <div className="relative aspect-video w-full overflow-hidden bg-wood-200">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${selected.imageUrl})` }}
              />
            </div>

            <div className="overflow-y-auto p-6 sm:p-8">
              <h3 className="font-display text-2xl text-forest-900 sm:text-3xl">
                {selected.title[locale]}
              </h3>
              <p className="mt-2 text-sm text-wood-700">{selected.subtitle[locale]}</p>
              <p className="mt-6 font-body text-base leading-relaxed text-ink-600 sm:text-lg">
                {selected.description[locale]}
              </p>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}
