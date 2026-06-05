import type { Testimonial } from '@/types';

// FICTIONAL — for portfolio demo only
// Names and quotes are illustrative, not from real guests.
export const testimonials: readonly Testimonial[] = [
  {
    id: 't1',
    name: 'Keluarga Rangga',
    location: 'Jakarta',
    rating: 5,
    quote: {
      id: 'Tempatnya tenang, bersih, anak-anak betah di kolam. Owner sangat membantu dengan rekomendasi warung lokal.',
      en: 'Quiet, clean place. Kids loved the pool. The owner was incredibly helpful with local food recommendations.',
    },
    date: '2025-12-15',
    avatarInitials: 'KR',
  },
  {
    id: 't2',
    name: 'Sarah Tan',
    location: 'Singapore',
    rating: 5,
    quote: {
      id: 'Menginap 4 malam, taman indahnya bikin betah. Dapur lengkap jadi masak untuk anak-anak gampang.',
      en: 'Stayed 4 nights, the garden is beautiful and the full kitchen made cooking for the kids easy.',
    },
    date: '2025-11-20',
    avatarInitials: 'ST',
  },
  {
    id: 't3',
    name: 'Budi & Mita',
    location: 'Bandung',
    rating: 5,
    quote: {
      id: 'Sempurna untuk arisan keluarga besar. Sunset dari teras amazing. Sudah booking untuk tahun depan!',
      en: 'Perfect for a big family reunion. Sunset from the terrace was amazing. Already booked for next year!',
    },
    date: '2025-10-08',
    avatarInitials: 'BM',
  },
  {
    id: 't4',
    name: 'Linda Wijaya',
    location: 'Jakarta',
    rating: 5,
    quote: {
      id: 'Ini kunjungan ke-3 kami. Villa terbaik di Pangandaran. Bersih, terawat, dan feel-nya home.',
      en: 'Our third stay. Best villa in Pangandaran. Clean, well-maintained, and feels like home.',
    },
    date: '2025-09-12',
    avatarInitials: 'LW',
  },
] as const;
