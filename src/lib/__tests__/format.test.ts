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
