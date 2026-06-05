# Mahoni House Pangandaran — Landing Page Design Spec

> **Status**: Design spec — awaiting user approval
> **Date**: 2026-06-05
> **Author**: Sisyphus (from brainstorm session)
> **Related**: `DESIGN.md` (design system) · `AGENTS.md` (project context)

---

## TL;DR

Landing page bilingual (ID/EN) untuk fictional villa **Mahoni House Pangandaran** — 4-kamar, private pool, di pesisir barat Pangandaran, 5 menit dari Pantai Karapyak. Target: keluarga urban Indonesia + ekspatriat, group 6-10 orang.

**Stack**: Next.js 14 (App Router) + TypeScript strict + Tailwind CSS + next-intl + Vercel.

**Conversion**: Form (dates, guests, contact) → generate WhatsApp deep link + email backup.

**Sections**: 12 (Hero, Story, Villa Bento, Amenities, Layout, Gallery, Experience, Location, Testimonials, Pricing, FAQ, Booking Form) + Nav + Footer.

**Design**: Tropical Modern — forest green + cream + warm wood. Lora (display) + Plus Jakarta Sans (body).

---

## 1. Brand & Concept

### 1.1 Villa Identity

```
Brand:      Mahoni House Pangandaran
Tagline EN: "Where family slows down by the sea"
Tagline ID: "Tempat keluarga desacelerasi di tepi laut"
Type:       Private villa (single property, full-booked only)
Manager:    Keluarga lokal (fictional — Pak Asep & Bu Lina)
```

### 1.2 Narrative (untuk copy)

> Mahoni House adalah villa 4-kamar di pesisir barat Pangandaran, dibangun tahun 2021 oleh keluarga Asep yang ingin tamu merasakan kehangatan rumah sendiri — bukan hotel. Terletak 5 menit dari Pantai Karapyak yang tenang, dengan private pool 8x4m, taman tropis 800m², dan teras yang menghadap sunset. Dikelola langsung oleh keluarga, dengan perhatian terhadap detail kecil: handuk katun, kopi lokal, rekomendasi warung terbaik.

### 1.3 Positioning

- **BUKAN**: Resort mewah impersonal, party villa, surf hostel
- **TAPI**: Rumah keluarga premium, tenang, personal, untuk multi-generational stay

### 1.4 Vibe Reference

Pola desain yang dicontek (bukan cloned): Airbnb Luxe, Aman Resorts, Six Senses, One Fine Stay, Habitas.

---

## 2. Information Architecture

12 sections, urutan berdasarkan psychological funnel: Hook → Trust → Educate → Prove → Convert.

```
┌─ Nav (sticky, transparent → solid on scroll)
│
├─ 1. Hero           — Hook (1 viewport)
├─ 2. The Story      — Trust (founder narrative)
├─ 3. The Villa      — Showcase (bento grid foto)
├─ 4. Amenities      — Educate (practical info)
├─ 5. Layout         — Educate (capacity, beds)
├─ 6. Gallery        — Showcase (full visual)
├─ 7. Experience     — Educate (things to do)
├─ 8. Location       — Practical (map + distances)
├─ 9. Testimonials   — Prove (social proof)
├─ 10. Pricing       — Practical (rates)
├─ 11. FAQ           — Objection handling
├─ 12. Booking Form  — Convert (final CTA)
│
└─ Footer            — Utility
```

### 2.1 Section Purposes

| # | Section | Primary purpose | Secondary purpose |
|---|---|---|---|
| 1 | Hero | Capture attention, communicate value | Drive to check availability |
| 2 | Story | Build emotional connection | Differentiate from competitors |
| 3 | Villa (bento) | Visual showcase of key spaces | Trigger desire |
| 4 | Amenities | Communicate practical features | Address "what's included" |
| 5 | Layout | Answer "fits my group size?" | Set expectations |
| 6 | Gallery | Deep visual exploration | Build trust via realness |
| 7 | Experience | Show location value | Justify trip to Pangandaran |
| 8 | Location | Provide logistics | Reduce booking anxiety |
| 9 | Testimonials | Social proof | Reduce risk perception |
| 10 | Pricing | Set expectations | Filter serious inquiries |
| 11 | FAQ | Objection handling | Save back-and-forth on WhatsApp |
| 12 | Booking Form | Convert | Capture lead info |

---

## 3. Tech Stack & Dependencies

### 3.1 Confirmed Stack

```
Core:
  - next@14.2.x (App Router, Server Components)
  - react@18.3.x
  - typescript@5.4.x (strict)
  - node@22 LTS

Styling:
  - tailwindcss@3.4.x
  - @tailwindcss/forms
  - @tailwindcss/typography
  - postcss, autoprefixer

UI:
  - @radix-ui/* (primitives for shadcn: dialog, accordion, etc.)
  - class-variance-authority
  - clsx, tailwind-merge
  - lucide-react (icons — NOT emoji)
  - phosphor-react (alternative for villa-specific icons)

Animation:
  - framer-motion@11.x (subtle entrance, hover)

Forms:
  - react-hook-form@7.x
  - zod@3.x (validation)
  - @hookform/resolvers

i18n:
  - next-intl@3.x

Maps:
  - leaflet@1.9.x
  - react-leaflet@4.x (dynamic import, no SSR)

Date:
  - date-fns@3.x (lightweight, no moment.js)

Email (backup):
  - resend@3.x (form submission backup)

Dev:
  - prettier, prettier-plugin-tailwindcss
  - eslint, eslint-config-next
  - @types/node, @types/react, @types/leaflet
```

### 3.2 NOT Used (avoid)

