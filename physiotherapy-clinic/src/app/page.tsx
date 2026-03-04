import { HeroSection } from '@/components/sections/HeroSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { PatientJourney } from '@/components/sections/PatientJourney';
import { BlogSection } from '@/components/sections/BlogSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { FaqSection } from '@/components/sections/FaqSection';
import { CtaBanner } from '@/components/sections/CtaBanner';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      
      {/* Did You Know floating card (matches HTML structure) */}
      <div className="relative max-w-5xl mx-auto -mt-10 mb-32 z-30 px-6">
        <div className="bg-white border-2 border-forest p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden shadow-sharp rounded-[32px]">
          <div className="bg-forest p-6 shrink-0 text-lime border-2 border-forest rounded-3xl">
            <span className="material-symbols-outlined text-4xl">lightbulb</span>
          </div>
          <div className="relative z-10 text-center md:text-left">
            <h4 className="font-bold uppercase tracking-widest text-sm text-seafoam mb-2">Did You Know?</h4>
            <p className="text-lg text-forest font-medium leading-relaxed">
              Movement is medicine. Gentle, guided activity can reduce recovery time by up to <span className="bg-lime/20 px-2 text-forest font-bold rounded-lg border border-lime/30">30%</span> compared to complete rest.
            </p>
          </div>
        </div>
      </div>

      <ServicesSection />
      <PatientJourney />
      <BlogSection />
      <TestimonialsSection />
      <FaqSection />
      <CtaBanner />
    </>
  );
}
