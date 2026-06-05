# Phase 1: Foundation

> 10 tasks to set up Next.js 15 project with TypeScript strict, Tailwind, design tokens, and core utilities.

> ⚠️ **COMMIT POLICY**: The `git commit` blocks in this plan are **templates** showing the intent of each commit. Per AGENTS.md ("No commit without explicit user request"), the executing agent MUST pause and ask the user before running any `git commit`. Do not commit autonomously.

---

## Task 1.1: Initialize Next.js Project

**Files:**
- Create: `landing-page-villa-pangandaran/` (project root, current dir)

- [ ] **Step 1: Run create-next-app**

```bash
cd /home/mifdlal/Documents/proyek-portfolio-2026
pnpm create next-app@14 landing-page-villa-pangandaran \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --no-turbopack
```

- [ ] **Step 2: Move app/ out of src/**

```bash
cd landing-page-villa-pangandaran
mv src/app ./
rm -rf src/app
ls
```

- [ ] **Step 3: Verify tsconfig.json path aliases**

File: `tsconfig.json`

Ensure `compilerOptions.paths` has `"@/*": ["./src/*"]`.

- [ ] **Step 4: Verify dev server starts**

```bash
pnpm dev
```

Open http://localhost:3000. Expected: default Next.js welcome page. Press Ctrl+C to stop.

- [ ] **Step 5: Commit**

```bash
git init
git add -A
git commit -m "chore: initialize Next.js 14 project"
```

---

## Task 1.2: Install Dependencies

**Files:**
- Modify: `package.json`, `pnpm-lock.yaml`

- [ ] **Step 1: Install runtime dependencies**

> Vanilla Tailwind primitives only — no Radix, no shadcn. Accessibility is handled per-component with semantic HTML + `focus-visible:` utilities.

```bash
pnpm add next-intl@^4 framer-motion@^11 react-hook-form@^7 zod@^3 @hookform/resolvers \
  class-variance-authority clsx tailwind-merge \
  leaflet react-leaflet@^4 \
  date-fns@^3 resend @phosphor-icons/react
pnpm add -D @types/leaflet vitest @vitest/ui @testing-library/react @testing-library/jest-dom jsdom \
  prettier prettier-plugin-tailwindcss
```

- [ ] **Step 2: Verify package.json has new deps**

```bash
cat package.json
```

- [ ] **Step 3: Commit (subject to user approval)**

```bash
git add package.json pnpm-lock.yaml
git commit -m "chore: add project dependencies (next-intl, framer-motion, RHF, Zod, Phosphor, leaflet, vitest)"
```

---

## Task 1.3: Configure TypeScript Strict Mode

**Files:**
- Modify: `tsconfig.json`

- [ ] **Step 1: Add strict mode flags to tsconfig.json**

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "noFallthroughCasesInSwitch": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true,
    "paths": { "@/*": ["./src/*"] }
  }
}
```

- [ ] **Step 2: Verify typecheck**

```bash
pnpm typecheck || pnpm tsc --noEmit
```

Expected: exit 0.

- [ ] **Step 3: Commit**

```bash
git add tsconfig.json
git commit -m "chore: enable TypeScript strict mode"
```

---

## Task 1.4: Configure Tailwind 4 with Tropical Modern Tokens

**Files:**
- Modify: `src/app/globals.css` (Tailwind 4 uses `@theme` CSS variables, no `tailwind.config.ts`)

- [ ] **Step 1: Replace src/app/globals.css with @theme tokens**

```css
/* src/app/globals.css */
@import "tailwindcss";

@theme {
  /* === Color tokens (OKLCH for perceptual uniformity) === */
  --color-forest-900: oklch(20% 0.025 165);
  --color-forest-700: oklch(32% 0.045 165);
  --color-forest-500: oklch(48% 0.055 165);
  --color-forest-200: oklch(82% 0.025 165);
  --color-cream-50: oklch(97% 0.012 85);
  --color-cream-100: oklch(94% 0.020 85);
  --color-cream-200: oklch(89% 0.030 85);
  --color-wood-500: oklch(65% 0.075 75);
  --color-wood-700: oklch(45% 0.075 60);
  --color-ink-900: oklch(18% 0.008 165);
  --color-ink-600: oklch(40% 0.012 165);
  --color-ink-400: oklch(60% 0.010 165);

  /* === Font families (CSS variables injected by next/font) === */
  --font-display: var(--font-display), Georgia, serif;
  --font-body: var(--font-body), system-ui, sans-serif;

  /* === Max widths === */
  --max-width-prose: 68ch;
  --max-width-container: 1200px;

  /* === Custom animations === */
  --animate-fade-up: fade-up 400ms cubic-bezier(0.16, 1, 0.3, 1) both;
  --animate-fade-in: fade-in 250ms ease-out both;
}

