'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ClipboardList, Target, Dumbbell, Star, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";

const stepIconMap = {
  1: ClipboardList,
  2: Target,
  3: Dumbbell,
  4: Star,
};

export function PatientJourney() {
  const [activeStep, setActiveStep] = useState(0);
  const [hoveredTag, setHoveredTag] = useState<number | null>(null);
  
  const t = useTranslations("patientJourney");
  const locale = useLocale();
  const isRTL = locale === "ar";

  // Step configuration with translation keys
  const steps = [
    { num: 1, key: "assessment", color: "from-blue-500/20 to-blue-600/20" },
    { num: 2, key: "plan", color: "from-purple-500/20 to-purple-600/20" },
    { num: 3, key: "therapy", color: "from-seafoam/20 to-lime/20" },
    { num: 4, key: "recovery", color: "from-lime/20 to-yellow-500/20" },
  ];

  // Pain points configuration with translation keys
  const painPoints = [
    { id: 1, key: "neckShoulder", position: { top: "18%", left: "50%" } },
    { id: 2, key: "upperBack", position: { top: "27%", left: "50%" } },
    { id: 3, key: "lowerBack", position: { top: "42%", left: "50%" } },
    { id: 4, key: "kneeLeg", position: { top: "75%", left: "50%" } },
  ];

  // Get translated step content
  const getStepContent = (key: string) => ({
    title: t(`steps.${key}.title`),
    shortTitle: t(`steps.${key}.shortTitle`),
    desc: t(`steps.${key}.desc`),
    duration: t(`steps.${key}.duration`),
  });

  // Get translated pain point content
  const getPainPointContent = (key: string) => ({
    title: t(`painPoints.${key}.title`),
    conditions: t.raw(`painPoints.${key}.conditions`) as string[],
  });

  return (
    <section className="bg-forest py-16 md:py-24 relative overflow-hidden" id="journey">
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-seafoam/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-lime/5 rounded-full blur-[100px]" />
        
        {/* Grid Lines */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: '80px 80px'
          }}
        />
      </div>

      <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-seafoam/20 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-seafoam" />
            </div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-seafoam">{t("badge")}</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-sans text-white font-semibold leading-[1.1] tracking-tight mb-4">
            {t("title")} <span className="text-lime">{t("titleHighlight")}</span>
          </h2>
          <p className="text-white/60 text-sm md:text-base max-w-2xl mx-auto">
            {t("description")}
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left - Interactive Body Map (Desktop) */}
          <div className="hidden lg:block lg:col-span-4">
            <motion.div 
              className="sticky top-24"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
                <h3 className="text-white font-semibold text-lg mb-4">We Treat All Areas</h3>
                
                {/* Body Silhouette with Points */}
                <div className="relative h-[450px] lg:h-[415px] w-full flex items-center justify-center">
                  {/* Medical Skeleton/Anatomy Image */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <img
                      src="/human_skeleton.png"
                      alt="Human Anatomy Representation"
                      className="h-full w-auto max-w-full object-contain opacity-90 drop-shadow-2xl"
                    />
                  </div>

                  {/* Pain Points */}
                  {painPoints.map((point, index) => {
                    const painContent = getPainPointContent(point.key);
                    return (
                    <motion.button
                      key={point.id}
                      className={`absolute z-10 group`}
                      style={{ top: point.position.top, left: point.position.left, transform: 'translate(-50%, -50%)' }}
                      onHoverStart={() => setHoveredTag(point.id)}
                      onHoverEnd={() => setHoveredTag(null)}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                    >
                      {/* Interactive Marker Hotspot */}
                      <div className="relative flex items-center justify-center">
                        {/* Outer pulsing ring for visibility */}
                        <div 
                          className="absolute w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-white/40 animate-ping" 
                          style={{ animationDuration: '2.5s' }}
                        />
                        
                        {/* Core Marker */}
                        <div className={`relative flex items-center justify-center w-6 h-6 lg:w-7 lg:h-7 rounded-full transition-all duration-300 ${
                          hoveredTag === point.id 
                            ? 'bg-lime scale-125 shadow-[0_0_20px_rgba(25,230,94,0.6)]' 
                            : 'bg-white shadow-[0_0_15px_rgba(255,255,255,0.4)] border border-forest/20'
                        }`}>
                           {/* Inner dot */}
                           <div className={`w-2 h-2 rounded-full transition-colors ${
                             hoveredTag === point.id ? 'bg-forest' : 'bg-lime'
                           }`} />
                        </div>
                      </div>
                      
                      {/* Tooltip */}
                      <AnimatePresence>
                        {hoveredTag === point.id && (
                          <motion.div
                            initial={{ opacity: 0, x: isRTL ? -10 : 10, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: isRTL ? -10 : 10, scale: 0.9 }}
                            className={`absolute ${isRTL ? 'right-10 lg:right-12' : 'left-10 lg:left-12'} top-1/2 -translate-y-1/2 bg-white rounded-xl p-3 shadow-2xl min-w-[160px] z-50 border border-forest/10`}
                          >
                            <p className="text-forest font-bold text-sm mb-1">{painContent.title}</p>
                            <div className="flex flex-wrap gap-1">
                              {painContent.conditions.map((condition) => (
                                <span key={condition} className="text-[10px] px-2 py-0.5 bg-section rounded-full text-forest/70">
                                  {condition}
                                </span>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  )})}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="text-center p-3 bg-white/5 rounded-xl">
                    <p className="text-2xl font-bold text-white">{siteConfig.social.bodyAreas}</p>
                    <p className="text-[10px] text-white/50 uppercase tracking-wider">Body Areas</p>
                  </div>
                  <div className="text-center p-3 bg-white/5 rounded-xl">
                    <p className="text-2xl font-bold text-white">{siteConfig.social.conditions}</p>
                    <p className="text-[10px] text-white/50 uppercase tracking-wider">Conditions</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right - Journey Steps */}
          <div className="lg:col-span-8">
            {/* Step Timeline - Desktop */}
            <div className="hidden md:block mb-8">
              <div className="flex items-center justify-between relative">
                {/* Progress Line */}
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/10 -translate-y-1/2 rounded-full" />
                <motion.div 
                  className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-seafoam to-lime -translate-y-1/2 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />

                {/* Step Buttons */}
                {steps.map((step, index) => {
                  const IconComponent = stepIconMap[step.num as keyof typeof stepIconMap];
                  return (
                    <motion.button
                      key={step.num}
                      onClick={() => setActiveStep(index)}
                      className="relative z-10 group"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                        index <= activeStep
                          ? 'bg-gradient-to-br from-seafoam to-lime shadow-lg shadow-seafoam/30'
                          : 'bg-white/10 border border-white/20'
                      }`}>
                        {IconComponent && <IconComponent className="w-6 h-6 text-white" />}
                      </div>
                      <span className={`absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-medium whitespace-nowrap transition-colors ${
                        index === activeStep ? 'text-lime' : 'text-white/50'
                      }`}>
                        {getStepContent(step.key).shortTitle}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Active Step Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className={`relative rounded-2xl md:rounded-3xl overflow-hidden bg-gradient-to-br ${steps[activeStep].color} border border-white/10 p-4 sm:p-6 md:p-8 lg:p-10 mt-4 md:mt-16`}
              >
                {/* Large Number Background */}
                <div className={`absolute top-2 ${isRTL ? 'left-2 sm:left-4 md:left-6' : 'right-2 sm:right-4 md:right-6'} text-[80px] sm:text-[120px] md:text-[180px] font-bold text-white/5 leading-none select-none`}>
                  {steps[activeStep].num}
                </div>

                <div className="relative z-10">
                  {/* Step Badge */}
                  <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 backdrop-blur-sm rounded-full mb-4 sm:mb-6">
                    <span className="text-white text-xs sm:text-sm font-medium">Step {steps[activeStep].num} of {steps.length}</span>
                    <span className="w-px h-3 sm:h-4 bg-white/30" />
                    <span className="text-white/70 text-xs sm:text-sm">{getStepContent(steps[activeStep].key).duration}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
                    {getStepContent(steps[activeStep].key).title}
                  </h3>
                  <p className="text-white/70 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mb-6 sm:mb-8">
                    {getStepContent(steps[activeStep].key).desc}
                  </p>

                  {/* Navigation */}
                  <div className="flex items-center justify-between">
                    <div className={`flex gap-1.5 sm:gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      {steps.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveStep(index)}
                          className={`h-2 rounded-full transition-all duration-300 ${
                            index === activeStep ? 'bg-lime w-6 sm:w-8' : 'bg-white/30 hover:bg-white/50 w-2'
                          }`}
                        />
                      ))}
                    </div>

                    <div className={`flex gap-2 sm:gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <button
                        onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                        disabled={activeStep === 0}
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <svg className={`w-4 h-4 sm:w-5 sm:h-5 ${isRTL ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
                        disabled={activeStep === steps.length - 1}
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white flex items-center justify-center text-forest hover:bg-lime transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <svg className={`w-4 h-4 sm:w-5 sm:h-5 ${isRTL ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Mobile Step List */}
            <div className="md:hidden mt-6 space-y-2">
              {steps.map((step, index) => {
                const stepContent = getStepContent(step.key);
                return (
                <motion.button
                  key={step.num}
                  onClick={() => setActiveStep(index)}
                  className={`w-full text-left p-3 rounded-xl transition-all duration-300 ${
                    index === activeStep
                      ? 'bg-gradient-to-r from-seafoam/20 to-lime/20 border border-white/20'
                      : 'bg-white/5 border border-transparent'
                  }`}
                  initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center gap-3">
                    {(() => {
                      const IconComponent = stepIconMap[step.num as keyof typeof stepIconMap];
                      return (
                        <div className={`w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center ${
                          index <= activeStep
                            ? 'bg-gradient-to-br from-seafoam to-lime'
                            : 'bg-white/10'
                        }`}>
                          {IconComponent && <IconComponent className="w-4 h-4 text-white" />}
                        </div>
                      );
                    })()}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className={`font-semibold text-sm ${index === activeStep ? 'text-white' : 'text-white/70'}`}>
                          {stepContent.title}
                        </h4>
                        <span className="text-[10px] text-white/40 flex-shrink-0">{stepContent.duration}</span>
                      </div>
                      <p className="text-white/50 text-xs line-clamp-1">{stepContent.desc}</p>
                    </div>
                  </div>
                </motion.button>
              );})}
            </div>

            {/* Bottom CTA */}
            <motion.div 
              className="mt-6 sm:mt-8 md:mt-12 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 p-4 sm:p-6 bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className={`text-center ${isRTL ? 'sm:text-right' : 'sm:text-left'}`}>
                <p className="text-white font-semibold text-sm sm:text-base mb-0.5 sm:mb-1">{t("cta")}</p>
                <p className="text-white/50 text-xs sm:text-sm">{t("description")}</p>
              </div>
              <Link 
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-seafoam to-lime text-forest font-semibold rounded-full hover:shadow-lg hover:shadow-seafoam/30 transition-all text-sm sm:text-base"
              >
                {t("cta")}
                <svg className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
