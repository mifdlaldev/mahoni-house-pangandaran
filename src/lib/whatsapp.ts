// WhatsApp deep-link generator for booking form submissions.
// Builds a formatted message, encodes it as a wa.me URL.
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
