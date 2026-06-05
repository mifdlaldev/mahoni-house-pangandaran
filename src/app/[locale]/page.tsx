import { getTranslations, setRequestLocale } from 'next-intl/server';
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
import type { Locale } from '@/i18n/routing';
import { villaLocation } from '@/data/location';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mahonihouse.id';
  const tLd = await getTranslations({ locale, namespace: 'hero' });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: 'Mahoni House',
    description: tLd('sub'),
    url: `${baseUrl}/${locale}`,
    telephone: '+62-812-3456-7890',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Jl. Raya Pangandaran KM 5',
      addressLocality: 'Pangandaran',
      addressRegion: 'West Java',
      postalCode: '46396',
      addressCountry: 'ID',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: villaLocation.lat,
      longitude: villaLocation.lng,
    },
    image: `${baseUrl}/og.jpg`,
    numberOfRooms: 4,
    petsAllowed: false,
    checkinTime: '14:00',
    checkoutTime: '11:00',
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Private Pool', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'WiFi', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Kitchen', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Parking', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Air Conditioning', value: true },
    ],
    priceRange: 'Rp 3.500.000 - Rp 5.500.000',
  };

  return (
    <>
      <Nav locale={locale as Locale} />
      <script
        id="ld-lodging"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