- ❌ `framer-motion` for layout animations (only entrance/exit)
- ❌ `moment.js` (use date-fns)
- ❌ Google Maps (cost)
- ❌ Heavy state management (Zustand/Redux) — not needed
- ❌ Tailwind UI / pre-built template (we design from scratch)
- ❌ `lucide-react` AND `phosphor-react` together — pick one, stick to it

### 3.3 Recommended: Phosphor React

Pilih **Phosphor React** sebagai icon library:
- Lebih warm/humanistic dari Lucide
- Regular weight works well dengan Tropical Modern
- Family of 6 weights (thin, light, regular, bold, fill, duotone)
- Bebas untuk open source projects

---

## 4. File Structure

```
landing-page-villa-pangandaran/
├── app/
│   └── [locale]/
│       ├── layout.tsx              # Root layout (i18n-aware)
│       ├── page.tsx                # Homepage (composes sections)
│       ├── not-found.tsx
│       └── (sections)/             # Route group untuk sections
│           ├── hero.tsx
│           ├── story.tsx
│           ├── villa.tsx
│           ├── amenities.tsx
│           ├── layout.tsx
│           ├── gallery.tsx
│           ├── experience.tsx
│           ├── location.tsx
│           ├── testimonials.tsx
│           ├── pricing.tsx
│           ├── faq.tsx
│           └── booking-form.tsx
├── components/
│   ├── ui/                         # shadcn primitives (manual)
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── textarea.tsx
│   │   ├── label.tsx
│   │   ├── accordion.tsx
│   │   └── dialog.tsx
│   ├── shared/
│   │   ├── nav.tsx                 # Sticky nav
│   │   ├── footer.tsx
│   │   ├── locale-switcher.tsx
│   │   ├── section.tsx             # Reusable section wrapper
│   │   ├── reveal.tsx              # Scroll-reveal wrapper
│   │   └── cta-button.tsx          # Primary/secondary CTA
│   └── icons/
│       └── index.ts                # Re-exports Phosphor icons
├── src/
│   ├── i18n/
│   │   ├── messages/
│   │   │   ├── id.json
│   │   │   └── en.json
│   │   ├── routing.ts
│   │   └── request.ts
│   ├── lib/
│   │   ├── whatsapp.ts             # generateWhatsAppLink()
│   │   ├── format.ts               # formatIDR, formatDate
│   │   ├── cn.ts                   # clsx + tailwind-merge
│   │   ├── validators.ts           # Zod schemas
│   │   └── seo.ts                  # generateMetadata helper
│   ├── data/
│   │   ├── villa.ts                # Fictional villa data
│   │   ├── amenities.ts            # 6-8 amenities
│   │   ├── pricing.ts              # 3 tiers
│   │   ├── experiences.ts          # 6 nearby activities
│   │   ├── testimonials.ts         # 4 fictional but realistic
│   │   ├── faq.ts                  # 8-10 Q&A
│   │   ├── story.ts                # Founder narrative
│   │   └── location.ts             # Coordinates + distances
│   ├── styles/
│   │   ├── globals.css             # Tailwind + tokens
│   │   ├── tokens.css              # OKLCH CSS variables
│   │   └── motion.ts               # Framer Motion variants
│   └── types/
│       └── index.ts                # Shared types
├── public/
│   ├── images/
│   │   ├── hero/                   # Hero images (5+ angles)
│   │   ├── villa/                  # Bento grid (5+ images)
│   │   ├── amenities/              # Icon supporting images
│   │   ├── gallery/                # 12-16 gallery photos
│   │   ├── experience/             # Activity photos
│   │   ├── story/                  # Founder photo
│   │   └── testimonials/           # Avatar photos
│   ├── icons/
│   │   ├── favicon.ico
│   │   └── apple-touch-icon.png
│   └── og/                         # OG images per locale
├── messages/                       # next-intl config (root)
├── .env.example
├── .eslintrc.json
├── .prettierrc
├── next.config.mjs
├── tailwind.config.ts
├── postcss.config.js
├── tsconfig.json
├── package.json
├── pnpm-lock.yaml
├── AGENTS.md
├── DESIGN.md
├── docs/
│   └── superpowers/
│       └── specs/
│           └── 2026-06-05-villa-pangandaran-landing-design.md
└── .gitignore
```

---

## 5. Content Data Layer (Fictional but Realistic)

> ⚠️ **PENTING**: Semua data di bawah ini FICTIONAL untuk portfolio/demo. Tandai dengan komentar "FICTIONAL — for portfolio demo only" di setiap file. Jangan pernah claim ini villa nyata.

### 5.1 Villa Core Data (`src/data/villa.ts`)

```typescript
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
  area: {
    building: 250, // m²
    garden: 800,   // m²
  },
  capacity: {
    maxGuests: 10,
    bedrooms: 4,
    bathrooms: 3,
    beds: 5, // 2 king, 1 queen, 2 single
  },
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
    whatsapp: '+62XXXXXXXXXX', // Placeholder, replace with real
    email: 'hello@mahonihouse.id',
    instagram: '@mahonihouse.pangandaran',
  },
} as const;
```

### 5.2 Amenities (`src/data/amenities.ts`)

6 amenities utama (visual, dengan Phosphor icons):

| ID | ID Label | EN Label | Icon | Category |
|---|---|---|---|---|
| pool | Kolam Renang Pribadi | Private Pool | `SwimmingPool` | Outdoor |
| kitchen | Dapur Lengkap | Full Kitchen | `CookingPot` | Indoor |
| garden | Taman Tropis | Tropical Garden | `Plant` | Outdoor |
| wifi | WiFi 100 Mbps | 100 Mbps WiFi | `WifiHigh` | Tech |
| ac | AC di Semua Kamar | AC in All Rooms | `Snowflake` | Comfort |
| bbq | Area BBQ | BBQ Area | `Barbecue` | Outdoor |

