# Mahoni House Pangandaran Landing Page — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a bilingual (ID/EN) Next.js 14 landing page for fictional "Mahoni House" villa in Pangandaran, with WhatsApp booking form, Tropical Modern design, and Lighthouse 95+ scores.

**Architecture:** Server Components first, client components only for interactive elements (form, animations, locale switcher). Static export with Server Actions for form submission. All content stored as typed data in `src/data/*.ts`. Fictional but realistic data, clearly marked.

**Tech Stack:** Next.js 15.x (App Router, async params) · TypeScript 5.x strict · Tailwind CSS 4.x (`@theme` CSS variables) · next-intl 4.x (defineRouting, requestLocale) · Framer Motion 11 · React Hook Form 7 + Zod 3 · Phosphor React · react-leaflet 4 + OpenStreetMap · Resend · Vercel

**Spec reference:** `docs/superpowers/specs/2026-06-05-villa-pangandaran-landing-design.md`
**Design reference:** `DESIGN.md`
**Project context:** `AGENTS.md`

---

## How to Use This Plan

This plan is split into 6 phase files for manageability. Read in order:

1. `2026-06-05-villa-pangandaran-landing-01-foundation.md` — Project init, TS, Tailwind, tokens
2. `2026-06-05-villa-pangandaran-landing-02-content-data.md` — All fictional data files
3. `2026-06-05-villa-pangandaran-landing-03-bilingual.md` — i18n setup, locale switcher
4. `2026-06-05-villa-pangandaran-landing-04-sections.md` — All 12 UI sections + nav + footer
5. `2026-06-05-villa-pangandaran-landing-05-form-integration.md` — Form submit + WhatsApp + email
6. `2026-06-05-villa-pangandaran-landing-06-polish-deploy.md` — SEO, performance, deploy

**TDD applies to** logic/utilities (`src/lib/*.ts`). Write failing test, then implement.

**UI sections** verified by visual screenshot at 4 viewports (375, 768, 1280, 1920), not unit tests.

**Verify after each task**: `pnpm typecheck` + `pnpm lint` + visual check.

**Commits**: The plan includes `git commit` after each task as a documentation template. **However, per AGENTS.md ("No commit without explicit user request"), the executing agent MUST pause and ask the user for approval before each commit.** Do not run `git commit` autonomously. This is a hard constraint from the project context.

**Tropical Modern design constraints** (per DESIGN.md):

- Fonts: Lora (display) + Plus Jakarta Sans (body). NO Inter, NO Fraunces.
- Colors: forest-700 primary, cream-50/100 backgrounds, wood-500 accent, ink-900 text. NO pure black/white.
- Animations: only transform + opacity. Respect `prefers-reduced-motion`.
- No emoji as icons. Use Phosphor React.
- No left-border accent cards. No gradient text. No purple-pink-blue gradients.

---

## Phase Summary

| Phase               | Tasks | Output                                                                                                                             |
| ------------------- | ----- | ---------------------------------------------------------------------------------------------------------------------------------- |
| 1. Foundation       | 10    | Next.js 15 project with TS strict, Tailwind, tokens, fonts, cn utility                                                             |
| 2. Content Data     | 12    | 11 typed data files + types (villa, amenities, pricing, experiences, testimonials, faqs, story, owners, layout, gallery, location) |
| 3. Bilingual        | 6     | next-intl v4 routing, ID+EN messages, LocaleSwitcher, locale-aware layout                                                          |
| 4. Sections         | 10    | 12 sections + Nav + Footer + not-found + Section/Reveal/CtaButton/Map primitives                                                   |
| 5. Form Integration | 6     | Format utils (TDD), Validators, WhatsApp link, Server Action email, full form submit                                               |
| 6. Polish & Deploy  | 9     | Metadata, SEO, Schema.org, Lighthouse audit, Vercel deploy                                                                         |

**Total: 53 tasks across 6 phases.**

---

## File Structure (target end-state)

```
landing-page-villa-pangandaran/
├── app/
│   └── [locale]/
│       ├── layout.tsx
│       ├── page.tsx
│       └── not-found.tsx
├── src/
│   ├── components/
│   │   ├── ui/                    # shadcn primitives
│   │   ├── shared/                # nav, footer, section, reveal, cta-button, locale-switcher
│   │   └── sections/              # hero, story, villa, amenities, layout, gallery, experience, location, location-map, testimonials, pricing, faq, booking-form
│   ├── data/                      # 7 .ts files
│   ├── i18n/
│   │   ├── messages/{id,en}.json
│   │   ├── routing.ts
│   │   └── request.ts
│   ├── lib/                       # cn, format, validators, whatsapp
│   ├── styles/
│   │   ├── tokens.css
│   │   └── globals.css
│   └── types/index.ts
├── public/images/                 # hero, villa, story, gallery, experience
├── middleware.ts
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── AGENTS.md
├── DESIGN.md
└── docs/superpowers/{specs,plans}/
```

---

## Definition of Done (Final)

- [ ] `pnpm dev` jalan tanpa error
- [ ] `pnpm build` exit code 0
- [ ] `pnpm lint` exit code 0
- [ ] `pnpm typecheck` exit code 0 (strict, no `any`)
- [ ] Lighthouse: Performance ≥ 90, A11y ≥ 95, Best Practices = 100, SEO = 100
- [ ] Tested di 4 viewports: 375px, 768px, 1280px, 1920px
- [ ] Tidak ada horizontal overflow di mobile
- [ ] Tidak ada `as any`, `@ts-ignore`, empty catch
- [ ] Tidak ada emoji sebagai icon
- [ ] Tidak ada pure black/white
- [ ] `prefers-reduced-motion` honored
- [ ] Bilingual ID + EN semua section populated
- [ ] Form submit generates valid WhatsApp link
- [ ] Email backup via Resend works
- [ ] OpenStreetMap embed loads

---

## Next Steps After Plan Complete

1. Execute each phase file in order
2. Use subagent-driven-development (fresh subagent per task)
3. Verify after each task
4. Commit after each task
5. Move to next phase only after current phase verified

**Proceed to: `2026-06-05-villa-pangandaran-landing-01-foundation.md`**
