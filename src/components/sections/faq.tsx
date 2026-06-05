'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Plus, Minus } from '@phosphor-icons/react/dist/ssr';
import { Section } from '@/components/shared/section';
import { Reveal } from '@/components/shared/reveal';
import { getFaqs } from '@/data/faqs';
import type { Locale } from '@/i18n/routing';
import { cn } from '@/lib/utils';

export function FAQ() {
  const t = useTranslations('faq');
  const locale = useLocale() as Locale;
  const faqs = getFaqs();
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <Section id="faq" className="bg-cream-50">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.2em] text-wood-700">
          {t('eyebrow')}
        </p>
        <h2 className="mt-4 max-w-2xl font-display text-4xl leading-[1.1] tracking-tight text-forest-900 text-balance sm:text-5xl">
          {t('title')}
        </h2>
      </Reveal>

      <div className="mt-12 divide-y divide-forest-900/10 border-y border-forest-900/10">
        {faqs.map((faq, i) => {
          const isOpen = openId === faq.id;
          return (
            <Reveal key={faq.id} delay={i * 40}>
              <div>
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-lg text-forest-900 sm:text-xl">
                    {faq.q[locale]}
                  </span>
                  <span className="shrink-0 text-forest-700">
                    {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                  </span>
                </button>
                <div
                  className={cn(
                    'grid transition-all duration-300 ease-out',
                    isOpen
                      ? 'grid-rows-[1fr] opacity-100 pb-6'
                      : 'grid-rows-[0fr] opacity-0',
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-3xl text-base text-ink-600">{faq.a[locale]}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
