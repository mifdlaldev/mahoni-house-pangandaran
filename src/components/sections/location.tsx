'use client';

import dynamic from 'next/dynamic';
import { useLocale, useTranslations } from 'next-intl';
import { Section } from '@/components/shared/section';
import { Reveal } from '@/components/shared/reveal';
import { getLocation } from '@/data/location';
import type { Locale } from '@/i18n/routing';

const Map = dynamic(() => import('@/components/shared/map').then((m) => m.Map), {
  ssr: false,
  loading: () => (
    <div className="aspect-[4/3] w-full animate-pulse rounded-lg bg-wood-100" />
  ),
});

export function Location() {
  const t = useTranslations('location');
  const locale = useLocale() as Locale;
  const loc = getLocation();

  // Normalize whatsapp number for wa.me (remove leading +)
  const waDigits = loc.whatsappNumber.replace(/^\+/, '');
  const waMessage =
    locale === 'id'
      ? 'Halo, saya butuh arah ke Mahoni House'
      : 'Hi, I need directions to Mahoni House';
  const waHref = `https://wa.me/${waDigits}?text=${encodeURIComponent(waMessage)}`;

  return (
    <Section id="location" className="bg-cream-100">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.2em] text-wood-700">
          {t('eyebrow')}
        </p>
        <h2 className="mt-4 max-w-2xl font-display text-4xl leading-[1.1] tracking-tight text-forest-900 text-balance sm:text-5xl">
          {t('title')}
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-10 lg:grid-cols-5">
        <Reveal className="lg:col-span-3">
          <Map lat={loc.lat} lng={loc.lng} label={loc.label[locale]} />
        </Reveal>
        <Reveal className="lg:col-span-2" delay={120}>
          <div>
            <h3 className="font-display text-2xl text-forest-900">{t('howToGet')}</h3>
            <p className="mt-4 text-base text-ink-600">{loc.directions[locale]}</p>
            <h3 className="mt-10 font-display text-2xl text-forest-900">
              {t('landmarks')}
            </h3>
            <ul className="mt-4 space-y-3 text-base text-ink-600">
              {loc.landmarks.map((l) => (
                <li
                  key={l.id}
                  className="flex justify-between border-b border-forest-900/10 pb-2"
                >
                  <span>{l.name[locale]}</span>
                  <span className="text-wood-700">{l.distance}</span>
                </li>
              ))}
            </ul>
            <div className="sm:flex sm:justify-end">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 flex min-h-[44px] w-full items-center justify-center gap-2 rounded-md bg-forest-700 px-5 py-2.5 text-sm font-medium text-cream-50 transition-colors hover:bg-forest-900 active:scale-[0.97] sm:inline-flex sm:w-auto"
              >
                {t('directionsCta')}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