@keyframes fade-up {
  0% { opacity: 0; transform: translateY(12px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes fade-in {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

/* === Base layer overrides === */
@layer base {
  html { scroll-behavior: smooth; }
  body {
    background-color: var(--color-cream-50);
    color: var(--color-ink-900);
    font-family: var(--font-body);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-display);
    letter-spacing: -0.02em;
    text-wrap: balance;
  }
  p { text-wrap: pretty; }
  h1 {
    font-size: clamp(2.5rem, 5vw, 4rem);
    line-height: 1.05;
    letter-spacing: -0.04em;
    font-weight: 500;
  }
  h2 {
    font-size: clamp(2rem, 4vw, 3rem);
    line-height: 1.05;
    letter-spacing: -0.03em;
    font-weight: 500;
  }
  h3 {
    font-size: clamp(1.375rem, 2.5vw, 1.75rem);
    line-height: 1.15;
    font-weight: 500;
  }
  /* Honor reduced motion */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
}

/* === Layout utilities === */
@utility container-app {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

@media (min-width: 768px) {
  .container-app { padding-left: 2rem; padding-right: 2rem; }
}
```

> 📝 **Tailwind 4 changes from v3**:
> - No `tailwind.config.ts` (everything is CSS-based via `@theme`)
> - No `@tailwind base/components/utilities` — single `@import "tailwindcss"`
> - Content paths auto-detected (no `content` array needed)
> - Custom tokens become utility classes automatically (`bg-forest-700`, `text-ink-900`, etc.)

- [ ] **Step 2: Verify Tailwind compiles**

```bash
pnpm dev
```

Open http://localhost:3000. Stop with Ctrl+C.

- [ ] **Step 3: Commit (subject to user approval)**

```bash
git add src/app/globals.css
git commit -m "feat: configure Tailwind 4 with Tropical Modern color tokens (OKLCH)"
```

---

## Task 1.5: Verify Tailwind 4 `@theme` Utilities Compile

> 📝 Note: Tokens, base styles, and container utility were consolidated into **Task 1.4** (Tailwind 4 prefers a single `globals.css` with `@theme` block). This task verifies everything actually compiled and is usable.

**Files:**
- Modify (smoke test): `src/app/page.tsx` — temporary Tailwind utility smoke test

- [ ] **Step 1: Smoke-test Tailwind 4 utilities**

Replace `src/app/page.tsx` content temporarily with this smoke test:

```tsx
export default function Home() {
  return (
    <main className="container-app py-12">
      <h1 className="text-forest-900">Tailwind 4 OK</h1>
      <p className="text-ink-600 font-body">
        If this renders with forest-green heading and warm-cream background, @theme worked.
      </p>
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="bg-forest-700 text-cream-50 p-4 rounded">forest-700</div>
        <div className="bg-cream-100 text-ink-900 p-4 rounded">cream-100</div>
        <div className="bg-wood-500 text-cream-50 p-4 rounded">wood-500</div>
        <div className="bg-ink-900 text-cream-50 p-4 rounded">ink-900</div>
      </div>
      <button className="mt-8 rounded bg-forest-700 px-4 py-2 text-cream-50 active:scale-[0.97] transition-transform">
        Test :active state
      </button>
    </main>
  );
}
```

- [ ] **Step 2: Run dev server and visually verify**

```bash
pnpm dev
```

Open http://localhost:3000. Confirm:
- [ ] Heading is large, serif, and dark forest-green
- [ ] Body text is warm cream background, not pure white
- [ ] Four color swatches render with distinct colors (no missing classes)
- [ ] Button has forest-green background
- [ ] Browser DevTools → Computed: button `transform: scale(0.97)` on `:active` (click and hold)
- [ ] `prefers-reduced-motion: reduce` (DevTools rendering tab) → all animations stop

Stop with Ctrl+C.

- [ ] **Step 3: Revert page.tsx to default scaffold**

The smoke test is verification only. Restore default content:

```bash
# If git initialized:
git checkout -- src/app/page.tsx

# Otherwise, restore the Next.js default page (will be replaced properly in Phase 4 Task 1)
```

- [ ] **Step 4: Commit (subject to user approval)**

```bash
git add src/app/page.tsx
git commit -m "chore: verify Tailwind 4 @theme utilities compile and render"
```

> If the user does not approve commit, the smoke-test changes can stay reverted and skip the commit.

---

## Task 1.6: Create Folder Structure

- [ ] **Step 1: Create directories**

```bash
mkdir -p src/lib src/data src/i18n/messages src/types \
  src/components/ui src/components/shared src/components/sections \
  public/images/{hero,villa,story,gallery,experience,amenities,testimonials}
```

- [ ] **Step 2: Create .gitkeep in empty data dirs**

```bash
touch src/data/.gitkeep src/i18n/messages/.gitkeep src/types/.gitkeep src/components/.gitkeep
```

- [ ] **Step 3: Commit**

```bash
git add src/ public/
git commit -m "chore: create project folder structure"
```

---

## Task 1.7: Create cn() Utility with TDD

**Files:**
- Create: `vitest.config.ts`
- Create: `src/lib/cn.ts`
- Create: `src/lib/cn.test.ts`
- Modify: `package.json`

- [ ] **Step 1: Create vitest.config.ts**

```typescript
import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: { environment: 'jsdom', globals: true },
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
});
```

- [ ] **Step 2: Write failing test**

File: `src/lib/cn.test.ts`

```typescript
import { describe, it, expect } from 'vitest';
import { cn } from './cn';

describe('cn', () => {
  it('merges class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('handles conditional classes', () => {
    expect(cn('foo', false && 'bar', 'baz')).toBe('foo baz');
  });

  it('merges tailwind classes (last wins)', () => {
    expect(cn('p-4', 'p-8')).toBe('p-8');
  });

  it('handles undefined and null', () => {
    expect(cn('foo', undefined, null, 'bar')).toBe('foo bar');
  });
});
```

- [ ] **Step 3: Run test, verify fail**

```bash
pnpm vitest run src/lib/cn.test.ts
```

Expected: FAIL — module not found.

- [ ] **Step 4: Implement cn()**

File: `src/lib/cn.ts`

```typescript
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 5: Run test, verify pass**

```bash
pnpm vitest run src/lib/cn.test.ts
```

Expected: PASS — 4 tests.

- [ ] **Step 6: Add test scripts to package.json**

Add to `"scripts"`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest",
    "format": "prettier --write \"**/*.{ts,tsx,js,jsx,json,md,css}\"",
    "format:check": "prettier --check \"**/*.{ts,tsx,js,jsx,json,md,css}\""
  }
}
```

- [ ] **Step 7: Commit**

```bash
git add src/lib/cn.ts src/lib/cn.test.ts vitest.config.ts package.json
git commit -m "feat: add cn() utility with tests"
```

---

## Task 1.8: Configure next/font in Layout

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Replace app/layout.tsx**

```typescript
import type { Metadata } from 'next';
import { Lora, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

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
  title: 'Mahoni House Pangandaran',
  description: 'A four-bedroom villa with a private pool on the western shore of Pangandaran.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${lora.variable} ${jakarta.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 2: Verify fonts load**

```bash
pnpm dev
```

Open http://localhost:3000, inspect `<html>` element. Expected: classes like `__variable_xxxx`. Stop with Ctrl+C.

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: configure Lora and Plus Jakarta Sans via next/font"
```

---

## Task 1.9: Add Prettier Config

**Files:**
- Create: `.prettierrc`
- Create: `.prettierignore`

- [ ] **Step 1: Create .prettierrc**

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

- [ ] **Step 2: Create .prettierignore**

```
node_modules
.next
out
build
dist
coverage
pnpm-lock.yaml
```

- [ ] **Step 3: Format existing files**

```bash
pnpm format
```

- [ ] **Step 4: Commit**

```bash
git add .prettierrc .prettierignore
git commit -m "chore: add Prettier config with Tailwind plugin"
```

---

## Task 1.10: Phase 1 Verification

- [ ] **Step 1: Run all checks**

```bash
pnpm typecheck
pnpm lint
pnpm test
pnpm build
```

Expected: all exit 0.

- [ ] **Step 2: Run dev server, verify no errors**

```bash
pnpm dev
```

Open http://localhost:3000. Expected: default Next.js page loads cleanly.

- [ ] **Step 3: Document Phase 1 complete**

Note: "Phase 1 complete: Next.js 14 + TS strict + Tailwind + tokens + cn utility ready. 9 commits."

---

**Proceed to: `2026-06-05-villa-pangandaran-landing-02-content-data.md`**
