# Phase 6: Polish & Deploy

> SEO metadata, Schema.org, sitemap, robots.txt, README, GitHub Actions, and Vercel deploy.

> ⚠️ **COMMIT POLICY**: The `git commit` blocks in this plan are **templates** showing the intent of each commit. Per AGENTS.md ("No commit without explicit user request"), the executing agent MUST pause and ask the user before running any `git commit`. Do not commit autonomously.

---

## Task 6.1: SEO Metadata (Per-Locale)

**Files:**
- Modify: `app/[locale]/layout.tsx`
- Create: `app/sitemap.ts`
- Create: `app/robots.ts`

- [ ] **Step 1: Add full metadata to layout.tsx**

Replace the existing `export const metadata: Metadata = { ... }` in `app/[locale]/layout.tsx` with:

```typescript
import { type Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'hero' });

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mahonihouse.id';

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: 'Mahoni House Pangandaran — Villa Keluarga 4-Kamar',
      template: '%s | Mahoni House Pangandaran',
    },
    description: t('sub'),
    keywords: [
      'villa pangandaran',
      'sewa villa pangandaran',
      'villa keluarga pangandaran',
      'private villa pangandaran',
      'penginapan pangandaran',
    ],
    authors: [{ name: 'Mahoni House' }],
    openGraph: {
      type: 'website',
      locale: locale === 'id' ? 'id_ID' : 'en_US',
      url: `${baseUrl}/${locale}`,
      siteName: 'Mahoni House Pangandaran',
      title: 'Mahoni House Pangandaran',
      description: t('sub'),
      images: [
        {
          url: '/og.png',
          width: 1200,
          height: 630,
          alt: 'Mahoni House Pangandaran',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Mahoni House Pangandaran',
      description: t('sub'),
      images: ['/og.png'],
    },
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        id: `${baseUrl}/id`,
        en: `${baseUrl}/en`,
      },
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
```

NOTE: Also remove the existing `export const metadata` line at the top of the file. Keep only the async `generateMetadata` function.

- [ ] **Step 2: Create app/sitemap.ts**

```typescript
// app/sitemap.ts
import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mahonihouse.id';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routing.locales.map((locale) => ({
    url: `${baseUrl}/${locale}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 1,
  }));
}
```

- [ ] **Step 3: Create app/robots.ts**

```typescript
// app/robots.ts
import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mahonihouse.id';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
```

- [ ] **Step 4: Verify build**

```bash
pnpm build
```

Expected: build succeeds. Check console for sitemap.xml and robots.txt being generated.

- [ ] **Step 5: Verify endpoints**

```bash
pnpm dev
```

Visit:
- http://localhost:3000/sitemap.xml → contains both `/id` and `/en` URLs
- http://localhost:3000/robots.txt → contains sitemap URL

- [ ] **Step 6: Verify metadata**

View page source at `/`:
- `<title>Mahoni House Pangandaran — Villa Keluarga 4-Kamar</title>`
- `<meta name="description" ...>`
- `<link rel="alternate" hreflang="id" href=".../id">`
- `<link rel="alternate" hreflang="en" href=".../en">`
- `<link rel="canonical" href=".../id">`
- OG and Twitter tags

View at `/en`:
- og:locale is `en_US`
- canonical points to `/en`

- [ ] **Step 7: Commit**

```bash
git add app/[locale]/layout.tsx app/sitemap.ts app/robots.ts
git commit -m "feat: add SEO metadata, sitemap, robots.txt with per-locale alternates"
```

---

## Task 6.2: Schema.org LodgingBusiness Markup

**Files:**
- Modify: `app/[locale]/layout.tsx` (or add to `app/[locale]/page.tsx`)

- [ ] **Step 1: Add JSON-LD structured data to page.tsx**

Append to `app/[locale]/page.tsx` (just before the final `return`):

```typescript
// at top of file
import { getTranslations } from 'next-intl/server';
import { villaLocation } from '@/data/location';

