"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { DynamicIcon } from "@/components/ui/DynamicIcon";

interface ServiceDetailInteractiveProps {
  treatmentHighlights: string[];
  serviceColor: string;
  serviceIcon: string;
  serviceTitle: string;
}

export function ServiceDetailInteractive({
  treatmentHighlights,
  serviceColor,
  serviceIcon,
  serviceTitle,
}: ServiceDetailInteractiveProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="bg-section rounded-2xl p-4 md:p-10 border border-forest/5">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center shadow-lg"
          style={{ backgroundColor: serviceColor + "20" }}
        >
          <DynamicIcon
            name={serviceIcon}
            className="w-6 h-6"
            style={{ color: serviceColor }}
          />
        </div>
        <div>
          <p className="text-forest font-bold text-base md:text-lg tracking-tight">{serviceTitle}</p>
          <p className="text-forest/40 text-[10px] md:text-xs font-semibold uppercase tracking-wider">
            Treatment Highlights
          </p>
        </div>
      </div>

      {/* Interactive Treatment Highlight Cards */}
      <div className="space-y-3">
        {treatmentHighlights.map((highlight, index) => {
          const isActive = activeIndex === index;

          return (
            <motion.button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "w-full flex items-start gap-3 p-3 md:p-4 rounded-xl md:rounded-2xl text-start transition-all duration-300 border",
                isActive
                  ? "bg-white border-seafoam/20 shadow-md"
                  : "bg-white/50 border-transparent hover:bg-white hover:border-forest/5"
              )}
              layout
            >
              <div
                className={cn(
                  "w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-300",
                  isActive ? "bg-seafoam" : "bg-forest/5"
                )}
              >
                <CheckCircle2
                  className={cn(
                    "w-3 h-3 transition-colors duration-300",
                    isActive ? "text-white" : "text-forest/30"
                  )}
                />
              </div>
              <span
                className={cn(
                  "font-medium transition-colors duration-300 text-sm md:text-base leading-snug",
                  isActive ? "text-forest" : "text-forest/60"
                )}
              >
                {highlight}
              </span>
              <ChevronDown
                className={cn(
                  "w-3 h-3 ms-auto shrink-0 transition-all duration-300 mt-1",
                  isActive ? "text-seafoam rotate-180" : "text-forest/20"
                )}
              />
            </motion.button>
          );
        })}
      </div>

      {/* Progress Indicator */}
      <div className="mt-8 flex items-center gap-2">
        {treatmentHighlights.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              activeIndex === index
                ? "w-8 bg-seafoam"
                : "w-3 bg-forest/10 hover:bg-forest/20"
            )}
          />
        ))}
      </div>
    </div>
  );
}