Plus secondary amenities (small text, lower in section):
- Parking (2 cars)
- Pet-friendly (max 2 small pets)
- Hot water
- Smart TV
- Coffee maker
- Board games

### 5.3 Pricing (`src/data/pricing.ts`)

```typescript
export const pricing = {
  currency: 'IDR',
  tiers: [
    {
      id: 'weekday',
      name: { id: 'Hari Biasa', en: 'Weekday' },
      rate: 3_500_000,
      nights: { min: 2, label: { id: 'Min. 2 malam', en: 'Min. 2 nights' } },
      period: { id: 'Senin–Kamis', en: 'Monday–Thursday' },
    },
    {
      id: 'weekend',
      name: { id: 'Akhir Pekan', en: 'Weekend' },
      rate: 4_500_000,
      nights: { min: 3, label: { id: 'Min. 3 malam', en: 'Min. 3 nights' } },
      period: { id: 'Jumat–Minggu', en: 'Friday–Sunday' },
    },
    {
      id: 'peak',
      name: { id: 'Musim Liburan', en: 'Peak Season' },
      rate: 5_500_000,
      nights: { min: 5, label: { id: 'Min. 5 malam', en: 'Min. 5 nights' } },
      period: { id: 'Lebaran, Natal, Jul–Agt', en: 'Eid, Christmas, Jul–Aug' },
    },
  ],
  includes: {
    id: ['Wifi 100 Mbps', 'Handuk & linen', 'Dapur lengkap', 'Parkir 2 mobil', 'Pembersihan harian'],
    en: ['100 Mbps WiFi', 'Towels & linens', 'Full kitchen', '2-car parking', 'Daily housekeeping'],
  },
  excludes: {
    id: ['Makan & minum', 'Aktivitas wisata', 'Transportasi', 'Tipping'],
    en: ['Food & beverages', 'Tour activities', 'Transportation', 'Tipping'],
  },
} as const;
```

### 5.4 Experiences (`src/data/experiences.ts`)

6 nearby activities dengan distances:

| Activity | Distance | ID Description | EN Description |
|---|---|---|---|
| Sunset di Karapyak | 5 min | Pantai tersembunyi untuk sunset tanpa keramaian | Hidden beach for crowd-free sunset |
| Body Rafting Citumang | 20 min | Arung jeram ringan yang cocok untuk keluarga | Gentle rafting suitable for families |
| Green Canyon | 25 min | Sungai emerald di tebing kapur | Emerald river through limestone cliffs |
| Surf Batukaras | 30 min | Kelas selancar untuk pemula & lanjutan | Surf lessons for beginners & advanced |
| Pasar Pangandaran | 10 min | Pasar lokal untuk oleh-oleh & jajanan | Local market for souvenirs & snacks |
| Taman Wisata Alam | 15 min | Cagar alam dengan monyet & kera | Nature reserve with monkeys & apes |

### 5.5 Testimonials (`src/data/testimonials.ts`)

4 fictional testimonials (mark dengan disclaimer):

```typescript
export const testimonials = [
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
  },
] as const;
```

### 5.6 FAQ (`src/data/faq.ts`)

10 Q&A, mix bahasa:

