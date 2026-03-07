'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { faqCategories, type FaqCategory, type FaqItem } from '@/lib/data/faq-help';
import { Search, ChevronDown, MessageCircle, MessageSquare, Phone } from 'lucide-react';

/* ─── Animation Variants ─── */
const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

/* ═══════════════════════════════════════════
   Hero Section
   ═══════════════════════════════════════════ */
function HeroSection({
  searchQuery,
  onSearchChange,
}: {
  searchQuery: string;
  onSearchChange: (v: string) => void;
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
          Help Center
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl md:text-5xl font-bold text-forest mb-6 tracking-tight"
        >
          How can we help?
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-xl mx-auto relative group"
        >
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-forest/60" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full h-12 pl-12 pr-5 rounded-2xl bg-white/90 backdrop-blur-md border border-forest/10 ring-0 focus:ring-2 focus:ring-lime focus:outline-none transition-all text-sm font-light shadow-lg shadow-forest/5 placeholder:text-forest/40 text-forest"
            placeholder="Search for questions about treatment, billing, or tech support..."
          />
        </motion.div>
      </div>

      {/* Decorative Blobs */}
      <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-lime/10 rounded-full blur-[100px] -z-0 translate-x-1/4 -translate-y-1/4" />
      <div className="absolute bottom-0 left-0 w-[22rem] h-[22rem] bg-white/30 rounded-full blur-[80px] -z-0 -translate-x-1/4 translate-y-1/4" />
    </section>
  );
}

/* ═══════════════════════════════════════════
   Sticky Category Nav
   ═══════════════════════════════════════════ */
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
    <div className="sticky top-20 z-40 w-full shadow-sm overflow-x-auto no-scrollbar py-3 bg-section/80 backdrop-blur-md border-b border-white/20">
      <div className="mx-auto max-w-6xl flex items-center justify-center px-6 gap-2.5">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              onCategoryChange(cat.id);
              const el = document.getElementById(cat.id);
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className={cn(
              'px-5 py-2 rounded-full text-xs font-medium border backdrop-blur-sm transition-all whitespace-nowrap',
              activeCategory === cat.id
                ? 'border-transparent bg-lime text-forest font-bold shadow-md shadow-lime/20'
                : 'text-forest border-forest/20 hover:border-forest/50 bg-white/50'
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   FAQ Accordion Item (custom for this page)
   ═══════════════════════════════════════════ */
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
        'rounded-xl border transition-all duration-300',
        isOpen
          ? 'bg-lime border-transparent shadow-lg shadow-lime/10'
          : 'bg-white/60 border-forest/10'
      )}
    >
      <button
        onClick={onToggle}
        className="flex items-center justify-between px-4 py-3.5 w-full text-left"
        aria-expanded={isOpen}
      >
        <span
          className={cn(
            'font-medium text-sm text-forest transition-all',
            isOpen && 'font-bold'
          )}
        >
          {item.question}
        </span>
        <motion.div
          className="text-forest/60 shrink-0 ml-4"
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
            animate={{ height: 'auto', opacity: 1 }}
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

/* ═══════════════════════════════════════════
   FAQ Category Section
   ═══════════════════════════════════════════ */
