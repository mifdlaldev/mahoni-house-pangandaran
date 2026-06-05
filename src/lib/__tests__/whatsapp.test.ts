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
    expect(msg).toContain('1 Agu 2026 → 4 Agu 2026');
    expect(msg).toContain('Jumlah tamu: 6');
    expect(msg).toContain('extra bed');
  });

  it('switches to EN locale', () => {
    const msg = buildWhatsAppMessage(validBooking, 'en');
    expect(msg).toContain("Hello, I'd like to check availability");
    expect(msg).toContain('Aug 1, 2026 → Aug 4, 2026');
    expect(msg).toContain('Guests: 6');
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
