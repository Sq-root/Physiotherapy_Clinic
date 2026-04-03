"use client";

import { useEffect, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Clock, Target, AlertCircle, CheckCircle2, Users } from "lucide-react";
import { Link } from "@/i18n/routing";
import type { Service } from "@/lib/data/services";
import { DynamicIcon } from "@/components/ui/DynamicIcon";

type ServiceTranslation = {
  title: string;
  heroSubtitle: string;
  overview: string;
  symptoms?: string[];
  clinicalApproach?: string[];
  benefits: string[];
  idealFor: string[];
  outcome?: string;
  duration: string;
  frequency: string;
};

type Props = {
  service: Service;
  translation: ServiceTranslation;
  uiLabels: {
    quickView: string;
    viewDetails: string;
    closeModal: string;
    bookAppointment: string;
    mechanism: string;
    symptoms: string;
    clinicalApproach: string;
    outcome: string;
    benefits: string;
    idealFor: string;
  };
  onClose: () => void;
};

export function ServiceQuickModal({ service, translation, uiLabels, onClose }: Props) {
  const [mounted, setMounted] = useState(false);

  const handleEsc = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    setMounted(true);
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [handleEsc]);

  const modalContent = (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-forest/60 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative z-10 bg-white rounded-[2.5rem] shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-forest/5 hover:bg-forest/10 flex items-center justify-center transition-colors"
            aria-label={uiLabels.closeModal}
          >
            <X className="w-5 h-5 text-forest" />
          </button>

          {/* Header with Image */}
          {service.image && (
            <div className="relative h-48 md:h-56 overflow-hidden rounded-t-[2.5rem]">
              <Image
                src={service.image}
                alt={translation.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/70 via-forest/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 mb-3">
                  <DynamicIcon name={service.icon} className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                  {translation.title}
                </h2>
                <p className="text-white/80 text-sm font-medium mt-1 italic">
                  {translation.heroSubtitle}
                </p>
              </div>
            </div>
          )}

          <div className="p-6 md:p-8 space-y-8">
            {/* Duration + Frequency Chips */}
            <div className="flex flex-wrap gap-3">
              <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-section text-forest text-sm font-medium">
                <Clock className="w-4 h-4 text-seafoam" />
                {translation.duration}
              </span>
              <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-section text-forest text-sm font-medium">
                <Target className="w-4 h-4 text-lime" />
                {translation.frequency}
              </span>
            </div>

            {/* Mechanism / Overview */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-forest/40 mb-3">
                {uiLabels.mechanism}
              </h3>
              <p className="text-forest/80 leading-relaxed">{translation.overview}</p>
            </div>

            {/* Symptoms */}
            {translation.symptoms && translation.symptoms.length > 0 && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-forest/40 mb-3">
                  {uiLabels.symptoms}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {translation.symptoms.map((symptom, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-3 rounded-xl bg-red-50/50 border border-red-100/50"
                    >
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <p className="text-forest/70 text-sm">{symptom}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Clinical Approach */}
            {translation.clinicalApproach && translation.clinicalApproach.length > 0 && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-forest/40 mb-3">
                  {uiLabels.clinicalApproach}
                </h3>
                <div className="space-y-3">
                  {translation.clinicalApproach.map((step, i) => {
                    const parts = step.split(": ");
                    return (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-section/50 border border-forest/5">
                        <div className="w-6 h-6 rounded-full bg-lime/20 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-[10px] font-bold text-forest">{i + 1}</span>
                        </div>
                        <div>
                          {parts.length > 1 ? (
                            <>
                              <p className="text-forest font-semibold text-sm">{parts[0]}</p>
                              <p className="text-forest/60 text-sm">{parts.slice(1).join(": ")}</p>
                            </>
                          ) : (
                            <p className="text-forest/70 text-sm">{step}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Benefits + Ideal For — 2 columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-forest/40 mb-3">
                  {uiLabels.benefits}
                </h3>
                <div className="space-y-2">
                  {translation.benefits.map((b, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-lime shrink-0" />
                      <p className="text-forest/70 text-sm">{b}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-forest/40 mb-3">
                  {uiLabels.idealFor}
                </h3>
                <div className="space-y-2">
                  {translation.idealFor.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-seafoam shrink-0" />
                      <p className="text-forest/70 text-sm">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Outcome */}
            {translation.outcome && (
              <div className="bg-forest rounded-2xl p-6 text-center">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-seafoam mb-3">
                  {uiLabels.outcome}
                </h3>
                <p className="text-white/90 font-light leading-relaxed italic">
                  {translation.outcome}
                </p>
              </div>
            )}

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href={`/services/${service.slug}`}
                className="flex-1 h-12 bg-forest text-white font-bold uppercase tracking-wider text-sm hover:bg-seafoam hover:text-forest transition-all duration-300 rounded-full flex items-center justify-center gap-2"
                onClick={onClose}
              >
                {uiLabels.viewDetails}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="flex-1 h-12 bg-section text-forest font-bold uppercase tracking-wider text-sm hover:bg-forest hover:text-white transition-all duration-300 rounded-full flex items-center justify-center gap-2 border border-forest/10"
                onClick={onClose}
              >
                {uiLabels.bookAppointment}
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  if (!mounted) return null;
  return createPortal(modalContent, document.body);
}
