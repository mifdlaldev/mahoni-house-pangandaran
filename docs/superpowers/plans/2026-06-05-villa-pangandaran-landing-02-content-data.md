# Phase 2: Content Data Layer

> 12 tasks to create all fictional data files + shared types.

> ⚠️ **COMMIT POLICY**: The `git commit` blocks in this plan are **templates** showing the intent of each commit. Per AGENTS.md ("No commit without explicit user request"), the executing agent MUST pause and ask the user before running any `git commit`. Do not commit autonomously.

> ⚠️ **ALL DATA IN THIS PHASE IS FICTIONAL** for portfolio demo. Marked with `// FICTIONAL` comments.

> 📝 **Note**: Format utilities (`formatIDR`, `formatDate`, `formatPhoneID`) are created in **Phase 5 Task 5.1** with TDD, since they are first used by the WhatsApp message generator. This avoids duplicating `format.ts` across phases.

---

## Task 2.1: Create types/index.ts

**Files:**
- Create: `src/types/index.ts`

- [ ] **Step 1: Create shared types**

```typescript
export type Locale = 'id' | 'en';

export type LocalizedString = {
  id: string;
  en: string;
};

export type Amenity = {
  id: string;
  label: LocalizedString;
  description: LocalizedString;
  iconName: string;
  category: 'outdoor' | 'indoor' | 'tech' | 'comfort';
};

export type PricingTier = {
  id: 'weekday' | 'weekend' | 'peak';
  name: LocalizedString;
  rate: number;
  period: LocalizedString;
  minNights: number;
  minNightsLabel: LocalizedString;
};

export type Experience = {
  id: string;
  name: LocalizedString;
  description: LocalizedString;
  distanceMinutes: number;
  image: string;
};

export type Testimonial = {
  id: string;
  name: string;
  location: string;
  rating: 1 | 2 | 3 | 4 | 5;
  quote: LocalizedString;
  date: string;
  avatarInitials: string;
};

export type FAQItem = {
  q: LocalizedString;
  a: LocalizedString;
};

export type BookingFormData = {
  checkIn: string;
  checkOut: string;
  guests: number;
  name: string;
  email: string;
  phone: string;
  requests?: string;
  agreement: boolean;
};
```

- [ ] **Step 2: Verify typecheck**

```bash
pnpm typecheck
```

- [ ] **Step 3: Commit**

```bash
git add src/types/index.ts
git commit -m "feat: define shared TypeScript types"
```

---

## Task 2.2: Create data/villa.ts

**Files:**
- Create: `src/data/villa.ts`

- [ ] **Step 1: Create villa data**

```typescript
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
```

- [ ] **Step 2: Commit**

```bash
git add src/data/villa.ts
git commit -m "feat: add fictional villa data (portfolio demo only)"
```

---

## Task 2.3: Create data/amenities.ts

**Files:**
- Create: `src/data/amenities.ts`

- [ ] **Step 1: Create amenities data**

```typescript
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
  id: ['Parkir 2 mobil', 'Hot water', 'Smart TV', 'Coffee maker', 'Board games', 'Pet-friendly (max 2)'],
  en: ['2-car parking', 'Hot water', 'Smart TV', 'Coffee maker', 'Board games', 'Pet-friendly (max 2)'],
} as const;
```

- [ ] **Step 2: Commit**

```bash
git add src/data/amenities.ts
git commit -m "feat: add amenities data (fictional)"
```

---

## Task 2.4: Create data/pricing.ts

**Files:**
- Create: `src/data/pricing.ts`

- [ ] **Step 1: Create pricing data**

```typescript
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
```

- [ ] **Step 2: Commit**

```bash
git add src/data/pricing.ts
git commit -m "feat: add pricing tiers data (fictional)"
```

---

## Task 2.5: Create data/experiences.ts

**Files:**
- Create: `src/data/experiences.ts`

- [ ] **Step 1: Create experiences data**

```typescript
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
    image: '/images/experience/karapyak.jpg',
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
    image: '/images/experience/nature.jpg',
  },
] as const;
```

- [ ] **Step 2: Commit**

```bash
git add src/data/experiences.ts
git commit -m "feat: add experiences data (fictional)"
```

---

## Task 2.6: Create data/testimonials.ts

**Files:**
- Create: `src/data/testimonials.ts`

- [ ] **Step 1: Create testimonials data**

```typescript
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
```

- [ ] **Step 2: Commit**

```bash
git add src/data/testimonials.ts
git commit -m "feat: add testimonials data (fictional)"
```

---

## Task 2.7: Create data/faqs.ts (PLURAL — matches Phase 4 import)

**Files:**
- Create: `src/data/faqs.ts`

- [ ] **Step 1: Create FAQ data**

