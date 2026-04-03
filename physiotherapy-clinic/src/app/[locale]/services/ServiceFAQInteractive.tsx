"use client";

import { motion } from "framer-motion";
import { Accordion } from "@/components/ui/Accordion";

interface FaqData {
  question: string;
  answer: string;
}

interface ServiceFAQInteractiveProps {
  faqs: FaqData[];
}

export function ServiceFAQInteractive({ faqs }: ServiceFAQInteractiveProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full"
    >
      <Accordion 
        items={faqs} 
        defaultOpenIndex={0}
        className="max-w-4xl mx-auto"
      />
    </motion.div>
  );
}
