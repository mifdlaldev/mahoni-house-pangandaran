import type { Experience } from '@/types';

// FICTIONAL — for portfolio demo only
export const experiences: readonly Experience[] = [
  {
    id: 'sunset-karapyak',
    name: { id: 'Sunset di Karapyak', en: 'Sunset at Karapyak' },
    description: {
      id: 'Pantai tersembunyi untuk sunset tanpa keramaian turis',
      en: 'Hidden beach for crowd-free sunset',
    },
    distanceMinutes: 5,
    image: '/images/gallery/garden.jpg',
  },
  {
    id: 'body-rafting-citumang',
    name: { id: 'Body Rafting Citumang', en: 'Citumang Body Rafting' },
    description: {
      id: 'Arung jeram ringan yang cocok untuk keluarga dengan anak',
      en: 'Gentle rafting suitable for families with children',
    },
    distanceMinutes: 20,
    image: '/images/experience/citumang.jpg',
  },
  {
    id: 'green-canyon',
    name: { id: 'Green Canyon', en: 'Green Canyon' },
    description: {
      id: 'Sungai emerald di antara tebing kapur yang spektakuler',
      en: 'Emerald river through spectacular limestone cliffs',
    },
    distanceMinutes: 25,
    image: '/images/experience/green-canyon.jpg',
  },
  {
    id: 'surf-batukaras',
    name: { id: 'Surf di Batukaras', en: 'Surfing at Batukaras' },
    description: {
      id: 'Kelas selancar untuk pemula & lanjutan, instructor lokal',
      en: 'Surf lessons for beginners & advanced, local instructors',
    },
    distanceMinutes: 30,
    image: '/images/experience/batukaras.jpg',
  },
  {
    id: 'local-market',
    name: { id: 'Pasar Lokal Pangandaran', en: 'Pangandaran Local Market' },
    description: {
      id: 'Pasar tradisional untuk oleh-oleh, jajanan, dan kerajinan',
      en: 'Traditional market for souvenirs, snacks, and crafts',
    },
    distanceMinutes: 10,
    image: '/images/experience/market.jpg',
  },
  {
    id: 'nature-reserve',
    name: { id: 'Taman Wisata Alam', en: 'Nature Reserve' },
    description: {
      id: 'Cagar alam dengan monyet, kera, dan berbagai burung endemik',
      en: 'Nature reserve with monkeys, apes, and endemic birds',
    },
    distanceMinutes: 15,
    image: '/images/gallery/garden.jpg',
  },
] as const;
