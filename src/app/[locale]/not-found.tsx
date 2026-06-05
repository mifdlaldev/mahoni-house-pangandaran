import { getLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';

const COPY = {
  id: {
    eyebrow: '404',
    title: 'Halaman tidak ditemukan',
    sub: 'Tautan yang Anda buka sudah tidak tersedia. Silakan kembali ke beranda.',
    cta: 'Kembali ke beranda',
  },
  en: {
    eyebrow: '404',
    title: 'Page not found',
    sub: 'The link you opened is no longer available. Please head back to the homepage.',
    cta: 'Back to homepage',
  },
} as const;

export default async function NotFound() {
  const locale = (await getLocale()) as keyof typeof COPY;
  const c = COPY[locale] ?? COPY.id;

  return (
    <main className="grid min-h-dvh place-items-center bg-cream-50 px-6 py-20">
      <div className="max-w-md text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-wood-700">{c.eyebrow}</p>
        <h1 className="mt-4 font-display text-5xl leading-[1.05] tracking-tight text-forest-900 text-balance sm:text-6xl">
          {c.title}
        </h1>
        <p className="mt-6 font-body text-lg text-ink-600">{c.sub}</p>
        <Link
          href="/"
          className="mt-10 inline-flex min-h-[44px] items-center justify-center rounded-md bg-forest-700 px-6 py-3 text-base font-medium text-cream-50 transition-all hover:bg-forest-900 active:scale-[0.97]"
        >
          {c.cta}
        </Link>
      </div>
    </main>
  );
}
