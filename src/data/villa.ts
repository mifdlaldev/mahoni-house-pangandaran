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
  /** Tailwind gradient class used as fallback background */
  gradient: string;
  /** Real photo to show behind the gradient overlay */
  imageUrl: string;
  title: LocalizedString;
  subtitle: LocalizedString;
  /** Long description shown in the detail dialog */
  description: LocalizedString;
};

export const villaBento: readonly BentoCell[] = [
  {
    id: 'pool',
    size: 'large',
    gradient: 'from-forest-700 via-forest-500 to-wood-700',
    imageUrl: '/images/gallery/pool-sunset.jpg',
    title: { id: 'Kolam Renang Pribadi', en: 'Private Pool' },
    subtitle: { id: '8 × 4 meter, aman untuk anak', en: '8 × 4 meters, kid-safe' },
    description: {
      id: 'Nikmati berenang di kolam renang pribadi seluas 8×4 meter dengan pemandangan taman tropis. Dilengkapi area dangkal untuk anak-anak dan kursi santai di tepi kolam. Air kolam rutin diperiksa dan dijaga kebersihannya setiap hari.',
      en: 'Enjoy a swim in our private 8×4 meter pool overlooking the tropical garden. Features a shallow area for children and lounge chairs poolside. Pool water is checked and maintained daily.',
    },
  },
  {
    id: 'living',
    size: 'small',
    gradient: 'from-wood-700 via-wood-500 to-cream-200',
    imageUrl: '/images/gallery/living-room.jpg',
    title: { id: 'Ruang Keluarga', en: 'Living Room' },
    subtitle: { id: 'Sofa panjang, TV 55"', en: 'Long sofa, 55" TV' },
    description: {
      id: 'Ruang keluarga yang luas dengan sofa panjang, TV 55 inci, dan akses WiFi gratis. Area terbuka dengan ventilasi silang yang membuat ruangan tetap sejuk. Cocok untuk berkumpul keluarga di malam hari.',
      en: 'Spacious living room with a large sofa, 55-inch TV, and complimentary WiFi. Open-plan layout with cross-ventilation keeps the room cool. Perfect for family gatherings in the evening.',
    },
  },
  {
    id: 'garden',
    size: 'small',
    gradient: 'from-forest-500 via-forest-700 to-forest-900',
    imageUrl: '/images/gallery/garden.jpg',
    title: { id: 'Taman Tropis', en: 'Tropical Garden' },
    subtitle: {
      id: 'Pohon mahoni setinggi 12 meter',
      en: '12-meter mahogany tree',
    },
    description: {
      id: 'Taman tropis yang rimbun dengan pohon mahoni setinggi 12 meter sebagai pusatnya. Dikelilingi bunga-bunga tropis, tanaman hias, dan area duduk santai. Tempat favorit untuk bersantai sambil membaca buku di pagi hari.',
      en: 'Lush tropical garden centered around a 12-meter mahogany tree. Surrounded by tropical flowers, ornamental plants, and casual seating areas. A favorite spot to relax with a book in the morning.',
    },
  },
  {
    id: 'bedroom-master',
    size: 'wide',
    gradient: 'from-forest-900 via-forest-700 to-wood-700',
    imageUrl: '/images/gallery/master-bedroom.jpg',
    title: { id: 'Kamar Tidur Utama', en: 'Master Bedroom' },
    subtitle: {
      id: 'King bed, AC, kamar mandi dalam',
      en: 'King bed, AC, en-suite bathroom',
    },
    description: {
      id: 'Kamar tidur utama dengan king bed berkualitas, AC, dan kamar mandi dalam. Jendela besar menghadap ke taman dengan pencahayaan alami yang melimpah. Dilengkapi lemari pakaian, meja rias, dan brankas pribadi.',
      en: 'Master bedroom with a quality king bed, air conditioning, and en-suite bathroom. Large windows overlook the garden with abundant natural light. Features a wardrobe, vanity table, and personal safe.',
    },
  },
] as const;

export function getVillaBento() {
  return villaBento;
}
