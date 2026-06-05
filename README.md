# Mahoni House Pangandaran — Landing Page

A bilingual (ID/EN) landing page for a fictional 4-bedroom family villa in Pangandaran, West Java. Built as a portfolio demo with Next.js 15, TypeScript strict, Tailwind, and next-intl v4.

> **Demo project**: This is a portfolio piece. The villa, owners, pricing, and testimonials are fictional.

## Tech stack

- Next.js 15 (App Router, Server Components)
- TypeScript 5 strict
- Tailwind CSS 4 + custom OKLCH tokens
- next-intl v4 (App Router i18n)
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

| Command           | Purpose                      |
| ----------------- | ---------------------------- |
| `pnpm dev`        | Start dev server (Turbopack) |
| `pnpm build`      | Production build             |
| `pnpm start`      | Run production build         |
| `pnpm lint`       | ESLint check                 |
| `pnpm typecheck`  | TypeScript strict check      |
| `pnpm test`       | Run unit tests (Vitest)      |
| `pnpm test --run` | Run tests once (no watch)    |

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

| Variable               | Required                               | Purpose                         |
| ---------------------- | -------------------------------------- | ------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | No (default: `https://mahonihouse.id`) | Used for canonical, OG, sitemap |
| `RESEND_API_KEY`       | No                                     | Email backup for form           |
| `OWNER_EMAIL`          | No (default: skip email)               | Where booking emails go         |
| `OWNER_WHATSAPP`       | No (default: `6281234567890`)          | WhatsApp deep link target       |

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
