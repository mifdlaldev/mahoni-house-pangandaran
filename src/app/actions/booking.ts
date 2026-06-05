'use server';

import { bookingSchema } from '@/lib/booking-validators';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { sendBookingEmail } from '@/lib/email';

type ActionResult =
  | { ok: true; whatsappUrl: string }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> };

const OWNER_PHONE = process.env.OWNER_WHATSAPP ?? '6281234567890';

export async function submitBooking(formData: FormData): Promise<ActionResult> {
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

  const result = bookingSchema.safeParse(raw);
  if (!result.success) {
    return {
      ok: false,
      error: 'Validation failed',
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }

  const booking = result.data;

  const localeRaw = (formData.get('locale')?.toString() ?? 'id') as string;
  const locale: 'id' | 'en' = localeRaw === 'en' ? 'en' : 'id';

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
