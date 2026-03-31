"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Testimonial {
  name: string;
  role: string;
  content: string;
  initials: string;
  rating: number;
}

interface TestimonialsInteractiveProps {
  testimonials: Testimonial[];
  trustBadges: Array<{ icon: string; label: string }>;
}

export function TestimonialsInteractive({
  testimonials,
  trustBadges,
}: TestimonialsInteractiveProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const featuredTestimonial = testimonials[activeIndex];

  return (
    <>
      {/* Featured Testimonial - Hero Card */}
      <div className="mb-12 md:mb-16">
        <div className="relative bg-forest rounded-3xl md:rounded-[40px] overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg
              className="w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <defs>
                <pattern
                  id="grid"
                  width="10"
                  height="10"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 10 0 L 0 0 0 10"
                    fill="none"
                    stroke="white"
                    strokeWidth="0.5"
                  />
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid)" />
            </svg>
          </div>

          {/* Decorative Circle */}
          <div className="absolute -right-20 -top-20 w-64 h-64 md:w-96 md:h-96 bg-lime/20 rounded-full blur-3xl"></div>
          <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-seafoam/20 rounded-full blur-2xl"></div>

          <div className="relative z-10 grid lg:grid-cols-5 gap-6 p-6 sm:p-8 md:p-10 lg:p-12">
            {/* Quote & Content */}
            <div className="lg:col-span-3 flex flex-col justify-center">
              {/* Large Quote Mark */}
              <svg
                className="w-10 h-10 md:w-12 md:h-12 text-lime mb-4 md:mb-6 opacity-60"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
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
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-lime to-seafoam rounded-full blur-sm scale-110"></div>
                      <div className="relative w-14 h-14 md:w-16 md:h-16 bg-forest rounded-full border-2 border-white/20 flex items-center justify-center">
                        <span className="text-white font-bold text-lg md:text-xl">
                          {featuredTestimonial.initials}
                        </span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg md:text-xl">
                        {featuredTestimonial.name}
                      </h3>
                      <p className="text-lime text-sm font-medium">
                        {featuredTestimonial.role}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="flex items-center gap-3">
                  {trustBadges.map((badge, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5"
                    >
                      <span className="text-lime text-xs">{badge.icon}</span>
                      <span className="text-white/80 text-xs font-medium">
                        {badge.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation Sidebar */}
            <div className="lg:col-span-2 lg:border-l lg:border-white/10 lg:pl-12">
              <div className="flex flex-col gap-4">
                <div className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-2 hidden lg:block">
                  Browse Stories
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
                  {testimonials.map((t, i) => (
                    <motion.button
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      className={`relative text-left p-4 rounded-2xl transition-all duration-300 group ${
                        activeIndex === i
                          ? "bg-lime text-forest"
                          : "bg-white/5 text-white hover:bg-white/10"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {activeIndex === i && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-forest rounded-r-full hidden lg:block"
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                        />
                      )}

                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                            activeIndex === i
                              ? "bg-forest text-white"
                              : "bg-white/10 text-white"
                          }`}
                        >
                          {t.initials}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p
                            className={`font-semibold text-sm truncate ${
                              activeIndex === i
                                ? "text-forest"
                                : "text-white"
                            }`}
                          >
                            {t.name}
                          </p>
                          <p
                            className={`text-xs truncate ${
                              activeIndex === i
                                ? "text-forest/80"
                                : "text-white/50"
                            }`}
                          >
                            {t.role}
                          </p>
                        </div>
                        <div
                          className={`flex gap-0.5 ${
                            activeIndex === i ? "text-forest" : "text-lime"
                          }`}
                        >
                          {[...Array(t.rating)].map((_, j) => (
                            <svg
                              key={j}
                              className="w-3 h-3 fill-current"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
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
      </div>

      {/* Testimonial Cards Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="group relative bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-card border border-forest/5 hover:shadow-glow transition-all duration-500 cursor-pointer"
            onClick={() => setActiveIndex(i)}
            whileHover={{ y: -8 }}
          >
            {activeIndex === i && (
              <div className="absolute inset-0 rounded-2xl md:rounded-3xl ring-2 ring-lime ring-offset-2 pointer-events-none"></div>
            )}

            <div className="flex items-start justify-between mb-5">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                  activeIndex === i
                    ? "bg-lime text-forest"
                    : "bg-sage text-forest group-hover:bg-forest group-hover:text-white"
                }`}
              >
                {t.initials}
              </div>

              <div className="flex gap-0.5 text-lime">
                {[...Array(t.rating)].map((_, j) => (
                  <svg
                    key={j}
                    className="w-4 h-4 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
            </div>

            <blockquote className="text-forest/80 text-sm leading-relaxed mb-6 line-clamp-4">
              &ldquo;{t.content}&rdquo;
            </blockquote>

            <div className="h-[2px] w-full bg-forest/5 rounded-full overflow-hidden mb-5">
              <motion.div
                className="h-full bg-lime"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-forest text-sm mb-0.5">{t.name}</p>
                <p className="text-seafoam text-xs font-medium">{t.role}</p>
              </div>

              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  activeIndex === i
                    ? "bg-lime text-forest"
                    : "bg-forest/5 text-forest/40 group-hover:bg-forest group-hover:text-white"
                }`}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}
