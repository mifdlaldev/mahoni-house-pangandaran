'use server';

// STUB — full WhatsApp deep-link + Resend email backup wiring lands in Phase 5.
export async function submitBooking(formData: FormData): Promise<void> {
  // Server-side handlers (form action) intentionally swallow nothing in production;
  // for now we just acknowledge the submission. Phase 5 will:
  //   1. validate with Zod
  //   2. generate wa.me deep link with formatted message
  //   3. send email backup via Resend
  void formData;
}
