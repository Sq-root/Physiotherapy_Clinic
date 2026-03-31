"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/routing";
import { serviceCategories } from "@/lib/data/services";

interface MobileServicesAccordionProps {
  label: string;
  isRTL: boolean;
  t: (key: string) => string;
  onNavigate: () => void;
  index: number;
}

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
      {/* Accordion Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-3 px-4 rounded-xl text-forest hover:bg-forest/5 transition-colors group"
        aria-expanded={isOpen}
      >
        <span className="text-sm font-semibold uppercase tracking-wider">
          {label}
        </span>
        <ChevronDown
          className={cn(
            "w-4 h-4 text-forest/30 group-hover:text-seafoam transition-all duration-200",
            isOpen && "rotate-180 text-seafoam"
          )}
        />
      </button>

      {/* Accordion Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className={cn("pb-3", isRTL ? "pr-4" : "pl-4")}>
              {serviceCategories.map((category) => (
                <div key={category.id} className="mb-3">
                  {/* Category Label */}
                  <div className="flex items-center gap-2 px-3 py-2">
                    <span
                      className={cn(
                        "w-5 h-5 rounded-md flex items-center justify-center text-[10px]",
                        category.color
                      )}
                    >
                      {category.icon}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-forest/40">
                      {t(category.labelKey)}
                    </span>
                  </div>

                  {/* Services */}
                  <ul className="space-y-0.5">
                    {category.services.map((service) => (
                      <li key={service.id}>
                        <Link
                          href={`/services#${service.slug}`}
                          onClick={onNavigate}
                          className={cn(
                            "flex items-center gap-2.5 px-3 py-2 rounded-lg text-forest/60 hover:text-forest hover:bg-forest/[0.03] transition-colors",
                            isRTL ? "mr-2" : "ml-2"
                          )}
                        >
                          <span className="text-sm opacity-70">
                            {service.icon}
                          </span>
                          <span className="text-xs font-medium">
                            {t(service.labelKey)}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* View All Link */}
              <Link
                href="/services"
                onClick={onNavigate}
                className={cn(
                  "flex items-center gap-2 px-3 py-2.5 mt-2 rounded-lg bg-forest/5 text-forest transition-colors hover:bg-forest/10",
                  isRTL ? "mr-2" : "ml-2"
                )}
              >
                <span className="text-xs font-bold uppercase tracking-wider">
                  {t("servicesMenu.viewAll")}
                </span>
                <svg
                  className={cn(
                    "w-3.5 h-3.5",
                    isRTL && "rotate-180"
                  )}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