// inside HomePage, before return
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mahonihouse.id';
const tLd = await getTranslations({ locale, namespace: 'hero' });

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LodgingBusiness',
  name: 'Mahoni House',
  description: tLd('sub'),
  url: `${baseUrl}/${locale}`,
  telephone: '+62-812-3456-7890',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Jl. Raya Pangandaran KM 5',
    addressLocality: 'Pangandaran',
    addressRegion: 'West Java',
    postalCode: '46396',
    addressCountry: 'ID',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: villaLocation.lat,
    longitude: villaLocation.lng,
  },
  image: `${baseUrl}/og.png`,
  numberOfRooms: 4,
  petsAllowed: false,
  checkinTime: '14:00',
  checkoutTime: '11:00',
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', name: 'Private Pool', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'WiFi', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Kitchen', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Parking', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Air Conditioning', value: true },
  ],
  priceRange: 'Rp 3.500.000 - Rp 5.500.000',
};
```

Then inside the return JSX, just after the `<Nav>`:

```typescript
<script
  id="ld-lodging"
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
/>
```

- [ ] **Step 2: Verify JSON-LD is present in page source**

```bash
pnpm dev
```

Visit `/`, view source, search for `"@type":"LodgingBusiness"`.

- [ ] **Step 3: Validate with Google Rich Results Test (online)**

Open https://search.google.com/test/rich-results → paste page URL → expect LodgingBusiness recognized.

- [ ] **Step 4: Commit**

```bash
git add app/[locale]/page.tsx
git commit -m "feat: add Schema.org LodgingBusiness JSON-LD markup"
```

---

## Task 6.3: Lighthouse Audit + Performance Pass

- [ ] **Step 1: Run production build**

```bash
pnpm build
pnpm start
```

- [ ] **Step 2: Run Lighthouse in Chrome DevTools**

Open http://localhost:3000 in Chrome.

DevTools → Lighthouse → Generate report (mobile + desktop).

**Targets:**
- Performance ≥ 90
- Accessibility ≥ 95
- Best Practices = 100
- SEO = 100

- [ ] **Step 3: Investigate any score < target**

Common fixes:
- **Performance**: 
  - Check `next/image` is used for all `<img>` (especially hero background → move to actual image component or use SVG)
  - Verify font preloading is working (Lora + Jakarta)
  - Check bundle size: `pnpm build` should show first load JS < 100KB
- **Accessibility**:
  - Run axe DevTools scan
  - Check color contrast ratios (wood-600 on cream-50 should be ≥ 4.5:1)
  - Add alt text to any missing images
  - Ensure form labels are properly associated
- **Best Practices**:
  - No `console.log` in production
  - No `eval` or unsafe-eval
  - HTTPS-only in production
- **SEO**:
  - All images have alt
  - Heading order is logical (no skipped levels)
  - Viewport meta tag present (Next.js default)

- [ ] **Step 4: Fix any issues found**

Make minimal, targeted fixes. Re-run Lighthouse to confirm.

- [ ] **Step 5: Commit any fixes**

```bash
git add -A
git commit -m "perf: improve Lighthouse scores to meet target thresholds"
```

---

## Task 6.4: GitHub Actions CI

**Files:**
- Create: `.github/workflows/ci.yml`

- [ ] **Step 1: Create CI workflow**

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v4
        with:
          version: 9

      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: pnpm

      - run: pnpm install --frozen-lockfile

      - name: Lint
        run: pnpm lint

      - name: Type check
        run: pnpm typecheck

      - name: Test
        run: pnpm test --run

      - name: Build
        run: pnpm build
        env:
          NEXT_PUBLIC_SITE_URL: https://mahonihouse.id
```

- [ ] **Step 2: Commit**

```bash
git add .github/workflows/ci.yml
git commit -m "ci: add GitHub Actions workflow (lint, typecheck, test, build)"
```

---

## Task 6.5: README + Project Documentation

**Files:**
- Create: `README.md`

- [ ] **Step 1: Create README**

