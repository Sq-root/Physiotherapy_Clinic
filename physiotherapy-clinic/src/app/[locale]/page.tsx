import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { HeroSection } from '@/components/sections/HeroSection';
import { SupportSection } from '@/components/sections/SupportSection';
import { setRequestLocale, getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';

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
  return {
    title: `${siteConfig.name} | ${locale === 'ar' ? 'عيادة العلاج الطبيعي' : 'Physiotherapy Clinic'}`,
    description: locale === 'ar' 
      ? 'خدمات علاج طبيعي متخصصة في دبي للإصابات الرياضية وإعادة التأهيل وإدارة الألم المزمن.'
      : siteConfig.description,
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
      <NextIntlClientProvider messages={heroMessages}>
        <HeroSection />
      </NextIntlClientProvider>
      
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
