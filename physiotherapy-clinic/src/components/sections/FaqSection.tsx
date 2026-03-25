"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rocket,
  User,
  CreditCard,
  Sparkles,
  MessageCircle,
  PersonStanding,
  Zap,
  CheckCircle,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";

const categoryIconMap = {
  "gettingStarted": Rocket,
  "treatment": User,
  "insurance": CreditCard,
  "aftercare": Sparkles,
};

export function FaqSection() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  
  const t = useTranslations("faq");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const isRTL = locale === "ar";

  // Category configuration with translation keys
  const categories = [
    { id: "gettingStarted", key: "gettingStarted" },
    { id: "treatment", key: "treatment" },
    { id: "insurance", key: "insurance" },
    { id: "aftercare", key: "aftercare" },
  ];

  // Get translated category content
  const getCategoryContent = (key: string) => ({
    label: t(`categories.${key}.label`),
    faqs: t.raw(`categories.${key}.faqs`) as Array<{ question: string; answer: string }>,
  });

  const activeContent = getCategoryContent(categories[activeCategory].key);
  const activeFaqs = activeContent.faqs;

  return (
    <section
      id="faq"
      className="bg-white py-16 md:py-24 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle Grid */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(#002D04 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />
        {/* Decorative Shape */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-seafoam/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-lime/5 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-seafoam/10 flex items-center justify-center">
              <span className="text-seafoam text-sm">?</span>
            </div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-seafoam">
              {t("badge")}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-sans text-forest font-semibold leading-[1.1] tracking-tight mb-4">
            {t("title")}{" "}
            <span className="text-seafoam">{t("titleHighlight")}</span>
          </h2>
          <p className="text-forest/60 text-sm md:text-base max-w-2xl mx-auto">
            {t("description")}
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Left - Category Tabs */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-24 space-y-3">
              {categories.map((category, index) => {
                const categoryContent = getCategoryContent(category.key);
                return (
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
                      const IconComponent =
                        categoryIconMap[
                          category.id as keyof typeof categoryIconMap
                        ];
                      return IconComponent ? (
                        <IconComponent
                          className={`w-6 h-6 transition-transform ${
                            activeCategory === index
                              ? "scale-110 text-seafoam"
                              : "text-forest/60 group-hover:scale-110"
                          }`}
                        />
                      ) : null;
                    })()}
                    <div className="flex-1">
                      <h3
                        className={`font-semibold text-base ${
                          activeCategory === index
                            ? "text-white"
                            : "text-forest"
                        }`}
                      >
                        {categoryContent.label}
                      </h3>
                      <p
                        className={`text-xs ${
                          activeCategory === index
                            ? "text-white/60"
                            : "text-forest/50"
                        }`}
                      >
                        {categoryContent.faqs.length} questions
                      </p>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform ${
                        activeCategory === index ? "rotate-0" : isRTL ? "rotate-90" : "-rotate-90"
                      } ${activeCategory === index ? "text-seafoam" : "text-forest/30"}`}
                    />
                  </div>
                </motion.button>
              );})}

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
                      {t("stillHaveQuestions")}
                    </h4>
                    <p className="text-forest/60 text-xs">
                      {t("description")}
                    </p>
                  </div>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 w-full justify-center px-4 py-2.5 bg-forest text-white rounded-full text-sm font-medium hover:bg-forest/90 transition-colors"
                >
                  {t("contactUs")}
                  <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
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
                    const IconComponent =
                      categoryIconMap[
                        categories[activeCategory]
                          .id as keyof typeof categoryIconMap
                      ];
                    return IconComponent ? (
                      <IconComponent className="w-8 h-8 text-seafoam" />
                    ) : null;
                  })()}
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-forest">
                      {activeContent.label}
                    </h3>
                    <p className="text-forest/60 text-sm">
                      {activeContent.faqs.length} frequently asked
                      questions
                    </p>
                  </div>
                </div>

                {/* FAQ Items */}
                <div className="space-y-3">
                  {activeFaqs.map((faq, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`rounded-2xl transition-all duration-300 ${
                        openFaq === index
                          ? "bg-white shadow-lg shadow-forest/5"
                          : "bg-white/50 hover:bg-white"
                      }`}
                    >
                      <button
                        onClick={() =>
                          setOpenFaq(openFaq === index ? null : index)
                        }
                        className="w-full text-left p-4 md:p-5 flex items-start gap-4"
                      >
                        {/* Number */}
                        <span
                          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                            openFaq === index
                              ? "bg-seafoam text-white"
                              : "bg-forest/5 text-forest/40"
                          }`}
                        >
                          {index + 1}
                        </span>

                        <div className="flex-1 min-w-0">
                          <h4
                            className={`font-semibold text-sm md:text-base transition-colors ${
                              openFaq === index
                                ? "text-forest"
                                : "text-forest/80"
                            }`}
                          >
                            {faq.question}
                          </h4>
                        </div>

                        {/* Toggle Icon */}
                        <div
                          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                            openFaq === index
                              ? "bg-seafoam/10 rotate-180"
                              : "bg-forest/5"
                          }`}
                        >
                          <svg
                            className={`w-4 h-4 transition-colors ${
                              openFaq === index
                                ? "text-seafoam"
                                : "text-forest/40"
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                      </button>

                      <AnimatePresence>
                        {openFaq === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              duration: 0.3,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 md:px-5 pb-5 pl-16 md:pl-[4.5rem]">
                              <p className="text-forest/60 text-sm leading-relaxed">
                                {faq.answer}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Quick Stats */}
            <motion.div
              className="mt-6 grid grid-cols-3 gap-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-center p-4 bg-section/50 rounded-2xl border border-forest/5">
                <PersonStanding className="w-5 h-5 mx-auto mb-2 text-seafoam" />
                <p className="text-lg md:text-xl font-bold text-forest">15+</p>
                <p className="text-[10px] text-forest/50 uppercase tracking-wider">
                  Body Areas
                </p>
              </div>
              <div className="text-center p-4 bg-section/50 rounded-2xl border border-forest/5">
                <Zap className="w-5 h-5 mx-auto mb-2 text-seafoam" />
                <p className="text-lg md:text-xl font-bold text-forest">
                  &lt;2hr
                </p>
                <p className="text-[10px] text-forest/50 uppercase tracking-wider">
                  Response Time
                </p>
              </div>
              <div className="text-center p-4 bg-section/50 rounded-2xl border border-forest/5">
                <CheckCircle className="w-5 h-5 mx-auto mb-2 text-seafoam" />
                <p className="text-lg md:text-xl font-bold text-forest">98%</p>
                <p className="text-[10px] text-forest/50 uppercase tracking-wider">
                  Resolution Rate
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
