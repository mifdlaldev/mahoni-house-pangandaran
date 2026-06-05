// Resend email client wrapper for booking notification backup.
// Gracefully returns { sent: false, reason } when API keys are missing.
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

export async function sendBookingEmail(
  args: SendArgs,
): Promise<{ sent: boolean; reason?: string }> {
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
