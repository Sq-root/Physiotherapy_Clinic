"use client";

import { useState, useRef, useEffect } from "react";
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
  ChevronRight,
  CalendarCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/routing";

interface NavbarServicesDropdownProps {
  label: string;
  isActive: boolean;
  useDarkStyle: boolean;
  isRTL: boolean;
  t: (key: string) => string;
  onNavigate?: () => void;
}

// ─── Data ────────────────────────────────────────────────────────────────────
// Each service carries its own icon and a short patient-facing tagline.
// To add a new service, just add a new entry — no other file needs changing.

const CATEGORIES = [
  {
    id: "primary",
    labelKey: "servicesMenu.primary",
    accentClass: "bg-lime/15 text-lime",
    dotClass: "bg-lime",
    services: [
      {
        id: "manual-therapy",
        slug: "manual-therapy",
        labelKey: "servicesMenu.manualTherapy",
        tagline: "Hands-on relief for joints & soft tissue",
        Icon: HandMetal,
      },
      {
        id: "sports-recovery",
        slug: "sports-recovery",
        labelKey: "servicesMenu.sportsRecovery",
        tagline: "Return to peak performance safely",
        Icon: Zap,
      },
      {
        id: "pain-management",
        slug: "pain-management",
        labelKey: "servicesMenu.painManagement",
        tagline: "Strategies for chronic conditions",
        Icon: Stethoscope,
      },
      {
        id: "post-surgical",
        slug: "post-surgical",
        labelKey: "servicesMenu.postSurgical",
        tagline: "Optimal recovery after surgery",
        Icon: Scissors,
      },
    ],
  },
  {
    id: "therapeutic",
    labelKey: "servicesMenu.therapeutic",
    accentClass: "bg-seafoam/15 text-seafoam",
    dotClass: "bg-seafoam",
    services: [
      {
        id: "active-aging",
        slug: "active-aging",
        labelKey: "servicesMenu.activeAging",
        tagline: "Strength & independence at every age",
        Icon: PersonStanding,
      },
      {
        id: "hydrotherapy",
        slug: "hydrotherapy",
        labelKey: "servicesMenu.hydrotherapy",
        tagline: "Aquatic rehab without joint stress",
        Icon: Waves,
      },
      {
        id: "corrective-exercise",
        slug: "corrective-exercise",
        labelKey: "servicesMenu.correctiveExercise",
        tagline: "Fix imbalances before they become injuries",
        Icon: Target,
      },
    ],
  },
  {
    id: "specialized",
    labelKey: "servicesMenu.specialized",
    accentClass: "bg-forest/10 text-forest",
    dotClass: "bg-forest",
    services: [
      {
        id: "neurological",
        slug: "neurological",
        labelKey: "servicesMenu.neurological",
        tagline: "Stroke, Parkinson's & nerve conditions",
        Icon: Brain,
      },
      {
        id: "pediatric",
        slug: "pediatric",
        labelKey: "servicesMenu.pediatric",
        tagline: "Gentle, play-based care for children",
        Icon: Baby,
      },
    ],
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
export function NavbarServicesDropdown({
  label,
  isActive,
  useDarkStyle,
  isRTL,
  t,
  onNavigate,
}: NavbarServicesDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    // 300ms gives enough time to move from trigger into the dropdown panel
    timeoutRef.current = setTimeout(() => setIsOpen(false), 300);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen]);

  const currentCategory = CATEGORIES.find((c) => c.id === activeCategory) ?? CATEGORIES[0];

  const handleClose = () => {
    setIsOpen(false);
    onNavigate?.();
  };

  return (
    <div
      ref={dropdownRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* ── Trigger ─────────────────────────────────────────────────────────── */}
      <button
        className="relative px-4 py-2 rounded-full group flex items-center gap-1"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {/* Active pill background */}
        {(isActive && !isOpen) && (
          <motion.div
            layoutId="navbar-active-pill"
            className={cn(
              "absolute inset-0 rounded-full",
              useDarkStyle ? "bg-forest shadow-sm" : "bg-white/95 shadow-md"
            )}
            initial={false}
            transition={{ type: "spring", stiffness: 400, damping: 35, mass: 0.8 }}
          />
        )}
        {isOpen && (
          <motion.div
            layoutId="navbar-active-pill"
            className={cn(
              "absolute inset-0 rounded-full",
              useDarkStyle ? "bg-forest shadow-sm" : "bg-white/95 shadow-md"
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
        )}

        <span
          className={cn(
            "relative z-10 text-[11px] font-semibold uppercase tracking-[0.1em] whitespace-nowrap transition-all duration-200",
            isActive || isOpen
              ? useDarkStyle ? "text-white" : "text-forest"
              : useDarkStyle ? "text-forest/60 group-hover:text-forest" : "text-white/80 group-hover:text-white"
          )}
        >
          {label}
        </span>

        <ChevronDown
          className={cn(
            "relative z-10 w-3 h-3 transition-transform duration-200",
            isOpen && "rotate-180",
            isActive || isOpen
              ? useDarkStyle ? "text-white/70" : "text-forest/70"
              : useDarkStyle ? "text-forest/40" : "text-white/60"
          )}
        />
      </button>

      {/* ── Mega Menu ───────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Invisible bridge so the menu stays open as cursor moves into it */}
            <div className="absolute top-full left-0 right-0 h-3" />

            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "absolute top-[calc(100%+0.75rem)] z-50 flex overflow-hidden",
                "bg-white rounded-2xl shadow-[0_24px_64px_rgba(0,45,4,0.14)] border border-forest/[0.07]",
                isRTL ? "right-0" : "left-0"
              )}
              style={{ width: 620 }}
              role="menu"
            >
              {/* ── Left sidebar: category tabs ──────────────────────────── */}
              <div className="w-44 shrink-0 bg-[#f7f9f5] border-r border-forest/[0.07] p-3 flex flex-col h-full justify-between">
                {/* Top: header + category tabs */}
                <div className="flex flex-col gap-1">
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-forest/30 px-3 pt-1 pb-2">
                    {label}
                  </p>

                  {CATEGORIES.map((cat) => {
                    const isActive = cat.id === activeCategory;
                    return (
                      <button
                        key={cat.id}
                        onMouseEnter={() => setActiveCategory(cat.id)}
                        onClick={() => setActiveCategory(cat.id)}
                        className={cn(
                          "w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-left transition-all duration-175 group",
                          isActive
                            ? "bg-white shadow-sm border border-forest/[0.07] text-forest"
                            : "text-forest/50 hover:text-forest hover:bg-white/60"
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={cn(
                              "w-1.5 h-1.5 rounded-full shrink-0 transition-opacity",
                              cat.dotClass,
                              isActive ? "opacity-100" : "opacity-30"
                            )}
                          />
                          <span className="text-[11px] font-bold uppercase tracking-[0.08em] whitespace-nowrap">
                            {t(cat.labelKey)}
                          </span>
                        </div>
                        <ChevronRight
                          className={cn(
                            "w-3 h-3 shrink-0 transition-all duration-175",
                            isActive ? "opacity-70" : "opacity-0 group-hover:opacity-40"
                          )}
                        />
                      </button>
                    );
                  })}
                </div>

                {/* Bottom: pinned CTA card */}
                <Link
                  href="/contact"
                  onClick={handleClose}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-forest text-white hover:bg-forest/90 transition-colors duration-200 mt-3"
                >
                  <CalendarCheck className="w-4 h-4 shrink-0 text-seafoam mt-0.5" />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-white/90 leading-tight">
                      Book Assessment
                    </p>
                    <p className="text-[9px] text-white/40 mt-0.5 leading-tight">
                      No referral needed
                    </p>
                  </div>
                </Link>
              </div>

              {/* ── Right panel: services for active category ──────────── */}
              <div className="flex-1 flex flex-col">
                {/* Panel header */}
                <div className="px-6 pt-5 pb-4 border-b border-forest/[0.06]">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-forest/30">
                    {t(currentCategory.labelKey)}
                  </p>
                  <p className="text-sm font-semibold text-forest mt-0.5">
                    {t(currentCategory.labelKey) === t("servicesMenu.primary") && "Core physiotherapy treatments"}
                    {t(currentCategory.labelKey) === t("servicesMenu.therapeutic") && "Specialized therapeutic modalities"}
                    {t(currentCategory.labelKey) === t("servicesMenu.specialized") && "Condition-specific expert care"}
                  </p>
                </div>

                {/* Service list — sync mode so panels crossfade without a blank frame */}
                <AnimatePresence mode="sync" initial={false}>
                  <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.12, ease: "easeInOut" }}
                    className="p-4 grid grid-cols-1 gap-1 flex-1"
                  >
                    {currentCategory.services.map((service) => {
                      const Icon = service.Icon;
                      return (
                        <Link
                          key={service.id}
                          href={`/services/${service.slug}`}
                          onClick={handleClose}
                          className="flex items-center gap-4 px-3 py-3 rounded-xl hover:bg-forest/[0.04] transition-all duration-175 group"
                          role="menuitem"
                        >
                          {/* Icon */}
                          <div
                            className={cn(
                              "w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-175 border",
                              "bg-section border-forest/[0.08] group-hover:bg-forest group-hover:border-forest group-hover:text-white",
                              "text-forest/60"
                            )}
                          >
                            <Icon className="w-4 h-4" />
                          </div>

                          {/* Text */}
                          <div className="flex-1 min-w-0">
                            <p className="text-[13px] font-semibold text-forest group-hover:text-forest leading-tight">
                              {t(service.labelKey)}
                            </p>
                            <p className="text-[11px] text-forest/45 mt-0.5 leading-tight truncate">
                              {service.tagline}
                            </p>
                          </div>

                          {/* Arrow */}
                          <ArrowRight
                            className={cn(
                              "w-3.5 h-3.5 text-forest/20 group-hover:text-seafoam shrink-0 transition-all duration-175",
                              isRTL
                                ? "rotate-180 group-hover:-translate-x-0.5"
                                : "group-hover:translate-x-0.5"
                            )}
                          />
                        </Link>
                      );
                    })}
                  </motion.div>
                </AnimatePresence>

                {/* Footer */}
                <div className="px-5 py-3 border-t border-forest/[0.06] bg-[#f7f9f5]/60">
                  <Link
                    href="/services"
                    onClick={handleClose}
                    className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-forest/50 hover:text-forest transition-colors duration-175 group"
                  >
                    <span>{t("servicesMenu.viewAll")}</span>
                    <ArrowRight
                      className={cn(
                        "w-3.5 h-3.5 transition-transform duration-175",
                        isRTL
                          ? "rotate-180 group-hover:-translate-x-0.5"
                          : "group-hover:translate-x-0.5"
                      )}
                    />
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
