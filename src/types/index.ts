// Shared types used across the Mahoni House landing page data layer.
// All literal text uses LocalizedString (id + en) for bilingual support.

export type Locale = 'id' | 'en';

export type LocalizedString = {
  id: string;
  en: string;
};

export type Amenity = {
  id: string;
  label: LocalizedString;
  description: LocalizedString;
  iconName: string;
  category: 'outdoor' | 'indoor' | 'tech' | 'comfort';
};

export type PricingTier = {
  id: 'weekday' | 'weekend' | 'peak';
  name: LocalizedString;
  rate: number;
  period: LocalizedString;
  minNights: number;
  minNightsLabel: LocalizedString;
};

export type Experience = {
  id: string;
  name: LocalizedString;
  description: LocalizedString;
  distanceMinutes: number;
  image: string;
};

export type Testimonial = {
  id: string;
  name: string;
  location: string;
  rating: 1 | 2 | 3 | 4 | 5;
  quote: LocalizedString;
  date: string;
  avatarInitials: string;
};

export type FAQItem = {
  id: string;
  q: LocalizedString;
  a: LocalizedString;
};

export type BookingFormData = {
  checkIn: string;
  checkOut: string;
  guests: number;
  name: string;
  email: string;
  phone: string;
  requests?: string;
  agreement: boolean;
};