```typescript
import type { FAQItem } from '@/types';

export const faqItems: readonly FAQItem[] = [
  {
    q: { id: 'Jam check-in & check-out berapa?', en: 'What are the check-in and check-out times?' },
    a: {
      id: 'Check-in mulai pukul 14.00 WIB, check-out maksimal pukul 11.00 WIB. Early check-in / late check-out bisa diatur jika tidak ada tamu di hari sebelumnya — konfirmasi via WhatsApp.',
      en: 'Check-in is from 2:00 PM WIB, check-out is by 11:00 AM WIB. Early check-in or late check-out can be arranged if no other guests are scheduled — confirm via WhatsApp.',
    },
  },
  {
    q: { id: 'Apakah ada minimum inap?', en: 'Is there a minimum stay?' },
    a: {
      id: 'Ya. 2 malam untuk hari biasa, 3 malam untuk akhir pekan, 5 malam untuk musim liburan (Lebaran, Natal, Jul–Agt).',
      en: 'Yes. 2 nights on weekdays, 3 nights on weekends, 5 nights during peak season (Eid, Christmas, Jul–Aug).',
    },
  },
  {
    q: { id: 'Bagaimana cara pembayaran?', en: 'How do I pay?' },
    a: {
      id: 'DP 50% untuk konfirmasi booking, pelunasan 7 hari sebelum check-in. Transfer bank (BCA/Mandiri) atau e-wallet. Detail dikirim setelah booking dikonfirmasi via WhatsApp.',
      en: '50% deposit to confirm, balance 7 days before check-in. Bank transfer (BCA/Mandiri) or e-wallet. Details sent after booking is confirmed via WhatsApp.',
    },
  },
  {
    q: { id: 'Apakah kebijakan pembatalan?', en: 'What is the cancellation policy?' },
    a: {
      id: 'Pembatalan ≥ 14 hari sebelum: refund DP 50%. Pembatalan < 14 hari: DP tidak bisa di-refund. Reschedule gratis jika tersedia tanggal lain.',
      en: 'Cancellation ≥ 14 days before: 50% deposit refund. Cancellation < 14 days: no refund. Free reschedule if other dates are available.',
    },
  },
  {
    q: { id: 'Apakah boleh bawa hewan peliharaan?', en: 'Are pets allowed?' },
    a: {
      id: 'Boleh, maksimal 2 hewan kecil (anjing/kucing, < 10 kg). Biaya tambahan Rp 200.000 per hewan per inap. Taman berpagar untuk keamanan.',
      en: 'Yes, up to 2 small pets (dogs/cats, < 10 kg). Additional fee of IDR 200,000 per pet per stay. The garden is fully fenced for safety.',
    },
  },
  {
    q: { id: 'Apakah ada pembersihan harian?', en: 'Is daily housekeeping included?' },
    a: {
      id: 'Ya, housekeeping datang setiap pagi (kecuali hari Minggu). Ganti handuk & linen setiap 3 hari, atau sesuai permintaan.',
      en: 'Yes, housekeeping comes every morning (except Sundays). Towels and linens changed every 3 days, or on request.',
    },
  },
  {
    q: { id: 'Bisakah antar-jemput bandara?', en: 'Do you offer airport transfer?' },
    a: {
      id: 'Kami bisa koordinasi dengan driver lokal terpercaya. Bandara terdekat: Nusawiru (30 min), Bandung Husein (4.5 jam), atau Kertajati (4 jam). Biaya tergantung jarak.',
      en: 'We can coordinate with trusted local drivers. Nearest airports: Nusawiru (30 min), Bandung Husein (4.5 hrs), or Kertajati (4 hrs). Cost depends on distance.',
    },
  },
  {
    q: { id: 'Apakah dapur benar-benar lengkap?', en: 'Is the kitchen really fully equipped?' },
    a: {
      id: 'Kompor gas, oven, microwave, kulkas besar, rice cooker, blender, pisau & talenan, piring & gelas untuk 12 orang, spices basic. Plus complimentary kopi & teh lokal.',
      en: 'Gas stove, oven, microwave, large fridge, rice cooker, blender, knives & cutting board, plates & glasses for 12, basic spices. Plus complimentary local coffee & tea.',
    },
  },
  {
    q: { id: 'Apakah kolam aman untuk anak kecil?', en: 'Is the pool safe for small children?' },
    a: {
      id: 'Kolam 8x4m dengan kedalaman 1.5m. Untuk anak di bawah 5 tahun, harap selalu ada pengawasan orang dewasa. Life jacket tersedia gratis di villa.',
      en: 'Pool is 8x4m with 1.5m depth. For children under 5, please keep adult supervision at all times. Life jackets are available free at the villa.',
    },
  },
  {
    q: { id: 'Apakah tersedia parkir?', en: 'Is parking available?' },
    a: {
      id: 'Ya, parkir dalam villa untuk 2 mobil. Area cukup untuk SUV / minibus.',
      en: 'Yes, in-villa parking for 2 cars. Space fits SUV or minibus.',
    },
  },
] as const;
```

