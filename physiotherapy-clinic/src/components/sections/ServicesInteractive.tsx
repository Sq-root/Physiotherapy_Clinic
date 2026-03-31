"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Bone, Zap, Brain, Hand, Heart, ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Link } from "@/i18n/routing";

const iconMap = {
  bone: Bone,
  zap: Zap,
  brain: Brain,
  hand: Hand,
  heart: Heart,
};

interface ServiceData {
  id: string;
  key: string;
  icon: string;
  img: string;
  imagePosition: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  features: string[];
}

interface ServicesInteractiveProps {
  services: ServiceData[];
  isRTL: boolean;
  learnMoreLabel: string;
  servicesLabel: string;
}

export function ServicesInteractive({
  services,
  isRTL,
  learnMoreLabel,
  servicesLabel,
}: ServicesInteractiveProps) {
  const [activeService, setActiveService] = useState(0);
  const activeData = services[activeService];

  return (
    <>
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
                  ? "bg-forest text-white shadow-lg"
                  : "bg-white hover:bg-forest/5 border border-forest/10"
              }`}
              initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileHover={{
                scale: activeService === index ? 1 : 1.02,
              }}
            >
              <div className="flex items-center gap-4">
                <span
                  className={`text-3xl xl:text-4xl font-bold transition-colors ${
                    activeService === index
                      ? "text-seafoam"
                      : "text-forest/10"
                  }`}
                >
                  {service.id}
                </span>

                <div className="flex-1 min-w-0">
                  <h3
                    className={`font-semibold text-sm xl:text-base mb-0.5 truncate ${
                      activeService === index
                        ? "text-white"
                        : "text-forest"
                    }`}
                  >
                    {service.title}
                  </h3>
                  <p
                    className={`text-xs truncate ${
                      activeService === index
                        ? "text-white/70"
                        : "text-forest/50"
                    }`}
                  >
                    {service.shortDesc}
                  </p>
                </div>

                {(() => {
                  const IconComponent =
                    iconMap[service.icon as keyof typeof iconMap];
                  return IconComponent ? (
                    <IconComponent
                      className={`w-6 h-6 transition-transform ${
                        activeService === index
                          ? "scale-110 text-seafoam"
                          : "text-forest/80 group-hover:scale-110"
                      }`}
                    />
                  ) : null;
                })()}
              </div>

              {activeService === index && (
                <motion.div
                  className={`absolute ${isRTL ? "right-0" : "left-0"} top-1/2 -translate-y-1/2 w-1 h-8 bg-seafoam ${isRTL ? "rounded-l-full" : "rounded-r-full"}`}
                  layoutId="activeIndicator"
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
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
                <p className="text-2xl font-bold text-forest">
                  {siteConfig.social.servicesCount}
                </p>
                <p className="text-[10px] text-forest/80 uppercase tracking-wider">
                  {servicesLabel}
                </p>
              </div>
              <div className="w-px h-10 bg-forest/10" />
              <div className="text-center">
                <p className="text-2xl font-bold text-forest">
                  {siteConfig.social.livesRestored}
                </p>
                <p className="text-[10px] text-forest/80 uppercase tracking-wider">
                  Patients
                </p>
              </div>
              <div className="w-px h-10 bg-forest/10" />
              <div className="text-center">
                <p className="text-2xl font-bold text-forest">
                  {siteConfig.social.recoveryRate}
                </p>
                <p className="text-[10px] text-forest/80 uppercase tracking-wider">
                  Success
                </p>
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
                  className={`object-cover ${activeData.imagePosition || "object-center"}`}
                  priority={activeService === 0}
                />
              </motion.div>

              <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/50 to-transparent" />

              <div className="absolute inset-0 p-8 xl:p-10 flex flex-col justify-end">
                <motion.div
                  className={`absolute top-8 ${isRTL ? "right-8" : "left-8"} inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {(() => {
                    const IconComponent =
                      iconMap[activeData.icon as keyof typeof iconMap];
                    return IconComponent ? (
                      <IconComponent className="w-5 h-5 text-white" />
                    ) : null;
                  })()}
                  <span className="text-white text-sm font-medium">
                    {activeData.shortDesc}
                  </span>
                </motion.div>

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

                  <Link href="/services">
                    <motion.span
                      className="inline-flex items-center gap-3 px-6 py-3 bg-white text-forest font-semibold rounded-full hover:bg-seafoam hover:text-white transition-colors group/btn cursor-pointer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {learnMoreLabel}
                      <span className="sr-only"> about {activeData.title}</span>
                      <span className="size-8 rounded-full bg-forest/10 flex items-center justify-center group-hover/btn:bg-white/20 transition-colors">
                        <ArrowRight
                          className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`}
                        />
                      </span>
                    </motion.span>
                  </Link>
                </motion.div>
              </div>

              <div className="absolute top-1/2 right-4 -translate-y-1/2 flex flex-col gap-0">
                {services.map((s, i) => (
                  <button
                    key={i}
                    aria-label={`View ${s.title}`}
                    onClick={() => setActiveService(i)}
                    className="min-w-[48px] min-h-[48px] flex items-center justify-center group/dot"
                  >
                    <div
                      className={`w-2 rounded-full transition-all duration-300 ${
                        i === activeService
                          ? "bg-white h-6 w-2.5"
                          : "bg-white/30 h-2 group-hover/dot:bg-white/50"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        <div
          className={`flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide -mx-4 px-4 ${isRTL ? "flex-row-reverse" : ""}`}
        >
          {services.map((service, index) => (
            <button
              key={service.id}
              onClick={() => setActiveService(index)}
              className={`flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                activeService === index
                  ? "bg-forest text-white"
                  : "bg-white text-forest border border-forest/20"
              }`}
            >
              {(() => {
                const IconComponent =
                  iconMap[service.icon as keyof typeof iconMap];
                return IconComponent ? (
                  <IconComponent className="w-4 h-4" />
                ) : null;
              })()}
              {service.title}
            </button>
          ))}
        </div>

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
              className={`object-cover ${activeData.imagePosition || "object-center"}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/60 to-transparent" />

            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <div
                className={`absolute top-4 ${isRTL ? "right-4" : "left-4"} inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20`}
              >
                {(() => {
                  const IconComponent =
                    iconMap[activeData.icon as keyof typeof iconMap];
                  return IconComponent ? (
                    <IconComponent className="w-4 h-4 text-white" />
                  ) : null;
                })()}
                <span className="text-white text-xs font-medium">
                  {activeData.shortDesc}
                </span>
              </div>

              <span className="text-5xl font-bold text-seafoam/30 mb-2">
                {activeData.id}
              </span>
              <h3 className="text-2xl font-bold text-white mb-2">
                {activeData.title}
              </h3>
              <p className="text-white/70 text-sm mb-4 line-clamp-3">
                {activeData.fullDesc}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {activeData.features.map((feature) => (
                  <span
                    key={feature}
                    className="px-3 py-1 bg-white/10 text-white text-xs rounded-full"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-forest font-semibold rounded-full text-sm w-fit"
              >
                {learnMoreLabel}
                <span className="sr-only"> about {activeData.title}</span>
                <ArrowRight
                  className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`}
                />
              </Link>
            </div>

            <div
              className={`absolute bottom-6 ${isRTL ? "left-6" : "right-6"} flex gap-0`}
            >
              {services.map((s, i) => (
                <button
                  key={i}
                  aria-label={`View ${s.title}`}
                  onClick={() => setActiveService(i)}
                  className="min-w-[48px] min-h-[48px] flex items-center justify-center group/dot"
                >
                  <div
                    className={`h-1.5 rounded-full transition-all ${
                      i === activeService ? "bg-white w-4" : "bg-white/40 w-1.5"
                    }`}
                  />
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Mobile Stats */}
        <div className="mt-6 grid grid-cols-3 gap-3">
          {[
            {
              value: siteConfig.social.servicesCount,
              label: servicesLabel,
            },
            { value: siteConfig.social.livesRestored, label: "Patients" },
            { value: siteConfig.social.recoveryRate, label: "Success" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center p-3 bg-white rounded-xl border border-forest/10"
            >
              <p className="text-xl font-bold text-forest">{stat.value}</p>
              <p className="text-[10px] text-forest/80 uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
