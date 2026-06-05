# Phase 5: Form Integration

> Wire up the booking form with TDD: validators, WhatsApp message generator, Server Action with Zod validation and email backup.

> ⚠️ **COMMIT POLICY**: The `git commit` blocks in this plan are **templates** showing the intent of each commit. Per AGENTS.md ("No commit without explicit user request"), the executing agent MUST pause and ask the user before running any `git commit`. Do not commit autonomously.

---

## Task 5.1: Format Utilities (TDD)

**Files:**
- Create: `src/lib/__tests__/format.test.ts`
- Create: `src/lib/format.ts`

- [ ] **Step 1: Write failing tests**

```typescript
// src/lib/__tests__/format.test.ts
import { describe, it, expect } from 'vitest';
import { formatIDR, formatDate, formatPhoneID } from '../format';

describe('formatIDR', () => {
  it('formats 3500000 to Rp 3.500.000', () => {
    expect(formatIDR(3500000)).toBe('Rp 3.500.000');
  });
  it('formats 0 to Rp 0', () => {
    expect(formatIDR(0)).toBe('Rp 0');
  });
  it('handles large values', () => {
    expect(formatIDR(10_500_000)).toBe('Rp 10.500.000');
  });
});

describe('formatDate', () => {
  it('formats 2026-07-15 to localized short date', () => {
    expect(formatDate('2026-07-15', 'id')).toBe('15 Jul 2026');
    expect(formatDate('2026-07-15', 'en')).toBe('Jul 15, 2026');
  });
});

describe('formatPhoneID', () => {
  it('normalizes 081234567890 to 6281234567890', () => {
    expect(formatPhoneID('081234567890')).toBe('6281234567890');
  });
  it('keeps 62 prefix intact', () => {
    expect(formatPhoneID('6281234567890')).toBe('6281234567890');
  });
  it('strips non-digits', () => {
    expect(formatPhoneID('+62 812-3456-7890')).toBe('6281234567890');
  });
});
```

- [ ] **Step 2: Run tests (should fail)**

```bash
pnpm test src/lib/__tests__/format.test.ts
```

Expected: FAIL (module not found).

- [ ] **Step 3: Implement format.ts**

```typescript
// src/lib/format.ts

export function formatIDR(value: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(value)
    .replace('Rp\u00a0', 'Rp ');
}

export function formatDate(
  isoDate: string,
  locale: 'id' | 'en',
): string {
  return new Intl.DateTimeFormat(locale === 'id' ? 'id-ID' : 'en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(isoDate));
}

export function formatPhoneID(input: string): string {
  const digits = input.replace(/\D/g, '');
  if (digits.startsWith('62')) return digits;
  if (digits.startsWith('0')) return `62${digits.slice(1)}`;
  return digits;
}
```

- [ ] **Step 4: Run tests (should pass)**

```bash
pnpm test src/lib/__tests__/format.test.ts
```

Expected: PASS — 7 tests.

- [ ] **Step 5: Commit**

```bash
git add src/lib/format.ts src/lib/__tests__/format.test.ts
git commit -m "test: add format utilities with TDD (IDR, date, phone)"
```

---

## Task 5.2: Booking Validators (TDD)

**Files:**
- Create: `src/lib/__tests__/booking-validators.test.ts`
- Create: `src/lib/booking-validators.ts`

- [ ] **Step 1: Write failing tests**

```typescript
// src/lib/__tests__/booking-validators.test.ts
import { describe, it, expect } from 'vitest';
import { bookingSchema } from '../booking-validators';

describe('bookingSchema', () => {
  const validInput = {
    checkIn: '2026-08-01',
    checkOut: '2026-08-04',
    guests: 6,
    name: 'Ibu Wati',
    email: 'wati@example.com',
    phone: '081234567890',
    requests: 'Mohon extra bed untuk anak.',
    agreement: 'on',
  };

  it('accepts a valid input', () => {
    const result = bookingSchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  it('rejects checkOut before checkIn', () => {
    const result = bookingSchema.safeParse({
      ...validInput,
      checkIn: '2026-08-04',
      checkOut: '2026-08-01',
    });
    expect(result.success).toBe(false);
  });

  it('rejects guests > 10', () => {
    const result = bookingSchema.safeParse({ ...validInput, guests: 12 });
    expect(result.success).toBe(false);
  });

  it('rejects guests < 1', () => {
    const result = bookingSchema.safeParse({ ...validInput, guests: 0 });
    expect(result.success).toBe(false);
  });

  it('rejects invalid email', () => {
    const result = bookingSchema.safeParse({
      ...validInput,
      email: 'not-an-email',
    });
    expect(result.success).toBe(false);
  });

  it('rejects empty name', () => {
    const result = bookingSchema.safeParse({ ...validInput, name: '' });
    expect(result.success).toBe(false);
  });

  it('rejects missing agreement', () => {
    const result = bookingSchema.safeParse({
      ...validInput,
      agreement: undefined,
    });
    expect(result.success).toBe(false);
  });

  it('rejects past checkIn', () => {
    const result = bookingSchema.safeParse({
      ...validInput,
      checkIn: '2020-01-01',
      checkOut: '2020-01-04',
    });
    expect(result.success).toBe(false);
  });

  it('allows empty requests (optional)', () => {
    const result = bookingSchema.safeParse({ ...validInput, requests: '' });
    expect(result.success).toBe(true);
  });
});
```

