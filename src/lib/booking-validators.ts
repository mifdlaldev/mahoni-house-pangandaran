// Zod schemas for booking form validation with bilingual error messages.
import { z } from 'zod';

const todayISO = () => new Date().toISOString().split('T')[0] ?? '';

export type Locale = 'id' | 'en';

const MESSAGES: Record<Locale, Record<string, string>> = {
  id: {
    checkInRequired: 'Check-in wajib diisi',
    checkOutRequired: 'Check-out wajib diisi',
    guestsInvalidType: 'Jumlah tamu harus angka',
    guestsMin: 'Minimal 1 tamu',
    guestsMax: 'Maksimal 10 tamu',
    nameMin: 'Nama minimal 2 karakter',
    nameMax: 'Nama maksimal 100 karakter',
    emailInvalid: 'Format email tidak valid',
    phoneMin: 'No. WhatsApp tidak valid',
    phoneMax: 'No. WhatsApp terlalu panjang',
    phoneFormat: 'Hanya boleh angka, spasi, +, -',
    requestsMax: 'Permintaan maksimal 500 karakter',
    agreementRequired: 'Anda harus menyetujui syarat & ketentuan',
    checkInPast: 'Check-in tidak boleh di masa lalu',
    checkOutAfterCheckIn: 'Check-out harus setelah check-in',
  },
  en: {
    checkInRequired: 'Check-in is required',
    checkOutRequired: 'Check-out is required',
    guestsInvalidType: 'Number of guests must be a valid number',
    guestsMin: 'Minimum 1 guest',
    guestsMax: 'Maximum 10 guests',
    nameMin: 'Name must be at least 2 characters',
    nameMax: 'Name must not exceed 100 characters',
    emailInvalid: 'Invalid email format',
    phoneMin: 'Invalid WhatsApp number',
    phoneMax: 'WhatsApp number too long',
    phoneFormat: 'Only numbers, spaces, +, and - allowed',
    requestsMax: 'Special requests must not exceed 500 characters',
    agreementRequired: 'You must agree to the terms & conditions',
    checkInPast: 'Check-in cannot be in the past',
    checkOutAfterCheckIn: 'Check-out must be after check-in',
  },
};

export function getBookingSchema(locale: Locale) {
  const m = MESSAGES[locale];
  return z
    .object({
      checkIn: z.string().min(1, m.checkInRequired),
      checkOut: z.string().min(1, m.checkOutRequired),
      guests: z
        .number({ invalid_type_error: m.guestsInvalidType })
        .int()
        .min(1, m.guestsMin)
        .max(10, m.guestsMax),
      name: z.string().min(2, m.nameMin).max(100, m.nameMax),
      email: z.string().email(m.emailInvalid),
      phone: z
        .string()
        .min(8, m.phoneMin)
        .max(20, m.phoneMax)
        .regex(/^[\d+\s-]+$/, m.phoneFormat),
      requests: z.string().max(500, m.requestsMax).optional().default(''),
      agreement: z
        .union([z.literal('on'), z.literal('true'), z.boolean()])
        .refine((v) => v === true || v === 'on' || v === 'true', {
          message: m.agreementRequired,
        }),
    })
    .refine((data) => data.checkIn >= todayISO(), {
      message: m.checkInPast,
      path: ['checkIn'],
    })
    .refine((data) => data.checkOut > data.checkIn, {
      message: m.checkOutAfterCheckIn,
      path: ['checkOut'],
    });
}

export type BookingInput = z.infer<ReturnType<typeof getBookingSchema>>;
