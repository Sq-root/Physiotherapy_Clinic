import type { Metadata } from 'next';
import { Lexend, Great_Vibes } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const lexend = Lexend({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-script',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Vitality Path | Physiotherapy Clinic',
    template: '%s | Vitality Path',
  },
  description:
    'Embark on a journey of self-discovery and physical healing with expert therapists at Vitality Path — a serene, nature-inspired physiotherapy clinic.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${lexend.variable} ${greatVibes.variable}`}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased overflow-x-hidden selection:bg-seafoam selection:text-forest">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
