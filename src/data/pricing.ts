import type { PricingTier } from '@/types';

// FICTIONAL — for portfolio demo only
export const pricingTiers: readonly PricingTier[] = [
  {
    id: 'weekday',
    name: { id: 'Hari Biasa', en: 'Weekday' },
    rate: 3_500_000,
    period: { id: 'Senin–Kamis', en: 'Monday–Thursday' },
    minNights: 2,
    minNightsLabel: { id: 'Min. 2 malam', en: 'Min. 2 nights' },
  },
  {
    id: 'weekend',
    name: { id: 'Akhir Pekan', en: 'Weekend' },
    rate: 4_500_000,
    period: { id: 'Jumat–Minggu', en: 'Friday–Sunday' },
    minNights: 3,
    minNightsLabel: { id: 'Min. 3 malam', en: 'Min. 3 nights' },
  },
  {
    id: 'peak',
    name: { id: 'Musim Liburan', en: 'Peak Season' },
    rate: 5_500_000,
    period: { id: 'Lebaran, Natal, Jul–Agt', en: 'Eid, Christmas, Jul–Aug' },
    minNights: 5,
    minNightsLabel: { id: 'Min. 5 malam', en: 'Min. 5 nights' },
  },
] as const;

export const pricingIncludes = {
  id: ['WiFi 100 Mbps', 'Handuk & linen', 'Dapur lengkap', 'Parkir 2 mobil', 'Pembersihan harian'],
  en: ['100 Mbps WiFi', 'Towels & linens', 'Full kitchen', '2-car parking', 'Daily housekeeping'],
} as const;

export const pricingExcludes = {
  id: ['Makan & minum', 'Aktivitas wisata', 'Transportasi', 'Tipping'],
  en: ['Food & beverages', 'Tour activities', 'Transportation', 'Tipping'],
} as const;
