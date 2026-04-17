"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { DynamicIcon } from "@/components/ui/DynamicIcon";

interface ServiceDetailInteractiveProps {
  benefits: string[];
  serviceColor: string;
  serviceIcon: string;
  serviceTitle: string;
}

export function ServiceDetailInteractive({
  benefits,
  serviceColor,
  serviceIcon,
  serviceTitle,
}: ServiceDetailInteractiveProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="bg-section rounded-[2.5rem] p-8 md:p-10 border border-forest/5">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
          style={{ backgroundColor: serviceColor + "20" }}
        >
          <DynamicIcon
            name={serviceIcon}
            className="w-7 h-7"
            style={{ color: serviceColor }}
          />
        </div>
        <div>
          <p className="text-forest font-bold text-lg tracking-tight">{serviceTitle}</p>
          <p className="text-forest/40 text-xs font-semibold uppercase tracking-wider">
            Treatment Highlights
          </p>
        </div>
      </div>

      {/* Interactive Benefit Cards */}
      <div className="space-y-3">
        {benefits.map((benefit, index) => {
          const isActive = activeIndex === index;

          return (
            <motion.button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "w-full flex items-center gap-4 p-4 rounded-2xl text-start transition-all duration-300 border",
                isActive
                  ? "bg-white border-seafoam/20 shadow-md"
                  : "bg-white/50 border-transparent hover:bg-white hover:border-forest/5"
              )}
              layout
            >
              <div
                className={cn(
                  "w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300",
                  isActive ? "bg-seafoam" : "bg-forest/5"
                )}
              >
                <CheckCircle2
                  className={cn(
                    "w-4 h-4 transition-colors duration-300",
                    isActive ? "text-white" : "text-forest/30"
                  )}
                />
              </div>
              <span
                className={cn(
                  "font-medium transition-colors duration-300",
                  isActive ? "text-forest" : "text-forest/60"
                )}
              >
                {benefit}
              </span>
              <ChevronDown
                className={cn(
                  "w-4 h-4 ms-auto shrink-0 transition-all duration-300",
                  isActive ? "text-seafoam rotate-180" : "text-forest/20"
                )}
              />
            </motion.button>
          );
        })}
      </div>

      {/* Progress Indicator */}
      <div className="mt-8 flex items-center gap-2">
        {benefits.map((_, index) => (
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
