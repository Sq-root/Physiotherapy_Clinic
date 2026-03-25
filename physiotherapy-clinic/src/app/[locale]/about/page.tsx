"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Target,
  Activity,
  Microscope,
  Zap,
  Home,
  Monitor,
  CheckCircle2,
  Stethoscope,
  Scaling,
  Quote,
} from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";

export default function AboutPage() {
  const t = useTranslations("about");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const clinicalFocus = [
    { key: "spine", icon: Activity },
    { key: "postSurgical", icon: Target },
    { key: "postnatal", icon: Scaling },
    { key: "highFunctioning", icon: Microscope },
    { key: "musculoskeletal", icon: Zap },
  ];

  const standards = [
    { key: "private", icon: Home },
    { key: "digital", icon: Monitor },
    { key: "clinical", icon: Stethoscope },
  ];

  const ethos = ["pain", "movement", "recovery"] as const;

  // Get whoIsFor items
  const whoIsForItems = t.raw("whoIsFor.items") as string[];

  return (
    <main className="font-sans text-forest antialiased bg-white pt-24 pb-0">
      {/* 1. Hero / Founder Profile */}
      <section className="py-16 md:py-24 bg-section overflow-hidden rounded-b-[4rem]">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            {/* Image Column */}
            <div className="lg:col-span-5 order-2 lg:order-1 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="aspect-[5/6] relative rounded-[2.5rem] overflow-hidden shadow-2xl border-[10px] border-white ring-1 ring-forest/5"
              >
                <Image
                  src="/services/doctor_portrait_stretgth.webp"
                  alt="Dr. Isha Shah, Founder and Lead Physiotherapist"
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>

              {/* Experience Badge */}
              <motion.div
                initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className={`absolute -bottom-4 ${isRTL ? '-right-4' : '-left-4'} bg-forest text-white p-6 rounded-[2rem] shadow-2xl flex items-center gap-4`}
              >
                <span className="text-3xl font-bold font-serif leading-none">
                  7<span className="text-seafoam">+</span>
                </span>
                <p className={`text-[10px] font-bold uppercase tracking-[0.2em] leading-tight ${isRTL ? 'border-r border-white/20 pr-4' : 'border-l border-white/20 pl-4'}`}>
                  {t("experienceBadge")}
                </p>
              </motion.div>
            </div>

            {/* Text Column */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="inline-flex items-center gap-3 mb-6">
                  <span className="w-6 h-px bg-seafoam"></span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-seafoam">
                    {t("badge")}
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8 leading-[1.05]">
                  {t("heroTitle")}
                </h1>

                <div className="space-y-6 text-base md:text-lg text-forest/70 font-light leading-relaxed max-w-xl mb-10">
                  <p className="text-forest font-medium">{t("heroSubtitle")}</p>
                  <p>{t("heroDescription1")}</p>
                  <p>{t("heroDescription2")}</p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-2.5 bg-white px-5 py-2.5 rounded-full shadow-sm border border-forest/5 transition-hover hover:border-seafoam/30">
                    <ShieldCheck className="w-4 h-4 text-seafoam" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-forest/80">
                      {t("credentials.dha")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5 bg-white px-5 py-2.5 rounded-full shadow-sm border border-forest/5 transition-hover hover:border-seafoam/30">
                    <ShieldCheck className="w-4 h-4 text-seafoam" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-forest/80">
                      {t("credentials.mscotp")}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Philosophy & Focus */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Practice Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-10"
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                  {t("practiceOverview.title")}
                </h2>
                <div className="h-1 w-12 bg-seafoam mb-8"></div>
                <p className="text-forest/70 text-lg leading-relaxed font-light">
                  {t("practiceOverview.description")}
                </p>
              </div>

              <div className={`bg-section p-10 md:p-14 rounded-[3rem] border border-forest/5 shadow-inner relative group`}>
                <Quote className={`absolute top-8 ${isRTL ? 'left-8' : 'right-8'} w-12 h-12 text-seafoam opacity-20 transition-transform duration-500 group-hover:rotate-12`} />
                <p className="text-xl md:text-2xl font-serif italic leading-relaxed text-forest">
                  &ldquo;{t("heroSubtitle")}&rdquo;
                </p>
              </div>
            </motion.div>

            {/* Clinical Focus List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8 lg:pt-4"
            >
              <h2 className="text-3xl font-bold tracking-tight">
                {t("clinicalFocus.title")}
              </h2>
              <div className="grid gap-3">
                {clinicalFocus.map((focus, i) => {
                  const Icon = focus.icon;
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-5 p-5 rounded-2xl border border-forest/[0.08] hover:border-seafoam/40 hover:bg-section transition-all duration-300 group bg-white shadow-sm hover:shadow-md"
                    >
                      <div className="w-12 h-12 shrink-0 rounded-2xl bg-forest text-white transition-colors group-hover:bg-seafoam group-hover:text-forest flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className={`text-base font-bold text-forest ${isRTL ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'} transition-transform`}>
                        {t(`clinicalFocus.items.${focus.key}`)}
                      </h3>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Standards & Ethos */}
      <section className="py-14 md:py-20 bg-section rounded-[3rem]">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          {/* Compact Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-seafoam mb-3 block">
                {t("standards.badge")}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                {t("standards.title")}
              </h2>
            </div>
            <p className="text-sm text-forest/50 font-light max-w-xs leading-relaxed">
              {t("standards.subtitle")}
            </p>
          </div>

          {/* Standards Grid */}
          <div className={`grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x ${isRTL ? 'md:divide-x-reverse' : ''} divide-forest/10 border border-forest/10 bg-white rounded-2xl overflow-hidden mb-16`}>
            {standards.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="p-7 lg:p-8 group hover:bg-section transition-colors duration-300"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-9 h-9 rounded-xl bg-forest/5 text-forest flex items-center justify-center border border-forest/10 group-hover:bg-forest group-hover:text-white transition-colors duration-400 shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-forest/30">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="text-base font-bold mb-2 group-hover:text-seafoam transition-colors">
                    {t(`standards.${s.key}.title`)}
                  </h3>
                  <p className="text-forest/55 leading-relaxed text-[13px] font-light">
                    {t(`standards.${s.key}.desc`)}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Who Is For & Ethos */}
          <div className="bg-forest rounded-[3.5rem] p-8 md:p-16 lg:p-20 overflow-hidden relative">
            <div className={`absolute top-0 ${isRTL ? 'left-0' : 'right-0'} w-1/2 h-full bg-white/[0.03] -skew-x-12 ${isRTL ? '-translate-x-1/4' : 'translate-x-1/4'} pointer-events-none`}></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10 items-center">
              <div className="lg:col-span-7">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-10 tracking-tight">
                  {t("whoIsFor.title")}
                </h3>
                <div className="grid gap-4">
                  {whoIsForItems.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: isRTL ? 10 : -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-4 bg-white/5 p-5 rounded-2xl border border-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors"
                    >
                      <CheckCircle2 className="w-5 h-5 text-seafoam shrink-0" />
                      <span className="text-white/80 font-medium text-sm md:text-base">
                        {item}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className={`lg:col-span-5 ${isRTL ? 'border-r border-white/10 lg:pr-12' : 'border-l border-white/10 lg:pl-12'}`}>
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 mb-8 block">
                  {t("ethos.badge")}
                </span>
                <div className="space-y-8">
                  {ethos.map((e, i) => (
                    <div key={i} className="group cursor-default">
                      <span className="text-3xl md:text-4xl xl:text-5xl font-bold tracking-tight text-white/40 group-hover:text-seafoam transition-colors duration-500 leading-[1.1] block">
                        {t(`ethos.${e}`)}.
                      </span>
                    </div>
                  ))}
                </div>
                <div className={`mt-12 p-6 rounded-2xl bg-white/[0.03] border border-white/5 italic text-white/50 text-[13px] leading-relaxed`}>
                  {t("ethos.quote")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Final CTA */}
      <section className="relative py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative bg-forest rounded-[3rem] p-8 md:p-16 lg:p-24 overflow-hidden shadow-2xl"
          >
            {/* Glossy Decorative Lights */}
            <div className={`absolute top-0 ${isRTL ? 'left-0' : 'right-0'} w-[400px] h-[400px] bg-seafoam/15 rounded-full blur-[100px] -translate-y-1/2 ${isRTL ? '-translate-x-1/2' : 'translate-x-1/2'}`}></div>
            <div className={`absolute bottom-0 ${isRTL ? 'right-0' : 'left-0'} w-[300px] h-[300px] bg-white/5 rounded-full blur-[80px] translate-y-1/2 ${isRTL ? 'translate-x-1/2' : '-translate-x-1/2'}`}></div>

            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 mb-8 bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 uppercase tracking-[0.2em] text-[10px] font-bold text-seafoam">
                {t("cta.badge")}
              </div>

              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 leading-[1.1] text-white">
                {t("cta.title")}{" "}
                <span className="text-seafoam italic font-serif font-light">
                  {t("cta.titleHighlight")}
                </span>{" "}
                {t("cta.titleEnd")}
              </h2>

              <p className="text-white/60 text-lg mb-12 font-light leading-relaxed">
                {t("cta.description")}
              </p>

              <div className="flex flex-col sm:flex-row gap-5 justify-center">
                <Link
                  href="/contact"
                  className="group relative inline-flex items-center justify-center gap-3 bg-white text-forest px-10 py-5 rounded-full font-bold hover:bg-seafoam transition-all transition-transform hover:-translate-y-1 shadow-lg"
                >
                  {t("cta.button")}
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
