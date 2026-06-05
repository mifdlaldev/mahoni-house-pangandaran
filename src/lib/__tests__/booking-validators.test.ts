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
