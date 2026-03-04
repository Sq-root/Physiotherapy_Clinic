'use client';

import { testimonials } from '@/lib/data/testimonials';
import { motion } from 'framer-motion';

export function TestimonialsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  // Paths for botanical imagery - slicing the generated set conceptually via background positions
  const botanicalPlacements = [
    '0% 0%',   // Card 1
    '100% 0%', // Card 2
    '0% 100%', // Card 3
    '100% 100%' // Card 4
  ];

  return (
    <section className="bg-sage/10 py-32 overflow-hidden relative" id="testimonials">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-seafoam/5 rounded-full blur-3xl -mr-48 -mt-48 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-lime/5 rounded-full blur-3xl -ml-48 -mb-48 pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-28 relative">
          <span className="absolute -top-16 left-1/2 -translate-x-1/2 text-[140px] md:text-[180px] font-script text-seafoam/5 pointer-events-none select-none tracking-widest">
            Stories
          </span>
          <div className="relative z-10">
            <span className="text-seafoam font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs mb-6 block">
              Patient Experiences
            </span>
            <h2 className="text-5xl md:text-7xl font-sans font-bold text-forest mb-8 tracking-tight leading-tight">
              Real <span className="italic font-normal">Transformations</span>
            </h2>
            <div className="flex items-center justify-center gap-4 mb-10">
              <div className="h-[1px] w-12 bg-forest/10"></div>
              <div className="h-2 w-2 rounded-full bg-lime animate-pulse"></div>
              <div className="h-[1px] w-12 bg-forest/10"></div>
            </div>
            <p className="text-forest/60 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed italic">
              &ldquo;Movement is medicine. Hear from those who found their rhythm again.&rdquo;
            </p>
          </div>
        </div>
        
        {/* Testimonials Grid */}
        <motion.div 
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover={{ 
                y: -15,
                transition: { duration: 0.4, ease: "easeOut" }
              }}
              className="group bg-white rounded-[40px] p-10 shadow-card border border-forest/5 relative flex flex-col h-full transition-all duration-500 overflow-hidden"
            >
              {/* Botanical Accent Overlay */}
              <div 
                className="absolute inset-0 opacity-[0.03] grayscale invert group-hover:opacity-[0.06] transition-opacity duration-700 pointer-events-none"
                style={{
                  backgroundImage: `url('/images/botanical-accents.png')`,
                  backgroundSize: '200% 200%',
                  backgroundPosition: botanicalPlacements[i % 4]
                }}
              ></div>

              {/* Quote Icon */}
              <div className="mb-8 flex justify-between items-start relative z-10">
                <span className="material-symbols-outlined text-6xl text-lime/30 select-none group-hover:scale-110 group-hover:text-lime/50 transition-all duration-500">
                  format_quote
                </span>
                <div className="flex gap-0.5 text-lime/40 group-hover:text-lime transition-colors duration-500">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <span key={j} className="material-symbols-outlined text-lg fill-current">star</span>
                  ))}
                </div>
              </div>

              {/* Testimonial Content */}
              <blockquote className="text-forest/80 text-[16px] leading-[1.8] font-medium mb-12 flex-grow relative z-10">
                &ldquo;{t.content}&rdquo;
              </blockquote>

              {/* Growth Line Decoration */}
              <div className="relative h-[2px] w-full bg-forest/5 mb-10 overflow-hidden z-10">
                <motion.div 
                  className="absolute inset-0 bg-lime"
                  initial={{ x: '-101%' }}
                  whileHover={{ x: '0%' }}
                  transition={{ duration: 0.6, ease: "circOut" }}
                />
              </div>

              {/* Author Info - Editorial style */}
              <div className="flex items-center gap-5 relative z-10">
                <div className="flex-shrink-0 size-14 rounded-t-full bg-sage flex items-end justify-center overflow-hidden border-b-2 border-lime/20 group-hover:bg-forest group-hover:border-lime transition-all duration-500">
                  <span className="text-forest font-bold text-sm mb-2 group-hover:text-white transition-colors duration-500">
                    {t.initials}
                  </span>
                </div>
                <div>
                  <p className="font-bold text-forest text-base tracking-tight mb-0.5">{t.name}</p>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-seafoam">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
