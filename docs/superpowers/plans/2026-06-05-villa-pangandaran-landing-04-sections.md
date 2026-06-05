# Phase 4: Section Components

> Build all 12 landing page sections with shared primitives and full bilingual copy.

> ⚠️ **COMMIT POLICY**: The `git commit` blocks in this plan are **templates** showing the intent of each commit. Per AGENTS.md ("No commit without explicit user request"), the executing agent MUST pause and ask the user before running any `git commit`. Do not commit autonomously.

> 📸 **IMAGE ASSETS**: This plan references image paths like `/images/villa/pool.jpg`, `/images/hero-bg.jpg`, `/images/gallery/*.jpg`, `/images/experience/*.jpg`. **None of these files exist yet.** Before building sections, the executor should EITHER:
> 1. Source 16-24 CC0 photos from Unsplash (Pangandaran, tropical villa, family, beach, food) and save to `public/images/...`, OR
> 2. Generate solid-color placeholders matching the section's design tokens (e.g. `wood-200` rectangle for villa bento cells).
> The build will succeed either way (CSS background-image 404s are non-fatal), but the page will look broken without real images.

---

## Task 4.1: Shared Primitives — Section, Reveal, CtaButton

**Files:**
- Create: `src/components/shared/section.tsx`
- Create: `src/components/shared/reveal.tsx`
- Create: `src/components/shared/cta-button.tsx`
- Create: `src/components/shared/icon.tsx`

- [ ] **Step 1: Create Section wrapper**

```typescript
// src/components/shared/section.tsx
import { cn } from '@/lib/utils';

type SectionProps = {
  id?: string;
  className?: string;
  children: React.ReactNode;
};

export function Section({ id, className, children }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'relative px-6 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32',
        className,
      )}
    >
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}
```

- [ ] **Step 2: Create Reveal (scroll-reveal using Intersection Observer)**

```typescript
// src/components/shared/reveal.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: 'div' | 'section' | 'article';
};

export function Reveal({ children, className, delay = 0, as: Tag = 'div' }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement>}
      className={cn(
        'transition-all duration-700 ease-out motion-reduce:transition-none',
        isVisible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-6 opacity-0',
        className,
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
```

- [ ] **Step 3: Create CtaButton**

```typescript
// src/components/shared/cta-button.tsx
import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'md' | 'lg';

type CtaButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  external?: boolean;
  className?: string;
};

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-forest-700 text-cream-50 hover:bg-forest-900 active:scale-[0.97]',
  secondary:
    'border border-forest-700/30 bg-cream-50 text-forest-900 hover:border-forest-700 hover:bg-cream-100 active:scale-[0.97]',
  ghost:
    'text-forest-700 underline-offset-4 hover:underline',
};

const sizeClasses: Record<Size, string> = {
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
};

export function CtaButton({
  href,
  children,
  variant = 'primary',
  size = 'md',
  withArrow = false,
  external = false,
  className,
}: CtaButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700/40 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-50',
    'min-h-[44px]',
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
        {withArrow && <ArrowRight size={16} weight="regular" />}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
      {withArrow && <ArrowRight size={16} weight="regular" />}
    </Link>
  );
}
```

- [ ] **Step 4: Create Icon wrapper**

```typescript
// src/components/shared/icon.tsx
import { cn } from '@/lib/utils';

type IconProps = {
  className?: string;
  size?: number;
  'aria-hidden'?: boolean;
};

export function IconWrapper({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn('inline-flex shrink-0 items-center justify-center', className)}
      aria-hidden="true"
    >
      {children}
    </span>
  );
}

export type { IconProps };
```

- [ ] **Step 5: Verify all primitives compile**

```bash
pnpm typecheck
pnpm lint
```

- [ ] **Step 6: Commit**

```bash
git add src/components/shared/
git commit -m "feat: add shared primitives (Section, Reveal, CtaButton, IconWrapper)"
```

---

## Task 4.2: Navigation Component

**Files:**
- Create: `src/components/sections/nav.tsx`

- [ ] **Step 1: Create Nav with sticky scroll behavior**

```typescript
// src/components/sections/nav.tsx
'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { LocaleSwitcher } from '@/components/shared/locale-switcher';
import { type Locale } from '@/i18n/routing';
import { cn } from '@/lib/utils';

const NAV_IDS = ['villa', 'amenities', 'gallery', 'experience', 'pricing', 'contact'];

export function Nav({ locale }: { locale: Locale }) {
  const t = useTranslations('nav');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        isScrolled
          ? 'border-b border-forest-900/10 bg-forest-900/95 backdrop-blur-sm'
          : 'bg-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:h-20 lg:px-12">
        <Link
          href="/"
          className="font-display text-xl tracking-tight text-cream-50 lg:text-2xl"
        >
          Mahoni House
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {NAV_IDS.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className="text-sm font-medium text-cream-50/85 transition-colors hover:text-cream-50"
            >
              {t(id as keyof IntlMessages['nav'])}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LocaleSwitcher currentLocale={locale} />
          <a
            href="#booking"
            className="hidden rounded-md bg-cream-50 px-4 py-2 text-sm font-medium text-forest-900 transition-all hover:bg-cream-100 active:scale-[0.97] sm:inline-flex"
          >
            {t('book')}
          </a>
        </div>
      </div>
    </header>
  );
}

// Type stub for IntlMessages (will be auto-generated by next-intl)
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace IntlMessages {
    type Nav = { villa: string; amenities: string; gallery: string; experience: string; pricing: string; contact: string; book: string };
  }
}
```

