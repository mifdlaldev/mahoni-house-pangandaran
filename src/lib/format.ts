// Currency, date, and phone formatting utilities for the Indonesian locale.
// Used by WhatsApp message generator and booking form rendering.

export function formatIDR(value: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(value)
    .replace('Rp\u00a0', 'Rp ');
}

export function formatDate(isoDate: string, locale: 'id' | 'en'): string {
  return new Intl.DateTimeFormat(locale === 'id' ? 'id-ID' : 'en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(isoDate));
}

export function formatPhoneID(input: string): string {
  const digits = input.replace(/\D/g, '');
  if (digits.startsWith('62')) return digits;
  if (digits.startsWith('0')) return `62${digits.slice(1)}`;
  return digits;
}
