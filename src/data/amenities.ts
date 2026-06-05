import type { Amenity } from '@/types';

// FICTIONAL — for portfolio demo only
export const amenities: readonly Amenity[] = [
  {
    id: 'pool',
    label: { id: 'Kolam Renang Pribadi', en: 'Private Pool' },
    description: {
      id: 'Kolam 8×4m dengan kedalaman 1.5m, area aman untuk anak',
      en: '8×4m pool, 1.5m depth, kid-safe area',
    },
    iconName: 'SwimmingPool',
    category: 'outdoor',
  },
  {
    id: 'kitchen',
    label: { id: 'Dapur Lengkap', en: 'Full Kitchen' },
    description: {
      id: 'Kompor, oven, kulkas, rice cooker, lengkap untuk 12 orang',
      en: 'Stove, oven, fridge, rice cooker, equipped for 12',
    },
    iconName: 'CookingPot',
    category: 'indoor',
  },
  {
    id: 'garden',
    label: { id: 'Taman Tropis', en: 'Tropical Garden' },
    description: {
      id: 'Taman 800m² berpagar dengan pohon mahoni dan kolam ikan',
      en: '800m² fenced garden with mahogany trees and fish pond',
    },
    iconName: 'Plant',
    category: 'outdoor',
  },
  {
    id: 'wifi',
    label: { id: 'WiFi 100 Mbps', en: '100 Mbps WiFi' },
    description: {
      id: 'Stabil untuk video call dan streaming di seluruh villa',
      en: 'Stable for video calls and streaming throughout',
    },
    iconName: 'WifiHigh',
    category: 'tech',
  },
  {
    id: 'ac',
    label: { id: 'AC di Semua Kamar', en: 'AC in All Rooms' },
    description: {
      id: 'Pendingin udara di 4 kamar tidur dan ruang tamu',
      en: 'Air conditioning in all 4 bedrooms and living room',
    },
    iconName: 'Snowflake',
    category: 'comfort',
  },
  {
    id: 'bbq',
    label: { id: 'Area BBQ', en: 'BBQ Area' },
    description: {
      id: 'Grill dan meja makan outdoor untuk makan malam bersama',
      en: 'Grill and outdoor dining table for family dinners',
    },
    iconName: 'Barbecue',
    category: 'outdoor',
  },
] as const;

export const secondaryAmenities = {
  id: [
    'Parkir 2 mobil',
    'Hot water',
    'Smart TV',
    'Coffee maker',
    'Board games',
    'Pet-friendly (max 2)',
  ],
  en: [
    '2-car parking',
    'Hot water',
    'Smart TV',
    'Coffee maker',
    'Board games',
    'Pet-friendly (max 2)',
  ],
} as const;