```typescript
export const faq = [
  {
    q: {
      id: 'Jam check-in & check-out berapa?',
      en: 'What are the check-in and check-out times?',
    },
    a: {
      id: 'Check-in mulai pukul 14.00 WIB, check-out maksimal pukul 11.00 WIB. Early check-in / late check-out bisa diatur jika tidak ada tamu di hari sebelumnya — konfirmasi via WhatsApp.',
      en: 'Check-in is from 2:00 PM WIB, check-out is by 11:00 AM WIB. Early check-in or late check-out can be arranged if no other guests are scheduled — confirm via WhatsApp.',
    },
  },
  {
    q: {
      id: 'Apakah ada minimum inap?',
      en: 'Is there a minimum stay?',
    },
    a: {
      id: 'Ya. 2 malam untuk hari biasa, 3 malam untuk akhir pekan, 5 malam untuk musim liburan (Lebaran, Natal, Jul–Agt).',
      en: 'Yes. 2 nights on weekdays, 3 nights on weekends, 5 nights during peak season (Eid, Christmas, Jul–Aug).',
    },
  },
  {
    q: {
      id: 'Bagaimana cara pembayaran?',
      en: 'How do I pay?',
    },
    a: {
      id: 'DP 50% untuk konfirmasi booking, pelunasan 7 hari sebelum check-in. Transfer bank (BCA/Mandiri) atau e-wallet. Detail dikirim setelah booking dikonfirmasi via WhatsApp.',
      en: '50% deposit to confirm, balance 7 days before check-in. Bank transfer (BCA/Mandiri) or e-wallet. Details sent after booking is confirmed via WhatsApp.',
    },
  },
  {
    q: {
      id: 'Apakah kebijakan pembatalan?',
      en: 'What is the cancellation policy?',
    },
    a: {
      id: 'Pembatalan ≥ 14 hari sebelum: refund DP 50%. Pembatalan < 14 hari: DP tidak bisa di-refund. Reschedule gratis jika tersedia tanggal lain.',
      en: 'Cancellation ≥ 14 days before: 50% deposit refund. Cancellation < 14 days: no refund. Free reschedule if other dates are available.',
    },
  },
  {
    q: {
      id: 'Apakah boleh bawa hewan peliharaan?',
      en: 'Are pets allowed?',
    },
    a: {
      id: 'Boleh, maksimal 2 hewan kecil (anjing/kucing, < 10 kg). Biaya tambahan Rp 200.000 per hewan per inap. Taman berpagar untuk keamanan.',
      en: 'Yes, up to 2 small pets (dogs/cats, < 10 kg). Additional fee of IDR 200,000 per pet per stay. The garden is fully fenced for safety.',
    },
  },
  {
    q: {
      id: 'Apakah ada pembersihan harian?',
      en: 'Is daily housekeeping included?',
    },
    a: {
      id: 'Ya, housekeeping datang setiap pagi (kecuali hari Minggu). Ganti handuk & linen setiap 3 hari, atau sesuai permintaan.',
      en: 'Yes, housekeeping comes every morning (except Sundays). Towels and linens changed every 3 days, or on request.',
    },
  },
  {
    q: {
      id: 'Bisakah antar-jemput bandara?',
      en: 'Do you offer airport transfer?',
    },
    a: {
      id: 'Kami bisa koordinasi dengan driver lokal terpercaya. Bandara terdekat: Nusawiru (30 min), Bandung Husein (4.5 jam), atau Kertajati (4 jam). Biaya tergantung jarak.',
      en: 'We can coordinate with trusted local drivers. Nearest airports: Nusawiru (30 min), Bandung Husein (4.5 hrs), or Kertajati (4 hrs). Cost depends on distance.',
    },
  },
  {
    q: {
      id: 'Apakah dapur benar-benar lengkap?',
      en: 'Is the kitchen really fully equipped?',
    },
    a: {
      id: 'Kompor gas, oven, microwave, kulkas besar, rice cooker, blender, pisau & talenan, piring & gelas untuk 12 orang, spices basic. Plus complimentary kopi & teh lokal.',
      en: 'Gas stove, oven, microwave, large fridge, rice cooker, blender, knives & cutting board, plates & glasses for 12, basic spices. Plus complimentary local coffee & tea.',
    },
  },
  {
    q: {
      id: 'Apakah kolam aman untuk anak kecil?',
      en: 'Is the pool safe for small children?',
    },
    a: {
      id: 'Kolam 8x4m dengan kedalaman 1.5m. Untuk anak di bawah 5 tahun, harap selalu ada pengawasan orang dewasa. Life jacket tersedia gratis di villa.',
      en: 'Pool is 8x4m with 1.5m depth. For children under 5, please keep adult supervision at all times. Life jackets are available free at the villa.',
    },
  },
  {
    q: {
      id: 'Apakah tersedia parkir?',
      en: 'Is parking available?',
    },
    a: {
      id: 'Ya, parkir dalam villa untuk 2 mobil. Area cukup untuk SUV / minibus.',
      en: 'Yes, in-villa parking for 2 cars. Space fits SUV or minibus.',
    },
  },
] as const;
```

### 5.7 Story (`src/data/story.ts`)

Founder narrative (fictional):

```typescript
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
    role: {
      id: 'Pemilik & Pengelola',
      en: 'Owners & Hosts',
    },
  },
} as const;
```

---

## 6. Section-by-Section Spec

### 6.1 Nav (Sticky)

```
Layout: Single line, max 80px height
Desktop (>1024px): Logo left, menu center, LangSwitcher + CTA right
Mobile (<1024px): Logo left, hamburger right, slide-in drawer

Behavior:
  - Transparent at top of page
  - Solid forest-700 bg + cream-50 text after scroll > 100px
  - Smooth transition (200ms ease-out)
  - Active link: underline (wood-500)

Menu items (anchor scroll):
  - Villa, Amenities, Gallery, Experience, Pricing, Contact

CTA: "Check Availability" → scroll to #booking
```

### 6.2 Hero

```
Layout: Full viewport (min-h-dvh), image background
Image: hero/main.jpg (pemandangan pool + sunset, 1920x1080)
Overlay: linear gradient from forest-900/50 (bottom) to transparent (top)

Content (centered, max-width 800px):
  - Eyebrow (optional): "WELCOME TO" (forest-200)
  - H1: "Mahoni House" (Lora 4rem, cream-50, italic on tagline)
  - Tagline: "Where family slows down by the sea" (Lora italic 1.5rem, cream-50/80)
  - Sub: "4-bedroom villa with private pool, 5 min from Karapyak Beach" (Plus Jakarta Sans 1.125rem, cream-50/70)
  - Primary CTA: "Check Availability" (forest-700 bg, cream-50 text, scale 0.97 active)
  - Secondary CTA: "Watch the story ↓" (transparent, cream-50 border, scrolls to #story)

Behavior:
  - Parallax subtle on image (translateY 50px on scroll)
  - Text fade-in stagger (eyebrow → h1 → tagline → sub → ctas)
  - Reduced motion: no parallax
```

### 6.3 Story

```
Layout: 2-column (60/40) desktop, stacked mobile
Background: cream-50 (default page bg)

Left column:
  - Eyebrow (optional): "OUR STORY"
  - H2: "Dari rumah keluarga, untuk keluarga" (Lora 2.5rem, forest-900)
  - 3 paragraphs (Plus Jakarta Sans 1rem, ink-900, max-width 68ch, text-wrap pretty)
  - Signature: "Asep & Lina — Pemilik & Pengelola" (italic Lora)

Right column:
  - Image: story/family.jpg (Pak Asep & Bu Lina, square aspect, 1:1)
  - Object-cover, border-radius 16px
  - Subtle shadow on hover

Behavior: scroll-reveal (fade-up) both columns independently
```

### 6.4 The Villa (Bento Grid)

