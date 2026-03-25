import { HeroSection } from '@/components/sections/HeroSection';
import { SupportSection } from '@/components/sections/SupportSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { PatientJourney } from '@/components/sections/PatientJourney';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { FaqSection } from '@/components/sections/FaqSection';
import { AppointmentSection } from '@/components/sections/AppointmentSection';
import { setRequestLocale } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="overflow-x-clip relative">
      <HeroSection />
      
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
