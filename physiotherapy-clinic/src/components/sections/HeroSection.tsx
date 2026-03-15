'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { siteConfig } from '@/config/site';

const slides = [
  {
    id: 1,
    badge: 'Sports Recovery',
    title: 'Get Back To',
    highlight: 'Peak Performance',
    description: 'Professional sports rehabilitation designed to get athletes back in the game faster with evidence-based treatment protocols.',
    image: '/services/IMG_0114.jpeg',
  },
  {
    id: 2,
    badge: 'Senior Care',
    title: 'Gentle Therapy',
    highlight: 'For Active Aging',
    description: 'Specialized physiotherapy programs to maintain mobility, reduce pain, and improve quality of life for seniors.',
    image: '/services/IMG_0116.jpeg',
  },
  {
    id: 3,
    badge: 'Pain Relief',
    title: 'End Chronic',
    highlight: 'Back & Neck Pain',
    description: 'Advanced manual therapy techniques combined with therapeutic exercises to eliminate persistent pain at its source.',
    image: '/services/IMG_0123.jpeg',
  },
  {
    id: 4,
    badge: 'Post Surgery',
    title: 'Accelerate Your',
    highlight: 'Recovery Journey',
    description: 'Comprehensive post-operative rehabilitation to restore function, rebuild strength, and get you back to daily activities.',
    image: '/services/IMG_0124.jpeg',
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const slide = slides[currentSlide];

  return (
    <section className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden">
      {/* Background Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className="absolute inset-0 z-0"
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-forest/90 via-forest/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-forest/50 via-transparent to-forest/30"></div>
        </motion.div>
      </AnimatePresence>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 border border-white/10 rounded-full pointer-events-none hidden lg:block"></div>
      <div className="absolute bottom-40 left-20 w-20 h-20 border border-seafoam/20 rounded-full pointer-events-none hidden lg:block"></div>
      
      {/* Main Content */}
      <div className="relative z-20 h-full flex items-center">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            {/* Badge */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`badge-${slide.id}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="w-10 h-[2px] bg-seafoam"></div>
                <span className="inline-flex items-center gap-2 text-seafoam text-xs font-bold uppercase tracking-[0.2em]">
                  <span className="w-2 h-2 bg-seafoam rounded-full animate-pulse"></span>
                  {slide.badge}
                </span>
              </motion.div>
            </AnimatePresence>

            {/* Heading */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`title-${slide.id}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-bold text-white leading-[1.1] mb-6">
                  {slide.title}
                  <br />
                  <span className="text-seafoam">{slide.highlight}</span>
                </h1>
              </motion.div>
            </AnimatePresence>

            {/* Description */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`desc-${slide.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-white/80 text-base sm:text-lg md:text-xl max-w-xl leading-relaxed mb-8"
              >
                {slide.description}
              </motion.p>
            </AnimatePresence>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 bg-seafoam text-white pl-5 pr-2 py-2.5 rounded-full font-semibold text-sm hover:bg-white hover:text-forest transition-all duration-300"
              >
                <span className="capitalize">{siteConfig.contact.email}</span>
                <span className="size-9 rounded-full bg-forest/30 flex items-center justify-center group-hover:bg-seafoam transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
              </Link>
              <a
                href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, '')}`}
                className="group inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/30 text-white pl-5 pr-2 py-2 rounded-full font-semibold text-sm hover:bg-white hover:text-forest transition-all duration-300"
              >
                <div className="flex items-center gap-2">
                  <img 
                    src="/logo/ae_flag.svg" 
                    alt="UAE Flag" 
                    className="w-7 h-auto rounded shadow-lg border border-white/20" 
                  />
                  <span>{siteConfig.contact.phone}</span>
                </div>
                <span className="size-9 rounded-full bg-seafoam flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </span>
              </a>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center gap-8 mt-12 pt-8 border-t border-white/10"
            >
              <div>
                <p className="text-3xl md:text-4xl font-bold text-white">{siteConfig.social.livesRestored}</p>
                <p className="text-white/60 text-xs uppercase tracking-wider">Lives Restored</p>
              </div>
              <div className="w-px h-12 bg-white/20"></div>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-white">{siteConfig.social.yearsExperience}</p>
                <p className="text-white/60 text-xs uppercase tracking-wider">Years Experience</p>
              </div>
              <div className="w-px h-12 bg-white/20 hidden sm:block"></div>
              <div className="hidden sm:block">
                <p className="text-3xl md:text-4xl font-bold text-white">{siteConfig.social.recoveryRate}</p>
                <p className="text-white/60 text-xs uppercase tracking-wider">Success Rate</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Slide Navigation Dots - Right Side */}
      <div className="absolute right-6 lg:right-10 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-4">
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goToSlide(i)}
            className={`group relative flex items-center justify-end transition-all duration-300 ${
              currentSlide === i ? 'gap-3' : 'gap-0'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          >
            {/* Label on hover */}
            <span className={`text-white text-xs font-medium whitespace-nowrap transition-all duration-300 ${
              currentSlide === i ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 group-hover:opacity-70 group-hover:translate-x-0'
            }`}>
              {s.badge}
            </span>
            {/* Dot */}
            <span className={`relative flex items-center justify-center transition-all duration-300 ${
              currentSlide === i ? 'w-4 h-4' : 'w-3 h-3'
            }`}>
              <span className={`absolute inset-0 rounded-full transition-all duration-300 ${
                currentSlide === i 
                  ? 'bg-seafoam scale-100' 
                  : 'bg-white/40 scale-100 group-hover:bg-white/70'
              }`}></span>
              {currentSlide === i && (
                <span className="absolute inset-0 rounded-full bg-seafoam animate-ping opacity-30"></span>
              )}
            </span>
          </button>
        ))}
      </div>

      {/* Progress Bar */}
      {/* <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-30">
        <motion.div
          key={currentSlide}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 6, ease: 'linear' }}
          className="h-full bg-seafoam"
        />
      </div> */}

      {/* Curved Bottom Edge */}
      <div className="absolute -bottom-1 left-0 right-0 z-20">
        <svg viewBox="0 0 1440 120" fill="none" preserveAspectRatio="none" className="w-full h-16 md:h-24">
          <path 
            d="M0,120 L0,60 Q360,120 720,60 T1440,60 L1440,120 Z" 
            fill="white"
          />
        </svg>
      </div>

      {/* Slide Counter */}
      <div className="absolute bottom-20 md:bottom-28 left-6 lg:left-8 z-30 flex items-center gap-3 text-white/60 text-sm font-medium">
        <span className="text-2xl font-bold text-white">{String(currentSlide + 1).padStart(2, '0')}</span>
        <span className="w-8 h-px bg-white/30"></span>
        <span>{String(slides.length).padStart(2, '0')}</span>
      </div>
    </section>
  );
}
