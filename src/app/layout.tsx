import type { Metadata } from 'next';
import { Lora, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const lora = Lora({
  variable: '--font-display',
  subsets: ['latin'],
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  variable: '--font-body',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Mahoni House Pangandaran',
  description:
    'Villa keluarga 4-kamar di Pangandaran. Private pool, tropical garden, 6 menit ke Pantai Barat.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${lora.variable} ${jakarta.variable}`}>
      <body className="font-body text-ink-900 bg-cream-50 antialiased">{children}</body>
    </html>
  );
}
