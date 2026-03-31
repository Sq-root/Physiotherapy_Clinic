import { testimonials } from '@/lib/data/testimonials';
import { Heart, Star, Zap, Trophy } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { getTranslations } from 'next-intl/server';
import { AnimateOnView } from '@/components/ui/AnimateOnView';
import { TestimonialsInteractive } from './TestimonialsInteractive';

export async function TestimonialsSection() {
  const t = await getTranslations('testimonials');

  // Pre-resolve trust badges (serializable for client)
  const trustBadges = [
    { icon: "", label: t('trustBadges.verified') },
    { icon: "↗", label: t('trustBadges.fullRecovery') },
  ];

  return (
    <section className="bg-gradient-to-b from-white via-sage/30 to-white py-24 md:py-32 overflow-hidden relative" id="testimonials">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #002D04 1px, transparent 0)`,
        backgroundSize: '32px 32px'
      }}></div>
      
      {/* Floating Accent Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-lime/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-seafoam/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 relative">
        {/* Section Header — Server Rendered */}
        <AnimateOnView className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 bg-lime/10 rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 bg-lime rounded-full animate-pulse"></span>
            <span className="text-forest/80 text-xs font-semibold tracking-wider uppercase">{t('badge')}</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-bold text-forest mb-6 tracking-tight">
            {t('title')} <span className="text-seafoam italic font-normal">{t('titleHighlight')}</span>
          </h2>
          
          <p className="text-forest/80 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            {t('description')}
          </p>
        </AnimateOnView>

        {/* Interactive Client Island */}
        <TestimonialsInteractive
          testimonials={testimonials}
          trustBadges={trustBadges}
        />

        {/* Stats Bar — Server Rendered */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16 mt-12">
          {[
            { value: siteConfig.social.recoveryRate, label: t('stats.patientSatisfaction'), Icon: Heart },
            { value: siteConfig.social.livesRestored, label: t('stats.livesRestored'), Icon: Star },
            { value: '30%', label: t('stats.fasterRecovery'), Icon: Zap },
            { value: siteConfig.social.yearsExperience, label: t('stats.yearsExperience'), Icon: Trophy },
          ].map((stat, i) => (
            <AnimateOnView
              key={i}
              delay={i * 0.1}
              className="bg-white rounded-2xl p-5 md:p-6 shadow-card border border-forest/5 text-center group hover:shadow-glow transition-all duration-300"
            >
              <stat.Icon className="w-6 h-6 mx-auto mb-2 text-seafoam" />
              <p className="text-3xl md:text-4xl font-bold text-forest mb-1">{stat.value}</p>
              <p className="text-forest/80 text-xs md:text-sm font-medium">{stat.label}</p>
            </AnimateOnView>
          ))}
        </div>

        {/* Bottom CTA — Server Rendered */}
        <AnimateOnView className="text-center mt-16 md:mt-20">
          <p className="text-forest/80 text-sm md:text-base mb-6">{t('cta.prompt')}</p>
          <a 
            href="#contact" 
            className="inline-flex items-center gap-3 bg-forest text-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-forest/90 hover:shadow-glow transition-all duration-300 group"
          >
            <span>{t('cta.button')}</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </AnimateOnView>
      </div>
    </section>
  );
}
