import { HeroSection } from '@/components/sections/HeroSection';
import { SupportSection } from '@/components/sections/SupportSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { PatientJourney } from '@/components/sections/PatientJourney';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { FaqSection } from '@/components/sections/FaqSection';
import { AppointmentSection } from '@/components/sections/AppointmentSection';

export default function HomePage() {
  return (
    <main className="overflow-x-clip relative">
      <HeroSection />
      
      {/* New Support Section from the Reference */}
      <SupportSection />

      <ServicesSection />
      <PatientJourney />
      {/* <BlogSection /> */}
      <TestimonialsSection />
      <FaqSection />
      <AppointmentSection />
      {/* <CtaBanner /> */}
    </main>
  );
}
