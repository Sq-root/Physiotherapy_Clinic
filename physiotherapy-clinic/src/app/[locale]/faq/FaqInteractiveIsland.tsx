"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/routing";

// Types
interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface FaqSubcategory {
  title: string;
  items: FaqItem[];
}

interface FaqCategory {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  subcategories: FaqSubcategory[];
  cta?: {
    heading: string;
    description: string;
    buttonText: string;
    variant: "primary" | "outline";
  };
}

interface FaqInteractiveIslandProps {
  categories: FaqCategory[];
  labels: {
    badge: string;
    title: string;
    titleHighlight: string;
    searchPlaceholder: string;
    noResults: string;
    clearSearch: string;
  };
  isRTL: boolean;
  children?: React.ReactNode; // Sidebar slot
}

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

/* Hero Section */
function HeroSection({
  searchQuery,
  onSearchChange,
  labels,
  isRTL,
}: {
  searchQuery: string;
  onSearchChange: (v: string) => void;
  labels: FaqInteractiveIslandProps["labels"];
  isRTL: boolean;
}) {
  return (
    <section className="relative pt-32 pb-10 overflow-hidden bg-gradient-to-b from-white/40 to-section">
      <div className="mx-auto max-w-6xl px-6 lg:px-8 text-center relative z-10">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-forest font-bold tracking-[0.2em] text-[10px] uppercase mb-3 block"
        >
          {labels.badge}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl md:text-5xl font-bold text-forest mb-6 tracking-tight"
        >
          {labels.title} <span className="text-seafoam">{labels.titleHighlight}</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-xl mx-auto relative group"
        >
          <div className={`absolute inset-y-0 ${isRTL ? "right-5" : "left-5"} flex items-center pointer-events-none`}>
            <Search className="w-5 h-5 text-forest/80" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className={`w-full h-12 ${isRTL ? "pr-12 pl-5" : "pl-12 pr-5"} rounded-2xl bg-white/90 backdrop-blur-md border border-forest/10 ring-0 focus:ring-2 focus:ring-lime focus:outline-none transition-all text-sm font-light shadow-lg shadow-forest/5 placeholder:text-forest/40 text-forest`}
            placeholder={labels.searchPlaceholder}
          />
        </motion.div>
      </div>

      {/* Decorative Blobs */}
      <div className={`absolute top-0 ${isRTL ? "left-0" : "right-0"} w-[30rem] h-[30rem] bg-lime/10 rounded-full blur-[100px] -z-0 ${isRTL ? "-translate-x-1/4" : "translate-x-1/4"} -translate-y-1/4`} />
      <div className={`absolute bottom-0 ${isRTL ? "right-0" : "left-0"} w-[22rem] h-[22rem] bg-white/30 rounded-full blur-[80px] -z-0 ${isRTL ? "translate-x-1/4" : "-translate-x-1/4"} translate-y-1/4`} />
    </section>
  );
}

