'use client';

import { useFormStatus } from 'react-dom';
import { useTranslations } from 'next-intl';
import { Section } from '@/components/shared/section';
import { Reveal } from '@/components/shared/reveal';
import { submitBooking } from '@/app/actions/booking';

export function BookingForm() {
  const t = useTranslations('booking');

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
        <form action={submitBooking} className="mt-12 grid max-w-3xl gap-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <Field label={t('checkIn')} name="checkIn" type="date" required />
            <Field label={t('checkOut')} name="checkOut" type="date" required />
          </div>
          <Field
            label={t('guests')}
            name="guests"
            type="number"
            min={1}
            max={10}
            defaultValue={4}
            required
          />
          <div className="grid gap-6 sm:grid-cols-2">
            <Field label={t('name')} name="name" type="text" required />
            <Field label={t('email')} name="email" type="email" required />
          </div>
          <Field label={t('phone')} name="phone" type="tel" required />

          <div>
            <label
              htmlFor="requests"
              className="block text-sm font-medium text-cream-200/90"
            >
              {t('requests')}
            </label>
            <textarea
              id="requests"
              name="requests"
              rows={4}
              className="mt-2 w-full rounded-md border border-cream-50/20 bg-forest-700/40 px-4 py-2.5 text-cream-50 placeholder:text-cream-200/40 focus:border-cream-50/50 focus:outline-none focus:ring-1 focus:ring-cream-50/30"
            />
          </div>

          <label className="flex items-start gap-3 text-sm text-cream-200/85">
            <input
              type="checkbox"
              name="agreement"
              required
              className="mt-1 h-4 w-4 rounded border-cream-50/30 bg-forest-700 text-forest-700 focus:ring-cream-50/30"
            />
            <span>
              {t('agreement')}{' '}
              <a
                href="#terms"
                className="text-cream-50 underline-offset-4 hover:underline"
              >
                {t('terms')}
              </a>
            </span>
          </label>

          <SubmitButton />
        </form>
      </Reveal>
    </Section>
  );
}

type FieldProps = {
  label: string;
  name: string;
  type: 'text' | 'email' | 'tel' | 'date' | 'number';
  min?: number;
  max?: number;
  defaultValue?: number;
  required?: boolean;
};

function Field({ label, name, type, min, max, defaultValue, required }: FieldProps) {
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
        className="mt-2 w-full rounded-md border border-cream-50/20 bg-forest-700/40 px-4 py-2.5 text-cream-50 placeholder:text-cream-200/40 focus:border-cream-50/50 focus:outline-none focus:ring-1 focus:ring-cream-50/30"
      />
    </div>
  );
}

function SubmitButton() {
  const t = useTranslations('booking');
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-2 inline-flex min-h-[52px] w-full items-center justify-center rounded-md bg-cream-50 px-6 py-3.5 text-base font-medium text-forest-900 transition-all hover:bg-cream-100 active:scale-[0.97] disabled:opacity-60 sm:w-auto"
    >
      {pending ? t('sending') : t('submit')}
    </button>
  );
}
