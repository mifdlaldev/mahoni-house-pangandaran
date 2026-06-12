# DESIGN.md — Mahoni House Pangandaran

> **Design system single-source-of-truth** untuk project ini.
> File ini auto-referenced oleh OpenCode saat kerja di project.
> Edit dengan hati-hati — setiap perubahan akan dipakai di seluruh codebase.

**Project**: Mahoni House Pangandaran — Landing Page Villa
**Last updated**: 2026-06-05
**Status**: ✅ Active design system

---

## 🎯 Brand & Feeling

### Deskripsi singkat

```
Landing page bilingual (ID/EN) untuk villa 4-kamar di pesisir barat Pangandaran.
Dikelola keluarga lokal. Target audiens: keluarga Indonesia + ekspatriat yang
mencari liburan keluarga premium di pesisir selatan Jawa, dengan vibe hangat,
grounded, dan tidak pretentious.
```

### Referensi brand (vibe yang dicontek)

- **Airbnb Luxe** — photography-first, generous whitespace, editorial copy
- **Aman Resorts** — restrained luxury, warm earth tones, quiet confidence
- **Six Senses** — nature-immersed, wellness-adjacent, family-warm
- **Habitas** — barefoot luxury, tropical modern, plant-forward
- **One Fine Stay** — premium vacation rentals, photography-driven, warm hospitality

### Target audiens

```
Demografi:
  - Indonesia: keluarga urban Jabodetabek + Bandung, 30-50 tahun, middle-to-upper
  - Ekspatriat: families tinggal di Jakarta/Bali, weekend escape
  - Group size: 6-10 orang (extended family atau beberapa keluarga kecil)
  - Trip type: long weekend (3-4 hari) atau peak season (Lebaran, Natal, summer)

Psikografi:
  - Mencari "rumah kedua" yang lebih personal dari hotel
  - Suka fotografi, instagrammable tapi tidak flashy
  - Privilege valued, tidak suka keramaian turis
  - Anak usia 5-15 tahun (perlu kid-friendly amenities)
```

---

## 🎨 Color System (Tropical Modern)

> Simpan sebagai CSS custom properties di `src/styles/tokens.css`, lalu map ke Tailwind config.
> Format: HEX untuk referensi visual, OKLCH untuk production tokens (perceptual uniformity).

### Production Tokens (OKLCH)

```css
:root {
  /* Forest — Primary brand */
  --color-forest-900: oklch(20% 0.025 165); /* #1A2E25 — heading text on cream */
  --color-forest-700: oklch(32% 0.045 165); /* #2D4A3E — primary CTA, hero overlay */
  --color-forest-500: oklch(48% 0.055 165); /* #4A6B5C — hover, secondary */
  --color-forest-200: oklch(82% 0.025 165); /* #C5D3CB — soft accent, dividers */

  /* Cream — Background scale */
  --color-cream-50: oklch(97% 0.012 85); /* #F8F4ED — page bg */
  --color-cream-100: oklch(94% 0.02 85); /* #F4EDE4 — card bg, alt sections */
  --color-cream-200: oklch(89% 0.03 85); /* #E8DCC8 — deeper alt */

  /* Wood — Warm accent */
  --color-wood-500: oklch(65% 0.075 75); /* #B8956A — borders, dividers, badges */
  --color-wood-700: oklch(45% 0.075 60); /* #8B6A40 — strong wood, link hover */

  /* Ink — Text scale */
  --color-ink-900: oklch(18% 0.008 165); /* #1A1F1C — body text */
  --color-ink-600: oklch(40% 0.012 165); /* #4A504B — muted text */
  --color-ink-400: oklch(60% 0.01 165); /* #828A82 — disabled, placeholders */
}
```

### Reference HEX (untuk design tools / handoff)

