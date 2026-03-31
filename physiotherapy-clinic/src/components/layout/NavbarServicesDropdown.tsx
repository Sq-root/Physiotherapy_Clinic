"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/routing";
import { serviceCategories } from "@/lib/data/services";

interface NavbarServicesDropdownProps {
  label: string;
  isActive: boolean;
  useDarkStyle: boolean;
  isRTL: boolean;
  t: (key: string) => string;
  onNavigate?: () => void;
}

export function NavbarServicesDropdown({
  label,
  isActive,
  useDarkStyle,
  isRTL,
  t,
  onNavigate,
}: NavbarServicesDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 150);
  };

  // Close on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen]);

  return (
    <div
      ref={dropdownRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger Button */}
      <button
        className="relative px-4 py-2 rounded-full group flex items-center gap-1"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {/* Active Background */}
        {isActive && !isOpen && (
          <motion.div
            layoutId="navbar-active-pill"
            className={cn(
              "absolute inset-0 rounded-full",
              useDarkStyle
                ? "bg-forest shadow-sm"
                : "bg-white/95 shadow-md"
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

        {/* Hover/Open Background */}
        {isOpen && (
          <motion.div
            layoutId="navbar-active-pill"
            className={cn(
              "absolute inset-0 rounded-full",
              useDarkStyle
                ? "bg-forest shadow-sm"
                : "bg-white/95 shadow-md"
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
                ? "text-forest/60 group-hover:text-forest"
                : "text-white/80 group-hover:text-white"
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
                : "text-forest/70"
              : useDarkStyle
                ? "text-forest/40"
                : "text-white/60"
          )}
        />
      </button>

      {/* Mega Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Invisible bridge to prevent gap */}
            <div className="absolute top-full left-0 right-0 h-3" />

            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "absolute top-[calc(100%+0.75rem)] bg-white rounded-2xl shadow-2xl shadow-forest/15 border border-forest/5 overflow-hidden z-50",
                isRTL ? "right-0" : "left-0"
              )}
              style={{ width: "540px" }}
              role="menu"
              aria-orientation="vertical"
            >
              {/* Header */}
              <div className="px-6 pt-5 pb-4 border-b border-forest/5 bg-gradient-to-r from-section/50 to-transparent">
                <p className="text-forest font-bold text-sm">{label}</p>
                <p className="text-forest/50 text-xs mt-0.5">
                  Comprehensive physiotherapy services
                </p>
              </div>

              {/* Categories Grid */}
              <div className="p-5 grid grid-cols-3 gap-5">
                {serviceCategories.map((category) => (
                  <div key={category.id}>
                    {/* Category Header */}
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className={cn(
                          "w-6 h-6 rounded-lg flex items-center justify-center text-xs",
                          category.color
                        )}
                      >
                        {category.icon}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-forest/50">
                        {t(category.labelKey)}
                      </span>
                    </div>

                    {/* Services List */}
                    <ul className="space-y-1" role="none">
                      {category.services.map((service) => (
                        <li key={service.id} role="none">
                          <Link
                            href={`/services#${service.slug}`}
                            onClick={() => {
                              setIsOpen(false);
                              onNavigate?.();
                            }}
                            className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-sm text-forest/70 hover:text-forest hover:bg-forest/[0.04] transition-all duration-200 group"
                            role="menuitem"
                          >
                            <span className="text-base opacity-70 group-hover:opacity-100 transition-opacity">
                              {service.icon}
                            </span>
                            <span className="font-medium text-[13px]">
                              {t(service.labelKey)}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Footer CTA */}
              <div className="px-5 py-4 bg-forest/[0.02] border-t border-forest/5">
                <Link
                  href="/services"
                  onClick={() => {
                    setIsOpen(false);
                    onNavigate?.();
                  }}
                  className="flex items-center justify-between w-full px-4 py-3 rounded-xl bg-forest text-white hover:bg-forest/90 transition-colors group"
                >
                  <span className="text-xs font-bold uppercase tracking-wider">
                    {t("servicesMenu.viewAll")}
                  </span>
                  <ArrowRight
                    className={cn(
                      "w-4 h-4 transition-transform",
                      isRTL
                        ? "rotate-180 group-hover:-translate-x-1"
                        : "group-hover:translate-x-1"
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
