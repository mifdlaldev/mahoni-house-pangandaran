'use client';

import { useTransition, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Section } from '@/components/shared/section';
import { Reveal } from '@/components/shared/reveal';
import { submitBooking } from '@/app/actions/booking';

export function BookingForm({ locale }: { locale: 'id' | 'en' }) {
  const t = useTranslations('booking');
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (formData: FormData) => {
    setError(null);
    startTransition(async () => {
      const result = await submitBooking(formData);
      if (!result.ok) {
        if (result.fieldErrors) {
          const first = Object.values(result.fieldErrors).flat()[0];
          setError(first ?? 'Form tidak valid');
        } else {
          setError(result.error);
        }
        return;
      }
      window.open(result.whatsappUrl, '_blank', 'noopener,noreferrer');
    });
  };

  return (
    <Section id="booking" className="bg-forest-900 text-cream-50">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.2em] text-cream-200/70">
          {t('eyebrow')}
        </p>
        <h2 className="mt-4 max-w-2xl font-display text-4xl leading-[1.1] tracking-tight text-cream-50 text-balance sm:text-5xl">
          {t('title')}
        </h2>
        <p className="mt-6 max-w-xl text-lg text-cream-200/80">{t('sub')}</p>
      </Reveal>

      <Reveal delay={120}>
        <form action={onSubmit} className="mt-12 grid max-w-3xl gap-6" noValidate>
          <input type="hidden" name="locale" value={locale} />
          <div className="grid gap-6 sm:grid-cols-2">
            <Field label={t('checkIn')} name="checkIn" type="date" required />
            <Field label={t('checkOut')} name="checkOut" type="date" required />
          </div>
          <Field label={t('guests')} name="guests" type="number" min={1} max={10} defaultValue={4} required />
          <div className="grid gap-6 sm:grid-cols-2">
            <Field label={t('name')} name="name" type="text" required />
            <Field label={t('email')} name="email" type="email" required />
          </div>
          <Field label={t('phone')} name="phone" type="tel" required />

          <div>
            <label htmlFor="requests" className="block text-sm font-medium text-cream-200/90">
              {t('requests')}
            </label>
            <textarea
              id="requests"
              name="requests"
              rows={4}
              className="mt-2 w-full rounded-md border border-cream-50/20 bg-forest-800/50 px-4 py-2.5 text-cream-50 placeholder:text-cream-200/40 focus:border-cream-50/50 focus:outline-none focus:ring-1 focus:ring-cream-50/30"
            />
          </div>

          <label className="flex items-start gap-3 text-sm text-cream-200/85">
            <input
              type="checkbox"
              name="agreement"
              required
              className="mt-1 h-4 w-4 rounded border-cream-50/30 bg-forest-800 text-forest-700 focus:ring-cream-50/30"
            />
            <span>
              {t('agreement')}{' '}
              <a href="#terms" className="text-cream-50 underline-offset-4 hover:underline">
                {t('terms')}
              </a>
            </span>
          </label>

          {error && (
            <p role="alert" className="rounded-md border border-red-400/40 bg-red-900/30 px-4 py-2.5 text-sm text-red-100">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="mt-2 inline-flex min-h-[52px] w-full items-center justify-center rounded-md bg-cream-50 px-6 py-3.5 text-base font-medium text-forest-900 transition-all hover:bg-cream-100 active:scale-[0.97] disabled:opacity-60 sm:w-auto"
          >
            {isPending ? t('sending') : t('submit')}
          </button>
        </form>
      </Reveal>
    </Section>
  );
}

function Field({
  label,
  name,
  type,
  min,
  max,
  defaultValue,
  required,
}: {
  label: string;
  name: string;
  type: string;
  min?: number;
  max?: number;
  defaultValue?: number;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-cream-200/90">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        min={min}
        max={max}
        defaultValue={defaultValue}
        required={required}
        className="mt-2 w-full rounded-md border border-cream-50/20 bg-forest-800/50 px-4 py-2.5 text-cream-50 placeholder:text-cream-200/40 focus:border-cream-50/50 focus:outline-none focus:ring-1 focus:ring-cream-50/30"
      />
    </div>
  );
}
