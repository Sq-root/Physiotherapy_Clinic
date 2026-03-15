'use client';

import { testimonials } from '@/lib/data/testimonials';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useState } from 'react';
import { Check, ArrowUpRight, Heart, Star, Zap, Trophy } from 'lucide-react';
import { siteConfig } from '@/config/site';

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const featuredTestimonial = testimonials[activeIndex];
  
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  // Trust indicators for credibility
  const trustBadges = [
    { Icon: Check, label: 'Verified Patient' },
    { Icon: ArrowUpRight, label: 'Full Recovery' },
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
        {/* Section Header with Trust Indicator */}
        <motion.div 
          className="text-center mb-16 md:mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-lime/10 rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 bg-lime rounded-full animate-pulse"></span>
            <span className="text-forest/80 text-xs font-semibold tracking-wider uppercase">Patient Success Stories</span>
          </motion.div>
          
          <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-bold text-forest mb-6 tracking-tight">
            Real <span className="text-seafoam italic font-normal">Transformations</span>
          </motion.h2>
          
          <motion.p variants={fadeInUp} className="text-forest/60 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Discover how our patients overcame pain and reclaimed their active lifestyles through personalized physiotherapy care.
          </motion.p>
        </motion.div>

        {/* Featured Testimonial - Hero Card */}
        <motion.div 
          className="mb-12 md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="relative bg-forest rounded-3xl md:rounded-[40px] overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#grid)"/>
              </svg>
            </div>
            
            {/* Decorative Circle */}
            <div className="absolute -right-20 -top-20 w-64 h-64 md:w-96 md:h-96 bg-lime/20 rounded-full blur-3xl"></div>
            <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-seafoam/20 rounded-full blur-2xl"></div>

            <div className="relative z-10 grid lg:grid-cols-5 gap-6 p-6 sm:p-8 md:p-10 lg:p-12">
              {/* Quote & Content */}
              <div className="lg:col-span-3 flex flex-col justify-center">
                {/* Large Quote Mark */}
                <svg className="w-10 h-10 md:w-12 md:h-12 text-lime mb-4 md:mb-6 opacity-60" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"/>
                </svg>
                
                <AnimatePresence mode="wait">
                  <motion.blockquote
                    key={activeIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="text-white text-base sm:text-lg md:text-xl font-normal leading-relaxed mb-6 md:mb-8"
                  >
                    &ldquo;{featuredTestimonial.content}&rdquo;
                  </motion.blockquote>
                </AnimatePresence>

                {/* Author & Trust Badges */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIndex}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-4"
                    >
                      {/* Avatar with Gradient Ring */}
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-lime to-seafoam rounded-full blur-sm scale-110"></div>
                        <div className="relative w-14 h-14 md:w-16 md:h-16 bg-forest rounded-full border-2 border-white/20 flex items-center justify-center">
                          <span className="text-white font-bold text-lg md:text-xl">{featuredTestimonial.initials}</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-lg md:text-xl">{featuredTestimonial.name}</h4>
                        <p className="text-lime text-sm font-medium">{featuredTestimonial.role}</p>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Trust Badges */}
                  <div className="flex items-center gap-3">
                    {trustBadges.map((badge, i) => (
                      <div key={i} className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5">
                        <badge.Icon className="w-3.5 h-3.5 text-lime" />
                        <span className="text-white/80 text-xs font-medium">{badge.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Navigation Sidebar */}
              <div className="lg:col-span-2 lg:border-l lg:border-white/10 lg:pl-12">
                <div className="flex flex-col gap-4">
                  <div className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-2 hidden lg:block">Browse Stories</div>
                  
                  {/* Testimonial Selector Cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
                    {testimonials.map((t, i) => (
                      <motion.button
                        key={i}
                        onClick={() => setActiveIndex(i)}
                        className={`relative text-left p-4 rounded-2xl transition-all duration-300 group ${
                          activeIndex === i 
                            ? 'bg-lime text-forest' 
                            : 'bg-white/5 text-white hover:bg-white/10'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {/* Active Indicator */}
                        {activeIndex === i && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-forest rounded-r-full hidden lg:block"
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          />
                        )}
                        
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                            activeIndex === i ? 'bg-forest text-white' : 'bg-white/10 text-white'
                          }`}>
                            {t.initials}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`font-semibold text-sm truncate ${activeIndex === i ? 'text-forest' : 'text-white'}`}>
                              {t.name}
                            </p>
                            <p className={`text-xs truncate ${activeIndex === i ? 'text-forest/70' : 'text-white/50'}`}>
                              {t.role}
                            </p>
                          </div>
                          {/* Star Rating */}
                          <div className={`flex gap-0.5 ${activeIndex === i ? 'text-forest' : 'text-lime'}`}>
                            {[...Array(t.rating)].map((_, j) => (
                              <svg key={j} className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                              </svg>
                            ))}
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Bar */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {[
            { value: siteConfig.social.recoveryRate, label: 'Patient Satisfaction', Icon: Heart },
            { value: siteConfig.social.livesRestored, label: 'Lives Restored', Icon: Star },
            { value: '30%', label: 'Faster Recovery', Icon: Zap },
            { value: siteConfig.social.yearsExperience, label: 'Years Experience', Icon: Trophy },
          ].map((stat, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="bg-white rounded-2xl p-5 md:p-6 shadow-card border border-forest/5 text-center group hover:shadow-glow transition-all duration-300"
            >
              <stat.Icon className="w-6 h-6 mx-auto mb-2 text-seafoam" />
              <p className="text-3xl md:text-4xl font-bold text-forest mb-1">{stat.value}</p>
              <p className="text-forest/60 text-xs md:text-sm font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonial Cards Grid */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="group relative bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-card border border-forest/5 hover:shadow-glow transition-all duration-500 cursor-pointer"
              onClick={() => setActiveIndex(i)}
              whileHover={{ y: -8 }}
            >
              {/* Active Indicator Ring */}
              {activeIndex === i && (
                <div className="absolute inset-0 rounded-2xl md:rounded-3xl ring-2 ring-lime ring-offset-2 pointer-events-none"></div>
              )}

              {/* Card Header */}
              <div className="flex items-start justify-between mb-5">
                {/* Avatar */}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                  activeIndex === i 
                    ? 'bg-lime text-forest' 
                    : 'bg-sage text-forest group-hover:bg-forest group-hover:text-white'
                }`}>
                  {t.initials}
                </div>
                
                {/* Rating */}
                <div className="flex gap-0.5 text-lime">
                  {[...Array(t.rating)].map((_, j) => (
                    <svg key={j} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
              </div>

              {/* Quote */}
              <blockquote className="text-forest/80 text-sm leading-relaxed mb-6 line-clamp-4">
                &ldquo;{t.content}&rdquo;
              </blockquote>

              {/* Progress Line */}
              <div className="h-[2px] w-full bg-forest/5 rounded-full overflow-hidden mb-5">
                <motion.div
                  className="h-full bg-lime"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                />
              </div>

              {/* Author */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-forest text-sm mb-0.5">{t.name}</p>
                  <p className="text-seafoam text-xs font-medium">{t.role}</p>
                </div>
                
                {/* Arrow Icon */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  activeIndex === i 
                    ? 'bg-lime text-forest' 
                    : 'bg-forest/5 text-forest/40 group-hover:bg-forest group-hover:text-white'
                }`}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-16 md:mt-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <p className="text-forest/60 text-sm md:text-base mb-6">Ready to start your own transformation journey?</p>
          <a 
            href="#contact" 
            className="inline-flex items-center gap-3 bg-forest text-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-forest/90 hover:shadow-glow transition-all duration-300 group"
          >
            <span>Share Your Story With Us</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
