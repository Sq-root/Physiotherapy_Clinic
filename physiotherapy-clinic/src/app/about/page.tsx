"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Target,
  ArrowRight,
  Activity,
  Microscope,
  Zap,
  Award,
  Home,
  Monitor,
  CheckCircle2,
  Stethoscope,
  Scaling,
  Quote,
} from "lucide-react";
import { siteConfig } from "@/config/site";

export default function AboutPage() {
  const clinicalFocus = [
    { title: "Spine & Persistent Pain", icon: Activity },
    { title: "Post-Surgical & Complex Rehab", icon: Target },
    { title: "Postnatal Biomechanics", icon: Scaling },
    {
      title: "High-Functioning Individuals with Recurrent Dysfunction",
      icon: Microscope,
    },
    { title: "Musculoskeletal & Sports Injuries", icon: Zap },
  ];

  const standards = [
    {
      title: "Private, Not Casual",
      desc: "Care is delivered one-to-one, in your space, on your schedule. No clinic chaos, no compromised attention.",
      icon: Home,
    },
    {
      title: "Digital, But Exact",
      desc: "Online physiotherapy is assessment-driven and outcome-mapped. Live analysis, progressive load management, and constant recalibration.",
      icon: Monitor,
    },
    {
      title: "Clinically Aligned",
      desc: "Working in parallel with medical and surgical teams when required, handling complex spine and persistent pain cases.",
      icon: Stethoscope,
    },
  ];

  const ethos = [
    { tag: "Pain is data" },
    { tag: "Movement is strategy" },
    { tag: "Recovery is engineered" },
  ];

  return (
    <main className="font-sans text-forest antialiased bg-white pt-24 pb-0">
      {/* 1. Hero / Founder Profile - More Balanced Typography */}
      <section className="py-16 md:py-24 bg-section overflow-hidden rounded-b-[4rem]">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            {/* Image Column - Sleeker Aspect Ratio */}
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

              {/* Refined Experience Badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="absolute -bottom-4 -left-4 bg-forest text-white p-6 rounded-[2rem] shadow-2xl flex items-center gap-4"
              >
                <span className="text-3xl font-bold font-serif leading-none">
                  7<span className="text-seafoam">+</span>
                </span>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] leading-tight border-l border-white/20 pl-4">
                  Years of
                  <br />
                  Clinical Depth
                </p>
              </motion.div>
            </div>

            {/* Text Column - Reduced Heading scale */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="inline-flex items-center gap-3 mb-6">
                  <span className="w-6 h-px bg-seafoam"></span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-seafoam">
                    Founder & Lead Physiotherapist
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8 leading-[1.05]">
                  Dr. Isha Shah
                </h1>

                <div className="space-y-6 text-base md:text-lg text-forest/70 font-light leading-relaxed max-w-xl mb-10">
                  <p className="text-forest font-medium">
                    This practice is led by clinical judgment—not delegation.
                  </p>
                  <p>
                    Dr. Isha Shah is a physiotherapist with advanced expertise
                    in spine rehabilitation, complex pain, post-procedure
                    recovery, and postnatal restoration. Her work is grounded in
                    movement diagnostics and load science rather than trends or
                    generic protocols.
                  </p>
                  <p>
                    She works closely with medical teams when required, managing
                    cases that demand precision and discretion. Every program is
                    personally designed and progressed—without dilution.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-2.5 bg-white px-5 py-2.5 rounded-full shadow-sm border border-forest/5 transition-hover hover:border-seafoam/30">
                    <ShieldCheck className="w-4 h-4 text-seafoam" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-forest/80">
                      DHA Licensed
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5 bg-white px-5 py-2.5 rounded-full shadow-sm border border-forest/5 transition-hover hover:border-seafoam/30">
                    <ShieldCheck className="w-4 h-4 text-seafoam" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-forest/80">
                      MSCOTP (India)
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Philosophy & Focus - Balanced Layout */}
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
                  A Curated Practice
                </h2>
                <div className="h-1 w-12 bg-seafoam mb-8"></div>
                <p className="text-forest/70 text-lg leading-relaxed font-light">
                  This is not a scaled model. Clients accepted into care work
                  directly under my clinical oversight—ensuring consistency,
                  accountability, and clinical depth at every stage.
                </p>
              </div>

              <div className="bg-section p-10 md:p-14 rounded-[3rem] border border-forest/5 shadow-inner relative group">
                <Quote className="absolute top-8 right-8 w-12 h-12 text-seafoam opacity-20 transition-transform duration-500 group-hover:rotate-12" />
                <p className="text-xl md:text-2xl font-serif italic leading-relaxed text-forest">
                  "I do not believe in high-volume care, indefinite treatment
                  plans, or passive rehabilitation. My methodology is
                  analytical, finite, and outcome-led."
                </p>
              </div>
            </motion.div>

            {/* Clinical Focus - More refined list */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8 lg:pt-4"
            >
              <h2 className="text-3xl font-bold tracking-tight">
                Clinical Focus
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
                      <h3 className="text-base font-bold text-forest group-hover:translate-x-1 transition-transform">
                        {focus.title}
                      </h3>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Standards & Ethos - Compact Editorial */}
      <section className="py-14 md:py-20 bg-section rounded-[3rem]">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          {/* Compact Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-seafoam mb-3 block">
                The Methodology
              </span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                The Standard We Operate At
              </h2>
            </div>
            <p className="text-sm text-forest/50 font-light max-w-xs leading-relaxed">
              High-precision physiotherapy for individuals who value discretion
              and measurable outcomes.
            </p>
          </div>

          {/* Horizontal Feature Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-forest/10 border border-forest/10 bg-white rounded-2xl overflow-hidden mb-16">
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
                    {s.title}
                  </h3>
                  <p className="text-forest/55 leading-relaxed text-[13px] font-light">
                    {s.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Combined Ethos & Target - Ultra Modern Split */}
          <div className="bg-forest rounded-[3.5rem] p-8 md:p-16 lg:p-20 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-white/[0.03] -skew-x-12 translate-x-1/4 pointer-events-none"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10 items-center">
              <div className="lg:col-span-7">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-10 tracking-tight">
                  Who This Is For
                </h3>
                <div className="grid gap-4">
                  {[
                    "Individuals who think long-term.",
                    "Professionals who protect their time.",
                    "Postnatal women who expect intelligent restoration.",
                    "Active bodies that refuse decline.",
                    "Patients who want decisions, not reassurance.",
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
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

              <div className="lg:col-span-5 border-l border-white/10 lg:pl-12">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 mb-8 block">
                  Fundamental Ethos
                </span>
                <div className="space-y-8">
                  {ethos.map((e, i) => (
                    <div key={i} className="group cursor-default">
                      <span className="text-3xl md:text-4xl xl:text-5xl font-bold tracking-tight text-white/40 group-hover:text-seafoam transition-colors duration-500 leading-[1.1] block">
                        {e.tag}.
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-12 p-6 rounded-2xl bg-white/[0.03] border border-white/5 italic text-white/50 text-[13px] leading-relaxed">
                  If you expect clinical depth and uncompromising
                  standards—welcome.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Final CTA - Sophisticated Floating Design */}
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
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-seafoam/15 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 mb-8 bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 uppercase tracking-[0.2em] text-[10px] font-bold text-seafoam">
                The Final Milestone
              </div>

              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 leading-[1.1] text-white">
                Ready for{" "}
                <span className="text-seafoam italic font-serif font-light">
                  intelligent
                </span>{" "}
                recovery?
              </h2>

              <p className="text-white/60 text-lg mb-12 font-light leading-relaxed">
                Experience clinical depth and focused outcomes. Every program is
                personally designed for your unique recovery journey.
              </p>

              <div className="flex flex-col sm:flex-row gap-5 justify-center">
                <Link
                  href="/contact"
                  className="group relative inline-flex items-center justify-center gap-3 bg-white text-forest px-10 py-5 rounded-full font-bold hover:bg-seafoam transition-all transition-transform hover:-translate-y-1 shadow-lg"
                >
                  Schedule Assessment
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-3 bg-white/5 backdrop-blur-md text-white border border-white/15 px-10 py-5 rounded-full font-bold hover:bg-white/10 transition-all transition-transform hover:-translate-y-1"
                >
                  Our Clinical Services
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