/* Sticky Category Nav */
function StickyNav({
  categories,
  activeCategory,
  onCategoryChange,
}: {
  categories: FaqCategory[];
  activeCategory: string;
  onCategoryChange: (id: string) => void;
}) {
  return (
    <div className="sticky top-20 z-40 w-full shadow-sm overflow-x-auto no-scrollbar py-4 bg-section/80 backdrop-blur-md border-b border-white/20">
      <div className="mx-auto max-w-6xl flex items-center justify-center px-6 gap-3">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id)}
            className={cn(
              "px-6 py-2.5 rounded-full text-xs font-medium border backdrop-blur-sm transition-all duration-300 whitespace-nowrap relative",
              activeCategory === cat.id
                ? "border-transparent bg-forest text-white shadow-xl shadow-forest/20"
                : "text-forest border-forest/10 hover:border-forest/30 bg-white/40 hover:bg-white/60"
            )}
          >
            {activeCategory === cat.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-forest rounded-full -z-10"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className={cn(activeCategory === cat.id ? "font-bold" : "font-medium")}>
              {cat.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* FAQ Accordion Item */
function FaqAccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border transition-all duration-300",
        isOpen
          ? "bg-lime border-transparent shadow-lg shadow-lime/10"
          : "bg-white/60 border-forest/10"
      )}
    >
      <button
        onClick={onToggle}
        className="flex items-center justify-between px-4 py-3.5 w-full text-start"
        aria-expanded={isOpen}
      >
        <span className={cn("font-medium text-sm text-forest transition-all", isOpen && "font-bold")}>
          {item.question}
        </span>
        <motion.div
          className="text-forest/80 shrink-0 ms-4"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-0 text-forest/80">
              <p className="leading-relaxed text-[13px]">{item.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* FAQ Category Section */
function CategorySection({
  category,
  openId,
  onToggle,
  searchQuery,
  isRTL,
}: {
  category: FaqCategory;
  openId: string | null;
  onToggle: (id: string) => void;
  searchQuery: string;
  isRTL: boolean;
}) {
  const filteredSubcategories = category.subcategories
    .map((sub) => ({
      ...sub,
      items: searchQuery
        ? sub.items.filter(
            (item) =>
              item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item.answer.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : sub.items,
    }))
    .filter((sub) => sub.items.length > 0);

  if (filteredSubcategories.length === 0) return null;

  return (
    <section className="scroll-mt-40" id={category.id}>
      {/* Section Header */}
      <div className={`mb-7 ${isRTL ? "border-e-[3px] pe-4" : "border-s-[3px] ps-4"} border-lime`}>
        <h2 className="text-2xl font-bold text-forest">{category.title}</h2>
        <p className="text-forest/80 mt-1 font-light text-sm">{category.subtitle}</p>
      </div>

      {/* Subcategory groups */}
      <div className="space-y-7">
        {filteredSubcategories.map((sub) => (
          <div
            key={sub.title}
            className="bg-white/40 border border-white/60 rounded-2xl p-5 md:p-8 backdrop-blur-sm shadow-sm"
          >
            <h3 className="text-[10px] uppercase tracking-widest font-bold text-forest/40 mb-6 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-forest/10" />
              {sub.title}
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {sub.items.map((item) => (
                <FaqAccordionItem
                  key={item.id}
                  item={item}
                  isOpen={openId === item.id}
                  onToggle={() => onToggle(item.id)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* CTA Banner */}
      {category?.cta && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={cn(
            "mt-8 p-6 rounded-xl flex flex-col md:flex-row items-center justify-between gap-5 relative overflow-hidden",
            category.cta.variant === "primary"
              ? "bg-forest text-white"
              : "bg-white/40 border border-white/60 backdrop-blur-sm"
          )}
        >
          {category.cta.variant === "primary" && (
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
          )}
          <div className="relative z-10 text-center md:text-start">
            <h4
              className={cn(
                "text-lg font-bold mb-1",
                category.cta.variant === "primary" ? "text-white" : "text-forest"
              )}
            >
              {category.cta.heading}
            </h4>
            <p
              className={cn(
                "font-light text-xs",
                category.cta.variant === "primary" ? "text-white/80" : "text-forest/80"
              )}
            >
              {category.cta.description}
            </p>
          </div>
          <Link
            href="/contact"
            className={cn(
              "relative z-10 px-6 py-2.5 rounded-full font-bold transition-all whitespace-nowrap text-xs",
              category.cta.variant === "primary"
                ? "bg-lime text-forest hover:bg-white hover:text-forest shadow-lg shadow-black/20"
                : "border-2 border-forest text-forest hover:bg-forest hover:text-white"
            )}
          >
            {category.cta.buttonText}
          </Link>
        </motion.div>
      )}
    </section>
  );
}

/* Main FAQ Interactive Island */
export default function FaqInteractiveIsland({
  categories,
  labels,
  isRTL,
  children,
}: FaqInteractiveIslandProps) {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id || "");
  const [openId, setOpenId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const displayedCategories =
    searchQuery.trim().length > 0
      ? categories
      : categories.filter((cat) => cat.id === activeCategory);

  const hasResults = displayedCategories.some((cat) => {
    return cat.subcategories.some((sub) =>
      sub.items.some(
        (item) =>
          item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  });

  return (
    <>
      {/* Hero */}
      <HeroSection
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        labels={labels}
        isRTL={isRTL}
      />

      {/* Sticky Category Nav */}
      <StickyNav
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-6 lg:px-8 py-16 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* FAQ Sections */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="flex-1"
          >
            <AnimatePresence mode="wait">
              {hasResults ? (
                <motion.div
                  key={searchQuery ? "search" : activeCategory}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-16"
                >
                  {displayedCategories.map((cat) => (
                    <CategorySection
                      key={cat.id}
                      category={cat}
                      openId={openId}
                      onToggle={handleToggle}
                      searchQuery={searchQuery}
                      isRTL={isRTL}
                    />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-20 text-center"
                >
                  <div className="size-16 rounded-full bg-forest/5 flex items-center justify-center mx-auto mb-6">
                    <Search className="w-8 h-8 text-forest/20" />
                  </div>
                  <h3 className="text-xl font-bold text-forest mb-2">
                    {labels.noResults}
                  </h3>
                  <p className="text-forest/80 max-w-xs mx-auto text-sm font-light">
                    We couldn&apos;t find any questions matching &quot;{searchQuery}&quot;. Try using different keywords.
                  </p>
                  <button
                    onClick={() => setSearchQuery("")}
                    className="mt-6 text-xs font-bold text-forest underline underline-offset-4 decoration-lime hover:text-lime transition-all"
                  >
                    {labels.clearSearch}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Sidebar slot */}
          {children}
        </div>
      </main>
    </>
  );
}
