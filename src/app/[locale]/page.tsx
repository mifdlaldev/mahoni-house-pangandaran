import { getTranslations, setRequestLocale } from 'next-intl/server';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'hero' });

  return (
    <main className="min-h-dvh bg-cream-50 p-12">
      <p className="text-xs uppercase tracking-wider text-wood-500">{t('eyebrow')}</p>
      <h1 className="mt-2 font-display text-5xl text-forest-900">
        {t('title')} <span className="text-ink-400">({locale})</span>
      </h1>
      <p className="mt-4 font-body text-lg italic text-forest-700">{t('tagline')}</p>
    </main>
  );
}
