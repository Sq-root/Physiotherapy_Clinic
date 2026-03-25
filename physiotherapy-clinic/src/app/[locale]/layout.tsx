import type { Metadata } from 'next';
import { Lexend, Great_Vibes, Cairo } from 'next/font/google';
import '../globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { siteConfig } from '@/config/site';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { localeDirection } from '@/i18n/config';

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

// Cairo font for Arabic text
const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-arabic',
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: {
      default: `${siteConfig.name} | ${locale === 'ar' ? 'عيادة العلاج الطبيعي' : 'Physiotherapy Clinic'}`,
      template: `%s | ${siteConfig.name}`,
    },
    description: locale === 'ar' 
      ? 'خدمات علاج طبيعي متخصصة في دبي للإصابات الرياضية وإعادة التأهيل وإدارة الألم المزمن.'
      : siteConfig.description,
    alternates: {
      languages: {
        'en': '/en',
        'ar': '/ar',
      },
    },
  };
}

type Locale = 'en' | 'ar';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Get messages for the current locale
  const messages = await getMessages();
  const dir = localeDirection[locale as Locale];
  const isArabic = locale === 'ar';

  return (
    <html 
      lang={locale} 
      dir={dir}
      className={`${lexend.variable} ${greatVibes.variable} ${cairo.variable}`}
    >
      <head>
        {/* Hreflang tags for SEO */}
        <link rel="alternate" hrefLang="en" href="/en" />
        <link rel="alternate" hrefLang="ar" href="/ar" />
        <link rel="alternate" hrefLang="x-default" href="/en" />
      </head>
      <body 
        className={`${isArabic ? 'font-arabic' : 'font-sans'} antialiased overflow-x-hidden selection:bg-seafoam selection:text-forest`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
