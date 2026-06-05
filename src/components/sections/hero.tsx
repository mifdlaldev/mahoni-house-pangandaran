'use client';

import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/shared/reveal';
import { CtaButton } from '@/components/shared/cta-button';

export function Hero() {
  const t = useTranslations('hero');
  return (
    <section className="relative min-h-dvh overflow-hidden bg-forest-900 text-cream-50">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/hero-bg.jpg)' }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-forest-900/50 via-forest-900/20 to-forest-900/80" aria-hidden="true" />

      <div className="relative mx-auto flex min-h-dvh max-w-7xl flex-col items-start justify-end px-6 pb-16 pt-32 sm:px-8 lg:px-12 lg:pb-24">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-cream-200/80">
            {t('eyebrow')}
          </p>
        </Reveal>
        <Reveal delay={120}>
          <h1 className="mt-4 max-w-3xl font-display text-5xl leading-[1.05] tracking-tight text-cream-50 text-balance sm:text-6xl lg:text-7xl">
            {t('title')}
          </h1>
        </Reveal>
        <Reveal delay={240}>
          <p className="mt-6 max-w-xl font-display text-xl italic text-cream-100 sm:text-2xl">
            {t('tagline')}
          </p>
        </Reveal>
        <Reveal delay={360}>
          <p className="mt-4 max-w-lg font-body text-base text-cream-200/80 sm:text-lg">
            {t('sub')}
          </p>
        </Reveal>
        <Reveal delay={480}>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <CtaButton href="#booking" variant="primary" size="lg" withArrow>
              {t('primaryCta')}
            </CtaButton>
            <a
              href="#story"
              className="inline-flex items-center justify-center rounded-md px-5 py-3.5 text-base font-medium text-cream-50/90 transition-colors hover:text-cream-50"
            >
              {t('secondaryCta')}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
