'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Section } from '@/components/shared/section';
import { Reveal } from '@/components/shared/reveal';
import { getLayout } from '@/data/layout';
import type { Locale } from '@/i18n/routing';

export function Layout() {
  const t = useTranslations('layout');
  const locale = useLocale() as Locale;
  const layout = getLayout();

  return (
    <Section id="layout" className="bg-forest-900 text-cream-50">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.2em] text-cream-200/70">
          {t('eyebrow')}
        </p>
        <h2 className="mt-4 max-w-2xl font-display text-4xl leading-[1.1] tracking-tight text-cream-50 text-balance sm:text-5xl">
          {t('title')}
        </h2>
      </Reveal>

      <Reveal delay={120}>
        <dl className="mt-12 grid grid-cols-2 gap-6 border-y border-cream-50/15 py-10 sm:grid-cols-4">
          <div>
            <dt className="font-display text-4xl text-cream-50">{layout.bedrooms}</dt>
            <dd className="mt-1 text-sm text-cream-200/70">{t('stats.bedrooms')}</dd>
          </div>
          <div>
            <dt className="font-display text-4xl text-cream-50">{layout.guests}</dt>
            <dd className="mt-1 text-sm text-cream-200/70">{t('stats.guests')}</dd>
          </div>
          <div>
            <dt className="font-display text-4xl text-cream-50">{layout.bathrooms}</dt>
            <dd className="mt-1 text-sm text-cream-200/70">{t('stats.bathrooms')}</dd>
          </div>
          <div>
            <dt className="font-display text-4xl text-cream-50">{layout.area}</dt>
            <dd className="mt-1 text-sm text-cream-200/70">{t('stats.area')}</dd>
          </div>
        </dl>
      </Reveal>

      <div className="mt-12 grid gap-8 sm:grid-cols-2">
        {layout.rooms.map((room, i) => (
          <Reveal key={room.id} delay={i * 80}>
            <div className="rounded-lg border border-cream-50/10 bg-forest-700/30 p-6">
              <h3 className="font-display text-2xl text-cream-50">
                {room.name[locale]}
              </h3>
              <p className="mt-1 text-sm text-cream-200/70">{room.specs[locale]}</p>
              <p className="mt-4 text-xs uppercase tracking-wider text-cream-200/60">
                {t('bedConfig')}
              </p>
              <p className="mt-1 text-sm text-cream-50/90">{room.beds[locale]}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
