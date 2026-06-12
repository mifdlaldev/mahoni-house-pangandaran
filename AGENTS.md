# Mahoni House Pangandaran — Project Portfolio

> **Live demo**: https://mahoni-house-pangandaran.vercel.app  
> **Stack**: Next.js 15 · TypeScript 5 strict · Tailwind CSS 4 · next-intl v4

---

## 🎯 Project Overview

| Field                 | Value                                                                                                    |
| --------------------- | -------------------------------------------------------------------------------------------------------- |
| **Type**              | Single-page landing page (B2C hospitality)                                                               |
| **Purpose**           | Portfolio showcase — bilingual villa landing page with WhatsApp booking inquiry form                     |
| **Vibe**              | Tropical Modern — warm, premium, family-first, grounded                                                  |
| **Target**            | Families (group 6-10), weekend travelers. Indonesian (default) + English                                 |
| **Status**            | ✅ Complete — 17 commits, 24 unit tests, Lighthouse-ready                                               |

> Fictional villa "Mahoni House" in Pangandaran, West Java. Real-world analogue: Airbnb Luxe listing.  
> Booking flow: Fill form → Server Action (Zod validation) → WhatsApp deep link + Resend email backup.

---

## 🛠 Tech Stack

### Core

- **Language**: TypeScript 5.x (strict mode, no `any`, no `@ts-ignore`)
- **Runtime**: Node.js 22 LTS
- **Framework**: Next.js 15.5 (App Router, Server Components, async `params`)
- **Package Manager**: pnpm
- **Build**: Turbopack (dev) / webpack (prod)

### Frontend

- **Styling**: Tailwind CSS 4 + `@theme` CSS variables (OKLCH design tokens)
- **Animation**: CSS transitions + Intersection Observer scroll-reveal (no library)
- **Forms**: Native HTML form + Server Action + Zod validation (no form library)
- **Icons**: Phosphor React (regular weight)
- **Fonts**: next/font — Lora (display) + Plus Jakarta Sans (body)
- **Custom scrollbar**: 6px thin, forest-700 green

### Internationalization

- **next-intl v4**: App Router, `defineRouting` + `requestLocale` API
- **Routing**: `/` (ID) + `/en/` prefix
- **Messages**: JSON files in `src/i18n/messages/`
- **Validation**: Bilingual Zod error messages (locale-aware)

### Maps

- **react-leaflet** + OpenStreetMap (no paid API)
- **Leaflet**: Dynamic import (SSR disabled)

### Backend (static-first)

- **Server Actions**: Form submission handler
- **Validation**: Zod (locale-aware, bilingual errors)
- **Anti-spam**: Honeypot field + timestamp check + rate limiter (in-memory)
- **Email backup**: Resend (free tier, graceful fallback when unconfigured)
- **No database**: All content is static TypeScript data files

### Security

- Honeypot hidden field (bot detection)
- Timestamp anti-bot (reject < 3s submissions)
- Rate limiting (3 req/min/IP, in-memory)
- HTML sanitization (strip tags from all text inputs)
- `maxLength` constraints on all form fields
- No hardcoded secrets

### DevOps & Deploy

- **Hosting**: Vercel (free tier)
- **CI/CD**: GitHub Actions (lint → typecheck → test → build)
- **Analytics**: Vercel Web Analytics (privacy-friendly)
- **Email**: Resend (optional, free tier)

### Testing

- **Framework**: Vitest 4.x
- **Tests**: 24 unit tests (cn utility, IDR/date/phone formatting, Zod validators, WhatsApp message generator)
- **Approach**: Pure function tests (no DOM/component rendering needed)

---

## 📐 Architecture

```
src/
├── app/
│   ├── [locale]/         # ID/EN routed pages + layout
│   ├── actions/          # Server Actions (booking)
│   └── globals.css       # Tailwind 4 tokens + custom styles
├── components/
│   ├── sections/         # 14 sections (Hero, Gallery, Villa Bento, etc.)
│   └── shared/           # Primitives (Section, Reveal, CtaButton, LocaleSwitcher)
├── data/                 # 10 fictional data files (villa, pricing, FAQs, etc.)
├── i18n/                 # next-intl routing + request config + message files
└── lib/                  # Utilities (format, validators, WhatsApp, email, cn)
```

## 📸 Sections

| # | Section | Status |
|---|---------|--------|
| 1 | Nav (sticky + hamburger sidebar for mobile/tablet) | ✅ |
| 2 | Hero (full-viewport image + CTAs, centered on mobile) | ✅ |
| 3 | Story (owner narrative + couple photo) | ✅ |
| 4 | Villa Bento (5-card bento grid, clickable dialogs) | ✅ |
| 5 | Amenities (6 categorized amenities with icons) | ✅ |
| 6 | Layout (bedroom stats + 4 room config cards) | ✅ |
| 7 | Gallery (9 photos in masonry-like grid) | ✅ |
| 8 | Experience (6 nearby activities as cards) | ✅ |
| 9 | Location (Leaflet map + directions + WhatsApp) | ✅ |
| 10 | Testimonials (4 reviews) | ✅ |
| 11 | Pricing (3-tier cards) | ✅ |
| 12 | FAQ (10 accordion items) | ✅ |
| 13 | Booking Form (Server Action + Zod + WhatsApp) | ✅ |
| 14 | Footer (contact + connect links + copyright bar) | ✅ |
| — | 404 page (bilingual) | ✅ |
| — | Sitemap.xml + robots.txt | ✅ |
| — | Schema.org LodgingBusiness JSON-LD | ✅ |