- [ ] **Step 2: Run tests (should fail)**

```bash
pnpm test src/lib/__tests__/booking-validators.test.ts
```

Expected: FAIL.

- [ ] **Step 3: Implement booking-validators.ts**

```typescript
// src/lib/booking-validators.ts
import { z } from 'zod';

const todayISO = () => new Date().toISOString().split('T')[0];

export const bookingSchema = z
  .object({
    checkIn: z
      .string()
      .min(1, 'Check-in wajib diisi')
      .refine((v) => v >= todayISO(), 'Check-in tidak boleh di masa lalu'),
    checkOut: z
      .string()
      .min(1, 'Check-out wajib diisi'),
    guests: z
      .number({ invalid_type_error: 'Jumlah tamu harus angka' })
      .int()
      .min(1, 'Minimal 1 tamu')
      .max(10, 'Maksimal 10 tamu'),
    name: z
      .string()
      .min(2, 'Nama minimal 2 karakter')
      .max(100, 'Nama maksimal 100 karakter'),
    email: z
      .string()
      .email('Format email tidak valid'),
    phone: z
      .string()
      .min(8, 'No. WhatsApp tidak valid')
      .max(20, 'No. WhatsApp terlalu panjang')
      .regex(/^[\d+\s-]+$/, 'Hanya boleh angka, spasi, +, -'),
    requests: z
      .string()
      .max(500, 'Permintaan maksimal 500 karakter')
      .optional()
      .default(''),
    agreement: z
      .union([z.literal('on'), z.literal('true'), z.boolean()])
      .refine((v) => v === true || v === 'on' || v === 'true', {
        message: 'Anda harus menyetujui syarat & ketentuan',
      }),
  })
  .refine((data) => data.checkOut > data.checkIn, {
    message: 'Check-out harus setelah check-in',
    path: ['checkOut'],
  });

export type BookingInput = z.infer<typeof bookingSchema>;
```

- [ ] **Step 4: Run tests (should pass)**

```bash
pnpm test src/lib/__tests__/booking-validators.test.ts
```

Expected: PASS — 9 tests.

- [ ] **Step 5: Commit**

```bash
git add src/lib/booking-validators.ts src/lib/__tests__/booking-validators.test.ts
git commit -m "test: add booking form validators with Zod (TDD)"
```

---

## Task 5.3: WhatsApp Message Generator (TDD)

**Files:**
- Create: `src/lib/__tests__/whatsapp.test.ts`
- Create: `src/lib/whatsapp.ts`

- [ ] **Step 1: Write failing tests**

```typescript
// src/lib/__tests__/whatsapp.test.ts
import { describe, it, expect } from 'vitest';
import { buildWhatsAppLink, buildWhatsAppMessage } from '../whatsapp';

const ownerNumber = '6281234567890';

const validBooking = {
  checkIn: '2026-08-01',
  checkOut: '2026-08-04',
  guests: 6,
  name: 'Ibu Wati',
  email: 'wati@example.com',
  phone: '081234567890',
  requests: 'Mohon extra bed untuk anak.',
};

describe('buildWhatsAppMessage', () => {
  it('contains all key fields in ID locale', () => {
    const msg = buildWhatsAppMessage(validBooking, 'id');
    expect(msg).toContain('Halo, saya ingin cek ketersediaan');
    expect(msg).toContain('Ibu Wati');
    expect(msg).toContain('wati@example.com');
    expect(msg).toContain('081234567890');
    expect(msg).toContain('1 → 4 Agustus 2026');
    expect(msg).toContain('6 tamu');
    expect(msg).toContain('extra bed');
  });

  it('switches to EN locale', () => {
    const msg = buildWhatsAppMessage(validBooking, 'en');
    expect(msg).toContain("Hello, I'd like to check availability");
    expect(msg).toContain('Aug 1 → Aug 4, 2026');
    expect(msg).toContain('6 guests');
  });

  it('handles empty requests gracefully', () => {
    const msg = buildWhatsAppMessage({ ...validBooking, requests: '' }, 'id');
    expect(msg).toContain('—');
  });
});

describe('buildWhatsAppLink', () => {
  it('returns wa.me deep link', () => {
    const link = buildWhatsAppLink(validBooking, ownerNumber, 'id');
    expect(link).toMatch(/^https:\/\/wa\.me\/6281234567890\?text=/);
    const url = new URL(link);
    const decoded = decodeURIComponent(url.searchParams.get('text') ?? '');
    expect(decoded).toContain('Ibu Wati');
  });
});
```

