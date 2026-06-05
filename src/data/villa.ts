// FICTIONAL — for portfolio demo only
// Not a real listing. Replace with real data when going live.

import type { LocalizedString } from '@/types';

export const villa = {
  name: 'Mahoni House',
  tagline: {
    id: 'Tempat keluarga desacelerasi di tepi laut',
    en: 'Where family slows down by the sea',
  },
  description: {
    id: 'Villa 4-kamar dengan kolam renang pribadi di pesisir barat Pangandaran. Dikelola keluarga lokal, dengan perhatian terhadap detail kecil yang membuat liburan terasa seperti pulang ke rumah.',
    en: 'A four-bedroom villa with a private pool on the western shore of Pangandaran. Family-managed, with attention to the small details that make a holiday feel like coming home.',
  },
  built: 2021,
  area: { building: 250, garden: 800 },
  capacity: { maxGuests: 10, bedrooms: 4, bathrooms: 3, beds: 5 },
  location: {
    address: {
      id: 'Jl. Raya Karangtawang, Desa Sindangwangi, Kec. Pangandaran, Jawa Barat',
      en: 'Jl. Raya Karangtawang, Sindangwangi Village, Pangandaran, West Java',
    },
    coordinates: { lat: -7.6856, lng: 108.6505 },
    nearbyBeach: 'Pantai Karapyak',
    distanceToBeach: '5 min drive',
    distanceToTown: '10 min drive',
  },
  contact: {
    whatsapp: '+62XXXXXXXXXX', // Placeholder
    email: 'hello@mahonihouse.id',
    instagram: '@mahonihouse.pangandaran',
  },
} as const;

export type BentoCell = {
  id: string;
  size: 'small' | 'wide' | 'large';
  /** Tailwind gradient class to use as image placeholder */
  gradient: string;
  title: LocalizedString;
  subtitle: LocalizedString;
};

export const villaBento: readonly BentoCell[] = [
  {
    id: 'pool',
    size: 'large',
    gradient: 'from-forest-700 via-forest-500 to-wood-700',
    title: { id: 'Kolam Renang Pribadi', en: 'Private Pool' },
    subtitle: { id: '8 × 4 meter, aman untuk anak', en: '8 × 4 meters, kid-safe' },
  },
  {
    id: 'living',
    size: 'small',
    gradient: 'from-wood-700 via-wood-500 to-cream-200',
    title: { id: 'Ruang Keluarga', en: 'Living Room' },
    subtitle: { id: 'Sofa panjang, TV 55"', en: 'Long sofa, 55" TV' },
  },
  {
    id: 'kitchen',
    size: 'small',
    gradient: 'from-cream-200 via-wood-500 to-wood-700',
    title: { id: 'Dapur Lengkap', en: 'Full Kitchen' },
    subtitle: { id: 'Kompor gas, kulkas, rice cooker', en: 'Gas stove, fridge, rice cooker' },
  },
  {
    id: 'bedroom-master',
    size: 'wide',
    gradient: 'from-forest-900 via-forest-700 to-wood-700',
    title: { id: 'Kamar Tidur Utama', en: 'Master Bedroom' },
    subtitle: {
      id: 'King bed, AC, kamar mandi dalam',
      en: 'King bed, AC, en-suite bathroom',
    },
  },
  {
    id: 'garden',
    size: 'small',
    gradient: 'from-forest-500 via-forest-700 to-forest-900',
    title: { id: 'Taman Tropis', en: 'Tropical Garden' },
    subtitle: {
      id: 'Pohon mahoni setinggi 12 meter',
      en: '12-meter mahogany tree',
    },
  },
] as const;

export function getVillaBento() {
  return villaBento;
}
