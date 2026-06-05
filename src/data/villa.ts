// FICTIONAL — for portfolio demo only
// Not a real listing. Replace with real data when going live.

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
