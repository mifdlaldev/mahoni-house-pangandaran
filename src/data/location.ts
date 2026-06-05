// FICTIONAL — for portfolio demo only
export const villaLocation = {
  lat: -7.6856,
  lng: 108.6505,
  label: { id: 'Mahoni House Pangandaran', en: 'Mahoni House Pangandaran' },
  directions: {
    id: 'Dari Jakarta: tol Cipularang → Cileunyi → Tasik → Pangandaran (±5.5 jam). Dari Bandung: ±4.5 jam via Cijulang. Kami akan kirim pin lokasi lengkap via WhatsApp setelah booking dikonfirmasi.',
    en: 'From Jakarta: Cipularang toll → Cileunyi → Tasik → Pangandaran (~5.5 hrs). From Bandung: ~4.5 hrs via Cijulang. We will send the full location pin via WhatsApp after booking is confirmed.',
  },
  whatsappNumber: '+62XXXXXXXXXX', // FICTIONAL placeholder (normalized to match villa.ts)
  landmarks: [
    { id: 'karapyak', name: { id: 'Pantai Karapyak', en: 'Karapyak Beach' }, distance: '5 min' },
    {
      id: 'town',
      name: { id: 'Pusat Kota Pangandaran', en: 'Pangandaran Town Center' },
      distance: '10 min',
    },
    {
      id: 'batukaras',
      name: { id: 'Pantai Batukaras', en: 'Batukaras Beach' },
      distance: '30 min',
    },
    { id: 'green-canyon', name: { id: 'Green Canyon', en: 'Green Canyon' }, distance: '25 min' },
    {
      id: 'citumang',
      name: { id: 'Body Rafting Citumang', en: 'Citumang Body Rafting' },
      distance: '20 min',
    },
  ],
} as const;

export function getLocation() {
  return villaLocation;
}
