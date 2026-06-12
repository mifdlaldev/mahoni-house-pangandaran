// FICTIONAL — for portfolio demo only
export const villaLayout = {
  bedrooms: 4,
  guests: 10,
  bathrooms: 3,
  area: '250 m²',
  rooms: [
    {
      id: 'master',
      name: { id: 'Kamar Utama', en: 'Master Bedroom' },
      specs: {
        id: 'Lantai 1 · 28 m² · AC · Kamar mandi dalam',
        en: 'Ground floor · 28 m² · AC · En-suite',
      },
      beds: {
        id: '1 King bed (180×200 cm)',
        en: '1 King bed (180×200 cm)',
      },
    },
    {
      id: 'kids',
      name: { id: 'Kamar Anak', en: 'Kids Room' },
      specs: { id: 'Lantai 1 · 18 m² · AC', en: 'Ground floor · 18 m² · AC' },
      beds: {
        id: '2 Twin bed (90×200 cm)',
        en: '2 Twin beds (90×200 cm)',
      },
    },
    {
      id: 'family-a',
      name: { id: 'Kamar Keluarga A', en: 'Family Room A' },
      specs: { id: 'Lantai 2 · 22 m² · Balkon', en: 'Second floor · 22 m² · Balcony' },
      beds: {
        id: '1 Queen bed (160×200 cm)',
        en: '1 Queen bed (160×200 cm)',
      },
    },
    {
      id: 'family-b',
      name: { id: 'Kamar Keluarga B', en: 'Family Room B' },
      specs: { id: 'Lantai 2 · 22 m² · Balkon', en: 'Second floor · 22 m² · Balcony' },
      beds: {
        id: '2 Twin bed (90×200 cm) — bisa digabung jadi 1 Queen',
        en: '2 Twin beds (90×200 cm) — can be combined into 1 Queen',
      },
    },
  ],
} as const;

export function getLayout() {
  return villaLayout;
}
