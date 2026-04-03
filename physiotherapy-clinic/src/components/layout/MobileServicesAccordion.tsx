"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ArrowRight,
  Bone,
  Zap,
  PersonStanding,
  MoveVertical,
  Footprints,
  Stethoscope,
  HeartPulse,
  Users,
  ShieldCheck,
  Trophy,
  Brain,
  Syringe,
  RefreshCw,
  CircleDot,
  Target,
  Baby,
  Sparkles,
  Monitor,
  ScanLine,
  Dumbbell,
  Wrench,
  Activity,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/routing";
import { serviceCategories, getServicesByCategory, getServiceBySlug } from "@/lib/data/services";
import { useTranslations } from "next-intl";

interface MobileServicesAccordionProps {
  label: string;
  isRTL: boolean;
  onNavigate: () => void;
  index: number;
}

// Map string icon names to lucide components
const iconMap: Record<string, LucideIcon> = {
  Bone, Zap, PersonStanding, Target, MoveVertical, Footprints,
  RefreshCw, CircleDot, Stethoscope, Syringe, Brain, ShieldCheck,
  Trophy, HeartPulse, Baby, Users, Sparkles, Monitor, ScanLine,
  Dumbbell, Wrench, BandageIcon: Activity,
};

const categoryDotStyles: Record<string, string> = {
  'pain':              'bg-red-500',
  'techniques':        'bg-blue-400',
  'injury-prevention': 'bg-green-500',
  'womens-health':     'bg-pink-400',
  'geriatric':         'bg-amber-500',
  'specialized':       'bg-purple-500',
};

// Patient-friendly labels
const patientCategoryLabels: Record<string, string> = {
  'pain':              'Pain & Conditions',
  'techniques':        'Therapies',
  'injury-prevention': 'Sports & Prevention',
  'womens-health':     "Women's Health",
  'geriatric':         'Seniors & Fall Care',
  'specialized':       'Specialized',
};

// ─── Component ─────────────────────────────────────────────────────────────────
export function MobileServicesAccordion({
  label,
  isRTL,
  onNavigate,
  index,
}: MobileServicesAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  
  const tCat = useTranslations("servicesPage.categories");
  const tDetail = useTranslations("serviceDetail");

  // Helper to fetch translated title (matches NavbarServicesDropdown logic)
  const getServiceLabel = (slug: string, fallback: string) => {
    if (!isRTL) return fallback;
    const service = getServiceBySlug(slug);
    if (!service) return fallback;
    const raw = tDetail(`${service.translationKey}.title`);
    return raw.includes('.title') ? fallback : raw;
  };

  const toggleCategory = (id: string) => {
    setOpenCategory((prev) => (prev === id ? null : id));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      {/* ── Main toggle ──────────────────────────────────────────────────── */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-3 px-4 rounded-xl text-forest hover:bg-forest/5 transition-colors group"
        aria-expanded={isOpen}
      >
        <span className="text-sm font-semibold uppercase tracking-wider">{label}</span>
        <ChevronDown
          className={cn(
            "w-4 h-4 text-forest/30 group-hover:text-seafoam transition-all duration-200",
            isOpen && "rotate-180 text-seafoam"
          )}
        />
      </button>

      {/* ── Accordion body ───────────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className={cn("pb-2", isRTL ? "pr-2" : "pl-2")}>
              {/* Category accordion rows */}
              {serviceCategories.map((cat) => {
                const services = getServicesByCategory(cat.id);
                if (services.length === 0) return null;
                const isCatOpen = openCategory === cat.id;

                return (
                  <div key={cat.id} className="mb-1">
                    {/* Category row */}
                    <button
                      onClick={() => toggleCategory(cat.id)}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors group",
                        isCatOpen
                          ? "bg-forest/[0.05] text-forest"
                          : "text-forest/60 hover:bg-forest/[0.03] hover:text-forest"
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className={cn(
                            "w-2 h-2 rounded-full shrink-0",
                            categoryDotStyles[cat.id] || "bg-lime"
                          )}
                        />
                        <span className="text-[12px] font-bold uppercase tracking-widest">
                          {isRTL ? tCat(cat.id) : (patientCategoryLabels[cat.id] || cat.label)}
                        </span>
                        <span className="text-[10px] font-medium text-forest/35 ml-0.5">
                          {services.length}
                        </span>
                      </div>
                      <ChevronDown
                        className={cn(
                          "w-3.5 h-3.5 transition-transform duration-200 text-forest/30",
                          isCatOpen && "rotate-180 text-seafoam"
                        )}
                      />
                    </button>

                    {/* Service list sub-accordion */}
                    <AnimatePresence initial={false}>
                      {isCatOpen && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          {services.map((service) => {
                            const Icon = iconMap[service.icon] || Activity;

                            return (
                              <li key={service.id}>
                                <Link
                                  href={`/services/${service.slug}`}
                                  onClick={onNavigate}
                                  className={cn(
                                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-forest/75 hover:text-forest hover:bg-forest/[0.04] transition-colors group",
                                    isRTL ? "mr-4" : "ml-4"
                                  )}
                                >
                                  <div className="w-7 h-7 rounded-lg bg-[#f4f7f2] flex items-center justify-center shrink-0 group-hover:bg-forest group-hover:text-white transition-colors duration-150 border border-forest/[0.07]">
                                    <Icon className="w-3.5 h-3.5" />
                                  </div>
                                  <span className="text-[13px] font-medium text-forest group-hover:text-seafoam transition-colors">
                                    {getServiceLabel(service.slug, service.shortTitle || service.title)}
                                  </span>
                                  <ArrowRight
                                    className={cn(
                                      "w-3.5 h-3.5 text-forest/20 group-hover:text-seafoam shrink-0 transition-transform duration-150",
                                      isRTL
                                        ? "rotate-180 group-hover:-translate-x-0.5"
                                        : "group-hover:translate-x-0.5"
                                    )}
                                  />
                                </Link>
                              </li>
                            );
                          })}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              {/* View All CTA */}
              <Link
                href="/services"
                onClick={onNavigate}
                className={cn(
                  "flex items-center justify-between gap-2 px-4 py-3.5 mt-3 rounded-xl bg-forest text-white hover:bg-forest/90 transition-colors",
                  isRTL ? "mr-1" : "ml-1"
                )}
              >
                <span className="text-[13px] font-bold uppercase tracking-wider">
                  View All Services
                </span>
                <ArrowRight
                  className={cn("w-4 h-4 text-seafoam", isRTL && "rotate-180")}
                />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
