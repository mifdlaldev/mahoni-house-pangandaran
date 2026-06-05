# Phase 3: Bilingual Foundation

> 6 tasks to set up next-intl v4 with ID/EN routing, messages, and LocaleSwitcher.

> ⚠️ **COMMIT POLICY**: The `git commit` blocks in this plan are **templates** showing the intent of each commit. Per AGENTS.md ("No commit without explicit user request"), the executing agent MUST pause and ask the user before running any `git commit`. Do not commit autonomously.

---

## Task 3.1: Setup next-intl Config

**Files:**
- Create: `src/i18n/routing.ts`
- Create: `src/i18n/request.ts`
- Create: `src/middleware.ts`
- Modify: `next.config.mjs`

- [ ] **Step 1: Create src/i18n/routing.ts**

```typescript
import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['id', 'en'] as const,
  defaultLocale: 'id',
  localePrefix: 'always',
});

export type Locale = (typeof routing.locales)[number];

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
```

- [ ] **Step 2: Create src/i18n/request.ts**

```typescript
import { getRequestConfig } from 'next-intl/server';
import { routing, type Locale } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
```

- [ ] **Step 3: Create src/middleware.ts**

```typescript
import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
```

- [ ] **Step 4: Update next.config.mjs**

```javascript
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default withNextIntl(nextConfig);
```

- [ ] **Step 5: Commit**

```bash
git add src/i18n/ middleware.ts next.config.mjs
git commit -m "feat: setup next-intl routing and middleware"
```

---

## Task 3.2: Create id.json Messages

**Files:**
- Create: `src/i18n/messages/id.json`

- [ ] **Step 1: Create Indonesian messages**

```json
{
  "nav": {
    "villa": "Villa",
    "amenities": "Fasilitas",
    "gallery": "Galeri",
    "experience": "Aktivitas",
    "pricing": "Harga",
    "contact": "Kontak",
    "book": "Cek Ketersediaan"
  },
  "hero": {
    "eyebrow": "WELCOME TO",
    "title": "Mahoni House",
    "tagline": "Tempat keluarga desacelerasi di tepi laut",
    "sub": "Villa 4-kamar dengan kolam renang pribadi, 5 menit dari Pantai Karapyak",
    "primaryCta": "Cek Ketersediaan",
    "secondaryCta": "Lihat cerita kami ↓"
  },
  "story": {
    "eyebrow": "OUR STORY",
    "signature": "— Asep & Lina, Pemilik & Pengelola"
  },
  "villa": {
    "eyebrow": "THE VILLA",
    "title": "Ruang yang dibuat untuk bersama"
  },
  "amenities": {
    "eyebrow": "AMENITIES",
    "title": "Semua yang Anda butuhkan",
    "alsoIncluded": "Termasuk juga"
  },
  "layout": {
    "eyebrow": "LAYOUT",
    "title": "Ruang untuk seluruh keluarga",
    "stats": {
      "bedrooms": "Kamar Tidur",
      "guests": "Tamu Maks",
      "bathrooms": "Kamar Mandi",
      "area": "Luas Bangunan"
    },
    "bedConfig": "Konfigurasi tempat tidur"
  },
  "gallery": {
    "eyebrow": "GALLERY",
    "title": "Lihat lebih dekat"
  },
  "experience": {
    "eyebrow": "EXPERIENCE",
    "title": "Lebih dari sekadar villa",
    "sub": "Hal-hal yang bisa Anda nikmati di sekitar Pangandaran"
  },
  "location": {
    "eyebrow": "LOCATION",
    "title": "Lokasi",
    "howToGet": "Cara ke sini",
    "landmarks": "Landmark terdekat",
    "directionsCta": "Minta arah via WhatsApp"
  },
  "testimonials": {
    "eyebrow": "TESTIMONIALS",
    "title": "Apa kata tamu kami",
    "disclaimer": "Testimoni dari tamu nyata — untuk demo ini, nama-nama sudah disesuaikan."
  },
  "pricing": {
    "eyebrow": "PRICING",
    "title": "Tarif menginap",
    "sub": "Harga per malam, sudah termasuk pajak",
    "perNight": "/ malam",
    "includes": "Termasuk",
    "excludes": "Tidak termasuk",
    "mostPopular": "PALING POPULER",
    "bookCta": "Pesan"
  },
  "faq": {
    "eyebrow": "FAQ",
    "title": "Pertanyaan yang sering ditanya"
  },
  "booking": {
    "eyebrow": "BOOK NOW",
    "title": "Cek ketersediaan",
    "sub": "Isi form di bawah, kami balas via WhatsApp dalam 1 jam (09.00–21.00 WIB)",
    "checkIn": "Check-in",
    "checkOut": "Check-out",
    "guests": "Jumlah tamu",
    "name": "Nama lengkap",
    "email": "Email",
    "phone": "No. WhatsApp",
    "requests": "Permintaan khusus (opsional)",
    "agreement": "Saya menyetujui syarat & ketentuan yang berlaku",
    "submit": "Kirim via WhatsApp",
    "sending": "Mengirim...",
    "success": "Terkirim! Cek WhatsApp Anda.",
    "terms": "syarat & ketentuan"
  },
  "footer": {
    "tagline": "Villa keluarga di pesisir Pangandaran",
    "quickLinks": "Tautan Cepat",
    "contact": "Kontak",
    "copyright": "© 2026 Mahoni House. Portfolio demo project.",
    "builtWith": "Built with Next.js · Hosted on Vercel"
  },
  "langSwitcher": {
    "label": "Bahasa"
  }
}
```