| Token        | HEX       | Use case                             |
| ------------ | --------- | ------------------------------------ |
| `forest-900` | `#1A2E25` | Headings, body text on cream         |
| `forest-700` | `#2D4A3E` | Primary CTA, hero text, footer bg    |
| `forest-500` | `#4A6B5C` | Hover state, secondary buttons       |
| `forest-200` | `#C5D3CB` | Soft dividers, badge bg              |
| `cream-50`   | `#F8F4ED` | Page background                      |
| `cream-100`  | `#F4EDE4` | Card background, alt section bg      |
| `cream-200`  | `#E8DCC8` | Deeper alt, decorative shapes        |
| `wood-500`   | `#B8956A` | Borders, dividers, icon accents      |
| `wood-700`   | `#8B6A40` | Hover state for wood, link underline |
| `ink-900`    | `#1A1F1C` | Body text (NOT pure black)           |
| `ink-600`    | `#4A504B` | Muted text, captions                 |
| `ink-400`    | `#828A82` | Placeholders, disabled               |

### Color Usage Rules

- **Primary CTA**: `forest-700` background + `cream-50` text. Hover: `forest-500` bg.
- **Secondary CTA**: transparent bg + `forest-700` border + `forest-700` text. Hover: `cream-100` bg.
- **Body text**: `ink-900` on `cream-50/100` backgrounds. **Contrast ratio ≥ 7:1** (WCAG AAA).
- **Hero overlay**: linear gradient from `forest-900/60` (bottom) to transparent (top) — never opaque.
- **Section alternation**: `cream-50` → `cream-100` → `cream-50` (subtle, not stripey).
- **Borders**: 1px `wood-500/40` (40% opacity) — soft, premium feel.

### 🚫 Color DILARANG (HARAM)

