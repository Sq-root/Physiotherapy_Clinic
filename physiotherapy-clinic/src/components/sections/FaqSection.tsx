'use client';

import { faqs } from '@/lib/data/faqs';
import { Accordion } from '@/components/ui/Accordion';
import { motion } from 'framer-motion';

export function FaqSection() {
  return (
    <section id="faq" className="bg-white py-32 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <span className="text-seafoam font-bold tracking-[0.3em] uppercase text-xs mb-4 block">
            Common Questions
          </span>
          <h2 className="text-4xl md:text-5xl font-sans font-bold text-forest mb-6 tracking-tight">
            Patient Knowledge Base
          </h2>
          <p className="text-forest/60 text-lg font-medium leading-relaxed max-w-2xl mx-auto">
            Everything you need to know about your journey to recovery at Vitality Path.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion items={faqs} />
        </div>
        
        {/* Contact CTA */}
        <div className="mt-20 text-center">
          <p className="text-forest/60 font-medium mb-6">Still have questions? Our care team is happy to help.</p>
          <a 
            href="#contact" 
            className="inline-flex items-center gap-2 font-bold text-seafoam hover:text-forest transition-colors group"
          >
            Get in touch 
            <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">
              arrow_forward
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
