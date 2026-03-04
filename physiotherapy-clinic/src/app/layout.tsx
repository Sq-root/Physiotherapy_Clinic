import type { Metadata } from 'next';
import { Cormorant_Garamond, DM_Sans, Alex_Brush } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
});

const alexBrush = Alex_Brush({
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
    <html lang="en" className={`${dmSans.variable} ${cormorant.variable} ${alexBrush.variable}`}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased overflow-x-hidden selection:bg-lime selection:text-forest">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
