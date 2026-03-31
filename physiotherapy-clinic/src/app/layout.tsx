import type { Metadata } from 'next';
import './globals.css';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | Physiotherapy Clinic`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
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
