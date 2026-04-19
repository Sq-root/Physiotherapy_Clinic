import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { HeroSection } from '@/components/sections/HeroSection';
import { SupportSection } from '@/components/sections/SupportSection';
import { setRequestLocale, getMessages } from 'next-intl/server';
import NextIntlProviderClient from '@/components/providers/NextIntlProviderClient';

// Dynamic imports for below-the-fold components
const ServicesSection = dynamic(() => import('@/components/sections/ServicesSection').then(m => ({ default: m.ServicesSection })));
const PatientJourney = dynamic(() => import('@/components/sections/PatientJourney').then(m => ({ default: m.PatientJourney })));
const TestimonialsSection = dynamic(() => import('@/components/sections/TestimonialsSection').then(m => ({ default: m.TestimonialsSection })));
const FaqSection = dynamic(() => import('@/components/sections/FaqSection').then(m => ({ default: m.FaqSection })));

const AppointmentSection = dynamic(
  () => import('@/components/sections/AppointmentSection').then(m => ({ default: m.AppointmentSection })),
  { ssr: true }
);

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';
  const title = isAr
    ? `${siteConfig.name} | عيادة العلاج الطبيعي في دبي واستشارات أونلاين`
    : `${siteConfig.name} | Physiotherapy in Dubai & Online Consultations Worldwide`;
  const description = isAr
    ? 'عيادة علاج طبيعي مرخصة من هيئة الصحة بدبي — جلسات في العيادة، زيارات منزلية في دبي، واستشارات أونلاين لجميع أنحاء العالم. بقيادة د. عيشة شاه، ٧+ سنوات، ٣٠٠٠+ مريض.'
    : 'DHA-licensed physiotherapy clinic in Dubai — in-clinic sessions, home visits across Dubai, and online consultations worldwide. Led by Dr. Isha Shah, 7+ years, 3000+ patients, 98% recovery rate.';

  return {
    title,
    description,
    alternates: {
      canonical: `${siteConfig.url}/${locale}`,
      languages: {
        en: `${siteConfig.url}/en`,
        ar: `${siteConfig.url}/ar`,
        'x-default': `${siteConfig.url}/en`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/${locale}`,
      type: 'website',
      locale: isAr ? 'ar_AE' : 'en_AE',
      images: [{ url: '/logo/Dr_isha_Logo.png', width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/logo/Dr_isha_Logo.png'],
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const messages = await getMessages();
  const heroMessages = {
    hero: messages.hero,
    support: messages.support,
  };

  return (
    <main className="overflow-x-clip relative">
      <NextIntlProviderClient locale={locale} messages={heroMessages}>
        <HeroSection />
      </NextIntlProviderClient>

      {/* Support Section */}
      <SupportSection />

      <ServicesSection />
      <PatientJourney />
      <TestimonialsSection />
      <FaqSection />
      <AppointmentSection />
    </main>
  );
}
