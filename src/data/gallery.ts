// FICTIONAL — for portfolio demo only
// Image paths reference /public/images/gallery/*.jpg
export const galleryImages = [
  {
    id: 'g1',
    url: '/images/gallery/pool-sunset.jpg',
    alt: { id: 'Kolam saat sunset', en: 'Pool at sunset' },
  },
  {
    id: 'g2',
    url: '/images/gallery/living-room.jpg',
    alt: { id: 'Ruang keluarga', en: 'Living room' },
  },
  {
    id: 'g3',
    url: '/images/gallery/master-bedroom.jpg',
    alt: { id: 'Kamar utama', en: 'Master bedroom' },
  },
  { id: 'g4', url: '/images/gallery/dining.jpg', alt: { id: 'Ruang makan', en: 'Dining area' } },
  {
    id: 'g5',
    url: '/images/gallery/garden.jpg',
    alt: { id: 'Taman dengan pohon mahoni', en: 'Garden with mahogany tree' },
  },
  {
    id: 'g6',
    url: '/images/gallery/kitchen.jpg',
    alt: { id: 'Dapur lengkap', en: 'Full kitchen' },
  },
  {
    id: 'g7',
    url: '/images/gallery/bbq.jpg',
    alt: { id: 'Area BBQ outdoor', en: 'Outdoor BBQ area' },
  },
  {
    id: 'g8',
    url: '/images/gallery/sunrise.jpg',
    alt: { id: 'Sunrise di teras', en: 'Sunrise from terrace' },
  },
  {
    id: 'g9',
    url: '/images/gallery/bathroom.jpg',
    alt: { id: 'Kamar mandi dengan bathtub', en: 'Bathroom with bathtub' },
  },
] as const;

export function getGallery() {
  return galleryImages;
}
