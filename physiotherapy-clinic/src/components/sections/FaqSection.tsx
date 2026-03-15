'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, User, CreditCard, Sparkles, MessageCircle, Clock, Zap, CheckCircle, ChevronDown, ArrowRight } from 'lucide-react';
import { siteConfig } from '@/config/site';

const categoryIconMap = {
  'getting-started': Rocket,
  'treatment': User,
  'insurance': CreditCard,
  'aftercare': Sparkles,
};

export function FaqSection() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const categories = [
    {
      id: "getting-started",
      label: "Getting Started",
      faqs: [
        {
          question: "Do I need a referral to book an appointment?",
          answer: "No referral is necessary. You can book directly through our website or by calling our clinic. We welcome self-referrals and work with most health insurance providers."
        },
        {
          question: "What should I bring to my first visit?",
          answer: "Please bring your ID, insurance card, any relevant medical records or imaging results, and a list of current medications. Comfortable clothing is recommended."
        },
        {
          question: "How do I schedule an appointment?",
          answer: "You can book online through our website, call us directly, or use our mobile app. Same-day appointments are often available for urgent cases."
        }
      ]
    },
    {
      id: "treatment",
      label: "Treatment",
      faqs: [
        {
          question: "How long does each session typically last?",
          answer: "Initial assessments are 60 minutes. Follow-up treatment sessions are usually 45-60 minutes depending on your condition and treatment plan."
        },
        {
          question: "Is physiotherapy treatment painful?",
          answer: "Physiotherapy should not be significantly painful. You may experience mild discomfort during treatment as we work on tight or injured tissues, but we always work within your comfort level."
        },
        {
          question: "What should I wear to my session?",
          answer: "Wear comfortable, loose-fitting clothing that allows easy access to the area being treated. For lower body issues, shorts work best. For upper body, a tank top or loose t-shirt is ideal."
        }
      ]
    },
    {
      id: "insurance",
      label: "Insurance & Cost",
      faqs: [
        {
          question: "Do you accept insurance?",
          answer: "Yes, we accept most major insurance plans. Contact our office with your insurance information and we'll verify your coverage and benefits before your appointment."
        },
        {
          question: "What are your payment options?",
          answer: "We accept cash, credit/debit cards, and FSA/HSA payments. Payment plans are available for those without insurance coverage."
        },
        {
          question: "Will my insurance cover all treatments?",
          answer: "Coverage varies by plan. Most insurance covers a certain number of physical therapy visits per year. We'll help you understand your benefits during your first visit."
        }
      ]
    },
    {
      id: "aftercare",
      label: "Recovery & Aftercare",
      faqs: [
        {
          question: "How many sessions will I need?",
          answer: "This varies widely depending on your condition. Some patients see significant improvement in 4-6 sessions, while chronic or complex conditions may require longer treatment plans."
        },
        {
          question: "Will I get exercises to do at home?",
          answer: "Yes! Home exercises are a crucial part of your recovery. We provide personalized exercise programs and can send video demonstrations to your phone."
        },
        {
          question: "Is physiotherapy the same as chiropractic care?",
          answer: "While there are overlaps, physiotherapy focuses on rehabilitation, movement re-education, and exercise therapy in addition to manual techniques, offering a more comprehensive approach."
        }
      ]
    }
  ];

  const activeFaqs = categories[activeCategory].faqs;

  return (
    <section id="faq" className="bg-white py-16 md:py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle Grid */}
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(#002D04 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
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
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-seafoam">FAQ</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-sans text-forest font-semibold leading-[1.1] tracking-tight mb-4">
            Questions? <span className="text-seafoam">We&apos;ve Got Answers</span>
          </h2>
          <p className="text-forest/60 text-sm md:text-base max-w-2xl mx-auto">
            Everything you need to know about your recovery journey at {siteConfig.name}
          </p>
        </motion.div>

        {/* Main Content */}
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
                      ? 'bg-forest text-white shadow-lg'
                      : 'bg-section hover:bg-forest/5 border border-transparent hover:border-forest/10'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: activeCategory === index ? 1 : 1.02 }}
                >
                  <div className="flex items-center gap-4">
                    {(() => {
                      const IconComponent = categoryIconMap[category.id as keyof typeof categoryIconMap];
                      return IconComponent ? (
                        <IconComponent className={`w-6 h-6 transition-transform ${
                          activeCategory === index ? 'scale-110 text-seafoam' : 'text-forest/60 group-hover:scale-110'
                        }`} />
                      ) : null;
                    })()}
                    <div className="flex-1">
                      <h3 className={`font-semibold text-base ${
                        activeCategory === index ? 'text-white' : 'text-forest'
                      }`}>
                        {category.label}
                      </h3>
                      <p className={`text-xs ${
                        activeCategory === index ? 'text-white/60' : 'text-forest/50'
                      }`}>
                        {category.faqs.length} questions
                      </p>
                    </div>
                    <ChevronDown 
                      className={`w-5 h-5 transition-transform ${
                        activeCategory === index ? 'rotate-0' : '-rotate-90'
                      } ${activeCategory === index ? 'text-seafoam' : 'text-forest/30'}`}
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
                    <h4 className="font-semibold text-forest text-sm">Still have questions?</h4>
                    <p className="text-forest/60 text-xs">Our team is here to help</p>
                  </div>
                </div>
                <a 
                  href="#contact"
                  className="inline-flex items-center gap-2 w-full justify-center px-4 py-2.5 bg-forest text-white rounded-full text-sm font-medium hover:bg-forest/90 transition-colors"
                >
                  Contact Support
                  <ArrowRight className="w-4 h-4" />
                </a>
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
                    const IconComponent = categoryIconMap[categories[activeCategory].id as keyof typeof categoryIconMap];
                    return IconComponent ? <IconComponent className="w-8 h-8 text-seafoam" /> : null;
                  })()}
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-forest">
                      {categories[activeCategory].label}
                    </h3>
                    <p className="text-forest/60 text-sm">
                      {categories[activeCategory].faqs.length} frequently asked questions
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
                          ? 'bg-white shadow-lg shadow-forest/5' 
                          : 'bg-white/50 hover:bg-white'
                      }`}
                    >
                      <button
                        onClick={() => setOpenFaq(openFaq === index ? null : index)}
                        className="w-full text-left p-4 md:p-5 flex items-start gap-4"
                      >
                        {/* Number */}
                        <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                          openFaq === index 
                            ? 'bg-seafoam text-white' 
                            : 'bg-forest/5 text-forest/40'
                        }`}>
                          {index + 1}
                        </span>

                        <div className="flex-1 min-w-0">
                          <h4 className={`font-semibold text-sm md:text-base transition-colors ${
                            openFaq === index ? 'text-forest' : 'text-forest/80'
                          }`}>
                            {faq.question}
                          </h4>
                        </div>

                        {/* Toggle Icon */}
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                          openFaq === index 
                            ? 'bg-seafoam/10 rotate-180' 
                            : 'bg-forest/5'
                        }`}>
                          <svg 
                            className={`w-4 h-4 transition-colors ${
                              openFaq === index ? 'text-seafoam' : 'text-forest/40'
                            }`}
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </button>

                      <AnimatePresence>
                        {openFaq === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
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
                <Clock className="w-5 h-5 mx-auto mb-2 text-seafoam" />
                <p className="text-lg md:text-xl font-bold text-forest">24/7</p>
                <p className="text-[10px] text-forest/50 uppercase tracking-wider">Support Available</p>
              </div>
              <div className="text-center p-4 bg-section/50 rounded-2xl border border-forest/5">
                <Zap className="w-5 h-5 mx-auto mb-2 text-seafoam" />
                <p className="text-lg md:text-xl font-bold text-forest">&lt;2hr</p>
                <p className="text-[10px] text-forest/50 uppercase tracking-wider">Response Time</p>
              </div>
              <div className="text-center p-4 bg-section/50 rounded-2xl border border-forest/5">
                <CheckCircle className="w-5 h-5 mx-auto mb-2 text-seafoam" />
                <p className="text-lg md:text-xl font-bold text-forest">98%</p>
                <p className="text-[10px] text-forest/50 uppercase tracking-wider">Resolution Rate</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
