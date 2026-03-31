"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface SlideData {
  id: number;
  key: string;
  image: string;
  imagePosition: string;
  badge: string;
  title: string;
  highlight: string;
  description: string;
}

interface HeroSlideshowProps {
  slides: SlideData[];
  isRTL: boolean;
}

export function HeroSlideshow({ slides, isRTL }: HeroSlideshowProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

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
    <>
      {/* Background Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority={currentSlide === 0}
            className={`object-cover transition-all duration-700 ${slide.imagePosition}`}
          />
          {/* Gradient Overlays - RTL aware */}
          <div
            className={`absolute inset-0 ${isRTL ? "bg-gradient-to-l" : "bg-gradient-to-r"} from-forest/90 via-forest/60 to-transparent`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest/50 via-transparent to-forest/30" />
        </motion.div>
      </AnimatePresence>

      {/* Main Content - Animated */}
      <div className="relative z-20 h-full flex items-center">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            {/* Badge */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`badge-${slide.id}`}
                initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRTL ? -20 : 20 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="w-10 h-[2px] bg-seafoam" />
                <span className="inline-flex items-center gap-2 text-seafoam text-xs font-bold uppercase tracking-[0.2em]">
                  <span className="w-2 h-2 bg-seafoam rounded-full animate-pulse" />
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
          </div>
        </div>
      </div>

      {/* Slide Navigation Dots */}
      <div
        className={`absolute ${isRTL ? "left-6 lg:left-10" : "right-6 lg:right-10"} top-1/2 -translate-y-1/2 z-30 flex flex-col gap-4`}
      >
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goToSlide(i)}
            className={`group relative flex items-center ${isRTL ? "flex-row-reverse justify-start" : "justify-end"} transition-all duration-300 ${
              currentSlide === i ? "gap-3" : "gap-0"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          >
            {/* Label on hover */}
            <span
              className={`text-white text-xs font-medium whitespace-nowrap transition-all duration-300 ${
                currentSlide === i
                  ? "opacity-100 translate-x-0"
                  : `opacity-0 ${isRTL ? "-translate-x-4" : "translate-x-4"} group-hover:opacity-70 group-hover:translate-x-0`
              }`}
            >
              {s.badge}
            </span>
            {/* Dot */}
            <span
              className={`relative flex items-center justify-center transition-all duration-300 ${
                currentSlide === i ? "w-4 h-4" : "w-3 h-3"
              }`}
            >
              <span
                className={`absolute inset-0 rounded-full transition-all duration-300 ${
                  currentSlide === i
                    ? "bg-seafoam scale-100"
                    : "bg-white/40 scale-100 group-hover:bg-white/70"
                }`}
              />
              {currentSlide === i && (
                <span className="absolute inset-0 rounded-full bg-seafoam animate-ping opacity-30" />
              )}
            </span>
          </button>
        ))}
      </div>

      {/* Slide Counter */}
      <div
        className={`absolute bottom-20 md:bottom-28 ${isRTL ? "right-6 lg:right-8" : "left-6 lg:left-8"} z-30 flex items-center gap-3 text-white/60 text-sm font-medium`}
      >
        <span className="text-2xl font-bold text-white">
          {String(currentSlide + 1).padStart(2, "0")}
        </span>
        <span className="w-8 h-px bg-white/30" />
        <span>{String(slides.length).padStart(2, "0")}</span>
      </div>
    </>
  );
}
