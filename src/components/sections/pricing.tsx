'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Check } from '@phosphor-icons/react/dist/ssr';
import { Section } from '@/components/shared/section';
import { Reveal } from '@/components/shared/reveal';
import { CtaButton } from '@/components/shared/cta-button';
import { pricingTiers, pricingIncludes, pricingExcludes } from '@/data/pricing';
import type { Locale } from '@/i18n/routing';
import { cn } from '@/lib/utils';

const formatRate = (rate: number, locale: Locale): string => {
  try {
    return new Intl.NumberFormat(locale === 'id' ? 'id-ID' : 'en-US', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(rate);
  } catch {
    return `Rp ${rate.toLocaleString()}`;
  }
};

export function getPricing() {
  return pricingTiers;
}

export function Pricing() {
  const t = useTranslations('pricing');
  const locale = useLocale() as Locale;
  const tiers = pricingTiers;
  const includes = pricingIncludes[locale];
  const excludes = pricingExcludes[locale];

  return (
    <Section id="pricing" className="bg-cream-100">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.2em] text-wood-700">
          {t('eyebrow')}
        </p>
        <h2 className="mt-4 max-w-2xl font-display text-4xl leading-[1.1] tracking-tight text-forest-900 text-balance sm:text-5xl">
          {t('title')}
        </h2>
        <p className="mt-6 max-w-xl text-lg text-ink-600">{t('sub')}</p>
      </Reveal>

      <div className="mt-16 grid gap-6 lg:grid-cols-3">
        {tiers.map((tier, i) => {
          const featured = tier.id === 'weekend'; // Highlight middle tier
          return (
            <Reveal
              key={tier.id}
              delay={i * 100}
              className={cn(featured && 'lg:-mt-4')}
            >
              <div
                className={cn(
                  'flex h-full flex-col rounded-lg p-8',
                  featured
                    ? 'border-2 border-forest-700 bg-cream-50'
                    : 'border border-forest-900/10 bg-cream-50/60',
                )}
              >
                {featured && (
                  <span className="mb-4 inline-block w-fit rounded-full bg-forest-700 px-3 py-1 text-xs font-medium uppercase tracking-wider text-cream-50">
                    {t('mostPopular')}
                  </span>
                )}
                <h3 className="font-display text-2xl text-forest-900">
                  {tier.name[locale]}
                </h3>
                <p className="mt-1 text-sm text-ink-600">{tier.period[locale]}</p>
                <p className="mt-1 text-xs text-wood-700">
                  {tier.minNightsLabel[locale]}
                </p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-display text-3xl text-forest-900 sm:text-4xl">
                    {formatRate(tier.rate, locale)}
                  </span>
                  <span className="text-sm text-ink-600">{t('perNight')}</span>
                </div>

                <div className="mt-8">
                  <p className="text-xs uppercase tracking-wider text-wood-700">
                    {t('includes')}
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-ink-700">
                    {includes.map((item) => (
                      <li key={item} className="flex gap-2">
                        <Check
                          size={16}
                          weight="bold"
                          className="mt-0.5 shrink-0 text-forest-700"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6">
                  <p className="text-xs uppercase tracking-wider text-ink-600">
                    {t('excludes')}
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-ink-600">
                    {excludes.map((item) => (
                      <li key={item}>— {item}</li>
                    ))}
                  </ul>
                </div>

                <CtaButton
                  href="#booking"
                  variant={featured ? 'primary' : 'secondary'}
                  className="mt-10 w-full"
                >
                  {t('bookCta')}
                </CtaButton>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