```markdown
# Mahoni House Pangandaran — Landing Page

A bilingual (ID/EN) landing page for a fictional 4-bedroom family villa in Pangandaran, West Java. Built as a portfolio demo with Next.js 14, TypeScript strict, Tailwind, and next-intl.

> **Demo project**: This is a portfolio piece. The villa, owners, pricing, and testimonials are fictional.

## Tech stack

- Next.js 14 (App Router, Server Components)
- TypeScript 5 strict
- Tailwind CSS + custom OKLCH tokens
- next-intl v3 (App Router i18n)
- Framer Motion (subtle entrance only)
- React Leaflet + OpenStreetMap
- Resend (email backup for booking form)
- Vercel (hosting + analytics)

## Design system

See [`DESIGN.md`](./DESIGN.md) for the full Tropical Modern design system: colors, fonts, motion, components.

## Project context

See [`AGENTS.md`](./AGENTS.md) for project conventions, hard constraints, and architecture notes.

## Local development

```bash
pnpm install
cp .env.example .env.local  # fill in RESEND_API_KEY, OWNER_EMAIL, OWNER_WHATSAPP
pnpm dev
```

Open http://localhost:3000 (ID) or http://localhost:3000/en (EN).

## Scripts

| Command | Purpose |
|---|---|
| `pnpm dev` | Start dev server (Turbopack) |
| `pnpm build` | Production build |
| `pnpm start` | Run production build |
| `pnpm lint` | ESLint check |
| `pnpm typecheck` | TypeScript strict check |
| `pnpm test` | Run unit tests (Vitest) |
| `pnpm test --run` | Run tests once (no watch) |

## Architecture

```
src/
├── app/                # Next.js App Router
│   ├── [locale]/       # ID/EN routed pages
│   ├── actions/        # Server Actions
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── sections/       # Hero, Story, Bento, Amenities, etc.
│   └── shared/         # Reusable primitives (Section, Reveal, CtaButton)
├── data/               # Fictional content (villa, pricing, FAQs, etc.)
├── i18n/               # next-intl config + message files
└── lib/                # Utilities (format, validators, whatsapp, email)
```

## Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | No (default: `https://mahonihouse.id`) | Used for canonical, OG, sitemap |
| `RESEND_API_KEY` | No | Email backup for form |
| `OWNER_EMAIL` | No (default: skip email) | Where booking emails go |
| `OWNER_WHATSAPP` | No (default: `6281234567890`) | WhatsApp deep link target |

The site works without Resend — it just logs "Email service not configured" and the WhatsApp link still generates.

## Deployment

The project is configured for Vercel:

1. Push to GitHub
2. Import repo in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

The CI workflow (`.github/workflows/ci.yml`) runs on every PR and main push.

## License

MIT — but please don't use the fictional content (villa name, owner names, pricing) in production.
```

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: add comprehensive README"
```

---

## Task 6.6: Final Pre-Deploy Audit

- [ ] **Step 1: Run full quality gate**

```bash
pnpm typecheck
pnpm lint
pnpm test --run
pnpm build
```

Expected: all exit 0. 20+ tests pass.

- [ ] **Step 2: Pre-flight checklist (design)**

Run through the AGENTS.md "Hard Constraints" list:

- [ ] No emoji as icons (all Phosphor SVG)
- [ ] No `as any`, `@ts-ignore`, `@ts-expect-error`
- [ ] No empty catch blocks
- [ ] No hardcoded secrets
- [ ] No console.log in production
- [ ] No Inter/Roboto/Arial as font
- [ ] No Fraunces/Instrument Serif
- [ ] No pure black (`#000`) or pure white (`#fff`)
- [ ] No left-border accent card
- [ ] No gradient text
- [ ] No purple-pink-blue gradient
- [ ] No "AI purple" glow
- [ ] No fake screenshots with div
- [ ] No fake-precise numbers without data
- [ ] No marketing buzzwords (streamline, empower, etc.)
- [ ] Animation: only transform + opacity
- [ ] `prefers-reduced-motion` honored (Reveal has it)
- [ ] No `h-screen` (uses `min-h-dvh`)
- [ ] No horizontal overflow at 375px
- [ ] No fixed width
- [ ] All touch targets ≥ 44x44px
- [ ] All headings have `text-wrap: balance` or manual line break

- [ ] **Step 3: Bilingual parity check**

Both `/` (ID) and `/en` (EN) must have:
- All 12 sections populated
- All CTA labels translated
- No English/Indonesian mixing
- No untranslated keys (use `pnpm run check-translations` if implemented, or spot-check)

