import { HeroSection } from '@/components/sections/HeroSection';
import { SupportSection } from '@/components/sections/SupportSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { PatientJourney } from '@/components/sections/PatientJourney';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { FaqSection } from '@/components/sections/FaqSection';
import { AppointmentSection } from '@/components/sections/AppointmentSection';
import { setRequestLocale, getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';

type Props = {
  params: Promise<{ locale: string }>;
};

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
