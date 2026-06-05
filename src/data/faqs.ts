import type { FAQItem } from '@/types';

// FICTIONAL — for portfolio demo only
export const faqItems: readonly FAQItem[] = [
  {
    q: { id: 'Jam check-in & check-out berapa?', en: 'What are the check-in and check-out times?' },
    a: {
      id: 'Check-in mulai pukul 14.00 WIB, check-out maksimal pukul 11.00 WIB. Early check-in / late check-out bisa diatur jika tidak ada tamu di hari sebelumnya — konfirmasi via WhatsApp.',
      en: 'Check-in is from 2:00 PM WIB, check-out is by 11:00 AM WIB. Early check-in or late check-out can be arranged if no other guests are scheduled — confirm via WhatsApp.',
    },
  },
  {
    q: { id: 'Apakah ada minimum inap?', en: 'Is there a minimum stay?' },
    a: {
      id: 'Ya. 2 malam untuk hari biasa, 3 malam untuk akhir pekan, 5 malam untuk musim liburan (Lebaran, Natal, Jul–Agt).',
      en: 'Yes. 2 nights on weekdays, 3 nights on weekends, 5 nights during peak season (Eid, Christmas, Jul–Aug).',
    },
  },
  {
    q: { id: 'Bagaimana cara pembayaran?', en: 'How do I pay?' },
    a: {
      id: 'DP 50% untuk konfirmasi booking, pelunasan 7 hari sebelum check-in. Transfer bank (BCA/Mandiri) atau e-wallet. Detail dikirim setelah booking dikonfirmasi via WhatsApp.',
      en: '50% deposit to confirm, balance 7 days before check-in. Bank transfer (BCA/Mandiri) or e-wallet. Details sent after booking is confirmed via WhatsApp.',
    },
  },
  {
    q: { id: 'Apakah kebijakan pembatalan?', en: 'What is the cancellation policy?' },
    a: {
      id: 'Pembatalan ≥ 14 hari sebelum: refund DP 50%. Pembatalan < 14 hari: DP tidak bisa di-refund. Reschedule gratis jika tersedia tanggal lain.',
      en: 'Cancellation ≥ 14 days before: 50% deposit refund. Cancellation < 14 days: no refund. Free reschedule if other dates are available.',
    },
  },
  {
    q: { id: 'Apakah boleh bawa hewan peliharaan?', en: 'Are pets allowed?' },
    a: {
      id: 'Boleh, maksimal 2 hewan kecil (anjing/kucing, < 10 kg). Biaya tambahan Rp 200.000 per hewan per inap. Taman berpagar untuk keamanan.',
      en: 'Yes, up to 2 small pets (dogs/cats, < 10 kg). Additional fee of IDR 200,000 per pet per stay. The garden is fully fenced for safety.',
    },
  },
  {
    q: { id: 'Apakah ada pembersihan harian?', en: 'Is daily housekeeping included?' },
    a: {
      id: 'Ya, housekeeping datang setiap pagi (kecuali hari Minggu). Ganti handuk & linen setiap 3 hari, atau sesuai permintaan.',
      en: 'Yes, housekeeping comes every morning (except Sundays). Towels and linens changed every 3 days, or on request.',
    },
  },
  {
    q: { id: 'Bisakah antar-jemput bandara?', en: 'Do you offer airport transfer?' },
    a: {
      id: 'Kami bisa koordinasi dengan driver lokal terpercaya. Bandara terdekat: Nusawiru (30 min), Bandung Husein (4.5 jam), atau Kertajati (4 jam). Biaya tergantung jarak.',
      en: 'We can coordinate with trusted local drivers. Nearest airports: Nusawiru (30 min), Bandung Husein (4.5 hrs), or Kertajati (4 hrs). Cost depends on distance.',
    },
  },
  {
    q: { id: 'Apakah dapur benar-benar lengkap?', en: 'Is the kitchen really fully equipped?' },
    a: {
      id: 'Kompor gas, oven, microwave, kulkas besar, rice cooker, blender, pisau & talenan, piring & gelas untuk 12 orang, spices basic. Plus complimentary kopi & teh lokal.',
      en: 'Gas stove, oven, microwave, large fridge, rice cooker, blender, knives & cutting board, plates & glasses for 12, basic spices. Plus complimentary local coffee & tea.',
    },
  },
  {
    q: { id: 'Apakah kolam aman untuk anak kecil?', en: 'Is the pool safe for small children?' },
    a: {
      id: 'Kolam 8x4m dengan kedalaman 1.5m. Untuk anak di bawah 5 tahun, harap selalu ada pengawasan orang dewasa. Life jacket tersedia gratis di villa.',
      en: 'Pool is 8x4m with 1.5m depth. For children under 5, please keep adult supervision at all times. Life jackets are available free at the villa.',
    },
  },
  {
    q: { id: 'Apakah tersedia parkir?', en: 'Is parking available?' },
    a: {
      id: 'Ya, parkir dalam villa untuk 2 mobil. Area cukup untuk SUV / minibus.',
      en: 'Yes, in-villa parking for 2 cars. Space fits SUV or minibus.',
    },
  },
] as const;