function CategorySection({
  category,
  openId,
  onToggle,
  searchQuery,
}: {
  category: FaqCategory;
  openId: string | null;
  onToggle: (id: string) => void;
  searchQuery: string;
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
      <div className="mb-7 border-l-[3px] border-lime pl-4">
        <h2 className="text-2xl font-bold text-forest">{category.title}</h2>
        <p className="text-forest/70 mt-1 font-light text-sm">{category.subtitle}</p>
      </div>

      {/* Subcategory groups */}
      <div className="space-y-7">
        {filteredSubcategories.map((sub) => (
          <div key={sub.title}>
            <h3 className="text-[10px] uppercase tracking-widest font-bold text-forest/60 mb-3.5">
              {sub.title}
            </h3>
            <div className="space-y-2.5">
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={cn(
          'mt-8 p-6 rounded-xl flex flex-col md:flex-row items-center justify-between gap-5 relative overflow-hidden',
          category.cta.variant === 'primary'
            ? 'bg-forest text-white'
            : 'bg-white/40 border border-white/60 backdrop-blur-sm'
        )}
      >
        {category.cta.variant === 'primary' && (
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
        )}
        <div
          className={cn(
            'relative z-10 text-center md:text-left',
            category.cta.variant !== 'primary' && 'text-forest'
          )}
        >
          <h4 className="text-lg font-bold mb-1">{category.cta.heading}</h4>
          <p
            className={cn(
              'font-light text-xs',
              category.cta.variant === 'primary' ? 'text-lime/90' : 'text-forest/70'
            )}
          >
            {category.cta.description}
          </p>
        </div>
        <button
          className={cn(
            'relative z-10 px-6 py-2.5 rounded-full font-bold transition-all whitespace-nowrap text-xs',
            category.cta.variant === 'primary'
              ? 'bg-lime text-forest hover:bg-white hover:text-forest shadow-lg shadow-black/20'
              : 'border-2 border-forest text-forest hover:bg-forest hover:text-white'
          )}
        >
          {category.cta.buttonText}
        </button>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   Sidebar
   ═══════════════════════════════════════════ */
function Sidebar() {
  return (
    <aside className="w-full lg:w-72 xl:w-80 shrink-0">
      <div className="sticky top-36 space-y-4">
        {/* Quick Contact Card */}
        <div className="bg-forest p-5 rounded-2xl shadow-xl shadow-forest/20 text-white relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-lime/20 rounded-full blur-2xl" />

          <div className="size-10 rounded-xl bg-white/10 flex items-center justify-center mb-4 backdrop-blur-sm border border-white/10 relative z-10">
            <MessageCircle className="w-5 h-5 text-lime" />
          </div>

          <h4 className="text-base font-bold mb-1 relative z-10">Quick Contact</h4>
          <p className="text-xs text-white/70 mb-5 font-light relative z-10">
            Our care coordinators are available 24/7 for urgent inquiries.
          </p>

          <div className="space-y-2.5 relative z-10">
            <a
              href="#"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full bg-lime text-forest font-bold text-xs hover:bg-white transition-all shadow-md shadow-black/10"
            >
              <MessageSquare className="w-4 h-4" />
              WhatsApp Us
            </a>
            <a
              href="tel:+"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full bg-white/10 border border-white/20 text-white font-bold text-xs hover:bg-white hover:text-forest transition-all backdrop-blur-sm"
            >
              <Phone className="w-4 h-4" />
              Call Directly
            </a>
          </div>

          <div className="mt-5 pt-4 border-t border-white/10 text-center relative z-10">
            <p className="text-[10px] text-lime">Response time: &lt; 5 mins</p>
          </div>
        </div>

        {/* Testimonial Card */}
        <div className="p-5 rounded-2xl bg-white/50 border border-white/60 shadow-lg shadow-forest/5 backdrop-blur-sm">
          <p className="text-sm text-forest leading-relaxed italic mb-4">
            &quot;The tele-rehab program changed how I view recovery. Professional, convenient, and
            incredibly effective.&quot;
          </p>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-gray-200 overflow-hidden ring-2 ring-white ring-offset-2 ring-offset-section">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80&auto=format&fit=crop"
                alt="James R."
                width={36}
                height={36}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="block text-xs font-bold text-forest">James R.</span>
              <span className="block text-[10px] text-forest/60 uppercase tracking-wider font-bold">
                Professional Athlete
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

/* ═══════════════════════════════════════════
   Main FAQ Page
   ═══════════════════════════════════════════ */
export default function FaqPage() {
  const [activeCategory, setActiveCategory] = useState(faqCategories[0].id);
  const [openId, setOpenId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Observer to update active category on scroll
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    faqCategories.forEach((cat) => {
      const el = document.getElementById(cat.id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveCategory(cat.id);
          }
        },
        { rootMargin: '-200px 0px -60% 0px', threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="bg-section text-forest font-sans antialiased overflow-x-hidden">
      {/* Hero */}
      <HeroSection searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {/* Sticky Category Nav */}
      <StickyNav
        categories={faqCategories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {/* Main Content */}
      <motion.main
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="mx-auto max-w-6xl px-6 lg:px-8 py-12 relative z-10"
      >
        <div className="flex flex-col lg:flex-row gap-10">
          {/* FAQ Sections */}
          <div className="flex-1 space-y-14">
            {faqCategories.map((cat) => (
              <CategorySection
                key={cat.id}
                category={cat}
                openId={openId}
                onToggle={handleToggle}
                searchQuery={searchQuery}
              />
            ))}
          </div>

          {/* Sidebar */}
          <Sidebar />
        </div>
      </motion.main>
    </div>
  );
}
