import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '../globals.css';
import { Navbar } from '@/components/layout/Navbar';
const WhatsAppButton = dynamic(() => import('@/components/layout/WhatsAppButton').then(m => ({ default: m.WhatsAppButton })));
import dynamic from 'next/dynamic';
import { siteConfig } from '@/config/site';

const Footer = dynamic(() => import('@/components/layout/Footer').then(m => ({ default: m.Footer })));
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { localeDirection } from '@/i18n/config';
import { RecaptchaProvider } from '@/components/providers/RecaptchaProvider';

const lexend = localFont({
  src: '../../../public/fonts/Lexend-Variable-latin.woff2',
  variable: '--font-sans',
  display: 'swap',
  weight: '100 900',
});

const greatVibes = localFont({
  src: '../../../public/fonts/GreatVibes-Regular-latin.woff2',
  variable: '--font-script',
  display: 'swap',
  weight: '400',
});

// Cairo font for Arabic text
const cairo = localFont({
  src: [
    {
      path: '../../../public/fonts/Cairo-Variable-arabic.woff2',
      weight: '200 1000',
    },
    {
      path: '../../../public/fonts/Cairo-Variable-latin.woff2',
      weight: '200 1000',
    },
  ],
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
        'en': `${siteConfig.url}/en`,
        'ar': `${siteConfig.url}/ar`,
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

  // Get messages for the current locale — scope to only shared client namespaces
  const messages = await getMessages();
  const sharedMessages = {
    common: messages.common,
    nav: messages.nav,
  };
  const dir = localeDirection[locale as Locale];
  const isArabic = locale === 'ar';

  return (
    <html 
      lang={locale} 
      dir={dir}
      className={`${lexend.variable} ${greatVibes.variable} ${cairo.variable}`}
    >
      <body 
        className={`${isArabic ? 'font-arabic' : 'font-sans'} antialiased overflow-x-hidden selection:bg-seafoam selection:text-forest`}
      >
        <NextIntlClientProvider locale={locale} messages={sharedMessages}>
          <RecaptchaProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <WhatsAppButton />
          </RecaptchaProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