- [ ] **Step 2: Commit**

```bash
git add src/data/faqs.ts
git commit -m "feat: add FAQ data (bilingual)"
```

---

## Task 2.8: Create data/story.ts

**Files:**
- Create: `src/data/story.ts`

- [ ] **Step 1: Create story data**

```typescript
// FICTIONAL — for portfolio demo only
// Founder narrative is illustrative.
export const story = {
  title: {
    id: 'Dari rumah keluarga, untuk keluarga',
    en: 'From our family home, to yours',
  },
  paragraphs: [
    {
      id: 'Tahun 2018, Pak Asep dan Bu Lina — pensiunan guru dari Bandung — jatuh cinta dengan sebidang tanah kosong di pesisir barat Pangandaran. Yang mereka lihat bukan investasi, tapi tempat untuk mengundang anak, cucu, dan teman-teman lama.',
      en: 'In 2018, Pak Asep and Bu Lina — retired teachers from Bandung — fell in love with a small piece of land on the western shore of Pangandaran. What they saw was not an investment, but a place to invite their children, grandchildren, and old friends.',
    },
    {
      id: 'Tiga tahun kemudian, Mahoni House berdiri. Pohon mahoni yang dulu mereka tanam di sudut taman kini menaungi teras. Setiap detail dipilih dengan prinsip yang sama: sederhana, hangat, dan tahan lama.',
      en: 'Three years later, Mahoni House was built. The mahogany tree they planted in the garden corner now shades the terrace. Every detail was chosen with the same principle: simple, warm, and built to last.',
    },
    {
      id: 'Sekarang, kami membuka pintu untuk keluarga lain yang ingin merasakan hal yang sama. Bukan resort. Bukan hotel. Tapi rumah — dengan cerita di baliknya.',
      en: 'Today, we open the door to other families who want to feel the same. Not a resort. Not a hotel. But a home — with a story behind it.',
    },
  ],
  signature: {
    name: 'Asep & Lina',
    role: { id: 'Pemilik & Pengelola', en: 'Owners & Hosts' },
  },
} as const;
```

- [ ] **Step 2: Commit**

```bash
git add src/data/story.ts
git commit -m "feat: add founder story data (fictional)"
```

---

## Task 2.9: Create data/owners.ts (Story section dependency)

**Files:**
- Create: `src/data/owners.ts`

- [ ] **Step 1: Create owners bio data**

```typescript
// FICTIONAL — for portfolio demo only
export const ownersBio = {
  headline: {
    id: 'Empat kamar untuk keluarga yang ingin kembali bersama',
    en: 'Four bedrooms for families who want to come back together',
  },
  paragraph1: {
    id: 'Mahoni House dibangun tahun 2021 oleh Asep dan Lina, pensiunan guru asal Bandung yang jatuh cinta pada pesisir Pangandaran.',
    en: 'Mahoni House was built in 2021 by Asep and Lina, retired teachers from Bandung who fell in love with the Pangandaran shore.',
  },
  paragraph2: {
    id: 'Setiap detail dirancang untuk keluarga — tempat tidur yang cukup untuk tiga generasi, kolam renang yang aman untuk anak, dan ruang bersama yang mengundang untuk mengobrol sampai larut.',
    en: 'Every detail is designed for families — beds for three generations, a kid-safe pool, and shared spaces that invite conversation late into the evening.',
  },
  image: '/images/owners.jpg',
} as const;

export function getOwnersBio() {
  return ownersBio;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/data/owners.ts
git commit -m "feat: add owners bio data (fictional)"
```

---

## Task 2.10: Create data/layout.ts (Layout section dependency)

**Files:**
- Create: `src/data/layout.ts`

- [ ] **Step 1: Create layout data**

```typescript
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
      specs: { id: 'Lantai 1 · 28 m² · AC · Kamar mandi dalam', en: 'Ground floor · 28 m² · AC · En-suite' },
      beds: '1 King bed (180×200 cm)',
    },
    {
      id: 'kids',
      name: { id: 'Kamar Anak', en: 'Kids Room' },
      specs: { id: 'Lantai 1 · 18 m² · AC', en: 'Ground floor · 18 m² · AC' },
      beds: '2 Twin beds (90×200 cm)',
    },
    {
      id: 'family-a',
      name: { id: 'Kamar Keluarga A', en: 'Family Room A' },
      specs: { id: 'Lantai 2 · 22 m² · Balkon', en: 'Second floor · 22 m² · Balcony' },
      beds: '1 Queen bed (160×200 cm)',
    },
    {
      id: 'family-b',
      name: { id: 'Kamar Keluarga B', en: 'Family Room B' },
      specs: { id: 'Lantai 2 · 22 m² · Balkon', en: 'Second floor · 22 m² · Balcony' },
      beds: '2 Twin beds (90×200 cm) — bisa digabung jadi 1 Queen',
    },
  ],
} as const;

export function getLayout() {
  return villaLayout;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/data/layout.ts
git commit -m "feat: add villa layout data (fictional)"
```

