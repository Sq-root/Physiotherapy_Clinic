"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Easing } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

interface ContactFAQIslandProps {
  faqs: FAQ[];
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as Easing },
  },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function ContactFAQIsland({ faqs }: ContactFAQIslandProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <motion.div
      className="space-y-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={stagger}
    >
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <motion.div
            key={index}
            variants={fadeInUp}
            className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
              isOpen
                ? "bg-white border-forest/10 shadow-[0_8px_30px_rgb(0,0,0,0.06)] scale-[1.02]"
                : "bg-white/60 border-forest/5 hover:bg-white hover:border-forest/10 hover:shadow-sm"
            }`}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full flex items-center justify-between p-6 md:p-8 text-start focus:outline-none focus-visible:ring-2 focus-visible:ring-seafoam/50 rounded-2xl"
            >
              <span
                className={`font-semibold text-base md:text-lg pe-8 transition-colors ${
                  isOpen ? "text-forest" : "text-forest/80"
                }`}
              >
                {faq.question}
              </span>
              <div
                className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 border ${
                  isOpen
                    ? "bg-forest border-forest rotate-180"
                    : "bg-white border-forest/10 text-forest hover:bg-forest/5"
                }`}
              >
                <ArrowRight
                  className={`w-5 h-5 transition-transform duration-500 ${
                    isOpen ? "text-white -rotate-90" : "text-forest rotate-90"
                  }`}
                />
              </div>
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-6 md:px-8 pb-8 pt-2">
                    <div className="w-12 h-1 bg-seafoam/20 rounded-full mb-6" />
                    <p className="text-forest/80 text-base leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
