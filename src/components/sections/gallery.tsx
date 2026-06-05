'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Section } from '@/components/shared/section';
import { Reveal } from '@/components/shared/reveal';
import { getGallery } from '@/data/gallery';
import type { Locale } from '@/i18n/routing';
import { cn } from '@/lib/utils';

const GRADIENT_FALLBACK = 'from-forest-700 via-forest-500 to-wood-500';

export function Gallery() {
  const t = useTranslations('gallery');
  const locale = useLocale() as Locale;
  const images = getGallery();

  return (
    <Section id="gallery" className="bg-cream-100">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.2em] text-wood-700">
          {t('eyebrow')}
        </p>
        <h2 className="mt-4 max-w-2xl font-display text-4xl leading-[1.1] tracking-tight text-forest-900 text-balance sm:text-5xl">
          {t('title')}
        </h2>
      </Reveal>

      <div className="mt-16 grid grid-cols-2 gap-4 lg:grid-cols-3">
        {images.map((img, i) => (
          <Reveal
            key={img.id}
            delay={i * 50}
            className={cn(i === 0 && 'col-span-2 row-span-2')}
          >
            <div
              className={cn(
                'aspect-square w-full overflow-hidden rounded-lg bg-gradient-to-br',
                GRADIENT_FALLBACK,
              )}
            >
              <img
                src={img.url}
                alt={img.alt[locale]}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