- [ ] **Step 2: Run tests (should fail)**

```bash
pnpm test src/lib/__tests__/whatsapp.test.ts
```

Expected: FAIL.

- [ ] **Step 3: Implement whatsapp.ts**

```typescript
// src/lib/whatsapp.ts
import { formatDate } from './format';
import type { BookingInput } from './booking-validators';

export type Locale = 'id' | 'en';

const STRINGS = {
  id: {
    greeting: 'Halo, saya ingin cek ketersediaan untuk Mahoni House:',
    name: 'Nama',
    email: 'Email',
    phone: 'No. WhatsApp',
    stay: 'Menginap',
    guests: 'Jumlah tamu',
    requests: 'Permintaan khusus',
    dash: '—',
  },
  en: {
    greeting: "Hello, I'd like to check availability for Mahoni House:",
    name: 'Name',
    email: 'Email',
    phone: 'WhatsApp',
    stay: 'Stay',
    guests: 'Guests',
    requests: 'Special requests',
    dash: '—',
  },
} as const;

export function buildWhatsAppMessage(
  booking: Omit<BookingInput, 'agreement'>,
  locale: Locale,
): string {
  const s = STRINGS[locale];
  const stay =
    locale === 'id'
      ? `${formatDate(booking.checkIn, 'id')} → ${formatDate(booking.checkOut, 'id')}`
      : `${formatDate(booking.checkIn, 'en')} → ${formatDate(booking.checkOut, 'en')}`;

  return [
    s.greeting,
    '',
    `${s.name}: ${booking.name}`,
    `${s.email}: ${booking.email}`,
    `${s.phone}: ${booking.phone}`,
    `${s.stay}: ${stay}`,
    `${s.guests}: ${booking.guests}`,
    `${s.requests}: ${booking.requests || s.dash}`,
    '',
    '— Dikirim dari mahonihouse.id',
  ].join('\n');
}

export function buildWhatsAppLink(
  booking: Omit<BookingInput, 'agreement'>,
  ownerPhone: string,
  locale: Locale,
): string {
  const message = buildWhatsAppMessage(booking, locale);
  return `https://wa.me/${ownerPhone}?text=${encodeURIComponent(message)}`;
}
```

- [ ] **Step 4: Run tests (should pass)**

```bash
pnpm test src/lib/__tests__/whatsapp.test.ts
```

Expected: PASS — 4 tests.

- [ ] **Step 5: Commit**

```bash
git add src/lib/whatsapp.ts src/lib/__tests__/whatsapp.test.ts
git commit -m "test: add WhatsApp message + link generator (TDD)"
```

---

## Task 5.4: Server Action with Validation + Email Backup

**Files:**
- Modify: `src/app/actions/booking.ts`
- Create: `src/lib/email.ts`

- [ ] **Step 1: Add env var template**

```bash
cat >> .env.example <<'EOF'

# Resend (email backup for booking form)
RESEND_API_KEY=re_xxx_placeholder
OWNER_EMAIL=owner@example.com
OWNER_WHATSAPP=6281234567890
EOF
```

- [ ] **Step 2: Create email.ts (Resend client wrapper)**

```typescript
// src/lib/email.ts
import { Resend } from 'resend';

const apiKey = process.env.RESEND_API_KEY;
const ownerEmail = process.env.OWNER_EMAIL;

type SendArgs = {
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  requests: string;
  locale: 'id' | 'en';
};

export async function sendBookingEmail(args: SendArgs): Promise<{ sent: boolean; reason?: string }> {
  if (!apiKey || !ownerEmail) {
    return { sent: false, reason: 'Email service not configured' };
  }

  try {
    const resend = new Resend(apiKey);
    const subject =
      args.locale === 'id'
        ? `Booking baru dari ${args.guestName}`
        : `New booking from ${args.guestName}`;

    await resend.emails.send({
      from: 'Mahoni House <bookings@mahonihouse.id>',
      to: ownerEmail,
      replyTo: args.guestEmail,
      subject,
      text: [
        `Name: ${args.guestName}`,
        `Email: ${args.guestEmail}`,
        `Phone: ${args.guestPhone}`,
        `Stay: ${args.checkIn} → ${args.checkOut}`,
        `Guests: ${args.guests}`,
        `Requests: ${args.requests || '—'}`,
      ].join('\n'),
    });
    return { sent: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return { sent: false, reason: message };
  }
}
```

- [ ] **Step 3: Replace the booking stub with real Server Action**

```typescript
// src/app/actions/booking.ts
'use server';

import { headers } from 'next/headers';
import { bookingSchema } from '@/lib/booking-validators';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { sendBookingEmail } from '@/lib/email';

type ActionResult =
  | { ok: true; whatsappUrl: string }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> };

