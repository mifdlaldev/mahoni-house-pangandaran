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
import type { Locale } from '@/i18n/routing';

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
