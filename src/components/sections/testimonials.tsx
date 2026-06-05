'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Star } from '@phosphor-icons/react/dist/ssr';
import { Section } from '@/components/shared/section';
import { Reveal } from '@/components/shared/reveal';
import { testimonials } from '@/data/testimonials';
import type { Locale } from '@/i18n/routing';
import { cn } from '@/lib/utils';

export function getTestimonials() {
  return testimonials;
}

function formatDate(iso: string, locale: Locale): string {
  try {
    const date = new Date(iso);
    return new Intl.DateTimeFormat(locale === 'id' ? 'id-ID' : 'en-US', {
      year: 'numeric',
      month: 'short',
    }).format(date);
  } catch {
    return iso;
  }
}

export function Testimonials() {
  const t = useTranslations('testimonials');
  const locale = useLocale() as Locale;
  const reviews = testimonials;

  return (
    <Section id="testimonials" className="bg-cream-50">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.2em] text-wood-700">
          {t('eyebrow')}
        </p>
        <h2 className="mt-4 max-w-2xl font-display text-4xl leading-[1.1] tracking-tight text-forest-900 text-balance sm:text-5xl">
          {t('title')}
        </h2>
      </Reveal>

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {reviews.map((review, i) => (
          <Reveal key={review.id} delay={i * 80}>
            <figure className="flex h-full flex-col rounded-lg border border-forest-900/10 bg-cream-100/40 p-8">
              <div
                className="flex gap-0.5"
                aria-label={`${review.rating} ${locale === 'id' ? 'dari 5 bintang' : 'out of 5 stars'}`}
              >
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star
                    key={idx}
                    size={16}
                    weight={idx < review.rating ? 'fill' : 'regular'}
                    className={cn(
                      idx < review.rating ? 'text-wood-700' : 'text-ink-400',
                    )}
                  />
                ))}
              </div>
              <blockquote className="mt-6 flex-1 font-display text-xl italic leading-relaxed text-forest-900">
                &ldquo;{review.quote[locale]}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-forest-900/10 pt-4">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-forest-700 text-sm font-medium text-cream-50"
                  aria-hidden="true"
                >
                  {review.avatarInitials}
                </div>
                <div>
                  <p className="font-medium text-forest-900">{review.name}</p>
                  <p className="text-sm text-ink-600">
                    {review.location} · {formatDate(review.date, locale)}
                  </p>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>

      <Reveal delay={200}>
        <p className="mt-12 text-center text-sm italic text-ink-600">
          {t('disclaimer')}
        </p>
      </Reveal>
    </Section>
  );
}
