'use client';

import { useLocale, useTranslations } from 'next-intl';
import type { Icon } from '@phosphor-icons/react';
import {
  Sun,
  Boat,
  Mountains,
  Umbrella,
  Binoculars,
} from '@phosphor-icons/react/dist/ssr';
import { Section } from '@/components/shared/section';
import { Reveal } from '@/components/shared/reveal';
import { experiences } from '@/data/experiences';
import type { Locale } from '@/i18n/routing';

const ICONS: Record<number, Icon> = {
  0: Sun, // Karapyak sunset
  1: Boat, // Citumang rafting
  2: Mountains, // Green Canyon
  3: Umbrella, // Batukaras surfing
  4: Sun, // Local market
  5: Binoculars, // Nature reserve
};

export function getExperiences() {
  return experiences;
}

export function Experience() {
  const t = useTranslations('experience');
  const locale = useLocale() as Locale;
  const expList = experiences;

  return (
    <Section id="experience" className="bg-cream-50">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.2em] text-wood-700">
          {t('eyebrow')}
        </p>
        <h2 className="mt-4 max-w-2xl font-display text-4xl leading-[1.1] tracking-tight text-forest-900 text-balance sm:text-5xl">
          {t('title')}
        </h2>
        <p className="mt-6 max-w-xl text-lg text-ink-600">{t('sub')}</p>
      </Reveal>

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {expList.map((exp, i) => {
          const IconComponent = ICONS[i] ?? Sun;
          const distance =
            locale === 'id'
              ? `${exp.distanceMinutes} menit`
              : `${exp.distanceMinutes} min`;
          return (
            <Reveal key={exp.id} delay={i * 70}>
              <article className="group h-full rounded-lg border border-forest-900/10 bg-cream-100/50 p-6 transition-colors hover:border-forest-700/30">
                <IconComponent size={32} weight="regular" className="text-forest-700" />
                <h3 className="mt-4 font-display text-xl text-forest-900">
                  {exp.name[locale]}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">
                  {exp.description[locale]}
                </p>
                <p className="mt-4 text-xs text-wood-700">{distance}</p>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