---

## Task 2.11: Create data/gallery.ts (Gallery section dependency)

**Files:**
- Create: `src/data/gallery.ts`

- [ ] **Step 1: Create gallery data**

```typescript
// FICTIONAL — for portfolio demo only
// Image paths reference /public/images/gallery/*.jpg
export const galleryImages = [
  { id: 'g1', url: '/images/gallery/pool-sunset.jpg', alt: { id: 'Kolam saat sunset', en: 'Pool at sunset' } },
  { id: 'g2', url: '/images/gallery/living-room.jpg', alt: { id: 'Ruang keluarga', en: 'Living room' } },
  { id: 'g3', url: '/images/gallery/master-bedroom.jpg', alt: { id: 'Kamar utama', en: 'Master bedroom' } },
  { id: 'g4', url: '/images/gallery/dining.jpg', alt: { id: 'Ruang makan', en: 'Dining area' } },
  { id: 'g5', url: '/images/gallery/garden.jpg', alt: { id: 'Taman dengan pohon mahoni', en: 'Garden with mahogany tree' } },
  { id: 'g6', url: '/images/gallery/kitchen.jpg', alt: { id: 'Dapur lengkap', en: 'Full kitchen' } },
  { id: 'g7', url: '/images/gallery/bbq.jpg', alt: { id: 'Area BBQ outdoor', en: 'Outdoor BBQ area' } },
  { id: 'g8', url: '/images/gallery/sunrise.jpg', alt: { id: 'Sunrise di teras', en: 'Sunrise from terrace' } },
] as const;

export function getGallery() {
  return galleryImages;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/data/gallery.ts
git commit -m "feat: add gallery images data (fictional)"
```

---

## Task 2.12: Create data/location.ts (Location section dependency)

**Files:**
- Create: `src/data/location.ts`

- [ ] **Step 1: Create location data**

```typescript
// FICTIONAL — for portfolio demo only
export const villaLocation = {
  lat: -7.6856,
  lng: 108.6505,
  label: { id: 'Mahoni House Pangandaran', en: 'Mahoni House Pangandaran' },
  directions: {
    id: 'Dari Jakarta: tol Cipularang → Cileunyi → Tasik → Pangandaran (±5.5 jam). Dari Bandung: ±4.5 jam via Cijulang. Kami akan kirim pin lokasi lengkap via WhatsApp setelah booking dikonfirmasi.',
    en: 'From Jakarta: Cipularang toll → Cileunyi → Tasik → Pangandaran (~5.5 hrs). From Bandung: ~4.5 hrs via Cijulang. We will send the full location pin via WhatsApp after booking is confirmed.',
  },
  whatsappNumber: '6281234567890', // FICTIONAL placeholder
  landmarks: [
    { id: 'karapyak', name: { id: 'Pantai Karapyak', en: 'Karapyak Beach' }, distance: '5 min' },
    { id: 'town', name: { id: 'Pusat Kota Pangandaran', en: 'Pangandaran Town Center' }, distance: '10 min' },
    { id: 'batukaras', name: { id: 'Pantai Batukaras', en: 'Batukaras Beach' }, distance: '30 min' },
    { id: 'green-canyon', name: { id: 'Green Canyon', en: 'Green Canyon' }, distance: '25 min' },
    { id: 'citumang', name: { id: 'Body Rafting Citumang', en: 'Citumang Body Rafting' }, distance: '20 min' },
  ],
} as const;

export function getLocation() {
  return villaLocation;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/data/location.ts
git commit -m "feat: add location data with landmarks (fictional)"
```

---

## Task 2.13: Phase 2 Verification

- [ ] **Step 1: Run all checks**

```bash
pnpm typecheck
pnpm test
```

Expected: all pass.

- [ ] **Step 2: Verify all data files compile**

```bash
ls src/data/
```

Expected: villa.ts, amenities.ts, pricing.ts, experiences.ts, testimonials.ts, faqs.ts, story.ts, owners.ts, layout.ts, gallery.ts, location.ts (11 files).

- [ ] **Step 3: Document Phase 2 complete**

Note: "Phase 2 complete: 11 fictional data files + types. All marked FICTIONAL. Format utilities deferred to Phase 5 (TDD)."

---

**Proceed to: `2026-06-05-villa-pangandaran-landing-03-bilingual.md`**
