'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';
// Services data imports available for extension

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.08
    }
  }
};

// Bento Grid Hero Section - Matching Reference Design Exactly
function ServicesBentoHero() {
  return (
    <section className="relative bg-[#E8EFE3] pt-28 md:pt-32 pb-28 md:pb-36 overflow-hidden">
      {/* Subtle Background Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.3]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #002D04 0.5px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />
      
      <div className="mx-auto max-w-5xl px-5 md:px-8 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-12 md:mb-14"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.span 
            variants={fadeInUp}
            className="inline-block px-5 py-2 rounded-full border border-[#002D04]/20 text-[#002D04] text-[10px] font-semibold uppercase tracking-[0.18em] mb-6"
          >
            Explore Your Recovery
          </motion.span>
          <motion.h1 
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-[56px] font-bold text-[#002D04] leading-[1.1] mb-6"
          >
            Active <span className="font-script text-[#8DB600] font-normal">Life</span> Design
          </motion.h1>
          <motion.p 
            variants={fadeInUp}
            className="text-[#002D04]/55 text-[14px] md:text-[15px] max-w-[480px] mx-auto leading-relaxed"
          >
            Choose a pathway tailored to your body&apos;s needs. From elite sports 
            performance to post-operative care, we design movement that heals.
          </motion.p>
        </motion.div>
        
        {/* Bento Grid - Exact Reference Layout */}
        <motion.div 
          className="grid grid-cols-12 gap-3 md:gap-4 auto-rows-[minmax(160px,auto)]"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          {/* Manual Therapy - Large Left Card (spans 2 rows) */}
          <motion.div 
            variants={fadeInUp}
            className="col-span-12 md:col-span-5 md:row-span-2 relative rounded-[24px] overflow-hidden group cursor-pointer"
          >
            <div className="absolute inset-0 bg-[#2a4a2f]" />
            <div 
              className="absolute inset-0 bg-cover bg-top bg-no-repeat transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a1f] via-[#1a3a1f]/50 to-transparent" />
            
            <div className="relative h-full min-h-[340px] md:min-h-full p-6 flex flex-col justify-between z-10">
              {/* Top Icon */}
              <div className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center">
                <span className="material-symbols-outlined text-white/80 text-[20px]">waving_hand</span>
              </div>
              
              {/* Bottom Content */}
              <div>
                <h3 className="text-[24px] md:text-[26px] font-bold text-white leading-tight mb-2">Manual Therapy</h3>
                <p className="text-white/60 text-[12px] leading-relaxed max-w-[240px] mb-3">
                  Hands-on mobilization for immediate pain relief and joint function.
                </p>
                <Link 
                  href="/services/manual-therapy"
                  className="inline-flex items-center gap-2 text-[#C5D86D] text-[10px] font-semibold uppercase tracking-[0.12em] group-hover:gap-3 transition-all"
                >
                  <span>Explore Service</span>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </motion.div>
          
          {/* Sports Recovery - White Card with Border, Dark Green Icon & Image */}
          <motion.div 
            variants={fadeInUp}
            className="col-span-6 md:col-span-3 relative rounded-[24px] overflow-hidden bg-white border border-[#002D04]/10 group cursor-pointer hover:shadow-lg transition-all duration-300"
          >
            <div className="p-5 pb-0">
              {/* Dark Green Circle Icon */}
              <div className="w-12 h-12 rounded-full bg-[#002D04] flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-[#002D04] text-[16px] leading-tight">Sports</h4>
                <h4 className="font-bold text-[#002D04] text-[16px] leading-tight mb-3">Recovery</h4>
                <p className="text-[#002D04]/50 text-[12px] leading-relaxed">
                  Biomechanics analysis to return to your peak performance safely.
                </p>
              </div>
            </div>
            {/* Bottom Image */}
            <div className="h-[80px] mt-3 overflow-hidden relative">
              <Image 
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80" 
                alt="Athlete stretching"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          </motion.div>
          
          {/* Pain Mgmt - Lime Card with Central Layout */}
          <motion.div 
            variants={fadeInUp}
            className="col-span-6 md:col-span-4 relative rounded-[24px] overflow-hidden bg-[#C5D86D] p-6 group cursor-pointer hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center text-center min-h-[180px]"
          >
            {/* Lighter Lime Circle Icon */}
            <div className="w-14 h-14 rounded-full bg-[#d4e38a] flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[#002D04]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h4 className="font-bold text-[#002D04] text-[18px]">Pain Mgmt</h4>
          </motion.div>
          
          {/* Success Story Card */}
          <motion.div 
            variants={fadeInUp}
            className="col-span-6 md:col-span-3 relative rounded-[24px] overflow-hidden bg-white p-5"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-full bg-[#66A182]/15 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#66A182] text-[14px]">auto_awesome</span>
                </div>
                <span className="text-[9px] font-bold uppercase tracking-[0.1em] text-[#66A182]">Success Story</span>
              </div>
              <p className="text-[#002D04]/60 text-[11px] leading-relaxed">
                &ldquo;Back to marathons at 45 years old.&rdquo;
              </p>
            </div>
          </motion.div>
          
          {/* Post-Surgical - Image Card with woman */}
          <motion.div 
            variants={fadeInUp}
            className="col-span-6 md:col-span-4 relative rounded-[24px] overflow-hidden group cursor-pointer"
          >
            <div className="absolute inset-0 bg-[#8DB600]" />
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-60 transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1594381898411-846e7d193883?w=600&q=80')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#8DB600]/40 to-[#8DB600]/80" />
            
            <div className="relative h-full min-h-[160px] p-5 flex items-end z-10">
              <div>
                <h4 className="font-bold text-[#002D04] text-[15px] leading-tight">Post-Surgical</h4>
                <p className="text-[#002D04]/60 text-[10px] uppercase tracking-wider mt-0.5">Rehab</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Curved Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-16 md:h-24">
        <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1440 96" preserveAspectRatio="none">
          <path d="M0,96 L0,50 Q720,96 1440,50 L1440,96 Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}

// Therapeutic Deep Dive Section - Exact Reference Match
function TherapeuticDeepDive() {
  const serviceData = [
    {
      image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&q=80',
      category: 'MOBILITY',
      title: 'Active Aging',
      description: 'Maintaining independence and strength through tailored low-impact movement strategies.',
      quote: 'Their gentle yet go-growth can make all difference now.',
      author: 'MARGARET, 72',
      badge: 'MINIMAL\nIMPACT MOVEMENT'
    },
    {
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80',
      category: 'RECOVERY',
      title: 'Hydrotherapy',
      description: 'Low-impact aquatic resistance training to rebuild muscle without joint stress.',
      quote: 'The aquatic sessions helped me recover without joint pain.',
      author: 'DAVID, 58',
      badge: null
    },
    {
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80',
      category: 'PREVENTION',
      title: 'Corrective Exercise',
      description: 'Fixing imbalances and posture issues before they become injuries.',
      quote: 'My chronic back pain vanished after just 6 sessions.',
      author: 'SARAH, 34',
      badge: null
    },
  ];
  
  return (
    <section className="py-16 md:py-20 bg-white relative overflow-hidden">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <h2 className="text-[28px] md:text-[36px] font-bold text-[#002D04] leading-[1.1]">Therapeutic</h2>
            <p className="font-script text-[24px] md:text-[32px] text-[#8DB600]">Deep Dive</p>
            <p className="text-[#002D04]/45 text-[12px] md:text-[13px] mt-2 max-w-[320px] leading-relaxed">
              Explore our specialized treatments designed to integrate seamlessly into your lifestyle.
            </p>
          </div>
          
          {/* Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button 
              className="w-10 h-10 rounded-full border border-[#002D04]/10 flex items-center justify-center text-[#002D04]/30 hover:border-[#002D04]/20 hover:text-[#002D04]/50 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              className="w-10 h-10 rounded-full bg-[#C5D86D] flex items-center justify-center text-[#002D04] hover:bg-[#b8cc5d] transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {serviceData.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group"
            >
              {/* Image Container */}
              <div className="relative rounded-[20px] overflow-hidden mb-4 aspect-[4/3] bg-[#E8EFE3]">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${service.image})` }}
                />
                
                {/* Category Badge - Top Right */}
                <div className="absolute top-3 right-3">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-sm text-[8px] font-bold uppercase tracking-[0.08em] text-[#002D04]">
                    {service.category}
                  </span>
                </div>
                
                {/* Special Badge for first card */}
                {service.badge && (
                  <div className="absolute bottom-3 left-3">
                    <span className="inline-block px-2.5 py-1.5 rounded-lg bg-white/95 backdrop-blur-sm text-[8px] font-semibold text-[#002D04] leading-tight whitespace-pre-line">
                      {service.badge}
                    </span>
                  </div>
                )}
              </div>
              
              {/* Content */}
              <h3 className="text-[15px] font-bold text-[#002D04] mb-1.5">{service.title}</h3>
              <p className="text-[#002D04]/45 text-[12px] leading-relaxed mb-4">
                {service.description}
              </p>
              
              {/* Testimonial Quote Card */}
              <div className="bg-[#F5F7F2] rounded-[16px] p-3.5 relative">
                <div className="flex items-start gap-2.5">
                  {/* Avatar */}
                  <div className="w-8 h-8 rounded-full bg-[#C5D86D]/30 flex items-center justify-center shrink-0 overflow-hidden">
                    <div className="w-5 h-5 rounded-full bg-[#C5D86D]/50" />
                  </div>
                  {/* Quote Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[#002D04]/55 text-[11px] leading-relaxed">
                      &ldquo;{service.quote}&rdquo;
                    </p>
                    <span className="text-[#002D04]/30 text-[9px] mt-1 block font-medium">— {service.author}</span>
                  </div>
                </div>
                {/* Quote Mark */}
                <div className="absolute top-2.5 right-3 text-[#C5D86D]/40 text-[24px] font-serif leading-none">&rdquo;</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Service FAQ Section - Polished Design
function ServiceFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(1);
  
  const faqs = [
    {
      question: 'Which therapy is right for acute injuries?',
      answer: 'For acute injuries, we typically recommend Manual Therapy combined with targeted exercises. Our team will assess your specific condition and create a personalized treatment plan.',
    },
    {
      question: 'Can I combine treatments?',
      answer: 'Absolutely! Our "Vitality Path" is holistic. Most successful recovery plans involve a mix of Manual Therapy for immediate relief and Corrective Exercise for long-term prevention.',
    },
    {
      question: 'Do you offer post-op packages?',
      answer: 'Yes, we have comprehensive post-operative rehabilitation packages designed in collaboration with orthopedic surgeons for optimal recovery outcomes.',
    },
    {
      question: 'Is sports recovery only for professionals?',
      answer: 'Not at all! Our sports recovery program is designed for anyone who wants to return to their active lifestyle, from weekend joggers to competitive athletes.',
    },
  ];
  
  return (
    <section className="py-16 md:py-24 bg-[#2a4a2f] relative overflow-hidden">
      {/* Top Curve */}
      <div className="absolute top-0 left-0 right-0 h-16 md:h-24">
        <svg className="absolute top-0 w-full h-full" viewBox="0 0 1440 96" preserveAspectRatio="none">
          <path d="M0,0 L0,60 Q720,0 1440,60 L1440,0 Z" fill="white" />
        </svg>
      </div>
      
      <div className="mx-auto max-w-xl px-5 md:px-8 pt-12 md:pt-16 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-[#66A182] text-[9px] font-semibold uppercase tracking-[0.2em]">Clarity</span>
          <h2 className="text-[22px] md:text-[28px] font-bold text-white mt-2 mb-2 leading-tight">
            Common Service Questions
          </h2>
          <p className="text-white/40 text-[12px]">
            Understanding your treatment plan is part of the healing process.
          </p>
        </div>
        
        {/* FAQ Accordion */}
        <div className="space-y-2.5">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className={cn(
                  "w-full text-left rounded-[16px] transition-all duration-300",
                  openIndex === index 
                    ? "bg-[#C5D86D] px-5 py-4" 
                    : "bg-white/[0.05] hover:bg-white/[0.08] px-5 py-4"
                )}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className={cn(
                    "font-medium text-[13px] transition-colors",
                    openIndex === index ? "text-[#002D04]" : "text-white/90"
                  )}>
                    {faq.question}
                  </span>
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300",
                    openIndex === index ? "bg-[#002D04] text-white" : "bg-[#C5D86D] text-[#002D04]"
                  )}>
                    <svg 
                      className={cn("w-3.5 h-3.5 transition-transform duration-300", openIndex === index && "rotate-45")} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                </div>
                
                {/* Answer */}
                <motion.div
                  initial={false}
                  animate={{ 
                    height: openIndex === index ? 'auto' : 0, 
                    opacity: openIndex === index ? 1 : 0,
                    marginTop: openIndex === index ? 10 : 0
                  }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <p className="text-[#002D04]/65 text-[12px] leading-relaxed pr-10">
                    {faq.answer}
                  </p>
                </motion.div>
              </button>
            </motion.div>
          ))}
        </div>
        
        {/* CTA Button */}
        <div className="text-center mt-8">
          <Link 
            href="#contact"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/15 text-white text-[10px] font-semibold uppercase tracking-[0.12em] hover:bg-white/[0.06] transition-colors"
          >
            <span>Still Have Questions?</span>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

// CTA Section - Exact Reference Match
function ServicesCTA() {
  return (
    <section className="py-14 md:py-20 bg-[#E8EFE3] relative overflow-hidden">
      <div className="mx-auto max-w-5xl px-5 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-[32px] md:text-[44px] lg:text-[52px] font-bold text-[#002D04] leading-tight mb-6">
            Let&apos;s Get <span className="text-[#8DB600]">Moving</span>
          </h2>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
            <Link
              href="#appointment"
              className="inline-flex items-center justify-center h-12 px-7 rounded-full bg-[#002D04] text-white text-[11px] font-semibold uppercase tracking-[0.1em] hover:bg-[#001a02] transition-colors"
            >
              Book Initial Consult
            </Link>
            <div className="flex items-center gap-2 text-[#002D04]/45 text-[12px]">
              <span>Or Call</span>
              <a
                href="tel:+15551234567"
                className="font-semibold text-[#8DB600] hover:text-[#7aa800] transition-colors"
              >
                (555) 123-4567
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Main Services Page
export default function ServicesPage() {
  return (
    <main className="overflow-x-clip">
      <ServicesBentoHero />
      <TherapeuticDeepDive />
      <ServiceFAQ />
      <ServicesCTA />
    </main>
  );
}