---

## 📏 Coding Conventions

### TypeScript

- ✅ Strict mode enabled (tsconfig.json: `"strict": true`)
- ✅ No `any` type. Gunakan `unknown` + narrowing atau generic.
- ✅ No type suppression: `as any`, `@ts-ignore`, `@ts-expect-error` — NEVER.
- ✅ Prefer `type` over `interface` kecuali extendable
- ✅ Path aliases: `@/components`, `@/lib`, `@/data`, `@/i18n`, `@/styles`
- ✅ Import order: external → internal (`@/`) → relative (`./`)

### File & Folder Structure

- File naming: **kebab-case** untuk utilities (`format-date.ts`), **PascalCase** untuk components (`Hero.tsx`)
- Component naming: **PascalCase** untuk exported components
- Folder structure: **feature-based** untuk sections (`components/sections/hero/`), **layer-based** untuk lib
- Co-location: components, hooks, types dalam folder yang sama
- Server vs Client: default Server Component. Add `"use client"` only when needed (forms, animations, hooks)

### Style & Format

- Formatter: Prettier (Tailwind plugin enabled)
- Linter: ESLint (Next.js config + custom rules)
- Line length: 100 chars
- Indent: 2 spaces
- Quotes: single (`'`)
- Semicolons: yes
- Trailing comma: all

### Comments & Documentation

- JSDoc: required untuk exported utility functions di `lib/`
- Inline comments: English (technical) / Indonesia (business logic if needed)
- TODO format: `// TODO(name): description`
- Architecture decisions: `docs/architecture/`

### Git & Commits

- Branch: `main` (production), `feat/<name>` (features)
- Commits: Conventional Commits (feat:, fix:, chore:, docs:, style:, refactor:)
- No commit to main — PR only
- Squash merge by default
- Required checks: lint, typecheck, build

---

## 🚫 Hard Constraints (HARAM DILANGGAR)

### Global (dari AGENTS.md)

- ❌ **No emoji as icons** — pakai Phosphor React SVG
- ❌ **No `as any`, `@ts-ignore`, `@ts-expect-error`** — NEVER
- ❌ **No empty catch** `catch (e) {}` — selalu log + handle
- ❌ **No hardcoded secrets** di repo — pakai env vars (`.env.local` tidak di-commit)
- ❌ **No console.log** di production code — pakai proper logger atau hapus

### Frontend Design (dari DESIGN.md)

