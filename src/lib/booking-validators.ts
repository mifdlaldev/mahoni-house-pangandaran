// Zod schemas for booking form validation.
// Handles check-in/out order, guest limits, phone format, email, and agreement requirement.
import { z } from 'zod';

const todayISO = () => new Date().toISOString().split('T')[0] ?? '';

export const bookingSchema = z
  .object({
    checkIn: z
      .string()
      .min(1, 'Check-in wajib diisi'),
    checkOut: z.string().min(1, 'Check-out wajib diisi'),
    guests: z
      .number({ invalid_type_error: 'Jumlah tamu harus angka' })
      .int()
      .min(1, 'Minimal 1 tamu')
      .max(10, 'Maksimal 10 tamu'),
    name: z.string().min(2, 'Nama minimal 2 karakter').max(100, 'Nama maksimal 100 karakter'),
    email: z.string().email('Format email tidak valid'),
    phone: z
      .string()
      .min(8, 'No. WhatsApp tidak valid')
      .max(20, 'No. WhatsApp terlalu panjang')
      .regex(/^[\d+\s-]+$/, 'Hanya boleh angka, spasi, +, -'),
    requests: z.string().max(500, 'Permintaan maksimal 500 karakter').optional().default(''),
    agreement: z
      .union([z.literal('on'), z.literal('true'), z.boolean()])
      .refine((v) => v === true || v === 'on' || v === 'true', {
        message: 'Anda harus menyetujui syarat & ketentuan',
      }),
  })
  .refine(
    (data) => data.checkIn >= todayISO(),
    { message: 'Check-in tidak boleh di masa lalu', path: ['checkIn'] },
  )
  .refine((data) => data.checkOut > data.checkIn, {
    message: 'Check-out harus setelah check-in',
    path: ['checkOut'],
  });

export type BookingInput = z.infer<typeof bookingSchema>;