```
Layout: Asymmetric CSS grid (5 cells, 1 anchor 2x larger)
Container: max-width 1200px, 16px gap

Grid (desktop, lg+):
  ┌─────────────┬────────┐
  │             │  Pool  │
  │  Master BR  │        │
  │  (2x tall)  ├────────┤
  │             │ Living │
  ├──────┬──────┴────────┤
  │Kitchen│  Garden (2x) │
  └──────┴──────────────┘

Mobile: 2 columns, 1 column progressive

Each cell:
  - Image (4:3 or 1:1 aspect, object-cover)
  - Hover: scale(1.03) + label fade in (label = "Master Bedroom" etc.)
  - Border-radius 12px
  - Border: 1px wood-500/40
  - Cursor: pointer (opens lightbox to gallery)

Behavior: stagger entrance (60ms between cells)
```

### 6.5 Amenities

```
Layout: 6 cards in 3x2 grid (desktop), 2x3 (tablet), 1x6 (mobile)
Background: cream-100 (alternating)

Each card:
  - Icon (Phosphor, 48px, forest-700)
  - Heading (Lora 1.25rem, forest-900)
  - Description (Plus Jakarta Sans 0.9375rem, ink-600, 1 line)
  - Border: 1px wood-500/40
  - Border-radius 12px
  - Padding: 24px

Secondary list (below):
  - Inline pills: "Parking" "Hot water" "Smart TV" "Coffee maker" "Board games"
  - Smaller text, ink-600
```

### 6.6 Layout & Capacity

```
Layout: 2-column desktop (text left, illustration right)
Background: cream-50

Left:
  - H2: "Ruang untuk seluruh keluarga" (Lora 2.5rem, forest-900)
  - Stat row:
    - "4" (Lora 4rem) / "Kamar Tidur" (Plus Jakarta 0.875rem, ink-600)
    - "10" / "Tamu Maks"
    - "3" / "Kamar Mandi"
    - "250m²" / "Luas Bangunan"
  - Bed configuration list (text):
    - "Master 1: 1 King bed, ensuite bathroom"
    - "Master 2: 1 King bed, garden view"
    - "Bedroom 3: 1 Queen bed"
    - "Bedroom 4: 2 Single beds (bisa digabung)"
  - Plus 1 sofa bed in living room

Right:
  - Floor plan illustration (illustrative, hand-drawn style SVG)
  - Sederhana: 4 kamar, 3 KM, dapur, ruang tamu, kolam, taman
  - Not a real architectural plan — clearly labeled "ILLUSTRATIVE"
```

### 6.7 Gallery

```
Layout: Masonry-style grid, 12-16 images
Container: max-width 1200px

Grid (desktop, lg+):
  - 3 columns
  - Mixed aspect ratios (4:3, 3:4, 1:1) for visual interest
  - 16px gap

Mobile: 2 columns, simplified ratios

Each image:
  - next/image with sizes prop
  - Blur placeholder (cream-200)
  - Hover: scale(1.02), brief label fade
  - Click: open lightbox (Dialog from shadcn)
  - Alt text: required, descriptive

Categories (mix of):
  - Interior (5): master BR, living, kitchen, dining, bathroom
  - Exterior (4): pool, garden, terrace, sunset view
  - Details (3): coffee setup, books, plants
  - Surroundings (4): nearby beach, sunset, local warung, jungle path
```

### 6.8 Experience (Things to Do)

```
Layout: Horizontal scroll cards (desktop), vertical stack (mobile)
Background: cream-50

H2: "Lebih dari sekadar villa" (Lora 2.5rem, forest-900)
Sub: "Hal-hal yang bisa Anda nikmati di sekitar Pangandaran"

Cards (6, horizontal scroll-snap):
  - Image (16:9, 280px wide desktop, full-width mobile)
  - Distance badge (top-right): "5 min" (forest-700 bg, cream-50 text)
  - H3 (Lora 1.25rem, forest-900)
  - Description (Plus Jakarta 0.9375rem, ink-600, 2 lines)
  - Hover: scale(1.02), shadow reveal

Scroll behavior: snap-x mandatory, scrollbar hidden, prev/next buttons (desktop)
```

### 6.9 Location & Map

```
Layout: 2-column (map 60% / info 40% desktop), stacked mobile
Background: cream-100

Map (left):
  - react-leaflet + OpenStreetMap
  - Custom marker (Phosphor MapPin icon, forest-700)
  - Zoom level: 13 (show nearby beaches)
  - No Google Maps API (cost concern)
  - Fallback: static iframe if JS disabled

Info (right):
  - H2: "Lokasi" (Lora 2rem, forest-900)
  - Address text (full, Plus Jakarta 0.9375rem)
  - "How to get here" list:
    - "Dari Jakarta: 6 jam via tol"
    - "Dari Bandung: 4.5 jam"
    - "Bandara Nusawiru: 30 min"
    - "Bandara Kertajati: 4 jam"
  - "Landmark terdekat" pills:
    - "Pantai Karapyak (5 min)" "Pantai Pangandaran (10 min)" "Pasar Lokal (10 min)"
  - WhatsApp CTA: "Minta arah via WhatsApp →" (wa.me deep link dengan current location)
```

### 6.10 Testimonials

```
Layout: 2x2 grid desktop, stack mobile
Background: cream-50

Each card:
  - Stars (Phosphor Star, wood-500, 5 stars)
  - Quote (Lora italic 1.125rem, ink-900)
  - Avatar (48px circle, with initials if no real photo)
  - Name (Plus Jakarta bold 0.9375rem, forest-900)
  - Location (Plus Jakarta 0.875rem, ink-600)
  - Date (Plus Jakarta 0.8125rem, ink-400)
  - Border-radius 12px, border 1px wood-500/40, padding 24px

Disclaimer (small text below grid):
  - "Testimoni dari tamu nyata — untuk demo ini, nama-nama sudah disesuaikan."
  - "Testimonials from real guests — for this demo, names have been adjusted."
```

### 6.11 Pricing

