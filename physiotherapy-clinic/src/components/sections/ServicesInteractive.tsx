"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Link } from "@/i18n/routing";
import { DynamicIcon } from "@/components/ui/DynamicIcon";

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

                <DynamicIcon
                  name={service.icon}
                  className={`w-6 h-6 transition-transform ${
                    activeService === index
                      ? "scale-110 text-seafoam"
                      : "text-forest/80 group-hover:scale-110"
                  }`}
                />
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
              className="relative h-[560px] xl:h-[600px] rounded-[2rem] overflow-hidden group shadow-xl shadow-forest/5"
            >
              {/* Image Background */}
              <motion.div
                className="absolute inset-0"
                initial={{ scale: 1.05 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <Image
                  src={activeData.img}
                  alt={activeData.title}
                  fill
                  className={`object-cover ${activeData.imagePosition || "object-center"} group-hover:scale-105 transition-transform duration-700`}
                  priority={activeService === 0}
                />
              </motion.div>

              {/* Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-b from-forest/40 via-transparent to-transparent opacity-60" />

              {/* Content Container */}
              <div className="absolute inset-0 p-8 xl:p-12 flex flex-col justify-between">
                {/* Top Section: Badge & ID */}
                <div className="flex justify-between items-start">
                  <motion.div
                    className="inline-flex items-center gap-2.5 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-lg"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <DynamicIcon name={activeData.icon} className="w-5 h-5 text-seafoam" />
                    <span className="text-white text-sm font-medium tracking-wide">
                      {activeData.shortDesc}
                    </span>
                  </motion.div>

                  <motion.span
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-white/20 text-5xl xl:text-7xl font-bold leading-none select-none drop-shadow-sm"
                  >
                    {activeData.id}
                  </motion.span>
                </div>

                {/* Bottom Section: Title & CTA */}
                <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4 xl:gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="max-w-lg"
                  >
                    <h3 className="text-xl lg:text-2xl xl:text-4xl font-bold text-white leading-[1.15] tracking-tight">
                      {activeData.title}
                    </h3>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="shrink-0"
                  >
                    <Link href="/services">
                      <span className="inline-flex items-center justify-center gap-3 px-5 py-2.5 xl:px-7 xl:py-3.5 bg-white text-forest font-bold uppercase tracking-[0.12em] rounded-full transition-all duration-300 shadow-[3px_3px_0px_0px_#A4C639] hover:bg-seafoam hover:text-forest hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:translate-x-[3px] active:translate-y-[3px] active:shadow-none group/cta">
                        <span className="text-xs xl:text-sm">{learnMoreLabel || "Discover"}</span>
                        <span className="size-7 xl:size-8 rounded-full bg-forest/10 flex items-center justify-center group-hover/cta:bg-white/30 transition-colors">
                          <ArrowRight className={`w-3.5 h-3.5 xl:w-4 xl:h-4 ${isRTL ? "rotate-180" : ""}`} />
                        </span>
                      </span>
                    </Link>
                  </motion.div>
                </div>
              </div>

              {/* Navigation Indicators */}
              <div className="absolute top-1/2 right-4 -translate-y-1/2 hidden xl:flex flex-col gap-2">
                {services.map((s, i) => (
                  <button
                    key={i}
                    aria-label={`View ${s.title}`}
                    onClick={() => setActiveService(i)}
                    className="w-10 h-10 flex items-center justify-center group/dot"
                  >
                    <div
                      className={`w-1.5 rounded-full transition-all duration-500 ease-out ${
                        i === activeService
                          ? "bg-white h-8"
                          : "bg-white/30 h-2 group-hover/dot:bg-white/60 group-hover/dot:h-4"
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
              <DynamicIcon name={service.icon} className="w-4 h-4" />
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
            className="relative rounded-2xl overflow-hidden aspect-[3/4] sm:aspect-[4/5]"
          >
            {/* Image Background */}
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Image
                src={activeData.img}
                alt={activeData.title}
                fill
                className={`object-cover ${activeData.imagePosition || "object-center"}`}
              />
            </motion.div>

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-forest/40 via-transparent to-transparent opacity-60" />

            {/* Content Container */}
            <div className="absolute inset-0 p-6 flex flex-col justify-between">
              {/* Top Section: Badge & ID */}
              <div className="flex justify-between items-start">
                <div
                  className={`inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-lg`}
                >
                  <DynamicIcon name={activeData.icon} className="w-4 h-4 text-seafoam" />
                  <span className="text-white text-xs font-medium tracking-wide">
                    {activeData.shortDesc}
                  </span>
                </div>
                
                <span className="text-white/20 text-5xl font-bold leading-none select-none drop-shadow-sm">
                  {activeData.id}
                </span>
              </div>

              {/* Bottom Section: Title & CTA */}
              <div className="flex flex-col gap-3">
                <h3 className="text-lg sm:text-xl font-bold text-white leading-tight">
                  {activeData.title}
                </h3>

                <div className="flex items-center justify-between">
                  <Link
                    href="/services"
                    className="inline-flex items-center justify-center gap-3 px-6 py-3 bg-white text-forest font-bold uppercase tracking-[0.1em] rounded-full transition-all duration-300 shadow-[2px_2px_0px_0px_#A4C639] hover:bg-seafoam hover:text-forest active:translate-x-[2px] active:translate-y-[2px] active:shadow-none min-h-[44px]"
                  >
                    <span className="text-xs">{learnMoreLabel || "Discover"}</span>
                    <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
                  </Link>

                  {/* Mobile Navigation Indicators */}
                  <div className="flex gap-1.5">
                    {services.map((s, i) => (
                      <button
                        key={i}
                        aria-label={`View ${s.title}`}
                        onClick={() => setActiveService(i)}
                        className="py-2"
                      >
                        <div
                          className={`h-1.5 rounded-full transition-all duration-500 ${
                            i === activeService ? "bg-white w-4" : "bg-white/40 w-1.5"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
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
