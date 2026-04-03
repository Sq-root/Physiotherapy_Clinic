"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rocket,
  User,
  CreditCard,
  Sparkles,
  ChevronDown,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import { AccordionItem } from "@/components/ui/Accordion";

const categoryIconMap: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  gettingStarted: Rocket,
  treatment: User,
  insurance: CreditCard,
  aftercare: Sparkles,
};

interface FaqCategory {
  id: string;
  label: string;
  faqs: Array<{ question: string; answer: string }>;
}

interface FaqInteractiveProps {
  categories: FaqCategory[];
  isRTL: boolean;
  stillHaveQuestions: string;
  description: string;
  contactUs: string;
}

export function FaqInteractive({
  categories,
  isRTL,
  stillHaveQuestions,
  description,
  contactUs,
}: FaqInteractiveProps) {
  const [activeCategory, setActiveCategory] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const activeContent = categories[activeCategory];
  const activeFaqs = activeContent.faqs;

  return (
    <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
      {/* Left - Category Tabs */}
      <div className="lg:col-span-4">
        <div className="lg:sticky lg:top-24 space-y-3">
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              onClick={() => {
                setActiveCategory(index);
                setOpenFaq(0);
              }}
              className={`w-full text-left p-4 rounded-2xl transition-all duration-300 group ${
                activeCategory === index
                  ? "bg-forest text-white shadow-lg"
                  : "bg-section hover:bg-forest/5 border border-transparent hover:border-forest/10"
              }`}
              initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: activeCategory === index ? 1 : 1.02 }}
            >
              <div className="flex items-center gap-4">
                {(() => {
                  const IconComponent = categoryIconMap[category.id];
                  return IconComponent ? (
                    <IconComponent
                      className={`w-6 h-6 transition-transform ${
                        activeCategory === index
                          ? "scale-110 text-seafoam"
                          : "text-forest/80 group-hover:scale-110"
                      }`}
                    />
                  ) : null;
                })()}
                <div className="flex-1">
                  <h3
                    className={`font-semibold text-base ${
                      activeCategory === index ? "text-white" : "text-forest"
                    }`}
                  >
                    {category.label}
                  </h3>
                  <p
                    className={`text-xs ${
                      activeCategory === index
                        ? "text-white/60"
                        : "text-forest/50"
                    }`}
                  >
                    {category.faqs.length} questions
                  </p>
                </div>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${
                    activeCategory === index
                      ? "rotate-0"
                      : isRTL
                        ? "rotate-90"
                        : "-rotate-90"
                  } ${activeCategory === index ? "text-seafoam" : "text-forest/30"}`}
                />
              </div>
            </motion.button>
          ))}

          {/* Contact Card */}
          <motion.div
            className="mt-6 p-5 bg-gradient-to-br from-seafoam/10 to-lime/5 rounded-2xl border border-seafoam/20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-seafoam/20 flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-5 h-5 text-seafoam" />
              </div>
              <div>
                <h4 className="font-semibold text-forest text-sm">
                  {stillHaveQuestions}
                </h4>
                <p className="text-forest/80 text-xs">{description}</p>
              </div>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 w-full justify-center px-6 py-3 bg-forest text-white rounded-full text-sm font-bold tracking-wide transition-all duration-300 shadow-[4px_4px_0px_0px_#A4C639] hover:bg-seafoam hover:text-forest hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
            >
              {contactUs}
              <ArrowRight
                className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isRTL ? "rotate-180" : ""}`}
              />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Right - FAQ Accordion */}
      <div className="lg:col-span-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-section/50 rounded-3xl p-4 md:p-6 lg:p-8 border border-forest/5"
          >
            {/* Category Header */}
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-forest/10">
              {(() => {
                const IconComponent = categoryIconMap[activeContent.id];
                return IconComponent ? (
                  <IconComponent className="w-8 h-8 text-seafoam" />
                ) : null;
              })()}
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-forest">
                  {activeContent.label}
                </h3>
                <p className="text-forest/80 text-sm">
                  {activeContent.faqs.length} frequently asked questions
                </p>
              </div>
            </div>

            {/* FAQ Items */}
            <div className="space-y-3">
              {activeFaqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  index={index}
                  isOpen={openFaq === index}
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