```
Layout: 3-column cards (desktop), stack mobile
Background: cream-100

H2: "Tarif menginap" (Lora 2.5rem, forest-900)
Sub: "Harga per malam, sudah termasuk pajak"

Each card (3):
  - Tier name (Lora 1.5rem, forest-900)
  - Period (Plus Jakarta 0.875rem, ink-600)
  - Price (Lora 3rem, forest-700, font-weight 600)
  - "/ malam" suffix (Plus Jakarta 1rem, ink-600)
  - Min stay badge (wood-500 bg, cream-50 text)
  - Includes list (5 items, checkmark icon)
  - CTA: "Book Weekday →" (anchor to #booking with pre-fill)

Visual differentiation: 
  - Weekday: standard card
  - Weekend: standard card
  - Peak: "Most Popular" badge, slight elevation, forest-700 border
```

### 6.12 FAQ

```
Layout: Single column, max-width 800px centered
Background: cream-50

H2: "Pertanyaan yang sering ditanya" (Lora 2.5rem, forest-900)

Accordion (10 items, Radix Accordion):
  - Question (Lora 1.125rem, forest-900, with chevron icon rotate on open)
  - Answer (Plus Jakarta 0.9375rem, ink-900, max-width 68ch, padding-top 16px)
  - Border between items: 1px wood-500/40
  - Open animation: 200ms ease-out
  - Single-open behavior (close other when open new)
```

### 6.13 Booking Form

```
Layout: Single column form, max-width 640px centered
Background: cream-100 (alt section)

H2: "Cek ketersediaan" (Lora 2.5rem, forest-900)
Sub: "Isi form di bawah, kami balas via WhatsApp dalam 1 jam (09.00–21.00 WIB)"

Form fields:
  - Check-in date (date picker, native <input type="date">)
  - Check-out date (date picker)
  - Number of guests (1-10, select with - / + buttons)
  - Full name (text input)
  - Email (email input)
  - WhatsApp number (tel input, with country code)
  - Special requests (textarea, optional)
  - Agreement checkbox (syarat & ketentuan, link to terms)

Validation:
  - Zod schema
  - Check-out > check-in
  - Guests 1-10
  - Email valid
  - Phone ≥ 10 digits
  - Agreement must be checked
  - Error messages under each field (red, 0.875rem)

Submit:
  - Generate WhatsApp message string from form data
  - Show preview modal (optional, "Send via WhatsApp" confirmation)
  - On confirm: open wa.me in new tab + send email backup via Server Action
  - Loading state: spinner + "Sending..." label
  - Success state: green checkmark + "Sent! Check WhatsApp."

Visual:
  - 2-column (dates) on md+, 1 column mobile
  - Other fields: 1 column
  - Submit button: full-width on mobile, auto on desktop
```

### 6.14 Footer

```
Layout: 3-column desktop, stack mobile
Background: forest-700 (dark)
Text: cream-50/80

Column 1: Brand
  - "Mahoni House" (Lora 1.5rem, cream-50)
  - Tagline (small)
  - Social: Instagram icon (Phosphor), link to @

Column 2: Quick links
  - Villa, Amenities, Gallery, Pricing, Contact (anchor links)

Column 3: Contact
  - WhatsApp (with icon)
  - Email
  - Address

Bottom bar:
  - "© 2026 Mahoni House. Portfolio demo project."
  - "Built with Next.js · Hosted on Vercel"
```

---

## 7. Form + WhatsApp Integration

### 7.1 Flow

```
[User fills form]
   ↓ (client-side validation: Zod)
[Click Submit]
   ↓
[Show preview modal with WhatsApp message]
   ↓ (User confirms)
[Open wa.me in new tab] + [Server Action: send email backup]
   ↓
[Show success state]
```

### 7.2 WhatsApp Message Format

```typescript
// src/lib/whatsapp.ts
export function generateWhatsAppMessage(data: BookingFormData, locale: 'id' | 'en'): string {
  const greeting = locale === 'id' ? 'Halo, saya ingin cek ketersediaan' : 'Hi, I would like to check availability';
  const fields = locale === 'id' ? {
    checkIn: 'Check-in',
    checkOut: 'Check-out',
    guests: 'Jumlah tamu',
    name: 'Nama',
    email: 'Email',
    phone: 'No. WhatsApp',
    requests: 'Permintaan khusus',
  } : {
    checkIn: 'Check-in',
    checkOut: 'Check-out',
    guests: 'Guests',
    name: 'Name',
    email: 'Email',
    phone: 'WhatsApp',
    requests: 'Special requests',
  };
  
  return [
    greeting,
    '',
    `${fields.checkIn}: ${formatDate(data.checkIn, locale)}`,
    `${fields.checkOut}: ${formatDate(data.checkOut, locale)}`,
    `${fields.guests}: ${data.guests}`,
    `${fields.name}: ${data.name}`,
    `${fields.email}: ${data.email}`,
    `${fields.phone}: ${data.phone}`,
    data.requests ? `${fields.requests}: ${data.requests}` : '',
    '',
    locale === 'id' ? 'Terima kasih!' : 'Thank you!',
  ].filter(Boolean).join('\n');
}

export function generateWhatsAppLink(message: string, phone: string): string {
  return `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
}
```

### 7.3 Server Action (Email Backup)

```typescript
// app/api/contact/route.ts (or Server Action)
'use server';

import { Resend } from 'resend';
import { z } from 'zod';

const schema = z.object({ /* same as client */ });

