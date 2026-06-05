// FICTIONAL — for portfolio demo only
export const ownersBio = {
  headline: {
    id: 'Empat kamar untuk keluarga yang ingin kembali bersama',
    en: 'Four bedrooms for families who want to come back together',
  },
  paragraph1: {
    id: 'Mahoni House dibangun tahun 2021 oleh Asep dan Lina, pensiunan guru asal Bandung yang jatuh cinta pada pesisir Pangandaran.',
    en: 'Mahoni House was built in 2021 by Asep and Lina, retired teachers from Bandung who fell in love with the Pangandaran shore.',
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
