'use client';

import { useLocale, useTranslations } from 'next-intl';
import type { Icon } from '@phosphor-icons/react';
import {
  CookingPot,
  Plant,
  WifiHigh,
  Snowflake,
  ForkKnife,
  Drop,
} from '@phosphor-icons/react/dist/ssr';
import { Section } from '@/components/shared/section';
import { Reveal } from '@/components/shared/reveal';
import { amenities, secondaryAmenities } from '@/data/amenities';
import type { Locale } from '@/i18n/routing';
import { cn } from '@/lib/utils';

const ICONS: Record<string, Icon> = {
  CookingPot,
  Plant,
  WifiHigh,
  Snowflake,
  ForkKnife,
  Drop,
};

export function Amenities() {
  const t = useTranslations('amenities');
  const locale = useLocale() as Locale;
  const secondary = secondaryAmenities[locale];

  return (
    <Section id="amenities" className="bg-cream-50">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.2em] text-wood-700">
          {t('eyebrow')}
        </p>
        <h2 className="mt-4 max-w-2xl font-display text-4xl leading-[1.1] tracking-tight text-forest-900 text-balance sm:text-5xl">
          {t('title')}
        </h2>
      </Reveal>

      <div className="mt-16 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {amenities.map((amenity, i) => {
          const IconComponent = ICONS[amenity.iconName] ?? CookingPot;
          return (
            <Reveal key={amenity.id} delay={i * 60}>
              <div className="flex gap-4">
                <IconComponent
                  size={28}
                  weight="regular"
                  className={cn('shrink-0 text-forest-700')}
                />
                <div>
                  <h3 className="font-display text-xl text-forest-900">
                    {amenity.label[locale]}
                  </h3>
                  <p className="mt-1.5 text-sm text-ink-600">
                    {amenity.description[locale]}
                  </p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={200}>
        <div className="mt-16 border-t border-forest-900/10 pt-8">
          <p className="text-sm font-medium text-wood-700">
            {t('alsoIncluded')}
          </p>
          <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-600">
            {secondary.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