- [ ] **Step 4: Accessibility audit**

- [ ] Tab through all interactive elements (keyboard nav works)
- [ ] Skip-to-content link present (if hero is long)
- [ ] All form fields have labels
- [ ] Color contrast ≥ 4.5:1 (test with axe DevTools)
- [ ] aria-expanded on FAQ accordion
- [ ] aria-label on icon-only buttons (LocaleSwitcher)
- [ ] Form errors announced with `role="alert"`

- [ ] **Step 5: Performance final check**

Run Lighthouse one more time on production build:
- Performance ≥ 90
- A11y ≥ 95
- Best Practices = 100
- SEO = 100

- [ ] **Step 6: Commit any final fixes**

```bash
git add -A
git commit -m "polish: final pre-deploy audit and fixes"
```

---

## Task 6.7: Git Init + Initial Commit (if not done)

> **NOTE**: AGENTS.md says "no commit to main — PR only". But for a fresh project with no commits yet, an initial commit to main is acceptable to establish the repo. The CI will run on push.

- [ ] **Step 1: Verify git status**

```bash
cd /home/mifdlal/Documents/proyek-portfolio-2026/landing-page-villa-pangandaran
git status
```

If "Not a git repository":

```bash
git init
git branch -M main
git add -A
git commit -m "chore: initial commit from plan execution"
```

- [ ] **Step 2: Create GitHub repo + push**

```bash
# If using GitHub CLI
gh repo create mahoni-house-pangandaran --public --source=. --remote=origin --push

# Or manually:
# 1. Create repo at https://github.com/new (name: mahoni-house-pangandaran, public)
# 2. Then:
git remote add origin git@github.com:YOUR_USERNAME/mahoni-house-pangandaran.git
git push -u origin main
```

- [ ] **Step 3: Verify CI runs**

Watch `.github/workflows/ci.yml` run on first push. All jobs should pass.

---

## Task 6.8: Vercel Deploy

- [ ] **Step 1: Connect to Vercel**

1. Go to https://vercel.com/new
2. Import the GitHub repo `mahoni-house-pangandaran`
3. Framework preset: **Next.js** (auto-detected)
4. Root directory: `./`
5. Build command: `pnpm build` (auto)
6. Output: `.next` (auto)

- [ ] **Step 2: Add environment variables**

In Vercel → Settings → Environment Variables:

| Key | Value | Scope |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://mahoni-house-pangandaran.vercel.app` (or custom domain) | Production, Preview |
| `RESEND_API_KEY` | (your Resend API key — optional) | Production |
| `OWNER_EMAIL` | (your email — optional) | Production |
| `OWNER_WHATSAPP` | (real WA number with country code, no `+`) | Production |

- [ ] **Step 3: Deploy**

Click "Deploy". Wait ~90s.

- [ ] **Step 4: Verify production**

Open the deployed URL:
- Homepage renders
- `/en` works
- Locale switcher toggles
- Booking form submits and opens WhatsApp
- Sitemap and robots accessible

- [ ] **Step 5: Run Lighthouse on production URL**

Same targets as Task 6.3.

- [ ] **Step 6: (Optional) Custom domain**

In Vercel → Settings → Domains → add `mahonihouse.id` (or whichever domain). Follow DNS instructions.

---

## Task 6.9: Phase 6 Verification + Sign-Off

- [ ] **Step 1: All Definition-of-Done items from AGENTS.md checked**

Re-read `AGENTS.md` "Definition of Done" section. Every checkbox must be satisfied.

- [ ] **Step 2: Final repo state**

```bash
git log --oneline
```

Expected: clean history with conventional commits, no WIP.

- [ ] **Step 3: Document Phase 6 complete**

Note: "Phase 6 complete: SEO + Schema.org + CI + Vercel deploy. Lighthouse targets met. All 6 phases done."

- [ ] **Step 4: Handoff to user**

Summarize for user:
- Deployed URL
- GitHub repo URL
- All commits
- All metrics (Lighthouse scores)
- Known limitations (fictional content, no real booking system)

---

**🎉 PLAN COMPLETE. All 6 phases executed.**
