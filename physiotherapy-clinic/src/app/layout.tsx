import type { Metadata, Viewport } from 'next';
import './globals.css';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Physiotherapy in Dubai & Online Consultations Worldwide`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.doctorName }],
  creator: siteConfig.doctorName,
  publisher: siteConfig.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Physiotherapy in Dubai & Online Consultations Worldwide`,
    description: siteConfig.description,
    images: [
      {
        url: '/logo/Dr_isha_Logo.png',
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} | Physiotherapy in Dubai & Online Consultations Worldwide`,
    description: siteConfig.description,
    images: ['/logo/Dr_isha_Logo.png'],
  },
  icons: {
    icon: [
      { url: '/logo/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/logo/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/logo/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#2F5D50',
};

// Root layout - passes children to locale layout
// Navbar/Footer are rendered in [locale]/layout.tsx with i18n provider
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
