'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Section } from '@/components/shared/section';
import { Reveal } from '@/components/shared/reveal';
import { getGallery } from '@/data/gallery';
import type { Locale } from '@/i18n/routing';
import { cn } from '@/lib/utils';

const GRADIENTS = [
  'from-forest-700 via-forest-500 to-wood-500',
  'from-wood-700 via-wood-500 to-cream-200',
  'from-forest-900 via-forest-700 to-wood-700',
  'from-wood-500 via-cream-200 to-wood-700',
  'from-forest-500 via-forest-700 to-forest-900',
  'from-cream-200 via-wood-500 to-wood-700',
  'from-wood-700 via-forest-700 to-forest-900',
  'from-forest-700 via-wood-500 to-wood-700',
];

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
                GRADIENTS[i % GRADIENTS.length],
              )}
              role="img"
              aria-label={img.alt[locale]}
            />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