> ⚠️ **Note**: Nav does not use `usePathname` — it only needs to render anchor links (`#villa`, `#booking`, etc.) which work locale-agnostically. Removed the dead import to avoid the i18n/next-nav confusion.

- [ ] **Step 2: Verify typecheck**

```bash
pnpm typecheck
```

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/nav.tsx
git commit -m "feat: add Nav with sticky scroll + locale switcher"
```

---

## Task 4.3: Hero Section

**Files:**
- Create: `src/components/sections/hero.tsx`

- [ ] **Step 1: Create Hero section**

```typescript
// src/components/sections/hero.tsx
import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/shared/reveal';
import { CtaButton } from '@/components/shared/cta-button';

export function Hero() {
  const t = useTranslations('hero');
  return (
    <section className="relative min-h-dvh overflow-hidden bg-forest-900 text-cream-50">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: 'url(/images/hero-bg.jpg)' }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-forest-900/40 via-forest-900/20 to-forest-900/80" />

      <div className="relative mx-auto flex min-h-dvh max-w-7xl flex-col items-start justify-end px-6 pb-16 pt-32 sm:px-8 lg:px-12 lg:pb-24">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-cream-200/80">
            {t('eyebrow')}
          </p>
        </Reveal>
        <Reveal delay={120}>
          <h1 className="mt-4 max-w-3xl font-display text-5xl leading-[1.05] tracking-tight text-cream-50 text-balance sm:text-6xl lg:text-7xl">
            {t('title')}
          </h1>
        </Reveal>
        <Reveal delay={240}>
          <p className="mt-6 max-w-xl font-display text-xl italic text-cream-100 sm:text-2xl">
            {t('tagline')}
          </p>
        </Reveal>
        <Reveal delay={360}>
          <p className="mt-4 max-w-lg font-body text-base text-cream-200/80 sm:text-lg">
            {t('sub')}
          </p>
        </Reveal>
        <Reveal delay={480}>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <CtaButton href="#booking" variant="primary" size="lg" withArrow>
              {t('primaryCta')}
            </CtaButton>
            <a
              href="#story"
              className="inline-flex items-center justify-center px-5 py-3.5 text-base font-medium text-cream-50/90 transition-colors hover:text-cream-50"
            >
              {t('secondaryCta')}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire Hero into page.tsx**

```typescript
// app/[locale]/page.tsx
import { setRequestLocale } from 'next-intl/server';
import { Nav } from '@/components/sections/nav';
import { Hero } from '@/components/sections/hero';
import { type Locale } from '@/i18n/routing';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <Nav locale={locale as Locale} />
      <Hero />
    </>
  );
}
```

- [ ] **Step 3: Visual verify at 4 breakpoints**

```bash
pnpm dev
```

- Open http://localhost:3000 in browser
- DevTools → responsive → 375, 768, 1280, 1920
- Verify: heading readable, no overflow, CTAs single-line, hero image visible

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/hero.tsx app/[locale]/page.tsx
git commit -m "feat: add Hero section with image background and CTAs"
```

---

## Task 4.4: Story Section

**Files:**
- Create: `src/components/sections/story.tsx`

- [ ] **Step 1: Create Story section**

```typescript
// src/components/sections/story.tsx
import { useTranslations } from 'next-intl';
import { Section } from '@/components/shared/section';
import { Reveal } from '@/components/shared/reveal';
import { getOwnersBio } from '@/data/owners';

export function Story() {
  const t = useTranslations('story');
  const bio = getOwnersBio();
  return (
    <Section id="story" className="bg-cream-50">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <div
            className="aspect-[4/5] w-full rounded-lg bg-cover bg-center bg-wood-100"
            style={{ backgroundImage: 'url(/images/owners.jpg)' }}
            role="img"
            aria-label="Asep and Lina, owners of Mahoni House"
          />
        </Reveal>
        <div className="lg:col-span-7 lg:pl-8">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-wood-600">
              {t('eyebrow')}
            </p>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="mt-4 max-w-xl font-display text-4xl leading-[1.1] tracking-tight text-forest-900 text-balance sm:text-5xl">
              {bio.headline}
            </h2>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-8 font-body text-lg leading-relaxed text-ink-700">
              {bio.paragraph1}
            </p>
          </Reveal>
          <Reveal delay={360}>
            <p className="mt-6 font-body text-lg leading-relaxed text-ink-700">
              {bio.paragraph2}
            </p>
          </Reveal>
          <Reveal delay={480}>
            <p className="mt-10 font-display text-lg italic text-forest-700">
              {t('signature')}
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Add owners data stub to owners.ts (placeholder for now)**

NOTE: Replace the existing `getOwnersBio` in `src/data/owners.ts` to return:

```typescript
export type OwnersBio = {
  headline: { id: string; en: string };
  paragraph1: { id: string; en: string };
  paragraph2: { id: string; en: string };
};

export function getOwnersBio(): {
  headline: string;
  paragraph1: string;
  paragraph2: string;
} {
  return {
    headline: 'Empat kamar untuk keluarga yang ingin kembali bersama',
    paragraph1:
      'Mahoni House dibangun tahun 2021 oleh Asep dan Lina, pensiunan guru asal Bandung yang jatuh cinta pada pesisir Pangandaran.',
    paragraph2:
      'Setiap detail dirancang untuk keluarga — tempat tidur yang cukup untuk tiga generasi, kolam renang yang aman untuk anak, dan ruang bersama yang mengundang untuk mengobrol sampai larut.',
  };
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/story.tsx
git commit -m "feat: add Story section with owners bio"
```

---

## Task 4.5: Villa Bento Section

**Files:**
- Create: `src/components/sections/villa-bento.tsx`

- [ ] **Step 1: Create Villa Bento grid**

```typescript
// src/components/sections/villa-bento.tsx
import { useTranslations } from 'next-intl';
import { Section } from '@/components/shared/section';
import { Reveal } from '@/components/shared/reveal';
import { getVillaBento } from '@/data/villa';

export function VillaBento() {
  const t = useTranslations('villa');
  const cells = getVillaBento();
  return (
    <Section id="villa" className="bg-cream-100">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.2em] text-wood-600">
          {t('eyebrow')}
        </p>
        <h2 className="mt-4 max-w-2xl font-display text-4xl leading-[1.1] tracking-tight text-forest-900 text-balance sm:text-5xl">
          {t('title')}
        </h2>
      </Reveal>

      <div className="mt-16 grid auto-rows-[280px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[260px]">
        {cells.map((cell, i) => (
          <Reveal
            key={cell.id}
            delay={i * 80}
            className={
              cell.size === 'large'
                ? 'sm:col-span-2 sm:row-span-2'
                : cell.size === 'wide'
                ? 'sm:col-span-2'
                : ''
            }
          >
            <article className="group relative h-full w-full overflow-hidden rounded-lg bg-wood-100">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-105"
                style={{ backgroundImage: `url(${cell.image})` }}
                aria-hidden="true"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-900/70 via-forest-900/10 to-transparent" />
              <div className="relative flex h-full flex-col justify-end p-6">
                <h3 className="font-display text-2xl text-cream-50">
                  {cell.title}
                </h3>
                <p className="mt-2 text-sm text-cream-100/85">
                  {cell.subtitle}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Replace villa.ts with bento data**

```typescript
// src/data/villa.ts
export type BentoCell = {
  id: string;
  size: 'small' | 'wide' | 'large';
  image: string;
  title: { id: string; en: string };
  subtitle: { id: string; en: string };
};

export function getVillaBento(): Array<{
  id: string;
  size: 'small' | 'wide' | 'large';
  image: string;
  title: string;
  subtitle: string;
}> {
  return [
    {
      id: 'pool',
      size: 'large',
      image: '/images/villa/pool.jpg',
      title: 'Kolam Renang Pribadi',
      subtitle: '8 × 4 meter, aman untuk anak',
    },
    {
      id: 'living',
      size: 'small',
      image: '/images/villa/living.jpg',
      title: 'Ruang Keluarga',
      subtitle: 'Sofa panjang, TV 55"',
    },
    {
      id: 'kitchen',
      size: 'small',
      image: '/images/villa/kitchen.jpg',
      title: 'Dapur Lengkap',
      subtitle: 'Kompor gas, kulkas, rice cooker',
    },
    {
      id: 'bedroom-master',
      size: 'wide',
      image: '/images/villa/bedroom.jpg',
      title: 'Kamar Tidur Utama',
      subtitle: 'King bed, AC, kamar mandi dalam',
    },
    {
      id: 'garden',
      size: 'small',
      image: '/images/villa/garden.jpg',
      title: 'Taman Tropis',
      subtitle: 'Pohon mahoni setinggi 12 meter',
    },
  ];
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/villa-bento.tsx src/data/villa.ts
git commit -m "feat: add Villa Bento section with asymmetric grid"
```

---

## Task 4.6: Amenities + Layout + Gallery + Experience Sections

**Files:**
- Create: `src/components/sections/amenities.tsx`
- Create: `src/components/sections/layout.tsx`
- Create: `src/components/sections/gallery.tsx`
- Create: `src/components/sections/experience.tsx`

- [ ] **Step 1: Create Amenities section**

```typescript
// src/components/sections/amenities.tsx
import { useTranslations } from 'next-intl';
import { Wifi, CookingPot, Car, Tv, Wind, Shower } from '@phosphor-icons/react/dist/ssr';
import { Section } from '@/components/shared/section';
import { Reveal } from '@/components/shared/reveal';
import { getAmenities } from '@/data/amenities';

const ICONS: Record<string, React.ComponentType<{ size?: number; weight?: 'regular' | 'bold' }>> = {
  wifi: Wifi,
  cooking: CookingPot,
  car: Car,
  tv: Tv,
  wind: Wind,
  shower: Shower,
};

export function Amenities() {
  const t = useTranslations('amenities');
  const amenities = getAmenities();
  return (
    <Section id="amenities" className="bg-cream-50">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.2em] text-wood-600">
          {t('eyebrow')}
        </p>
        <h2 className="mt-4 max-w-2xl font-display text-4xl leading-[1.1] tracking-tight text-forest-900 text-balance sm:text-5xl">
          {t('title')}
        </h2>
      </Reveal>

      <div className="mt-16 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {amenities.map((amenity, i) => {
          const Icon = ICONS[amenity.iconKey] ?? Wifi;
          return (
            <Reveal key={amenity.id} delay={i * 60}>
              <div className="flex gap-4">
                <Icon size={28} weight="regular" className="shrink-0 text-forest-700" />
                <div>
                  <h3 className="font-display text-xl text-forest-900">
                    {amenity.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-ink-600">
                    {amenity.description}
                  </p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={200}>
        <p className="mt-16 border-t border-forest-900/10 pt-8 text-sm text-ink-500">
          {t('alsoIncluded')}: handuk, sabun, kopi, teh, air mineral 1 galon, gas LPG.
        </p>
      </Reveal>
    </Section>
  );
}
```

- [ ] **Step 2: Create Layout section**

```typescript
// src/components/sections/layout.tsx
import { useTranslations } from 'next-intl';
import { Section } from '@/components/shared/section';
import { Reveal } from '@/components/shared/reveal';
import { getLayout } from '@/data/layout';

export function Layout() {
  const t = useTranslations('layout');
  const layout = getLayout();
  return (
    <Section id="layout" className="bg-forest-900 text-cream-50">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.2em] text-cream-200/70">
          {t('eyebrow')}
        </p>
        <h2 className="mt-4 max-w-2xl font-display text-4xl leading-[1.1] tracking-tight text-cream-50 text-balance sm:text-5xl">
          {t('title')}
        </h2>
      </Reveal>

      <Reveal delay={120}>
        <dl className="mt-12 grid grid-cols-2 gap-6 border-y border-cream-50/15 py-10 sm:grid-cols-4">
          {[
            { value: layout.bedrooms, label: t('stats.bedrooms') },
            { value: layout.guests, label: t('stats.guests') },
            { value: layout.bathrooms, label: t('stats.bathrooms') },
            { value: layout.area, label: t('stats.area') },
          ].map((stat) => (
            <div key={stat.label}>
              <dt className="font-display text-4xl text-cream-50">{stat.value}</dt>
              <dd className="mt-1 text-sm text-cream-200/70">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <div className="mt-12 grid gap-8 sm:grid-cols-2">
        {layout.rooms.map((room, i) => (
          <Reveal key={room.id} delay={i * 80}>
            <div className="rounded-lg border border-cream-50/10 bg-forest-800/40 p-6">
              <h3 className="font-display text-2xl text-cream-50">{room.name}</h3>
              <p className="mt-1 text-sm text-cream-200/70">{room.specs}</p>
              <p className="mt-4 text-xs uppercase tracking-wider text-cream-200/60">
                {t('bedConfig')}
              </p>
              <p className="mt-1 text-sm text-cream-50/90">{room.beds}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
```

- [ ] **Step 3: Create Gallery section**

```typescript
// src/components/sections/gallery.tsx
import { useTranslations } from 'next-intl';
import { Section } from '@/components/shared/section';
import { Reveal } from '@/components/shared/reveal';
import { getGallery } from '@/data/gallery';

export function Gallery() {
  const t = useTranslations('gallery');
  const images = getGallery();
  return (
    <Section id="gallery" className="bg-cream-100">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.2em] text-wood-600">
          {t('eyebrow')}
        </p>
        <h2 className="mt-4 max-w-2xl font-display text-4xl leading-[1.1] tracking-tight text-forest-900 text-balance sm:text-5xl">
          {t('title')}
        </h2>
      </Reveal>

      <div className="mt-16 grid grid-cols-2 gap-4 lg:grid-cols-3">
        {images.map((img, i) => (
          <Reveal
            key={img.id}
            delay={i * 50}
            className={i === 0 ? 'col-span-2 row-span-2' : ''}
          >
            <div
              className="aspect-square w-full overflow-hidden rounded-lg bg-wood-100"
              style={{ backgroundImage: `url(${img.url})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              role="img"
              aria-label={img.alt}
            />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
```

- [ ] **Step 4: Create Experience section**

```typescript
// src/components/sections/experience.tsx
import { useTranslations } from 'next-intl';
import { FishSimple, Boat, Sun, Mountains, Umbrella, Binoculars } from '@phosphor-icons/react/dist/ssr';
import { Section } from '@/components/shared/section';
import { Reveal } from '@/components/shared/reveal';
import { getExperiences } from '@/data/experiences';

const ICONS: Record<string, React.ComponentType<{ size?: number; weight?: 'regular' | 'bold' }>> = {
  fishing: FishSimple,
  boat: Boat,
  beach: Sun,
  green: Mountains,
  family: Umbrella,
  wildlife: Binoculars,
};

export function Experience() {
  const t = useTranslations('experience');
  const experiences = getExperiences();
  return (
    <Section id="experience" className="bg-cream-50">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.2em] text-wood-600">
          {t('eyebrow')}
        </p>
        <h2 className="mt-4 max-w-2xl font-display text-4xl leading-[1.1] tracking-tight text-forest-900 text-balance sm:text-5xl">
          {t('title')}
        </h2>
        <p className="mt-6 max-w-xl text-lg text-ink-600">
          {t('sub')}
        </p>
      </Reveal>

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {experiences.map((exp, i) => {
          const Icon = ICONS[exp.iconKey] ?? Sun;
          return (
            <Reveal key={exp.id} delay={i * 70}>
              <article className="group h-full rounded-lg border border-forest-900/10 bg-cream-100/50 p-6 transition-colors hover:border-forest-700/30">
                <Icon size={32} weight="regular" className="text-forest-700" />
                <h3 className="mt-4 font-display text-xl text-forest-900">
                  {exp.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">
                  {exp.description}
                </p>
                <p className="mt-4 text-xs text-wood-600">
                  {exp.distance} · {exp.duration}
                </p>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
```

- [ ] **Step 5: Commit all 4 sections together**

```bash
git add src/components/sections/ src/data/amenities.ts src/data/layout.ts src/data/gallery.ts src/data/experiences.ts
git commit -m "feat: add Amenities, Layout, Gallery, Experience sections"
```

---

## Task 4.7: Location + Testimonials + Pricing + FAQ Sections

**Files:**
- Create: `src/components/sections/location.tsx`
- Create: `src/components/sections/testimonials.tsx`
- Create: `src/components/sections/pricing.tsx`
- Create: `src/components/sections/faq.tsx`

- [ ] **Step 1: Create Location section**

```typescript
// src/components/sections/location.tsx
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { Section } from '@/components/shared/section';
import { Reveal } from '@/components/shared/reveal';
import { getLocation } from '@/data/location';

const Map = dynamic(() => import('@/components/shared/map').then((m) => m.Map), {
  ssr: false,
  loading: () => <div className="aspect-[4/3] w-full animate-pulse rounded-lg bg-wood-100" />,
});

export function Location() {
  const t = useTranslations('location');
  const loc = getLocation();
  return (
    <Section id="location" className="bg-cream-100">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.2em] text-wood-600">
          {t('eyebrow')}
        </p>
        <h2 className="mt-4 max-w-2xl font-display text-4xl leading-[1.1] tracking-tight text-forest-900 text-balance sm:text-5xl">
          {t('title')}
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-10 lg:grid-cols-5">
        <Reveal className="lg:col-span-3">
          <Map lat={loc.lat} lng={loc.lng} label={loc.label} />
        </Reveal>
        <Reveal className="lg:col-span-2" delay={120}>
          <div>
            <h3 className="font-display text-2xl text-forest-900">{t('howToGet')}</h3>
            <p className="mt-4 text-base text-ink-600">{loc.directions}</p>
            <h3 className="mt-10 font-display text-2xl text-forest-900">
              {t('landmarks')}
            </h3>
            <ul className="mt-4 space-y-3 text-base text-ink-600">
              {loc.landmarks.map((l) => (
                <li key={l.id} className="flex justify-between border-b border-forest-900/10 pb-2">
                  <span>{l.name}</span>
                  <span className="text-wood-600">{l.distance}</span>
                </li>
              ))}
            </ul>
            <a
              href={`https://wa.me/${loc.whatsappNumber}?text=${encodeURIComponent('Halo, saya butuh arah ke Mahoni House')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center gap-2 rounded-md bg-forest-700 px-5 py-2.5 text-sm font-medium text-cream-50 transition-colors hover:bg-forest-900"
            >
              {t('directionsCta')}
            </a>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Create Map component (Leaflet) — minimal version**

```typescript
// src/components/shared/map.tsx
'use client';

import { useEffect, useRef } from 'react';

type MapProps = { lat: number; lng: number; label: string };

export function Map({ lat, lng, label }: MapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<unknown>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const L = await import('leaflet');
      await import('leaflet/dist/leaflet.css');
      if (!mounted || !containerRef.current) return;

      const map = L.map(containerRef.current).setView([lat, lng], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap',
      }).addTo(map);

      const icon = L.divIcon({
        className: 'custom-marker',
        // Marker color via currentColor — parent CSS sets `color: forest-700` via design token
        html: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor" style="color:#1f4a3a"><path d="M12 2C7.6 2 4 5.6 4 10c0 5.4 7 12 8 12s8-6.6 8-12c0-4.4-3.6-8-8-8zm0 11a3 3 0 110-6 3 3 0 010 6z"/></svg>`,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
      });

      L.marker([lat, lng], { icon }).addTo(map).bindPopup(label);
      mapRef.current = map;
    })();

    return () => {
      mounted = false;
      const m = mapRef.current as { remove?: () => void } | null;
      if (m && typeof m.remove === 'function') m.remove();
    };
  }, [lat, lng, label]);

  return <div ref={containerRef} className="aspect-[4/3] w-full rounded-lg" />;
}
```

- [ ] **Step 3: Create Testimonials section**

```typescript
// src/components/sections/testimonials.tsx
import { useTranslations } from 'next-intl';
import { Star } from '@phosphor-icons/react/dist/ssr';
import { Section } from '@/components/shared/section';
import { Reveal } from '@/components/shared/reveal';
import { getTestimonials } from '@/data/testimonials';

export function Testimonials() {
  const t = useTranslations('testimonials');
  const reviews = getTestimonials();
  return (
    <Section id="testimonials" className="bg-cream-50">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.2em] text-wood-600">
          {t('eyebrow')}
        </p>
        <h2 className="mt-4 max-w-2xl font-display text-4xl leading-[1.1] tracking-tight text-forest-900 text-balance sm:text-5xl">
          {t('title')}
        </h2>
      </Reveal>

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {reviews.map((review, i) => (
          <Reveal key={review.id} delay={i * 80}>
            <figure className="flex h-full flex-col rounded-lg border border-forest-900/10 bg-cream-100/40 p-8">
              <div className="flex gap-0.5" aria-label={`${review.rating} dari 5 bintang`}>
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star
                    key={idx}
                    size={16}
                    weight={idx < review.rating ? 'fill' : 'regular'}
                    className={idx < review.rating ? 'text-wood-600' : 'text-ink-300'}
                  />
                ))}
              </div>
              <blockquote className="mt-6 flex-1 font-display text-xl italic leading-relaxed text-forest-900">
                "{review.quote}"
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-forest-900/10 pt-4">
                <div
                  className="h-10 w-10 rounded-full bg-cover bg-center bg-wood-200"
                  style={{ backgroundImage: `url(${review.avatar})` }}
                  aria-hidden="true"
                />
                <div>
                  <p className="font-medium text-forest-900">{review.name}</p>
                  <p className="text-sm text-ink-500">{review.location} · {review.date}</p>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>

      <Reveal delay={200}>
        <p className="mt-12 text-center text-sm italic text-ink-500">
          {t('disclaimer')}
        </p>
      </Reveal>
    </Section>
  );
}
```

- [ ] **Step 4: Create Pricing section**

```typescript
// src/components/sections/pricing.tsx
import { useTranslations } from 'next-intl';
import { Check } from '@phosphor-icons/react/dist/ssr';
import { Section } from '@/components/shared/section';
import { Reveal } from '@/components/shared/reveal';
import { CtaButton } from '@/components/shared/cta-button';
import { getPricing } from '@/data/pricing';

export function Pricing() {
  const t = useTranslations('pricing');
  const tiers = getPricing();
  return (
    <Section id="pricing" className="bg-cream-100">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.2em] text-wood-600">
          {t('eyebrow')}
        </p>
        <h2 className="mt-4 max-w-2xl font-display text-4xl leading-[1.1] tracking-tight text-forest-900 text-balance sm:text-5xl">
          {t('title')}
        </h2>
        <p className="mt-6 max-w-xl text-lg text-ink-600">{t('sub')}</p>
      </Reveal>

      <div className="mt-16 grid gap-6 lg:grid-cols-3">
        {tiers.map((tier, i) => (
          <Reveal
            key={tier.id}
            delay={i * 100}
            className={tier.featured ? 'lg:-mt-4' : ''}
          >
            <div
              className={`flex h-full flex-col rounded-lg p-8 ${
                tier.featured
                  ? 'border-2 border-forest-700 bg-cream-50'
                  : 'border border-forest-900/10 bg-cream-50/60'
              }`}
            >
              {tier.featured && (
                <span className="mb-4 inline-block w-fit rounded-full bg-forest-700 px-3 py-1 text-xs font-medium uppercase tracking-wider text-cream-50">
                  {t('mostPopular')}
                </span>
              )}
              <h3 className="font-display text-2xl text-forest-900">
                {tier.name}
              </h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-4xl text-forest-900">
                  {tier.price}
                </span>
                <span className="text-sm text-ink-500">{t('perNight')}</span>
              </div>
              <p className="mt-2 text-sm text-ink-600">{tier.subtitle}</p>

              <div className="mt-8">
                <p className="text-xs uppercase tracking-wider text-wood-600">
                  {t('includes')}
                </p>
                <ul className="mt-3 space-y-2 text-sm text-ink-700">
                  {tier.includes.map((item) => (
                    <li key={item} className="flex gap-2">
                      <Check size={16} weight="bold" className="mt-0.5 shrink-0 text-forest-700" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <CtaButton
                href="#booking"
                variant={tier.featured ? 'primary' : 'secondary'}
                className="mt-10 w-full"
              >
                {t('bookCta')}
              </CtaButton>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
```

- [ ] **Step 5: Create FAQ section**

```typescript
// src/components/sections/faq.tsx
'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Plus, Minus } from '@phosphor-icons/react/dist/ssr';
import { Section } from '@/components/shared/section';
import { Reveal } from '@/components/shared/reveal';
import { getFaqs } from '@/data/faqs';
import { cn } from '@/lib/utils';

export function FAQ() {
  const t = useTranslations('faq');
  const faqs = getFaqs();
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <Section id="faq" className="bg-cream-50">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.2em] text-wood-600">
          {t('eyebrow')}
        </p>
        <h2 className="mt-4 max-w-2xl font-display text-4xl leading-[1.1] tracking-tight text-forest-900 text-balance sm:text-5xl">
          {t('title')}
        </h2>
      </Reveal>

      <div className="mt-12 divide-y divide-forest-900/10 border-y border-forest-900/10">
        {faqs.map((faq, i) => {
          const isOpen = openId === faq.id;
          return (
            <Reveal key={faq.id} delay={i * 40}>
              <div>
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-lg text-forest-900 sm:text-xl">
                    {faq.question}
                  </span>
                  <span className="shrink-0 text-forest-700">
                    {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                  </span>
                </button>
                <div
                  className={cn(
                    'grid transition-all duration-300 ease-out',
                    isOpen ? 'grid-rows-[1fr] opacity-100 pb-6' : 'grid-rows-[0fr] opacity-0',
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-3xl text-base text-ink-600">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
```

- [ ] **Step 6: Commit all 4 sections together**

```bash
git add src/components/sections/ src/components/shared/map.tsx
git commit -m "feat: add Location, Testimonials, Pricing, FAQ sections"
```

---

## Task 4.8: Booking Form Section (UI only) + Footer

**Files:**
- Create: `src/components/sections/booking-form.tsx`
- Create: `src/components/sections/footer.tsx`

- [ ] **Step 1: Create Booking Form UI (form logic in Phase 5)**

```typescript
// src/components/sections/booking-form.tsx
'use client';

import { useFormStatus } from 'react-dom';
import { useTranslations } from 'next-intl';
import { Section } from '@/components/shared/section';
import { Reveal } from '@/components/shared/reveal';
import { submitBooking } from '@/app/actions/booking';

export function BookingForm() {
  const t = useTranslations('booking');

  return (
    <Section id="booking" className="bg-forest-900 text-cream-50">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.2em] text-cream-200/70">
          {t('eyebrow')}
        </p>
        <h2 className="mt-4 max-w-2xl font-display text-4xl leading-[1.1] tracking-tight text-cream-50 text-balance sm:text-5xl">
          {t('title')}
        </h2>
        <p className="mt-6 max-w-xl text-lg text-cream-200/80">{t('sub')}</p>
      </Reveal>

      <Reveal delay={120}>
        <form
          action={submitBooking}
          className="mt-12 grid max-w-3xl gap-6"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <Field label={t('checkIn')} name="checkIn" type="date" required />
            <Field label={t('checkOut')} name="checkOut" type="date" required />
          </div>
          <Field label={t('guests')} name="guests" type="number" min={1} max={10} defaultValue={4} required />
          <div className="grid gap-6 sm:grid-cols-2">
            <Field label={t('name')} name="name" type="text" required />
            <Field label={t('email')} name="email" type="email" required />
          </div>
          <Field label={t('phone')} name="phone" type="tel" required />

          <div>
            <label className="block text-sm font-medium text-cream-200/90">
              {t('requests')}
            </label>
            <textarea
              name="requests"
              rows={4}
              className="mt-2 w-full rounded-md border border-cream-50/20 bg-forest-800/50 px-4 py-2.5 text-cream-50 placeholder:text-cream-200/40 focus:border-cream-50/50 focus:outline-none focus:ring-1 focus:ring-cream-50/30"
            />
          </div>

          <label className="flex items-start gap-3 text-sm text-cream-200/85">
            <input
              type="checkbox"
              name="agreement"
              required
              className="mt-1 h-4 w-4 rounded border-cream-50/30 bg-forest-800 text-forest-700 focus:ring-cream-50/30"
            />
            <span>
              {t('agreement')}{' '}
              <a href="#terms" className="text-cream-50 underline-offset-4 hover:underline">
                {t('terms')}
              </a>
            </span>
          </label>

          <SubmitButton />
        </form>
      </Reveal>
    </Section>
  );
}

function Field({
  label,
  name,
  type,
  min,
  max,
  defaultValue,
  required,
}: {
  label: string;
  name: string;
  type: string;
  min?: number;
  max?: number;
  defaultValue?: number;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-cream-200/90">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        min={min}
        max={max}
        defaultValue={defaultValue}
        required={required}
        className="mt-2 w-full rounded-md border border-cream-50/20 bg-forest-800/50 px-4 py-2.5 text-cream-50 placeholder:text-cream-200/40 focus:border-cream-50/50 focus:outline-none focus:ring-1 focus:ring-cream-50/30"
      />
    </div>
  );
}

function SubmitButton() {
  const t = useTranslations('booking');
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-2 inline-flex min-h-[52px] w-full items-center justify-center rounded-md bg-cream-50 px-6 py-3.5 text-base font-medium text-forest-900 transition-all hover:bg-cream-100 active:scale-[0.97] disabled:opacity-60 sm:w-auto"
    >
      {pending ? t('sending') : t('submit')}
    </button>
  );
}
```

- [ ] **Step 2: Create Footer**

```typescript
// src/components/sections/footer.tsx
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

const QUICK_LINKS = [
  { id: 'villa', href: '#villa' },
  { id: 'amenities', href: '#amenities' },
  { id: 'pricing', href: '#pricing' },
  { id: 'faq', href: '#faq' },
] as const;

export function Footer() {
  const t = useTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-forest-900/10 bg-cream-100 px-6 py-12 sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Link
            href="/"
            className="font-display text-2xl tracking-tight text-forest-900"
          >
            Mahoni House
          </Link>
          <p className="mt-3 max-w-sm text-sm text-ink-600">
            {t('tagline')}
          </p>
          <p className="mt-6 text-xs text-ink-500">{t('copyright').replace('2026', String(year))}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-forest-900">
            {t('quickLinks')}
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-ink-600">
            {QUICK_LINKS.map((link) => (
              <li key={link.id}>
                <a href={link.href} className="hover:text-forest-700">
                  {t.useTranslations ? null : null}
                  {idToNavLabel(link.id, t)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-forest-900">
            {t('contact')}
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-ink-600">
            <li>Pangandaran, West Java</li>
            <li>+62 812-3456-7890</li>
            <li>hello@mahonihouse.id</li>
          </ul>
        </div>
      </div>

      <p className="mt-10 text-center text-xs text-ink-500">
        {t('builtWith')}
      </p>
    </footer>
  );
}

function idToNavLabel(
  id: string,
  t: ReturnType<typeof useTranslations<'footer'>>,
): string {
  // Use shared nav labels
  const map: Record<string, string> = {
    villa: 'Villa',
    amenities: 'Amenities',
    pricing: 'Pricing',
    faq: 'FAQ',
  };
  // Override via shared nav translations (t here is footer scoped, so inline)
  return map[id] ?? id;
}
```

NOTE: The footer `idToNavLabel` is a placeholder. Refactor later to share nav labels. For now, hardcode based on a single locale — but since this is bilingual, replace with a cleaner approach: use a `useTranslations('nav')` inside the footer instead.

**Refactor footer to:**

```typescript
// Re-do src/components/sections/footer.tsx (replace whole file)
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export function Footer() {
  const t = useTranslations('footer');
  const nav = useTranslations('nav');
  const year = new Date().getFullYear();

  const links = [
    { href: '#villa', label: nav('villa') },
    { href: '#amenities', label: nav('amenities') },
    { href: '#pricing', label: nav('pricing') },
    { href: '#faq', label: nav('faq') },
  ];

  return (
    <footer className="border-t border-forest-900/10 bg-cream-100 px-6 py-12 sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Link href="/" className="font-display text-2xl tracking-tight text-forest-900">
            Mahoni House
          </Link>
          <p className="mt-3 max-w-sm text-sm text-ink-600">{t('tagline')}</p>
          <p className="mt-6 text-xs text-ink-500">{t('copyright').replace('2026', String(year))}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-forest-900">
            {t('quickLinks')}
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-ink-600">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-forest-700">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-forest-900">
            {t('contact')}
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-ink-600">
            <li>Pangandaran, West Java</li>
            <li>+62 812-3456-7890</li>
            <li>hello@mahonihouse.id</li>
          </ul>
        </div>
      </div>
      <p className="mt-10 text-center text-xs text-ink-500">{t('builtWith')}</p>
    </footer>
  );
}
```

- [ ] **Step 3: Wire all sections into page.tsx**

```typescript
// app/[locale]/page.tsx
import { setRequestLocale } from 'next-intl/server';
import { Nav } from '@/components/sections/nav';
import { Hero } from '@/components/sections/hero';
import { Story } from '@/components/sections/story';
import { VillaBento } from '@/components/sections/villa-bento';
import { Amenities } from '@/components/sections/amenities';
import { Layout } from '@/components/sections/layout';
import { Gallery } from '@/components/sections/gallery';
import { Experience } from '@/components/sections/experience';
import { Location } from '@/components/sections/location';
import { Testimonials } from '@/components/sections/testimonials';
import { Pricing } from '@/components/sections/pricing';
import { FAQ } from '@/components/sections/faq';
import { BookingForm } from '@/components/sections/booking-form';
import { Footer } from '@/components/sections/footer';
import { type Locale } from '@/i18n/routing';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <Nav locale={locale as Locale} />
      <main>
        <Hero />
        <Story />
        <VillaBento />
        <Amenities />
        <Layout />
        <Gallery />
        <Experience />
        <Location />
        <Testimonials />
        <Pricing />
        <FAQ />
        <BookingForm locale={locale as 'id' | 'en'} />
      </main>
      <Footer />
    </>
  );
}
```

NOTE: The form action `submitBooking` doesn't exist yet. The build will fail. **Create a temporary stub at `src/app/actions/booking.ts`:**

```typescript
'use server';

export async function submitBooking(formData: FormData) {
  console.log('Form submitted (stub)');
}
```

This is a placeholder. Real implementation comes in Phase 5.

- [ ] **Step 4: Verify build**

```bash
pnpm typecheck
pnpm build
```

Expected: build succeeds (form stub in place).

- [ ] **Step 5: Visual verify at 4 breakpoints**

```bash
pnpm dev
```

- Test 375, 768, 1280, 1920
- Scroll through all 12 sections
- Verify: no overflow, fonts load (Lora, Plus Jakarta Sans), colors are Tropical Modern (forest/cream/wood), no emoji icons, bento grid asymmetric
- Switch to /en → all text changes, layout identical

- [ ] **Step 6: Commit**

```bash
git add src/components/sections/ src/app/actions/booking.ts app/[locale]/page.tsx
git commit -m "feat: add BookingForm UI stub, Footer, and wire all 12 sections"
```

---

## Task 4.9: Phase 4 Verification

- [ ] **Step 1: Run all checks**

```bash
pnpm typecheck
pnpm lint
pnpm build
```

Expected: all exit 0. No `as any`, no `@ts-ignore`, no empty catch.

- [ ] **Step 2: Manual visual audit at all 4 breakpoints**

375, 768, 1280, 1920. Check for:
- No horizontal overflow
- Heading hierarchy (h1 → h6)
- Font swap working (Lora on headings, Jakarta on body)
- Scroll-reveal triggers on scroll
- No layout shifts (CLS)
- All CTAs work, all anchors scroll to correct section

- [ ] **Step 3: Bilingual spot-check**

Visit `/` (ID) and `/en` (EN). Verify:
- Hero tagline: "Tempat keluarga desacelerasi di tepi laut" vs "Where family slows down by the sea"
- Section eyebrows change
- No English/Indonesian mixing
- LocaleSwitcher toggle works

- [ ] **Step 4: Document Phase 4 complete**

Note: "Phase 4 complete: All 12 sections built, bilingual verified, form UI stub in place."

---

## Task 4.10: Create not-found.tsx (404 page)

**Files:**
- Create: `app/[locale]/not-found.tsx`

- [ ] **Step 1: Create the 404 page**

```typescript
import { Link } from '@/i18n/routing';

export default function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center bg-cream-50 px-6">
      <div className="max-w-md text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-wood-600">404</p>
        <h1 className="mt-4 font-display text-5xl text-forest-900 sm:text-6xl">
          Halaman tidak ditemukan
        </h1>
        <p className="mt-6 font-body text-lg text-ink-600">
          Tautan yang Anda buka sudah tidak tersedia. Silakan kembali ke beranda.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex min-h-[44px] items-center justify-center rounded-md bg-forest-700 px-6 py-3 text-base font-medium text-cream-50 transition-all hover:bg-forest-900 active:scale-[0.97]"
        >
          Kembali ke beranda
        </Link>
      </div>
    </main>
  );
}
```

> 📝 **Note**: For a complete bilingual 404, create a parallel `app/[locale]/[not-found]/page.tsx` or use the `notFound` API with locale-aware messages. For Phase 1, single-language 404 (Indonesian only) is acceptable since the page is rarely seen.

- [ ] **Step 2: Commit (subject to user approval)**

```bash
git add app/[locale]/not-found.tsx
git commit -m "feat: add 404 not-found page"
```

---

**Proceed to: `2026-06-05-villa-pangandaran-landing-05-form-integration.md`**