const OWNER_PHONE = process.env.OWNER_WHATSAPP ?? '6281234567890';

export async function submitBooking(
  formData: FormData,
): Promise<ActionResult> {
  // 1. Parse FormData → plain object
  const raw = {
    checkIn: formData.get('checkIn')?.toString() ?? '',
    checkOut: formData.get('checkOut')?.toString() ?? '',
    guests: Number(formData.get('guests') ?? 0),
    name: formData.get('name')?.toString() ?? '',
    email: formData.get('email')?.toString() ?? '',
    phone: formData.get('phone')?.toString() ?? '',
    requests: formData.get('requests')?.toString() ?? '',
    agreement: formData.get('agreement')?.toString() ?? '',
  };

  // 2. Validate
  const result = bookingSchema.safeParse(raw);
  if (!result.success) {
    return {
      ok: false,
      error: 'Validation failed',
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }

  const booking = result.data;

  // 3. Detect locale from hidden form field (sent by BookingForm client component)
  //    More reliable than Referer header (browsers can strip it for privacy).
  const localeRaw = (formData.get('locale')?.toString() ?? 'id') as string;
  const locale: 'id' | 'en' = localeRaw === 'en' ? 'en' : 'id';

  // 4. Generate WhatsApp link
  const { agreement, ...payload } = booking;
  const whatsappUrl = buildWhatsAppLink(payload, OWNER_PHONE, locale);

  // 5. Send email backup (non-blocking — don't fail the form on email error)
  await sendBookingEmail({
    guestName: booking.name,
    guestEmail: booking.email,
    guestPhone: booking.phone,
    checkIn: booking.checkIn,
    checkOut: booking.checkOut,
    guests: booking.guests,
    requests: booking.requests,
    locale,
  });

  return { ok: true, whatsappUrl };
}
```

- [ ] **Step 4: Run typecheck**

```bash
pnpm typecheck
```

Expected: passes. If Resend types complain, install:

```bash
pnpm add resend
```

- [ ] **Step 5: Commit**

```bash
git add src/app/actions/booking.ts src/lib/email.ts .env.example
git commit -m "feat: add booking Server Action with Zod validation + email backup"
```

---

## Task 5.5: Wire Form to Action with Client-Side Handling

**Files:**
- Modify: `src/components/sections/booking-form.tsx`

- [ ] **Step 1: Update BookingForm to use the action result**

```typescript
// src/components/sections/booking-form.tsx (REPLACE WHOLE FILE)
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
      // Open WhatsApp in new tab
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
```

- [ ] **Step 2: Run typecheck + build**

```bash
pnpm typecheck
pnpm build
```

Expected: both pass.

- [ ] **Step 3: Manual test**

```bash
pnpm dev
```

1. Open http://localhost:3000
2. Scroll to booking form
3. Fill all fields, check agreement
4. Click submit
5. Expected: a new tab opens with `https://wa.me/6281234567890?text=...` containing the formatted message

- [ ] **Step 4: Test validation**

1. Try submitting empty form → error message appears
2. Try checkOut before checkIn → "Check-out harus setelah check-in"
3. Try guests = 20 → "Maksimal 10 tamu"
4. Try invalid email → "Format email tidak valid"

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/booking-form.tsx
git commit -m "feat: wire booking form to Server Action with client-side handling"
```

---

## Task 5.6: Phase 5 Verification

- [ ] **Step 1: Run all tests**

```bash
pnpm test
```

Expected: all 20 tests pass (7 format + 9 validators + 4 whatsapp).

- [ ] **Step 2: Run all checks**

```bash
pnpm typecheck
pnpm lint
pnpm build
```

Expected: all exit 0.

- [ ] **Step 3: End-to-end smoke test**

```bash
pnpm dev
```

1. Visit `/` → fill booking form → submit → WhatsApp opens with formatted message
2. Visit `/en` → fill form → submit → WhatsApp opens with English message
3. Validation errors render correctly
4. Email backup logs "Email service not configured" (since RESEND_API_KEY not set) — that's expected, not a failure

- [ ] **Step 4: Document Phase 5 complete**

Note: "Phase 5 complete: form wired with TDD, validation, WhatsApp deep link, email backup stub. 20 tests pass."

---

**Proceed to: `2026-06-05-villa-pangandaran-landing-06-polish-deploy.md`**
