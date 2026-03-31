"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Plus, Minus } from "lucide-react";

interface FaqData {
  question: string;
  answer: string;
}

interface ServiceFAQInteractiveProps {
  faqs: FaqData[];
}

export function ServiceFAQInteractive({ faqs }: ServiceFAQInteractiveProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(1);

  return (
    <div className="space-y-6">
      {faqs.map((faq, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          onClick={() => setOpenIndex(openIndex === index ? null : index)}
          className={cn(
            "p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] cursor-pointer transition-all duration-300",
            openIndex === index
              ? "bg-seafoam border-2 border-seafoam shadow-lg shadow-seafoam/20"
              : "bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white hover:border-white group"
          )}
        >
          <div className="flex justify-between items-center gap-4">
            <h3
              className={cn(
                "text-lg md:text-xl font-bold transition-colors leading-tight",
                openIndex === index
                  ? "text-forest"
                  : "text-white group-hover:text-forest"
              )}
            >
              {faq.question}
            </h3>
            <span
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full transition-colors shrink-0",
                openIndex === index
                  ? "bg-forest text-white"
                  : "bg-seafoam text-forest"
              )}
            >
              {openIndex === index ? (
                <Minus className="w-5 h-5" />
              ) : (
                <Plus className="w-5 h-5" />
              )}
            </span>
          </div>

          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="mt-4 text-forest font-normal text-sm md:text-base leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}
