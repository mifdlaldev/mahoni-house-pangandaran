# Mahoni House Pangandaran — Project Context for AI

> **File ini dibaca otomatis oleh OpenCode setiap kali kamu kerja di project ini.**
> Edit sesuai project. Commit ke Git agar bisa di-share.
>
> 💡 **Tip**: Jawab dengan singkat & spesifik. Semakin jelas context-nya, semakin tepat output AI.

---

## 🎯 Project Overview

| Field | Value |
|---|---|
| **Nama Project** | Mahoni House Pangandaran — Landing Page |
| **Tipe** | Single-page landing (B2C hospitality) |
| **Tujuan** | Drive booking inquiries via WhatsApp untuk villa 4-kamar di Pangandaran |
| **Target User** | Keluarga Indonesia (Jabodetabek + Bandung, 30-50 th) + ekspatriat families; group 6-10 orang; long weekend / peak season |
| **Vibe / Design Direction** | Tropical Modern — warm, premium, family-first, grounded (bukan flashy) |
| **Bahasa** | Kode: English. UI copy: Bilingual ID (default) + EN. Comments: English. Commit messages: English. |

**Penjelasan singkat:**
> Fictional villa landing page untuk portfolio/demo. Real-world analogue: Airbnb Luxe listing untuk single private villa. Conversion: form submit → WhatsApp inquiry. SEO target: "villa pangandaran keluarga", "sewa villa pangandaran", "private villa pangandaran".

---

## 🛠 Tech Stack

### Core
- **Language**: TypeScript 5.x (strict mode)
- **Runtime**: Node.js 22 LTS
- **Framework**: Next.js 15.x (App Router, Server Components, async `params`)
- **Package Manager**: pnpm (preferred) — fallback npm
- **Build**: Next.js built-in (Turbopack for dev, webpack for prod)

### Frontend
- **Styling**: Tailwind CSS 4.x + `@theme` CSS variables (OKLCH design tokens)
- **UI Components**: shadcn/ui (manually added, not full install) — to be evaluated for v4 compatibility
- **Animation**: Framer Motion (subtle entrance only, not heavy)
- **Forms**: React Hook Form + Zod validation
- **State**: Server Components first; Zustand ONLY if absolutely needed
- **Data Fetching**: Native Server Components + Server Actions
- **Icons**: Phosphor React (regular weight)
- **Fonts**: next/font (Lora + Plus Jakarta Sans, self-hosted)

### Bilingual
- **i18n**: next-intl v4 (App Router, async params, `defineRouting` + `requestLocale` API)
- **Routing**: `/` (ID default) + `/en/` prefix
- **Content**: JSON message files in `src/i18n/messages/`

### Maps
- **Map**: react-leaflet + OpenStreetMap (no Google Maps API cost)
- **Embed**: Static iframe fallback for low-end devices

### Backend (minimal — mostly static)
- **API Style**: Server Actions (Next.js) for form submission
- **Form Handler**: Generate WhatsApp deep link + email backup via Resend (free tier)
- **No database** (Phase 1) — Phase 2+ might add CMS

### DevOps & Deploy
- **Hosting**: Vercel (free tier sufficient for landing page)
- **CI/CD**: GitHub Actions (lint + typecheck on PR)
- **Monitoring**: Vercel Analytics (built-in, no extra cost)
- **Email**: Resend (free tier 100 emails/day) for form backup
- **Analytics**: Vercel Web Analytics (privacy-friendly, no cookie banner needed)
- **Domain**: TBD (custom domain later via Vercel)

### Testing (Phase 2+)
- **Unit**: Vitest
- **E2E**: Playwright
- **A11y**: axe-core via Playwright

> **Catatan**: Untuk Phase 1 (MVP), focus pada build + manual verification. Test setup di Phase 2.

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

