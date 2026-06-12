<div align="center">
  <br/>
  <h1>🏡 Mahoni House Pangandaran</h1>
  <p><strong>A bilingual landing page for a tropical family villa — built with Next.js 15, TypeScript, and Tailwind CSS 4.</strong></p>
  <br/>

  <p>
    <img src="https://img.shields.io/badge/Next.js-15.5-black?style=flat-square&logo=next.js" alt="Next.js"/>
    <img src="https://img.shields.io/badge/TypeScript-strict-3178C6?style=flat-square&logo=typescript" alt="TypeScript"/>
    <img src="https://img.shields.io/badge/Tailwind-v4-06D6D4?style=flat-square&logo=tailwindcss" alt="Tailwind"/>
    <img src="https://img.shields.io/badge/i18n-next--intl-FF6B6B?style=flat-square&logo=localize" alt="next-intl"/>
    <img src="https://img.shields.io/badge/Vitest-4.0-6B9F3C?style=flat-square&logo=vitest" alt="Vitest"/>
    <a href="https://github.com/mifdlaldev/Mahoni-House/actions"><img src="https://img.shields.io/github/actions/workflow/status/mifdlaldev/Mahoni-House/ci.yml?branch=main&style=flat-square&logo=githubactions&label=CI" alt="CI Status"/></a>
    <img src="https://img.shields.io/badge/deployed-Vercel-000000?style=flat-square&logo=vercel" alt="Vercel"/>
  </p>

  <br/>
  <a href="https://mahoni-house.vercel.app">
    <img src="https://img.shields.io/badge/Live_Demo-mahoni--house.vercel.app-1f4a3a?style=flat-square&logo=vercel" alt="Live Demo"/>
  </a>
  &nbsp;
  <a href="https://github.com/mifdlaldev/Mahoni-House">
    <img src="https://img.shields.io/badge/GitHub-mifdlaldev%2FMahoni--House-181717?style=flat-square&logo=github" alt="GitHub"/>
  </a>
  <br/>
  <br/>