- [ ] **Step 2: Validate JSON**

```bash
node -e "JSON.parse(require('fs').readFileSync('src/i18n/messages/id.json'))" && echo OK
```

- [ ] **Step 3: Commit**

```bash
git add src/i18n/messages/id.json
git commit -m "feat: add Indonesian translation messages"
```

---

## Task 3.3: Create en.json Messages

**Files:**
- Create: `src/i18n/messages/en.json`

- [ ] **Step 1: Create English messages**

```json
{
  "nav": {
    "villa": "Villa",
    "amenities": "Amenities",
    "gallery": "Gallery",
    "experience": "Experience",
    "pricing": "Pricing",
    "contact": "Contact",
    "book": "Check Availability"
  },
  "hero": {
    "eyebrow": "WELCOME TO",
    "title": "Mahoni House",
    "tagline": "Where family slows down by the sea",
    "sub": "A four-bedroom villa with a private pool, 5 min from Karapyak Beach",
    "primaryCta": "Check Availability",
    "secondaryCta": "Watch our story ↓"
  },
  "story": {
    "eyebrow": "OUR STORY",
    "signature": "— Asep & Lina, Owners & Hosts"
  },
  "villa": {
    "eyebrow": "THE VILLA",
    "title": "Spaces made for gathering"
  },
  "amenities": {
    "eyebrow": "AMENITIES",
    "title": "Everything you need",
    "alsoIncluded": "Also included"
  },
  "layout": {
    "eyebrow": "LAYOUT",
    "title": "Room for the whole family",
    "stats": {
      "bedrooms": "Bedrooms",
      "guests": "Max Guests",
      "bathrooms": "Bathrooms",
      "area": "Building Area"
    },
    "bedConfig": "Bed configuration"
  },
  "gallery": {
    "eyebrow": "GALLERY",
    "title": "Take a closer look"
  },
  "experience": {
    "eyebrow": "EXPERIENCE",
    "title": "More than just a villa",
    "sub": "Things to enjoy around Pangandaran"
  },
  "location": {
    "eyebrow": "LOCATION",
    "title": "Location",
    "howToGet": "How to get here",
    "landmarks": "Nearby landmarks",
    "directionsCta": "Get directions via WhatsApp"
  },
  "testimonials": {
    "eyebrow": "TESTIMONIALS",
    "title": "What our guests say",
    "disclaimer": "Reviews from real guests — for this demo, names have been adjusted."
  },
  "pricing": {
    "eyebrow": "PRICING",
    "title": "Stay rates",
    "sub": "Price per night, tax included",
    "perNight": "/ night",
    "includes": "Includes",
    "excludes": "Excludes",
    "mostPopular": "MOST POPULAR",
    "bookCta": "Book"
  },
  "faq": {
    "eyebrow": "FAQ",
    "title": "Frequently asked questions"
  },
  "booking": {
    "eyebrow": "BOOK NOW",
    "title": "Check availability",
    "sub": "Fill the form below, we'll reply via WhatsApp within 1 hour (09.00–21.00 WIB)",
    "checkIn": "Check-in",
    "checkOut": "Check-out",
    "guests": "Guests",
    "name": "Full name",
    "email": "Email",
    "phone": "WhatsApp number",
    "requests": "Special requests (optional)",
    "agreement": "I agree to the terms & conditions",
    "submit": "Send via WhatsApp",
    "sending": "Sending...",
    "success": "Sent! Check your WhatsApp.",
    "terms": "terms & conditions"
  },
  "footer": {
    "tagline": "A family villa on the Pangandaran shore",
    "quickLinks": "Quick Links",
    "contact": "Contact",
    "copyright": "© 2026 Mahoni House. Portfolio demo project.",
    "builtWith": "Built with Next.js · Hosted on Vercel"
  },
  "langSwitcher": {
    "label": "Language"
  }
}
```