- ❌ Pure black (`#000000`) — gunakan `ink-900` (#1A1F1C)
- ❌ Pure white (`#FFFFFF`) — gunakan `cream-50` (#F8F4ED)
- ❌ Beige/cream sebagai "default" tanpa konteks brand (kami boleh karena brand)
- ❌ Purple-pink-blue gradient (AI slop)
- ❌ "AI purple" glow / neon accents
- ❌ Gradient text (`background-clip: text`)
- ❌ `border-left: 4px solid` accent pada card (AI tell)

---

## 🔤 Typography

### Font Pairing

```css
--font-display: 'Lora', Georgia, serif; /* Warm modern serif */
--font-body: 'Plus Jakarta Sans', sans-serif; /* Modern geometric sans */
--font-mono: 'JetBrains Mono', monospace; /* Untuk nomor telepon, kode booking */
```

### Font Sources (next/font)

- **Lora**: Variable font dari Google Fonts. Import weights 400, 500, 600, 700.
- **Plus Jakarta Sans**: Variable font. Import weights 300, 400, 500, 600, 700.
- Self-host via `next/font/google` (no external CDN, no CLS).

### Type Scale (Mobile-first, clamp-based)

| Token              | Mobile          | Desktop         | Use                     |
| ------------------ | --------------- | --------------- | ----------------------- |
| `text-display-2xl` | 2.5rem / 1.05   | 4rem / 1.0      | Hero h1, max 2 lines    |
| `text-display-xl`  | 2rem / 1.1      | 3rem / 1.05     | Section h2              |
| `text-display-lg`  | 1.625rem / 1.15 | 2.25rem / 1.1   | Subsection h3           |
| `text-display-md`  | 1.375rem / 1.2  | 1.75rem / 1.15  | Card h4                 |
| `text-body-lg`     | 1.0625rem / 1.6 | 1.125rem / 1.65 | Lead paragraph          |
| `text-body`        | 1rem / 1.65     | 1rem / 1.7      | Default body            |
| `text-body-sm`     | 0.875rem / 1.55 | 0.9375rem / 1.6 | Captions, meta          |
| `text-eyebrow`     | 0.75rem / 1.4   | 0.8125rem / 1.4 | Uppercase tracked label |

> Display sizes menggunakan `clamp(min, vw, max)`. Letter-spacing: -0.04em untuk display, 0.02em untuk eyebrow.
> Body max-width: **68ch** (1 paragraph ideal reading line).

### Typography Rules

- **Headings (h1-h3)**: `text-wrap: balance`
- **Paragraphs (p)**: `text-wrap: pretty`
- **Display headings**: NEVER lebih dari 2 baris di hero. Use `text-balance`.
- **Italic display**: Lora italic untuk tagline, kutipan testimonial (occasional, tidak overuse).
- **Body**: Plus Jakarta Sans. NEVER Inter, Roboto, Arial, system-ui.
- **No uppercase tracking (eyebrow) di SETIAP section** — max 1 per 3 sections.

### 🚫 Font DILARANG (HARAM)

- ❌ Inter (semua role) — gunakan Plus Jakarta Sans
- ❌ Roboto, Arial, system-ui (heading)
- ❌ Fraunces atau Instrument Serif sebagai default
- ❌ Em dash (—) sebagai dekorasi tipografi
- ❌ Fake "minimal" copy dengan letter-spacing ekstrem

---

## 📐 Spacing & Layout

### 8-Point Grid

```css
--space-1: 0.25rem; /* 4px */
--space-2: 0.5rem; /* 8px */
--space-3: 0.75rem; /* 12px */
--space-4: 1rem; /* 16px */
--space-5: 1.25rem; /* 20px */
--space-6: 1.5rem; /* 24px */
--space-8: 2rem; /* 32px */
--space-10: 2.5rem; /* 40px */
--space-12: 3rem; /* 48px */
--space-16: 4rem; /* 64px */
--space-20: 5rem; /* 80px */
--space-24: 6rem; /* 96px */
--space-32: 8rem; /* 128px */
--space-40: 10rem; /* 160px */
```

### Spacing Rules

- **Section vertical padding**: `space-20` (80px) mobile → `space-32` (128px) desktop
- **Container max-width**: `1200px` (centered, 24px padding horizontal mobile, 32px desktop)
- **Card inner padding**: `space-8` (32px) desktop, `space-6` (24px) mobile
- **Gutter between cards**: `space-4` (16px) — yes, less than half padding
- **Hero min-height**: `min-h-dvh` (NOT `h-screen`)
- **Nav max-height**: 80px desktop, 64px mobile

### Breakpoints

```
375px  — iPhone SE (minimum support)
640px  — sm
768px  — md (tablet)
1024px — lg (laptop)
1280px — xl (desktop, primary target)
1536px — 2xl
1920px — large desktop (max)
```

### Layout Patterns

- **CSS Grid** untuk page-level (12-col grid).
- **Flexbox** untuk component-level (button group, nav items, card internals).
- **Bento grid**: anchor cell 1.5-2x lebih besar dari cells lain.
- **Asymmetric fractions**: `1.2fr 0.8fr 1fr`, `2fr 1fr` untuk 2-col splits.
- **Mobile**: collapse 4col → 2col → 1col progressively.

---

## 🎬 Motion & Micro-interactions

### Timing

```css
--duration-fast: 150ms; /* Hover, focus rings */
--duration-base: 250ms; /* Default transitions */
--duration-slow: 400ms; /* Section reveals, page transitions */
```

### Easing

```css
--ease-out: cubic-bezier(0.16, 1, 0.3, 1); /* Entry, default */
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1); /* Toggle, expand */
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1); /* Micro-bounce */
```

### Animation Properties

> **HANYA animasikan `transform` dan `opacity`.** JANGAN animate `width`, `height`, `top`, `left`.

| Pattern            | Property                             | Duration | Easing      |
| ------------------ | ------------------------------------ | -------- | ----------- |
| Entrance (fade-up) | `translateY(12px)` + `opacity 0 → 1` | 400ms    | ease-out    |
| Stagger children   | 60ms delay between siblings          | —        | ease-out    |
| Card hover         | `scale(1.02)`                        | 200ms    | ease-out    |
| Button hover       | bg color shift                       | 150ms    | ease-out    |
| Button :active     | `scale(0.97)`                        | 100ms    | ease-out    |
| Link underline     | width 0 → 100%                       | 200ms    | ease-out    |
| Image hover        | `scale(1.05)` + slight zoom          | 400ms    | ease-out    |
| Modal open         | `scale(0.95)` + `opacity 0 → 1`      | 200ms    | ease-out    |

### Scroll Reveal

- Pakai **Intersection Observer** (vanilla, no library).
- Trigger: `threshold: 0.15` (15% visible).
- Once-only (no repeat on re-scroll up).
- All scroll-revealed elements: `prefers-reduced-motion` aware.

### `prefers-reduced-motion`

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 🧩 Component Patterns

### Button

```
Primary: bg forest-700, text cream-50, hover bg forest-500, active scale(0.97)
Secondary: bg transparent, border forest-700, text forest-700, hover bg cream-100
Ghost: bg transparent, text forest-700, hover underline grow
Destructive: bg red-700, text white, hover bg red-800
```

- **Label format**: Verb + object ("Check Availability", "Send Message") — NEVER "OK" / "Click here"
- **Size**: sm (h-9) / md (h-11) / lg (h-12)
- **Min-width**: 120px (avoid narrow buttons)
- **Loading state**: spinner icon + label "Sending..."

### Card

- Background: `cream-100` (or transparent on cream-50 page)
- Border: 1px `wood-500/40`
- Border-radius: 12px (md) / 16px (lg)
- Shadow: **none default**. Shadow only on hover (subtle): `0 4px 12px oklch(0% 0 0 / 0.06)`
- Padding: 24px mobile / 32px desktop
- Hover: `scale(1.02)` + shadow reveal
- **NO left-border accent** (border-left: 4px solid)
- **NO card dengan pattern identik** dalam grid — variasikan layout

### Form Input

- Label di ATAS input
- Helper text di BAWAH input (optional, grey)
- Error message di BAWAH input, red text, replace helper
- Border: 1px `ink-400`, focus: 2px `forest-700` (no glow)
- Border-radius: 8px
- Min-height: 44px (touch target)

### Icon

- Library: **Phosphor Icons** (regular weight, 24px default)
- **NO emoji as icons** (use SVG)
- **NO Lucide / Tabler mix** — pick one library per project

### Image

- Always `next/image` with `sizes` prop
- Aspect ratios defined: `16:9` hero, `4:3` cards, `1:1` avatars
- Lazy load below fold
- Blur placeholder: solid `cream-200` color (no LQIP complexity)
- Alt text: required, descriptive (no "image1.jpg")

---

## 📱 Responsive Strategy

### Mobile-first (375px baseline)

- All components designed mobile first, then progressively enhanced.
- Hero: full-width image, headline clamp 2.5rem → 4rem.
- Bento: 4col → 2col → 1col at 1024/768/0.
- Nav: hamburger drawer below 1024px, single-line above.
- Form: single column mobile, two-column (dates side-by-side) on md+.

### Touch Targets

- Minimum 44x44px untuk semua interactive elements.
- Padding internal: 12px minimum.
- Spacing between targets: 8px minimum.

### Tested Viewports

- 375px (iPhone SE) — minimum
- 768px (iPad) — tablet
- 1280px (laptop) — primary desktop
- 1920px (large) — max

---

## 🌍 Bilingual (ID/EN) System

### Routing

- Default: Indonesian at `/`
- English: `/en/`
- `next-intl` middleware handles locale detection
- Locale switcher: globe icon + current lang code in nav

### Tone per Language

| Aspect    | Indonesian                                       | English                                      |
| --------- | ------------------------------------------------ | -------------------------------------------- |
| Voice     | Hangat, sopan, sedikit puitis                    | Clear, warm, descriptive                     |
| Pronouns  | "Anda" / "kami" (formal-respectful)              | "you" / "we"                                 |
| Headlines | Lebih emosional ("Tempat keluarga desacelerasi") | Lebih deskriptif ("Where family slows down") |
| CTA       | "Cek Ketersediaan" / "Pesan Sekarang"            | "Check Availability" / "Book Now"            |
| Captions  | Lebih panjang, naratif                           | Lebih ringkas                                |

### File Structure

```
src/i18n/
  ├── messages/
  │   ├── id.json
  │   └── en.json
  ├── routing.ts
  └── request.ts
```

Both `id.json` and `en.json` MUST have the **same keys** (enforced via TypeScript types).

---

## ♿ Accessibility (WCAG 2.1 AA)

- **Contrast**: body text ≥ 4.5:1, large text ≥ 3:1 (we aim for AAA on body).
- **Focus rings**: visible on ALL interactive elements (2px forest-700 outline, 2px offset).
- **Alt text**: required for all images, descriptive (no decorative "image1").
- **Form labels**: programmatically associated, never placeholder-only.
- **Skip link**: "Skip to main content" as first focusable element.
- **Reduced motion**: respect `prefers-reduced-motion`.
- **Keyboard nav**: all interactive elements reachable, visible focus, logical order.
- **Language attribute**: `<html lang="id">` or `<html lang="en">` per page.
- **Headings**: hierarchical (h1 → h2 → h3), no skipping levels.
- **Color independence**: never use color alone to convey info (icons too).

---

## 📊 Performance Targets

- **Lighthouse**: Performance 95+, Accessibility 100, Best Practices 100, SEO 100.
- **LCP**: < 2.5s on 4G simulated.
- **CLS**: < 0.05.
- **INP**: < 200ms.
- **JS bundle**: < 100KB gzipped first load.
- **Image format**: AVIF → WebP → JPEG fallback.
- **Fonts**: subset Latin + Latin-Ext, preload critical weights only.

---

## 🚫 Global Anti-Patterns (AI Tells)

DILARANG dalam project ini:

- ❌ Inter sebagai font default
- ❌ Fraunces, Instrument Serif
- ❌ Emoji sebagai icon (Phosphor saja)
- ❌ Left-border accent card (`border-left: 4px solid X`)
- ❌ Gradient text (`background-clip: text`)
- ❌ Pure black `#000` atau pure white `#fff`
- ❌ Purple-pink-blue gradient hero
- ❌ "AI purple" glow / neon
- ❌ Beige/cream default (kami boleh, brand-aligned)
- ❌ Numbered section markers (01 · 02 · 03) sebagai scaffold
- ❌ Card grid icon + heading + text identik di setiap kolom
- ❌ Marketing buzzwords: streamline, empower, supercharge, leverage, unleash, transform, seamless, world-class
- ❌ "X theater", "actually X", "not just X, it's Y" copy pattern
- ❌ Aphoristic cadence (pernyataan serius + kalimat pendek negasi)
- ❌ Fake "hand-built product preview" dengan div (no fake screenshots)
- ❌ "Transform your workflow" copy di hero

---

## 📚 Reference Sites (untuk benchmarking)

Untuk cek vibe dan pattern sebelum coding:

- airbnb.com/luxe (editorial hero, photography-first)
- aman.com (restrained luxury, typography)
- sixsenses.com (nature-immersed, family-warm)
- onefinestay.com (premium rentals, warm hospitality)
- thehabitas.com (barefoot luxury, tropical modern)
- Visit these as design reference — DON'T clone, ADAPT principles

---

## 📝 Change Log

| Date       | Change                                                | Author   |
| ---------- | ----------------------------------------------------- | -------- |
| 2026-06-05 | Initial design system created from brainstorm session | Sisyphus |

---

> **Next step**: Reference file ini saat implement. Kalau ada conflict antara spec di sini dan code, **update file ini dulu** sebelum fix code.