</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Sections](#-sections)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Design System](#-design-system)
- [Security](#-security)
- [Built with AI Assistance](#-built-with-ai-assistance)
- [Roadmap](#-roadmap)

---

## 🎯 Overview

**Mahoni House Pangandaran** is a bilingual (Indonesian/English) landing page for a fictional 4-bedroom family villa in Pangandaran, West Java. Built as a portfolio demo to showcase modern frontend engineering skills.

### Why This Project?

This project demonstrates **production-grade** frontend development:

- **Clean Architecture** — Server Components with Client Component islands, Server Actions, and a clear separation of concerns.
- **Type Safety** — TypeScript strict mode with zero `any` types, zero type suppressions.
- **Bilingual by Default** — Full ID/EN support via next-intl v4 with locale-aware routing and validation.
- **Performance** — Minimal bundle size (159 KB First Load JS), no external font loading, optimized images.
- **UI/UX** — Tropical Modern design with scroll-reveal animations, responsive at 4 breakpoints, accessible.
- **Security** — Honeypot, rate limiting, input sanitization, and CSRF protection built into the booking form.

### Who Is This For?

- **Recruiters & Clients** — See production-quality code with real-world engineering decisions.
- **Developers** — Study a complete Next.js 15 implementation with i18n, Server Actions, and TypeScript strict.
- **Travel Enthusiasts** — Explore a fictional tropical villa concept with a polished booking experience.

> ⚠️ **Disclaimer**: This is a demo project. The villa, owners, pricing, and testimonials are entirely fictional.

---

## ✨ Key Features

### 🏠 Villa Showcase
- **14 Sections** — Hero, Villa Bento (clickable dialog cards), Gallery (9 photos), Layout, Amenities, Experience, Location with Leaflet map, Testimonials, Pricing, FAQ, Booking Form, Footer.
- **Real Photos** — 16 high-quality Unsplash images optimized with ffmpeg (56 MB → 4 MB total).
- **Interactive Gallery** — Photo grid with lazy loading and hover effects.
- **Villa Bento Grid** — Clickable cards that open detail modals with description text.

### 🌐 Bilingual (ID/EN)
- **Full Internationalization** — next-intl v4 with `defineRouting` and `requestLocale` API.
- **Locale-Aware Validation** — Zod error messages switch between Indonesian and English based on user locale.
- **Language Switcher** — Toggle between ID and EN from any page.

### 📝 Booking Form
- **Server Action** — Form submission handled server-side with Zod validation.
- **WhatsApp Integration** — Form generates a pre-formatted wa.me deep link with guest details.
- **Email Backup** — Optional Resend integration for email notifications (graceful fallback when unconfigured).
- **Anti-Spam** — Honeypot field, timestamp check (reject < 3s), rate limiting (3 req/min/IP).

### 🎨 Tropical Modern Design
- **Custom Design System** — OKLCH color tokens, Lora (display) + Plus Jakarta Sans (body), modular type scale.
- **Scroll-Reveal** — Intersection Observer-based fade-up animations (no library, honors `prefers-reduced-motion`).
- **Custom Scrollbar** — Thin 6px forest-green scrollbar.
- **Responsive** — 4 breakpoints: 375px, 768px, 1280px, 1920px.
- **Hamburger Sidebar** — Mobile and tablet navigation with smooth slide-in.

### 📊 SEO & Performance
- **Metadata** — Per-locale Open Graph, Twitter cards, canonical URLs, hreflang tags.
- **Schema.org** — `LodgingBusiness` structured data with amenities, pricing, and geo coordinates.
- **Sitemap & Robots** — Auto-generated sitemap.xml and robots.txt.
- **Build Output** — 159 KB First Load JS, 103 KB shared, 6 static routes prerendered.

---

## 🛠 Tech Stack

### Core

| Technology | Purpose |
|------------|---------|
| **Next.js 15.5** (App Router) | React framework with Server Components and Server Actions |
| **TypeScript 5** (strict) | Type-safe development with zero `any` types |
| **Node.js 22** | JavaScript runtime |
| **pnpm** | Package manager |

### Frontend

| Technology | Purpose |
|------------|---------|
| **Tailwind CSS 4** | Utility-first styling with OKLCH design tokens via `@theme` |
| **next-intl v4** | Full i18n with `defineRouting`, `requestLocale`, and JSON message files |
| **Phosphor React** | SVG icon library (regular weight) |
| **next/font** | Self-hosted Lora (display) + Plus Jakarta Sans (body) |

### Maps & Location

| Technology | Purpose |
|------------|---------|
| **react-leaflet v4** | Interactive map component |
| **Leaflet** | Map rendering with OpenStreetMap tiles (free, no API key) |

### Form & Validation

| Technology | Purpose |
|------------|---------|
| **Zod** | Schema validation with bilingual error messages |
| **Server Actions** | Server-side form processing with revalidation |

### Email

| Technology | Purpose |
|------------|---------|
| **Resend** | Email notification backup for booking submissions (free tier, optional) |

### DevOps & Tooling

| Tool | Purpose |
|------|---------|
| **Vercel** | Hosting with ISR and CDN |
| **GitHub Actions** | CI/CD pipeline (lint → typecheck → test → build) |
| **ESLint + Prettier** | Code quality and formatting |
| **Vitest** | Unit testing (24 tests across 4 files) |
| **ffmpeg** | Image optimization (resize + compress JPEG to 1600px) |

---

## 🏗 Architecture

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

### Data Flow

1. Static content loaded from TypeScript data files (`src/data/*.ts`)
2. Bilingual UI strings from JSON message files (`src/i18n/messages/*.json`)
3. Form submissions handled via Server Action with Zod validation
4. Valid submissions generate a wa.me WhatsApp deep link
5. Optional email notification sent via Resend API

---

## 📸 Sections

| # | Section | Description |
|---|---------|-------------|
| 1 | **Nav** | Sticky header with desktop links, hamburger sidebar for mobile/tablet, locale switcher |
| 2 | **Hero** | Full-viewport background image with staggered entrance animations and dual CTAs |
| 3 | **Story** | Owner narrative with couple photo and bilingual biography |
| 4 | **Villa Bento** | 4-card bento grid with clickable dialogs (Pool, Living Room, Tropical Garden, Master Bedroom) |
| 5 | **Amenities** | 6 categorized amenities with Phosphor icons |
| 6 | **Layout** | Bedroom stats + 4 room configuration cards with bilingual bed specs |
| 7 | **Gallery** | 9-photo grid with lazy loading |
| 8 | **Experience** | 6 nearby activities as icon cards |
| 9 | **Location** | Interactive Leaflet map with directions and nearby landmarks |
| 10 | **Testimonials** | 4 guest reviews |
| 11 | **Pricing** | 3-tier pricing cards with features |
| 12 | **FAQ** | 10-item accordion |
| 13 | **Booking Form** | Server Action form with anti-spam, validation, WhatsApp deep link |
| 14 | **Footer** | Villa info, contact, connect links (GitHub, LinkedIn, Fiverr, Website) |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 22+
- pnpm

### 1️⃣ Clone & Install

```bash
git clone https://github.com/mifdlaldev/Mahoni-House.git
cd Mahoni-House
pnpm install
```

### 2️⃣ Environment Variables

```bash
cp .env.example .env.local
```

Then edit `.env.local` with your details:

| Variable | Required | Purpose | Default |
|----------|----------|---------|---------|
| `OWNER_WHATSAPP` | ✅ | WhatsApp number for booking inquiries | `6281234567890` |
| `NEXT_PUBLIC_SITE_URL` | ❌ | Canonical URL for SEO | `http://localhost:3000` |
| `RESEND_API_KEY` | ❌ | Email backup (Resend API key) | — |
| `OWNER_EMAIL` | ❌ | Where booking emails go | — |

> The site works without Resend — email backup gracefully logs "not configured" and the WhatsApp link still generates.

### 3️⃣ Start Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) (Indonesian) or [http://localhost:3000/en](http://localhost:3000/en) (English).

### Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server (Turbopack) |
| `pnpm build` | Production build |
| `pnpm start` | Run production server |
| `pnpm lint` | ESLint check |
| `pnpm typecheck` | TypeScript strict check |
| `pnpm test` | Run unit tests (Vitest, non-watch) |
| `pnpm format` | Format code with Prettier |

### Deployment

```bash
# Push to GitHub — CI runs automatically
git push origin main

# Import in Vercel for auto-deploy
# Vercel auto-detects Next.js — no config needed
```

---

## 📁 Project Structure

```
Mahoni-House/
├── public/
│   ├── images/
│   │   ├── gallery/         # 9 gallery photos (pool, living, bedroom, etc.)
│   │   └── experience/      # 4 experience photos (beach, canyon, surf, market)
│   ├── hero-bg.jpg          # Hero background photo
│   ├── owners.jpg           # Owner couple photo
│   ├── og.jpg               # Open Graph share image
│   └── favicon.svg          # Custom SVG favicon
├── src/
│   ├── app/
│   │   ├── [locale]/        # ID/EN routed pages + layout with generateMetadata
│   │   ├── actions/         # Server Actions (submitBooking)
│   │   ├── globals.css      # Tailwind 4 @theme tokens + custom styles
│   │   ├── sitemap.ts       # Auto-generated sitemap
│   │   └── robots.ts        # Robots configuration
│   ├── components/
│   │   ├── sections/        # 14 section components
│   │   └── shared/          # Primitives (Section, Reveal, CtaButton, LocaleSwitcher, Map)
│   ├── data/                # 10 fictional data files (villa, pricing, FAQs, etc.)
│   ├── i18n/                # next-intl routing + request config + ID/EN messages
│   ├── lib/                 # Utilities
│   │   ├── __tests__/       # 4 test files (cn, format, validators, whatsapp)
│   │   ├── cn.ts            # Tailwind class merging (clsx + twMerge)
│   │   ├── format.ts        # IDR currency, date, phone formatting
│   │   ├── booking-validators.ts  # Bilingual Zod schemas
│   │   ├── whatsapp.ts      # wa.me deep link generator
│   │   └── email.ts         # Resend email client
│   ├── types/               # TypeScript type definitions
│   └── middleware.ts        # next-intl middleware
├── .github/workflows/ci.yml # GitHub Actions CI pipeline
├── AGENTS.md                # AI project context
├── DESIGN.md                # Full design system documentation
└── .env.example             # Environment variables template
```

---

## 🎨 Design System

### Colors (OKLCH)

| Token | Value | Usage |
|-------|-------|-------|
| `forest-900` | `oklch(20% 0.025 165)` | Dark backgrounds, headings |
| `forest-700` | `oklch(32% 0.045 165)` | Primary buttons, scrollbar, accent |
| `cream-50` | `oklch(97% 0.012 85)` | Page background, light text on dark |
| `cream-100` | `oklch(94% 0.02 85)` | Section backgrounds |
| `wood-700` | `oklch(45% 0.075 60)` | Warm accent, secondary text |
| `ink-900` | `oklch(18% 0.008 165)` | Body text |

### Typography

| Role | Font | Weight | Fallback |
|------|------|--------|----------|
| Display | **Lora** | 500 | Georgia, serif |
| Body | **Plus Jakarta Sans** | 400 | system-ui, sans-serif |

### Animation

| Pattern | Property | Duration |
|---------|----------|----------|
| Scroll reveal | `translateY(24px) + opacity` | 700ms |
| Card hover | `scale(1.02)` | 200ms |
| Button active | `scale(0.97)` | 100ms |
| Modal enter | `scale(0.95 → 1) + opacity(0 → 1)` | 200ms |
| Modal exit | `scale(1 → 0.95) + opacity(1 → 0)` | 200ms |

> Full design system in [`DESIGN.md`](./DESIGN.md).

---

## 🛡 Security

| Measure | Implementation |
|---------|---------------|
| **Honeypot** | Hidden field `name="website"` — bots fill it, humans don't. Rejected silently. |
| **Timestamp check** | Hidden `_ts` field set at render time. Submissions under 3 seconds are rejected. |
| **Rate limiting** | In-memory Map: max 3 submissions per IP per 60 seconds. |
| **Input sanitization** | HTML tags stripped from all text inputs before processing. |
| **maxLength** | Every form field has a `maxLength` attribute matching Zod validation. |
| **Zod validation** | String length, email format, phone format, guest count range, date order. |
| **CSRF** | Built-in Next.js Server Action protection. |
| **No secrets in code** | All API keys via environment variables. `.env.local` in `.gitignore`. |

---

## 🤖 Built with AI Assistance

This project was developed with the help of **AI-powered coding tools** to accelerate development while maintaining high code quality standards. The AI assisted with:

- **Code scaffolding** — Generating boilerplate, data files, and component structure
- **Code review** — Static analysis, type checking, and best practice suggestions
- **Debugging** — Identifying and resolving build errors, type issues, and edge cases
- **Documentation** — README, design system docs, and project context files
- **Image sourcing** — Finding and optimizing Unsplash photos via automated search

All code was reviewed, tested, and verified before commit — ensuring the same quality standards as hand-written code.

---

## 🗺 Roadmap

**Phase 1 — Foundation** ✅
Next.js 15 scaffold, TypeScript strict, Tailwind 4 tokens, bilingual routing, data files

**Phase 2 — Content** ✅
11 fictional data files, shared types, WhatsApp format utilities

**Phase 3 — Bilingual** ✅
next-intl v4 setup, ID/EN message files, locale switcher, locale-aware layout

**Phase 4 — Sections** ✅
14 sections with responsive design, scroll-reveal, Leaflet map, gallery with real photos

**Phase 5 — Form & Security** ✅
Server Action + Zod validation, WhatsApp deep link, honeypot, rate limiting, email backup

**Phase 6 — Polish & Deploy** ✅
SEO metadata, Schema.org, sitemap, robots.txt, CI/CD, GitHub push, favicon, documentation

**Phase 7 — Future** 🚀
E2E tests, Lighthouse CI, real images, CMS, payment integration, custom domain

---

## 👤 About Me

Hi! I'm **Mifdlal Tsaqib Alfarras**, a full-stack developer passionate about building modern, performant web applications. This project is part of my portfolio showcasing my skills in:

- **Frontend** — Next.js, React, TypeScript, Tailwind CSS, responsive design, animation
- **Internationalization** — Full bilingual support with next-intl v4
- **UI/UX** — Design systems, accessibility, scroll-reveal interactions, micro-interactions
- **Security** — Form validation, anti-spam measures, input sanitization
- **DevOps** — CI/CD pipelines, Vercel deployment, image optimization

### Connect With Me

| Platform | Link |
|----------|------|
| 🌐 **Website** | [mtadevworks.web.id](https://www.mtadevworks.web.id/) |
| 💼 **LinkedIn** | [linkedin.com/in/mifdlal-tsaqib-alfarras](https://www.linkedin.com/in/mifdlal-tsaqib-alfarras/) |
| 🛵 **Fiverr** | [fiverr.com/mifdlal_afs](https://www.fiverr.com/mifdlal_afs) |
| 🐙 **GitHub** | [github.com/mifdlaldev](https://github.com/mifdlaldev) |
| 📧 **Email** | [mifdlaltsaqibalf26@outlook.com](mailto:mifdlaltsaqibalf26@outlook.com) |

---

<div align="center">
  <br/>
  <p>
    <a href="https://github.com/mifdlaldev/Mahoni-House/issues">Report Bug</a>
    ·
    <a href="https://github.com/mifdlaldev/Mahoni-House">GitHub Repo</a>
    ·
    <a href="https://www.mtadevworks.web.id/">Portfolio</a>
  </p>
  <br/>
</div>