| Service | Purpose | Cost | Status |
|---|---|---|---|
| Vercel | Hosting + Analytics | Free tier | ✅ Confirmed |
| Resend | Email backup for form | Free tier (100/day) | 🟡 Setup later |
| OpenStreetMap | Map embed | Free (no API key) | ✅ Confirmed |
| WhatsApp | Primary booking channel | N/A (deep link) | ✅ Confirmed |

**No paid services in Phase 1.**

---

## 📂 File Reference

| File | Purpose |
|---|---|
| `DESIGN.md` | Design system: colors, fonts, motion, components |
| `AGENTS.md` | This file — AI project context |
| `docs/superpowers/specs/` | Design specs (from brainstorm sessions) |
| `docs/architecture/` | Architecture decisions (when needed) |
| `.env.example` | Environment variables template (no real values) |
| `.gitignore` | Git ignore rules (includes `.env.local`, `node_modules`, `.next`) |

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

## ✅ Definition of Done (per Phase)

### Phase 1: Foundation & All Sections
- [ ] `pnpm dev` jalan tanpa error
- [ ] `pnpm build` exit code 0
- [ ] `pnpm lint` exit code 0
- [ ] `pnpm typecheck` exit code 0 (strict mode, no `any`)
- [ ] Lighthouse: Performance ≥ 90, A11y ≥ 95, Best Practices = 100, SEO = 100
- [ ] Tested di 4 viewports: 375px, 768px, 1280px, 1920px
- [ ] Tidak ada horizontal overflow di mobile
- [ ] Tidak ada `as any`, `@ts-ignore`, empty catch
- [ ] Tidak ada emoji sebagai icon
- [ ] Tidak ada pure black/white
- [ ] `prefers-reduced-motion` honored
- [ ] Bilingual ID + EN semua section populated

### Phase 2: Polish & Optimization
- [ ] Real WhatsApp number integrated (deep link)
- [ ] Resend email backup configured + tested
- [ ] OpenStreetMap embed functional
- [ ] OG image + meta tags per locale
- [ ] Sitemap.xml generated
- [ ] robots.txt configured
- [ ] Schema.org `LodgingBusiness` markup

### Phase 3 (optional): CMS & Booking
- [ ] Sanity/Contentful integration (optional)
- [ ] Real availability calendar
- [ ] Payment integration (Midtrans/Xendit)

---

## 📊 Performance Budget

- **First load JS**: < 100KB gzipped
- **LCP**: < 2.5s on 4G simulated
- **CLS**: < 0.05
- **INP**: < 200ms
- **Image format**: AVIF → WebP → JPEG fallback
- **Font loading**: preload Lora Regular + Plus Jakarta Sans Regular, defer italics & bold

---

## 🧪 Testing Strategy (Phase 2+)

- **Manual per-section verify** (Phase 1): Build section → screenshot 4 viewports → verify → next
- **Unit tests** (Phase 2): Pure functions di `lib/` (format-date, currency, wa-link generator)
- **E2E** (Phase 2): Playwright smoke test — homepage loads, form submit generates WA link
- **A11y** (Phase 2): axe-core scan di CI

---

## 🔗 Related Files & Resources

- `DESIGN.md` — Full design system (read ini sebelum coding UI apapun)
- `~/.config/opencode/SOS/00-MINDSET.md` — Senior engineering mindset
- `~/.config/opencode/SOS/01-DECISION-FRAMEWORK.md` — Kapan tanya vs jalan
- `~/.config/opencode/SOS/02-VERIFICATION-LOOP.md` — Definition of done (4 levels)
- `~/.config/opencode/DOMAINS/` — Best practices per domain (security, api-design, dll)

---

## 📝 Changelog

| Date | Change | Author |
|---|---|---|
| 2026-06-05 | Initial AGENTS.md created from brainstorm session (villa, family, bilingual, form+WA, Tropical Modern) | Sisyphus |

---

> **When in doubt**: Re-read `DESIGN.md` + `SOS/00-MINDSET.md`. Kalau masih ambigu, tanya user (max 1 pertanyaan, multiple choice preferred).
