"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight, CalendarCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { getServiceBySlug } from "@/lib/data/services";

interface NavbarServicesDropdownProps {
  label: string;
  isActive: boolean;
  useDarkStyle: boolean;
  isRTL: boolean;
  onNavigate?: () => void;
}

const columnsData = [
  {
    categoryId: "pain",
    heading: "Pain & Conditions",
    accentColor: "bg-red-400",
    services: [
      { slug: "neck-pain", label: "Neck Pain & Cervical" },
      { slug: "disc-prolapse-sciatica", label: "Disc & Sciatica" },
      { slug: "shoulder-impingement", label: "Shoulder & Rotator Cuff" },
      { slug: "tennis-golfer-elbow", label: "Elbow Pain" },
      { slug: "knee-pain-acl", label: "Knee Pain & ACL" },
      { slug: "plantar-fasciitis", label: "Foot & Heel Pain" },
      { slug: "osteoarthritis", label: "Osteoarthritis" },
      { slug: "meniscus-injury", label: "Meniscus Injury" },
      { slug: "post-surgical-rehab", label: "Post-Surgery Rehab" },
    ],
  },
  {
    categoryId: "techniques",
    heading: "Therapy & Techniques",
    accentColor: "bg-blue-400",
    services: [
      { slug: "dry-needling", label: "Dry Needling" },
      { slug: "kinesiology-taping", label: "Kinesiology Taping" },
      { slug: "neurodynamics", label: "Neurodynamics" },
      { slug: "injury-prevention", label: "Injury Prevention" },
      { slug: "return-to-play", label: "Return to Play" },
      { slug: "ergonomics", label: "Ergonomics & Workplace" },
      { slug: "postural-education", label: "Postural Education" },
    ],
  },
  {
    categoryId: "specialized",
    heading: "Specialized Care",
    accentColor: "bg-purple-400",
    services: [
      { slug: "womens-health", label: "Women's Health" },
      { slug: "prenatal-postnatal", label: "Pre & Postnatal Care" },
      { slug: "geriatric-mobility", label: "Seniors & Fall Prevention" },
      { slug: "cancer-rehabilitation", label: "Cancer Rehabilitation" },
      { slug: "osteoporosis", label: "Osteoporosis & Bone Health" },
      { slug: "post-fracture-rehab", label: "Post-Fracture Rehab" },
    ],
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
export function NavbarServicesDropdown({
  label,
  isActive,
  useDarkStyle,
  isRTL,
  onNavigate,
}: NavbarServicesDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const tCat = useTranslations("servicesPage.categories");
  const tDetail = useTranslations("serviceDetail");

  // Helper to fetch translated title
  const getServiceLabel = (slug: string, fallback: string) => {
    if (!isRTL) return fallback;
    const service = getServiceBySlug(slug);
    if (!service) return fallback;
    const raw = tDetail(`${service.translationKey}.title`);
    return raw.includes(".title") ? fallback : raw;
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 250);
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
      {/* ── Trigger ──────────────────────────────────────────────────────── */}
      <button
        className="relative px-4 py-2 rounded-full group flex items-center gap-1"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {isActive && !isOpen && (
          <motion.div
            layoutId="navbar-active-pill"
            className={cn(
              "absolute inset-0 rounded-full",
              useDarkStyle ? "bg-forest shadow-sm" : "bg-white/95 shadow-md",
            )}
            initial={false}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 35,
              mass: 0.8,
            }}
          />
        )}
        {isOpen && (
          <motion.div
            layoutId="navbar-active-pill"
            className={cn(
              "absolute inset-0 rounded-full",
              useDarkStyle ? "bg-forest shadow-sm" : "bg-white/95 shadow-md",
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
              ? useDarkStyle
                ? "text-white"
                : "text-forest"
              : useDarkStyle
                ? "text-forest/80 group-hover:text-forest"
                : "text-white/80 group-hover:text-white",
          )}
        >
          {label}
        </span>

        <ChevronDown
          className={cn(
            "relative z-10 w-3 h-3 transition-transform duration-200",
            isOpen && "rotate-180",
            isActive || isOpen
              ? useDarkStyle
                ? "text-white/70"
                : "text-forest/80"
              : useDarkStyle
                ? "text-forest/40"
                : "text-white/60",
          )}
        />
      </button>

      {/* ── Mega Menu ────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Invisible bridge */}
            <div className="absolute top-full left-0 right-0 h-3" />

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "absolute top-[calc(100%+0.75rem)] z-50 overflow-hidden",
                "bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,45,4,0.14)] border border-forest/[0.08]",
                isRTL ? "right-0" : "left-0",
              )}
              style={{ width: 680 }}
              role="menu"
            >
              {/* ── 3-Column service list ─────────────────────────────── */}
              <div className="grid grid-cols-3 divide-x divide-forest/[0.06] px-2 pt-6 pb-4">
                {columnsData.map((col) => (
                  <div key={col.categoryId} className="px-5">
                    {/* Column heading with accent underline (reference style) */}
                    <div className="mb-4">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-forest/70">
                        {isRTL ? tCat(col.categoryId) : col.heading}
                      </p>
                      <div
                        className={cn(
                          "mt-1.5 h-[2px] w-8 rounded-full",
                          col.accentColor,
                        )}
                      />
                    </div>

                    {/* Service links */}
                    <ul className="space-y-0.5">
                      {col.services.map((svc) => (
                        <li key={svc.slug}>
                          <Link
                            href={`/services/${svc.slug}`}
                            onClick={handleClose}
                            className="group flex items-start gap-2 py-1.5 text-forest/60 hover:text-seafoam transition-colors duration-150"
                            role="menuitem"
                          >
                            {/* Small arrow bullet like reference */}
                            <ArrowRight
                              className={cn(
                                "w-2.5 h-2.5 shrink-0 text-forest/25 group-hover:text-seafoam transition-all duration-150 mt-[3px]",
                                isRTL
                                  ? "rotate-180 group-hover:-translate-x-0.5"
                                  : "group-hover:translate-x-0.5",
                              )}
                            />
                            <span className="text-[12.5px] font-medium leading-snug group-hover:text-seafoam">
                              {getServiceLabel(svc.slug, svc.label)}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* ── Footer CTA bar ────────────────────────────────────── */}
              <div className="mx-2 mb-2 px-5 py-3 rounded-xl bg-forest flex items-center justify-between">
                <div>
                  <p className="text-white text-[11px] font-bold uppercase tracking-widest">
                    {isRTL
                      ? "لست متأكداً من أين تبدأ؟"
                      : "Not sure where to start?"}
                  </p>
                  <p className="text-white/50 text-[10px] mt-0.5">
                    {isRTL
                      ? "احجز تقييماً مجانياً — لا حاجة لإحالة."
                      : "Book a free assessment — no referral needed."}
                  </p>
                </div>
                <Link
                  href="/contact"
                  onClick={handleClose}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-seafoam text-forest text-[11px] font-bold uppercase tracking-wider hover:bg-lime transition-colors duration-150 shrink-0"
                >
                  <CalendarCheck className="w-3.5 h-3.5" />
                  <span>{isRTL ? "احجز الآن" : "Book Now"}</span>
                </Link>
              </div>

              {/* ── Bottom utility bar ───────────────────────────────── */}
              <div
                className={cn(
                  "px-5 py-2.5 flex items-center",
                  isRTL ? "justify-start" : "justify-end",
                )}
              >
                <Link
                  href="/services"
                  onClick={handleClose}
                  className="flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-wider text-forest/40 hover:text-forest transition-colors duration-150 group"
                >
                  <span>
                    {isRTL ? "تصفح جميع 22 خدمة" : "Browse All 22 Services"}
                  </span>
                  <ArrowRight
                    className={cn(
                      "w-3 h-3 transition-transform duration-150",
                      isRTL
                        ? "rotate-180 group-hover:-translate-x-0.5"
                        : "group-hover:translate-x-0.5",
                    )}
                  />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
