'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Section } from '@/components/shared/section';
import { Reveal } from '@/components/shared/reveal';
import { getVillaBento } from '@/data/villa';
import type { Locale } from '@/i18n/routing';
import { cn } from '@/lib/utils';

export function VillaBento() {
  const t = useTranslations('villa');
  const locale = useLocale() as Locale;
  const cells = getVillaBento();

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
            <article className="group relative h-full w-full overflow-hidden rounded-lg">
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
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
