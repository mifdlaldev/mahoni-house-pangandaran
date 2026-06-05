import type { Metadata } from 'next';
import { Lora, Plus_Jakarta_Sans } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import '../globals.css';

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'hero' });

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mahonihouse.id';

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: 'Mahoni House Pangandaran — Villa Keluarga 4-Kamar',
      template: '%s | Mahoni House Pangandaran',
    },
    description: t('sub'),
    keywords: [
      'villa pangandaran',
      'sewa villa pangandaran',
      'villa keluarga pangandaran',
      'private villa pangandaran',
      'penginapan pangandaran',
    ],
    authors: [{ name: 'Mahoni House' }],
    openGraph: {
      type: 'website',
      locale: locale === 'id' ? 'id_ID' : 'en_US',
      url: `${baseUrl}/${locale}`,
      siteName: 'Mahoni House Pangandaran',
      title: 'Mahoni House Pangandaran',
      description: t('sub'),
      images: [
        {
          url: '/og.png',
          width: 1200,
          height: 630,
          alt: 'Mahoni House Pangandaran',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Mahoni House Pangandaran',
      description: t('sub'),
      images: ['/og.png'],
    },
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        id: `${baseUrl}/id`,
        en: `${baseUrl}/en`,
      },
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${lora.variable} ${jakarta.variable}`}>
      <body className="font-body text-ink-900 bg-cream-50 antialiased">
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
