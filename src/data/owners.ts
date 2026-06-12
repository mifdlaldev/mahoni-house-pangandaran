// FICTIONAL — for portfolio demo only
export const ownersBio = {
  headline: {
    id: 'Empat kamar untuk keluarga yang ingin kembali bersama',
    en: 'Four bedrooms for families who want to come back together',
  },
  paragraph1: {
id: 'Mahoni House dibangun tahun 2021 oleh Justin dan Jennifer, pasangan pengusaha asal Bandung yang memutuskan meninggalkan hiruk-pikuk kota dan memulai hidup baru di pesisir Pangandaran.',
en: 'Mahoni House was built in 2021 by Justin and Jennifer, entrepreneurs from Bandung who decided to leave the city behind and start a new life on the Pangandaran shore.',
  },
  paragraph2: {
    id: 'Setiap detail dirancang untuk keluarga — tempat tidur yang cukup untuk tiga generasi, kolam renang yang aman untuk anak, dan ruang bersama yang mengundang untuk mengobrol sampai larut.',
    en: 'Every detail is designed for families — beds for three generations, a kid-safe pool, and shared spaces that invite conversation late into the evening.',
  },
  image: '/images/owners.jpg',
} as const;

export function getOwnersBio() {
  return ownersBio;
}