export async function submitBookingForm(data: z.infer<typeof schema>) {
  const validated = schema.parse(data);
  
  // Send email to owner
  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: 'bookings@mahonihouse.id',
    to: process.env.OWNER_EMAIL!,
    subject: `New Booking Inquiry: ${validated.name}`,
    html: `<pre>${JSON.stringify(validated, null, 2)}</pre>`,
  });
  
  return { success: true };
}
```

### 7.4 Env Vars Required

```bash
# .env.local (NOT committed)
RESEND_API_KEY=re_xxx
OWNER_EMAIL=owner@mahonihouse.id
NEXT_PUBLIC_WHATSAPP_NUMBER=+62XXXXXXXXXX
```

---

## 8. Bilingual System

### 8.1 Setup

- `next-intl@3.x` dengan App Router
- `src/i18n/routing.ts`: define locales `['id', 'en']`, default `'id'`
- `src/i18n/request.ts`: get locale from params, load messages
- `src/middleware.ts`: redirect based on Accept-Language header

### 8.2 Routing

```
/        → Indonesian (default)
/en      → English
/en/*    → English versions
```

### 8.3 Locale Switcher

```typescript
// components/shared/locale-switcher.tsx
'use client';
import { usePathname, useRouter } from 'next/navigation';
import { Globe } from 'lucide-react';

export function LocaleSwitcher({ currentLocale }: { currentLocale: 'id' | 'en' }) {
  // Toggle between / and /en/ based on current path
  // Show: "🇮🇩 ID" or "🇬🇧 EN" with Globe icon
  // NO emoji flags per anti-patterns — use text codes instead
}
```

**Note**: Per anti-patterns, NO emoji flags. Use text codes: "ID" / "EN".

### 8.4 Message File Structure

```json
// src/i18n/messages/id.json
{
  "nav": {
    "villa": "Villa",
    "amenities": "Fasilitas",
    ...
  },
  "hero": {
    "eyebrow": "SELAMAT DATANG DI",
    "title": "Mahoni House",
    "tagline": "Tempat keluarga desacelerasi di tepi laut",
    "primaryCta": "Cek Ketersediaan",
    ...
  },
  "story": {
    "title": "Dari rumah keluarga, untuk keluarga",
    ...
  },
  ...
}
```

```json
// src/i18n/messages/en.json
{
  "nav": {
    "villa": "Villa",
    "amenities": "Amenities",
    ...
  },
  "hero": {
    "eyebrow": "WELCOME TO",
    "title": "Mahoni House",
    "tagline": "Where family slows down by the sea",
    "primaryCta": "Check Availability",
    ...
  },
  ...
}
```

**Key rules**:
- Same keys in both files (enforced via TypeScript)
- No mixed language in one file
- Translations from `data/*.ts` use `{id, en}` object structure
- Pure UI chrome (buttons, labels) goes in JSON messages
- Long content (villa description, FAQs) stays in `data/*.ts` for type safety

---

## 9. Visual System

See `DESIGN.md` for full spec. Summary:

- **Colors**: Forest + Cream + Wood + Ink (OKLCH tokens)
- **Fonts**: Lora (display) + Plus Jakarta Sans (body)
- **Motion**: 150-400ms, ease-out, only transform/opacity
- **Bento**: Asymmetric 5-cell grid (1 anchor 2x larger)
- **Components**: Custom shadcn primitives, no template prebuilt
- **A11y**: WCAG 2.1 AA, prefers-reduced-motion
- **Anti-patterns**: No Inter, no Fraunces, no left-border cards, no gradient text, no pure black/white

---

## 10. Performance & Quality

### 10.1 Performance Budget

- First load JS: < 100KB gzipped
- LCP: < 2.5s (4G simulated)
- CLS: < 0.05
- INP: < 200ms
- Lighthouse: Performance ≥ 90, A11y ≥ 95, Best Practices = 100, SEO = 100

### 10.2 Image Strategy

- All images via `next/image`
- Format priority: AVIF → WebP → JPEG
- Sizes prop defined per use case
- Blur placeholder: solid `cream-200` color
- Lazy load below fold (default)
- Hero image: `priority` flag + preload

### 10.3 Font Loading

```typescript
// app/[locale]/layout.tsx
import { Lora, Plus_Jakarta_Sans } from 'next/font/google';

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});
```

- Preload: Lora Regular (400) + Plus Jakarta Sans Regular (400)
- Defer: italics, bold (loaded on demand)
- Variable fonts: consider for finer weight control

---

## 11. Implementation Phases

6 phases, each independently verifiable.

### Phase 1: Foundation
**Goal**: Project initialized, runnable, design system applied.

Tasks:
1. `pnpm create next-app@14` with TypeScript, Tailwind, App Router, no src/ use src/ instead
2. Install all dependencies (next-intl, framer-motion, react-hook-form, zod, leaflet, phosphor-react, etc.)
3. Configure `tsconfig.json` strict mode
4. Setup `tailwind.config.ts` with our OKLCH tokens + Lora + Plus Jakarta Sans fonts
5. Create `src/styles/tokens.css` with CSS variables
6. Setup `src/lib/cn.ts` (clsx + tailwind-merge)
7. Create folder structure per spec section 4
8. Add `next/font` configuration in `app/[locale]/layout.tsx`
9. Verify: `pnpm dev` runs, blank page with correct fonts + colors

**DoD**:
- [ ] `pnpm dev` jalan tanpa error
- [ ] Tailwind config loaded, color tokens work
- [ ] Fonts loaded (Lora + Jakarta)
- [ ] No TS errors, no ESLint warnings

### Phase 2: Content Data Layer
**Goal**: All fictional data typed and accessible.

Tasks:
1. Create all `src/data/*.ts` files per section 5
2. Type each with `as const` for literal types
3. Add JSDoc to each export
4. Add file-level comment: `// FICTIONAL — for portfolio demo only`
5. Verify: TS compile clean, all data exportable

**DoD**:
- [ ] All data files compile
- [ ] All exports strictly typed
- [ ] Marked as fictional

### Phase 3: Bilingual Foundation
**Goal**: Locale routing works, messages loadable.

Tasks:
1. Setup `next-intl` per spec section 8
2. Create `id.json` + `en.json` with all UI strings (nav, buttons, section titles)
3. Create `src/i18n/routing.ts` and `request.ts`
4. Create `src/middleware.ts` for locale detection
5. Create `LocaleSwitcher` component
6. Verify: Visit `/` shows ID, `/en` shows EN, switcher toggles

**DoD**:
- [ ] `/` and `/en` routes work
- [ ] Switcher toggles language
- [ ] No hardcoded strings in components

### Phase 4: Sections (Build per AGENTS.md verify rule)
**Goal**: All 12 sections built and verified.

Tasks (one section at a time, verify per AGENTS.md section rule):
1. Hero → screenshot 4 viewports → verify
2. Story → verify
3. Villa (bento) → verify
4. Amenities → verify
5. Layout → verify
6. Gallery → verify
7. Experience → verify
8. Location (with map) → verify
9. Testimonials → verify
10. Pricing → verify
11. FAQ (accordion) → verify
12. Booking Form → verify (just UI, submit later)
13. Nav + Footer → verify

**DoD per section**:
- [ ] No horizontal overflow at 375px
- [ ] All breakpoints work
- [ ] Animations respect `prefers-reduced-motion`
- [ ] Linter clean
- [ ] Visual matches DESIGN.md

### Phase 5: Form + WhatsApp Integration
**Goal**: Form submits to WhatsApp + email backup.

Tasks:
1. Create `src/lib/whatsapp.ts` (generate message + link)
2. Create `src/lib/validators.ts` (Zod schema for booking form)
3. Build `BookingForm` client component with RHF + Zod
4. Create `submitBookingForm` Server Action with Resend
5. Wire form submit → preview modal → open WA + send email
6. Add `.env.example` with required keys
7. Test: Submit form locally, verify WA link + email received

**DoD**:
- [ ] Form validates all fields
- [ ] Error messages clear
- [ ] WA link opens with correct message
- [ ] Email backup sent
- [ ] No secrets in code

### Phase 6: Polish + Final QA
**Goal**: Production-ready, polished, fast.

Tasks:
1. Add scroll-reveal Intersection Observer to all sections
2. Add `prefers-reduced-motion` CSS
3. Run Lighthouse audit (target scores per section 10.1)
4. Test all 4 viewports (375, 768, 1280, 1920)
5. Run accessibility audit (manual + axe-core if available)
6. Optimize images (convert to AVIF, set sizes)
7. Add metadata (title, description, OG image per locale)
8. Add robots.txt, sitemap.xml
9. Add Schema.org `LodgingBusiness` JSON-LD
10. Add favicon, apple-touch-icon
11. Commit all changes
12. Deploy to Vercel
13. Verify live site

**DoD**:
- [ ] Lighthouse scores meet budget
- [ ] No horizontal overflow anywhere
- [ ] a11y clean (keyboard nav, screen reader, contrast)
- [ ] Bilingual complete
- [ ] All images optimized
- [ ] Live on Vercel

---

## 12. Open Questions

(To resolve during implementation, not blocking design)

1. **Real photos vs placeholders**: For portfolio demo, generate placeholder descriptions and use Unsplash CC0 images? Or use solid color blocks? Recommendation: Unsplash CC0 with specific Pangandaran/tropical villa search terms. **Note in design**: AI tells ban fake screenshots, but real photos with credit are fine.

2. **OG image**: Generate one per locale (ID + EN). Use hero image + brand name overlay. Tools: Figma or built with HTML→image.

3. **Map library SSR issue**: react-leaflet doesn't SSR. Use `dynamic(() => import('...'), { ssr: false })`. Fallback: iframe embed for no-JS users.

4. **WhatsApp number**: For demo, use `+62XXXXXXXXXX` placeholder. User can replace later via env var.

5. **Analytics**: Vercel Web Analytics (privacy-friendly, no cookie banner needed). Add in Phase 6.

---

## 13. Risks & Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Fictional data mistaken for real | High | Clear "FICTIONAL — demo only" disclaimers in code, AGENTS.md, and visible on site footer |
| Lighthouse scores below target | Medium | Phase 6 dedicated to perf, all images optimized, no heavy libs |
| next-intl App Router quirks | Medium | Pin to v3.x (proven with App Router), reference official docs |
| Leaflet bundle size | Low | Dynamic import, fallback to iframe |
| Bilingual content drift | Medium | TypeScript-enforced same keys, lint check for missing keys |

---

## 14. References

- `DESIGN.md` — Full design system
- `AGENTS.md` — Project context
- [next-intl docs](https://next-intl-docs.vercel.app/) — i18n setup
- [Next.js App Router](https://nextjs.org/docs/app) — Framework
- [Phosphor Icons](https://phosphoricons.com/) — Icon library
- [OpenStreetMap](https://www.openstreetmap.org/) — Map tiles (free)

---

## 📋 Approval Checklist

Before proceeding to implementation plan, confirm:

- [x] Brand identity: Mahoni House Pangandaran
- [x] Audience: family Indonesia + ekspatriat, group 6-10
- [x] Tech stack: Next.js 14 + TypeScript + Tailwind + next-intl
- [x] 12 sections, full structure
- [x] Bilingual (ID/EN) with locale routing
- [x] Form → WhatsApp + email backup
- [x] Visual: Tropical Modern, Lora + Plus Jakarta Sans
- [x] 6 implementation phases
- [x] Fictional but realistic content (clearly marked)

**Ready for implementation planning once approved.**

---

> **Next step after approval**: Invoke `writing-plans` skill to create detailed implementation plan with task breakdown.
