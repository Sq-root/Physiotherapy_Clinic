"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ArrowRight,
  HandMetal,
  Zap,
  Stethoscope,
  Scissors,
  PersonStanding,
  Waves,
  Target,
  Brain,
  Baby,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/routing";

interface MobileServicesAccordionProps {
  label: string;
  isRTL: boolean;
  t: (key: string) => string;
  onNavigate: () => void;
  index: number;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const CATEGORIES = [
  {
    id: "primary",
    labelKey: "servicesMenu.primary",
    dotClass: "bg-lime",
    services: [
      { id: "manual-therapy",   slug: "manual-therapy",   labelKey: "servicesMenu.manualTherapy",    Icon: HandMetal },
      { id: "sports-recovery",  slug: "sports-recovery",  labelKey: "servicesMenu.sportsRecovery",   Icon: Zap },
      { id: "pain-management",  slug: "pain-management",  labelKey: "servicesMenu.painManagement",   Icon: Stethoscope },
      { id: "post-surgical",    slug: "post-surgical",    labelKey: "servicesMenu.postSurgical",     Icon: Scissors },
    ],
  },
  {
    id: "therapeutic",
    labelKey: "servicesMenu.therapeutic",
    dotClass: "bg-seafoam",
    services: [
      { id: "active-aging",       slug: "active-aging",       labelKey: "servicesMenu.activeAging",       Icon: PersonStanding },
      { id: "hydrotherapy",       slug: "hydrotherapy",       labelKey: "servicesMenu.hydrotherapy",      Icon: Waves },
      { id: "corrective-exercise",slug: "corrective-exercise",labelKey: "servicesMenu.correctiveExercise",Icon: Target },
    ],
  },
  {
    id: "specialized",
    labelKey: "servicesMenu.specialized",
    dotClass: "bg-forest",
    services: [
      { id: "neurological", slug: "neurological", labelKey: "servicesMenu.neurological", Icon: Brain },
      { id: "pediatric",    slug: "pediatric",    labelKey: "servicesMenu.pediatric",    Icon: Baby },
    ],
  },
];

// ─── Component ─────────────────────────────────────────────────────────────────
export function MobileServicesAccordion({
  label,
  isRTL,
  t,
  onNavigate,
  index,
}: MobileServicesAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      {/* Header */}
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

      {/* Accordion body */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className={cn("pb-3", isRTL ? "pr-3" : "pl-3")}>
              {CATEGORIES.map((cat) => (
                <div key={cat.id} className="mb-3">
                  {/* Category label */}
                  <div className="flex items-center gap-2 px-3 py-2">
                    <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", cat.dotClass)} />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-forest/40">
                      {t(cat.labelKey)}
                    </span>
                  </div>

                  {/* Service items */}
                  <ul className="space-y-0.5">
                    {cat.services.map(({ id, slug, labelKey, Icon }) => (
                      <li key={id}>
                        <Link
                          href={`/services/${slug}`}
                          onClick={onNavigate}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2.5 rounded-xl text-forest/60 hover:text-forest hover:bg-forest/[0.04] transition-colors group",
                            isRTL ? "mr-2" : "ml-2"
                          )}
                        >
                          <div className="w-7 h-7 rounded-lg bg-section flex items-center justify-center shrink-0 group-hover:bg-forest group-hover:text-white transition-colors duration-175">
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-xs font-semibold">
                            {t(labelKey)}
                          </span>
                          <ArrowRight
                            className={cn(
                              "w-3 h-3 text-forest/20 group-hover:text-seafoam ml-auto transition-transform duration-175",
                              isRTL ? "rotate-180 group-hover:-translate-x-0.5" : "group-hover:translate-x-0.5"
                            )}
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* View All */}
              <Link
                href="/services"
                onClick={onNavigate}
                className={cn(
                  "flex items-center gap-2 px-3 py-3 mt-1 rounded-xl bg-forest text-white hover:bg-forest/90 transition-colors",
                  isRTL ? "mr-2" : "ml-2"
                )}
              >
                <span className="text-xs font-bold uppercase tracking-wider flex-1">
                  {t("servicesMenu.viewAll")}
                </span>
                <ArrowRight
                  className={cn(
                    "w-3.5 h-3.5 text-seafoam",
                    isRTL && "rotate-180"
                  )}
                />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