- [ ] **Step 2: Validate both files and check key parity**

```bash
node -e "
const id = require('./src/i18n/messages/id.json');
const en = require('./src/i18n/messages/en.json');
const idKeys = JSON.stringify(Object.keys(id).sort());
const enKeys = JSON.stringify(Object.keys(en).sort());
if (idKeys !== enKeys) { console.error('KEY MISMATCH'); process.exit(1); }
console.log('OK: same top-level keys');
"
```

Expected: `OK: same top-level keys`

- [ ] **Step 3: Commit**

```bash
git add src/i18n/messages/en.json
git commit -m "feat: add English translation messages"
```

---

## Task 3.4: Create LocaleSwitcher Component

**Files:**
- Create: `src/components/shared/locale-switcher.tsx`

- [ ] **Step 1: Create LocaleSwitcher**

```typescript
'use client';

import { useState } from 'react';
import { Globe } from '@phosphor-icons/react/dist/ssr';
import { usePathname, useRouter, type Locale } from '@/i18n/routing';

export function LocaleSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, setIsPending] = useState(false);

  const targetLocale: Locale = currentLocale === 'id' ? 'en' : 'id';

  const handleSwitch = async () => {
    setIsPending(true);
    router.replace(pathname, { locale: targetLocale });
  };

  return (
    <button
      onClick={handleSwitch}
      disabled={isPending}
      className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium text-cream-50/90 transition-colors hover:bg-cream-50/10 disabled:opacity-50"
      aria-label={`Switch to ${targetLocale === 'id' ? 'Indonesian' : 'English'}`}
    >
      <Globe size={16} weight="regular" aria-hidden="true" />
      <span className="uppercase tracking-wider">{currentLocale}</span>
    </button>
  );
}
```

- [ ] **Step 2: Verify typecheck**

```bash
pnpm typecheck
```

- [ ] **Step 3: Commit**

```bash
git add src/components/shared/locale-switcher.tsx
git commit -m "feat: add LocaleSwitcher client component"
```

---

## Task 3.5: Update Root Layout for i18n

**Files:**
- Delete: `app/layout.tsx`
- Create: `app/[locale]/layout.tsx`
- Create: `app/[locale]/page.tsx`

- [ ] **Step 1: Delete old layout**

```bash
rm app/layout.tsx
```

- [ ] **Step 2: Create app/[locale]/layout.tsx**

```typescript
import type { Metadata } from 'next';
import { Lora, Plus_Jakarta_Sans } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import '../globals.css';

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

export const metadata: Metadata = {
  title: {
    default: 'Mahoni House Pangandaran',
    template: '%s | Mahoni House Pangandaran',
  },
  description:
    'A four-bedroom villa with a private pool on the western shore of Pangandaran. Family-managed.',
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${lora.variable} ${jakarta.variable}`}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Create app/[locale]/page.tsx (placeholder)**

```typescript
import { getTranslations, setRequestLocale } from 'next-intl/server';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'hero' });

  return (
    <main className="min-h-dvh bg-cream-50 p-12">
      <p className="text-xs uppercase tracking-wider text-wood-500">
        {t('eyebrow')}
      </p>
      <h1 className="mt-2 font-display text-5xl text-forest-900">
        {t('title')} <span className="text-ink-400">({locale})</span>
      </h1>
      <p className="mt-4 font-body text-lg italic text-forest-700">
        {t('tagline')}
      </p>
    </main>
  );
}
```

> ⚠️ **Why `getTranslations` not `useTranslations`**: `useTranslations` is the **client** hook from `next-intl`. Server Components must use `getTranslations` from `next-intl/server` (an async function). Using `useTranslations` in a server component throws at runtime.

- [ ] **Step 4: Verify dev server with i18n**

```bash
pnpm dev
```

Open:
- http://localhost:3000 → Indonesian
- http://localhost:3000/en → English

Both render correctly with different lang attributes.

- [ ] **Step 5: Commit**

```bash
git add app/
git commit -m "feat: setup i18n-aware root layout and homepage placeholder"
```

---

## Task 3.6: Phase 3 Verification

- [ ] **Step 1: Run all checks**

```bash
pnpm typecheck
pnpm lint
pnpm build
```

Expected: all exit 0.

- [ ] **Step 2: Test locale switching**

```bash
pnpm dev
```

Navigate `/` → see ID. Visit `/en` → see EN.

- [ ] **Step 3: Document Phase 3 complete**

Note: "Phase 3 complete: i18n routing works, ID+EN messages loaded."

---

**Proceed to: `2026-06-05-villa-pangandaran-landing-04-sections.md`**
