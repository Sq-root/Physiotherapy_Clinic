"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Bone, Zap, Brain, Hand, Heart, Sparkles, ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";

interface Service {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  icon: string;
  img: string;
  imagePosition: string;
  features: string[];
}

const iconMap = {
  bone: Bone,
  zap: Zap,
  brain: Brain,
  hand: Hand,
  heart: Heart,
};

export function ServicesSection() {
  const [activeService, setActiveService] = useState(0);

  const services = [
    {
      id: "01",
      title: "Orthopedic Rehabilitation",
      shortDesc: "Joint & Bone Recovery",
      fullDesc: "Comprehensive treatment for musculoskeletal disorders including joint pain, fractures, arthritis management, and post-surgical rehabilitation protocols.",
      icon: "bone",
      img: "/services/orthopedic_service_v2.webp",
      imagePosition: "object-center",
      features: ["Joint Mobilization", "Post-Surgery Care", "Pain Management"]
    },
    {
      id: "02",
      title: "Sports Medicine & Rehab",
      shortDesc: "Athletic Performance",
      fullDesc: "Expert rehabilitation for athletes of all levels - from injury diagnosis and treatment to full return-to-sport performance optimization programs.",
      icon: "zap",
      img: "/services/sports_medicine_v2.webp",
      imagePosition: "object-center",
      features: ["Injury Prevention", "Performance Training", "Sport-Specific Rehab"]
    },
    {
      id: "03",
      title: "Neurological Therapy",
      shortDesc: "Brain & Nerve Care",
      fullDesc: "Compassionate care for neurological conditions including stroke recovery, Parkinson's disease, multiple sclerosis, and spinal cord injuries.",
      icon: "brain",
      img: "/services/neuro_service_v2.webp",
      imagePosition: "object-center",
      features: ["Stroke Recovery", "Balance Training", "Motor Control"]
    },
    {
      id: "04",
      title: "Manual Therapy",
      shortDesc: "Hands-On Healing",
      fullDesc: "Skilled hands-on techniques including soft tissue mobilization, joint manipulation, and myofascial release for optimal pain relief and mobility.",
      icon: "hand",
      img: "/services/manual_therapy_v2.webp",
      imagePosition: "object-center",
      features: ["Deep Tissue Work", "Trigger Point Release", "Spinal Adjustment"]
    },
    {
      id: "05",
      title: "Senior Wellness Program",
      shortDesc: "Active Aging",
      fullDesc: "Specialized programs for older adults focusing on balance improvement, fall prevention, strength maintenance, and enhanced quality of life.",
      icon: "heart",
      img: "/services/senior_wellness_v2.webp",
      imagePosition: "object-center",
      features: ["Fall Prevention", "Mobility Enhancement", "Strength Building"]
    }
  ];

  const activeData = services[activeService];

  return (
    <section className="relative py-16 md:py-24 bg-section overflow-hidden" id="services">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" 
          style={{
            backgroundImage: `linear-gradient(#002D04 1px, transparent 1px), linear-gradient(90deg, #002D04 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
        {/* Decorative Circles */}
        <div className="absolute top-20 right-20 w-96 h-96 border border-seafoam/10 rounded-full" />
        <div className="absolute top-24 right-24 w-80 h-80 border border-seafoam/5 rounded-full" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-seafoam/5 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <motion.div 
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-seafoam/10 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-seafoam" />
              </div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-seafoam">Our Services</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-sans text-forest font-semibold leading-[1.1] tracking-tight">
              Expert Care For Every<br className="hidden md:block" />
              <span className="text-seafoam">Recovery Journey</span>
            </h2>
          </div>
          <p className="text-forest/60 text-sm md:text-base max-w-md leading-relaxed">
            From sports injuries to chronic conditions, our specialized treatments are designed to restore your mobility and enhance your quality of life.
          </p>
        </motion.div>

        {/* Main Content - Desktop */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-6 lg:gap-8">
          
          {/* Left - Service List */}
          <div className="col-span-4 space-y-3">
            {services.map((service, index) => (
              <motion.button
                key={service.id}
                onClick={() => setActiveService(index)}
                className={`w-full text-left p-4 xl:p-5 rounded-2xl transition-all duration-300 group relative overflow-hidden ${
                  activeService === index 
                    ? 'bg-forest text-white shadow-lg' 
                    : 'bg-white hover:bg-forest/5 border border-forest/10'
                }`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                whileHover={{ scale: activeService === index ? 1 : 1.02 }}
              >
                <div className="flex items-center gap-4">
                  {/* Number */}
                  <span className={`text-3xl xl:text-4xl font-bold transition-colors ${
                    activeService === index ? 'text-seafoam' : 'text-forest/10'
                  }`}>
                    {service.id}
                  </span>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-semibold text-sm xl:text-base mb-0.5 truncate ${
                      activeService === index ? 'text-white' : 'text-forest'
                    }`}>
                      {service.title}
                    </h3>
                    <p className={`text-xs truncate ${
                      activeService === index ? 'text-white/70' : 'text-forest/50'
                    }`}>
                      {service.shortDesc}
                    </p>
                  </div>

                  {/* Icon */}
                  {(() => {
                    const IconComponent = iconMap[service.icon as keyof typeof iconMap];
                    return IconComponent ? (
                      <IconComponent className={`w-6 h-6 transition-transform ${
                        activeService === index ? 'scale-110 text-seafoam' : 'text-forest/60 group-hover:scale-110'
                      }`} />
                    ) : null;
                  })()}
                </div>

                {/* Active Indicator */}
                {activeService === index && (
                  <motion.div 
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-seafoam rounded-r-full"
                    layoutId="activeIndicator"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}

            {/* Stats Mini Card */}
            <motion.div 
              className="mt-6 p-5 bg-gradient-to-br from-seafoam/10 to-seafoam/5 rounded-2xl border border-seafoam/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center justify-between">
                <div className="text-center">
                  <p className="text-2xl font-bold text-forest">{siteConfig.social.servicesCount}</p>
                  <p className="text-[10px] text-forest/60 uppercase tracking-wider">Services</p>
                </div>
                <div className="w-px h-10 bg-forest/10" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-forest">{siteConfig.social.livesRestored}</p>
                  <p className="text-[10px] text-forest/60 uppercase tracking-wider">Patients</p>
                </div>
                <div className="w-px h-10 bg-forest/10" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-forest">{siteConfig.social.recoveryRate}</p>
                  <p className="text-[10px] text-forest/60 uppercase tracking-wider">Success</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right - Featured Service Display */}
          <div className="col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative h-[560px] xl:h-[600px] rounded-3xl overflow-hidden group"
              >
                {/* Image */}
                <motion.div
                  className="absolute inset-0"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <Image 
                    src={activeData.img} 
                    alt={activeData.title}
                    fill
                    className={`object-cover ${activeData.imagePosition || 'object-center'}`}
                    priority={activeService === 0}
                  />
                </motion.div>
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/50 to-transparent" />
                
                {/* Content */}
                <div className="absolute inset-0 p-8 xl:p-10 flex flex-col justify-end">
                  {/* Top Badge */}
                  <motion.div 
                    className="absolute top-8 left-8 inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {(() => {
                      const IconComponent = iconMap[activeData.icon as keyof typeof iconMap];
                      return IconComponent ? <IconComponent className="w-5 h-5 text-white" /> : null;
                    })()}
                    <span className="text-white text-sm font-medium">{activeData.shortDesc}</span>
                  </motion.div>

                  {/* Main Text */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <span className="text-seafoam text-6xl xl:text-7xl font-bold opacity-30 mb-2 block">
                      {activeData.id}
                    </span>
                    <h3 className="text-3xl xl:text-4xl font-bold text-white mb-4 leading-tight">
                      {activeData.title}
                    </h3>
                    <p className="text-white/80 text-base xl:text-lg max-w-xl mb-6 leading-relaxed">
                      {activeData.fullDesc}
                    </p>

                    {/* Features Tags */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {activeData.features.map((feature, i) => (
                        <motion.span
                          key={feature}
                          className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white text-sm rounded-full border border-white/10"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2 + i * 0.1 }}
                        >
                          {feature}
                        </motion.span>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <motion.button
                      className="inline-flex items-center gap-3 px-6 py-3 bg-white text-forest font-semibold rounded-full hover:bg-seafoam hover:text-white transition-colors group/btn"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Learn More About This Service
                      <span className="size-8 rounded-full bg-forest/10 flex items-center justify-center group-hover/btn:bg-white/20 transition-colors">
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </motion.button>
                  </motion.div>
                </div>

                {/* Navigation Dots */}
                <div className="absolute top-1/2 right-6 -translate-y-1/2 flex flex-col gap-2">
                  {services.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveService(i)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        i === activeService 
                          ? 'bg-white h-6' 
                          : 'bg-white/30 hover:bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden">
          {/* Service Pills - Horizontal Scroll */}
          <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide -mx-4 px-4">
            {services.map((service, index) => (
              <button
                key={service.id}
                onClick={() => setActiveService(index)}
                className={`flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  activeService === index
                    ? 'bg-forest text-white'
                    : 'bg-white text-forest border border-forest/20'
                }`}
              >
                {(() => {
                  const IconComponent = iconMap[service.icon as keyof typeof iconMap];
                  return IconComponent ? <IconComponent className="w-4 h-4" /> : null;
                })()}
                {service.title}
              </button>
            ))}
          </div>

          {/* Active Service Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeService}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="relative rounded-2xl overflow-hidden aspect-[4/5]"
            >
              <Image 
                src={activeData.img} 
                alt={activeData.title}
                fill
                className={`object-cover ${activeData.imagePosition || 'object-center'}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/60 to-transparent" />
              
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                {/* Badge */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                  {(() => {
                    const IconComponent = iconMap[activeData.icon as keyof typeof iconMap];
                    return IconComponent ? <IconComponent className="w-4 h-4 text-white" /> : null;
                  })()}
                  <span className="text-white text-xs font-medium">{activeData.shortDesc}</span>
                </div>

                {/* Number */}
                <span className="text-5xl font-bold text-seafoam/30 mb-2">{activeData.id}</span>
                
                <h3 className="text-2xl font-bold text-white mb-2">{activeData.title}</h3>
                <p className="text-white/70 text-sm mb-4 line-clamp-3">{activeData.fullDesc}</p>
                
                {/* Features */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {activeData.features.map((feature) => (
                    <span key={feature} className="px-3 py-1 bg-white/10 text-white text-xs rounded-full">
                      {feature}
                    </span>
                  ))}
                </div>

                <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-forest font-semibold rounded-full text-sm w-fit">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Slide Indicators */}
              <div className="absolute bottom-6 right-6 flex gap-1.5">
                {services.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveService(i)}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${
                      i === activeService ? 'bg-white w-4' : 'bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Mobile Stats */}
          <div className="mt-6 grid grid-cols-3 gap-3">
            {[
              { value: siteConfig.social.servicesCount, label: "Services" },
              { value: siteConfig.social.livesRestored, label: "Patients" },
              { value: siteConfig.social.recoveryRate, label: "Success" }
            ].map((stat) => (
              <div key={stat.label} className="text-center p-3 bg-white rounded-xl border border-forest/10">
                <p className="text-xl font-bold text-forest">{stat.value}</p>
                <p className="text-[10px] text-forest/60 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div 
          className="mt-12 md:mt-16 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Link 
            href="/services"
            className="inline-flex items-center gap-4 px-6 md:px-8 py-3 bg-forest text-white hover:bg-forest/90 transition-colors rounded-full text-sm font-medium tracking-wide group"
          >
            Explore All Services
            <span className="size-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-seafoam transition-colors">
              <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