- ❌ **No Inter, Roboto, Arial, system-ui** sebagai heading atau body default
- ❌ **No Fraunces, Instrument Serif** sebagai default
- ❌ **No pure black (#000) atau pure white (#fff)** — pakai `ink-900` / `cream-50`
- ❌ **No left-border accent card** (`border-left: 4px solid X`)
- ❌ **No gradient text** (`background-clip: text`)
- ❌ **No purple-pink-blue gradient** di hero
- ❌ **No "AI purple" glow / neon** accents
- ❌ **No fake screenshots with div** — no "hand-built product preview"
- ❌ **No fake-precise numbers** (e.g., "increase by 247%") tanpa data real
- ❌ **No marketing buzzwords**: streamline, empower, supercharge, leverage, unleash, transform, seamless, world-class, cutting-edge, game-changer

### Animation

- ❌ **No animate width/height/top/left** — hanya `transform` dan `opacity`
- ❌ **No infinite animations** tanpa clear purpose
- ❌ **No motion tanpa `prefers-reduced-motion` support**
- ❌ **No `h-screen`** — pakai `min-h-dvh` instead

### Mobile & Responsive

- ❌ **No horizontal overflow** di mobile (test 375px)
- ❌ **No fixed width** yang tidak responsive (e.g., `width: 1200px`)
- ❌ **No touch target < 44x44px**
- ❌ **No text overflow** di heading (clamp + text-wrap balance)

### Project-specific

- ❌ **No Google Maps API** (cost) — pakai OpenStreetMap via react-leaflet
- ❌ **No database di Phase 1** — static + Server Actions only
- ❌ **No real booking system** (Phase 1) — form generate WhatsApp message
- ❌ **No fabricated reviews/stats** — kalau fictional, mark dengan disclaimer atau pakai realistic-but-marked
- ❌ **No fake "Mahoni House" listing** di real booking platforms (Airbnb, Traveloka) — ini portfolio/demo

---

## 🌍 External Services

| Service       | Purpose                 | Cost                | Status         |
| ------------- | ----------------------- | ------------------- | -------------- |
| Vercel        | Hosting + Analytics     | Free tier           | ✅ Confirmed   |
| Resend        | Email backup for form   | Free tier (100/day) | 🟡 Setup later |
| OpenStreetMap | Map embed               | Free (no API key)   | ✅ Confirmed   |
| WhatsApp      | Primary booking channel | N/A (deep link)     | ✅ Confirmed   |

**No paid services in Phase 1.**

---

## 📂 File Reference

| File                      | Purpose                                                           |
| ------------------------- | ----------------------------------------------------------------- |
| `DESIGN.md`               | Design system: colors, fonts, motion, components                  |
| `AGENTS.md`               | This file — AI project context                                    |
| `docs/superpowers/specs/` | Design specs (from brainstorm sessions)                           |
| `docs/architecture/`      | Architecture decisions (when needed)                              |
| `.env.example`            | Environment variables template (no real values)                   |
| `.gitignore`              | Git ignore rules (includes `.env.local`, `node_modules`, `.next`) |

> **No `CLIENT.md`** — ini portfolio project, bukan freelance.

---

## 🧠 Bilingual (ID/EN) — Quick Rules

1. **Default locale**: `id` (Indonesian) di `/`
2. **English**: `/en/` prefix
3. **JSON keys**: SAMA antara `id.json` dan `en.json` (enforced via TypeScript types)
4. **Tone**:
   - ID: hangat, sopan, sedikit puitis ("kami", "Anda")
   - EN: clear, warm, descriptive ("you", "we")
5. **Never hardcode strings** di components — selalu pakai `useTranslations()` atau props
6. **No mixed language** dalam satu locale file (kecuali brand names)

---

## 📐 Tech Architecture Quick Map

```
[Browser]
   ↓ HTTP
[Vercel Edge] → [Vercel Serverless Function]
   ↓                  ↓
[Static Assets]  [Next.js App Router]
   ↓                  ↓
[next/image]    [Server Components]
   ↓                  ↓
[Image CDN]     [Server Actions] → [Resend API] (email backup)
                     ↓
                 [wa.me deep link] (WhatsApp)
```

**No database di Phase 1.** Semua content di-hardcode di `src/data/*.ts` (villa info, pricing, FAQ, amenities, testimonials — semua fictional).

---

## ✅ Current Status

### All Phases Complete

- [x] `pnpm dev` jalan tanpa error
- [x] `pnpm build` exit code 0
- [x] `pnpm lint` exit code 0
- [x] `pnpm typecheck` exit code 0 (strict mode, no `any`)
- [x] 24 unit tests passing (cn, format, validators, WhatsApp)
- [x] Tidak ada `as any`, `@ts-ignore`, empty catch
- [x] Tidak ada emoji sebagai icon (Phosphor SVG)
- [x] Tidak ada pure black/white
- [x] `prefers-reduced-motion` honored
- [x] Bilingual ID + EN semua section populated
- [x] WhatsApp deep link functional
- [x] Resend email backup configured (graceful fallback)
- [x] OpenStreetMap embed functional (Leaflet)
- [x] OG image + meta tags per locale
- [x] Sitemap.xml generated
- [x] robots.txt configured
- [x] Schema.org `LodgingBusiness` markup

### Not Implemented (optional / Phase 2+)

- [ ] Lighthouse audit on production (pending deploy)
- [ ] E2E tests (Playwright)
- [ ] CMS integration (Sanity/Contentful)
- [ ] Payment integration (Midtrans/Xendit)

---

## 📊 Performance Budget

- **First load JS**: ~103 KB gzipped (target < 120 KB)
- **Images**: 4 MB total, ffmpeg-optimized JPEG at 1600px max width
- **No external font loading**: next/font self-hosts Lora + Jakarta
- **Image format**: All JPEG (16 files)

---

## 🧪 Testing

- **24 unit tests** across 4 test files:
  - `cn.test.ts` (4 tests) — Tailwind class merging
  - `format.test.ts` (7 tests) — IDR currency, localized date, phone normalization
  - `booking-validators.test.ts` (9 tests) — Zod schema validation
  - `whatsapp.test.ts` (4 tests) — Message generation + deep link
- Framework: Vitest 4.x with jsdom environment
- No DOM/component rendering tests (pure function tests)

---

## 🔗 Related Files & Resources

- `DESIGN.md` — Full design system (read ini sebelum coding UI apapun)
- `~/.config/opencode/SOS/00-MINDSET.md` — Senior engineering mindset
- `~/.config/opencode/SOS/01-DECISION-FRAMEWORK.md` — Kapan tanya vs jalan
- `~/.config/opencode/SOS/02-VERIFICATION-LOOP.md` — Definition of done (4 levels)
- `~/.config/opencode/DOMAINS/` — Best practices per domain (security, api-design, dll)

---

## 📝 Changelog

| Date       | Change                                                                                                 | Author   |
| ---------- | ------------------------------------------------------------------------------------------------------ | -------- |
| 2026-06-05 | Initial AGENTS.md created from brainstorm session (villa, family, bilingual, form+WA, Tropical Modern) | Sisyphus |

---

> **When in doubt**: Re-read `DESIGN.md` + `SOS/00-MINDSET.md`. Kalau masih ambigu, tanya user (max 1 pertanyaan, multiple choice preferred).
