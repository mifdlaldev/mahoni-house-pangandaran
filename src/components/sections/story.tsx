'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Section } from '@/components/shared/section';
import { Reveal } from '@/components/shared/reveal';
import { getOwnersBio } from '@/data/owners';
import type { Locale } from '@/i18n/routing';

export function Story() {
  const t = useTranslations('story');
  const locale = useLocale() as Locale;
  const bio = getOwnersBio();

  return (
    <Section id="story" className="bg-cream-50">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <div
            className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-gradient-to-br from-wood-500/30 via-wood-700/20 to-forest-700/30"
            role="img"
            aria-label="Asep and Lina, owners of Mahoni House"
          >
            <div
              className="absolute inset-0 opacity-60"
              style={{
                backgroundImage:
                  'radial-gradient(ellipse at 30% 20%, oklch(65% 0.075 75 / 0.55) 0%, transparent 60%), radial-gradient(ellipse at 75% 80%, oklch(45% 0.075 60 / 0.45) 0%, transparent 55%)',
              }}
              aria-hidden="true"
            />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <p className="font-display text-2xl text-cream-50 drop-shadow-sm">Asep &amp; Lina</p>
              <p className="mt-1 text-sm text-cream-100/85">{t('signature')}</p>
            </div>
          </div>
        </Reveal>
        <div className="lg:col-span-7 lg:pl-8">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-wood-700">
              {t('eyebrow')}
            </p>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="mt-4 max-w-xl font-display text-4xl leading-[1.1] tracking-tight text-forest-900 text-balance sm:text-5xl">
              {bio.headline[locale]}
            </h2>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-8 font-body text-lg leading-relaxed text-ink-600">
              {bio.paragraph1[locale]}
            </p>
          </Reveal>
          <Reveal delay={360}>
            <p className="mt-6 font-body text-lg leading-relaxed text-ink-600">
              {bio.paragraph2[locale]}
            </p>
          </Reveal>
          <Reveal delay={480}>
            <p className="mt-10 font-display text-lg italic text-forest-700">
              {t('signature')}
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
