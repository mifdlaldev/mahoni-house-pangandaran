'use server';

import { headers } from 'next/headers';
import { getBookingSchema } from '@/lib/booking-validators';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { sendBookingEmail } from '@/lib/email';

type ActionResult =
  | { ok: true; whatsappUrl: string }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> };

const OWNER_PHONE = process.env.OWNER_WHATSAPP ?? '6281234567890';

/** Strip HTML tags from user-provided text to prevent XSS */
function sanitize(value: string): string {
  return value.replace(/<[^>]*>/g, '').trim();
}

/** In-memory rate limiter: max N submissions per IP per window */
const rateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 60_000;

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(key);
  if (!entry || now > entry.resetAt) {
    rateMap.set(key, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

export async function submitBooking(formData: FormData): Promise<ActionResult> {
  // 1. Honeypot — if a hidden field meant for bots is filled, reject silently
  const hp = formData.get('website')?.toString() ?? '';
  if (hp) {
    // Pretend success to not tip off bots
    return { ok: true, whatsappUrl: 'https://wa.me/' };
  }

  // 2. Timestamp check — reject submissions faster than 3 seconds (bots)
  const ts = Number(formData.get('_ts') ?? '0');
  if (!ts || Date.now() - ts < 3000) {
    return { ok: false, error: 'Terlalu cepat. Silakan isi form dengan benar.' };
  }

  // 3. Rate limiting by IP (via x-forwarded-for header)
  const headersList = await headers();
  const ip = headersList.get('x-forwarded-for')?.split(',')[0]?.trim()
    ?? headersList.get('x-real-ip')
    ?? 'unknown';
  if (!checkRateLimit(ip)) {
    return { ok: false, error: 'Terlalu banyak permintaan. Coba lagi nanti.' };
  }

  // 4. Detect locale from hidden form field
  const localeRaw = (formData.get('locale')?.toString() ?? 'id') as string;
  const locale: 'id' | 'en' = localeRaw === 'en' ? 'en' : 'id';

  // 5. Parse FormData → plain object
  const raw = {
    checkIn: sanitize(formData.get('checkIn')?.toString() ?? ''),
    checkOut: sanitize(formData.get('checkOut')?.toString() ?? ''),
    guests: Number(formData.get('guests') ?? 0),
    name: sanitize(formData.get('name')?.toString() ?? ''),
    email: sanitize(formData.get('email')?.toString() ?? ''),
    phone: sanitize(formData.get('phone')?.toString() ?? ''),
    requests: sanitize(formData.get('requests')?.toString() ?? ''),
    agreement: formData.get('agreement')?.toString() ?? '',
  };

  // 6. Validate with Zod (locale-aware messages)
  const bookingSchema = getBookingSchema(locale);
  const result = bookingSchema.safeParse(raw);
  if (!result.success) {
    return {
      ok: false,
      error: 'Validation failed',
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }

  const booking = result.data;

  const whatsappUrl = buildWhatsAppLink(booking, OWNER_PHONE, locale);

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
