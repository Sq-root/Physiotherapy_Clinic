'use client';

import { faqs } from '@/lib/data/faqs';
import { Accordion } from '@/components/ui/Accordion';

export function FaqSection() {
  return (
    <section id="faq" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="lg:sticky lg:top-32">
            <span className="text-lime text-sm font-bold uppercase tracking-widest mb-4 block">FAQ</span>
            <h2 className="text-5xl font-serif italic text-forest mb-6">Patient Knowledge Base</h2>
            <p className="text-forest/70 text-lg font-medium leading-relaxed mb-8">
              Answers to common questions about your journey to recovery.
            </p>
            <div className="bg-seafoam/10 border border-seafoam/20 rounded-2xl p-6">
              <p className="text-forest font-bold mb-2">Still have questions?</p>
              <p className="text-forest/70 text-sm mb-4">
                Our care team is happy to help you personally.
              </p>
              <a href="#contact" className="inline-flex items-center font-bold text-seafoam hover:text-forest transition-colors gap-2">
                Get in touch <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </a>
            </div>
          </div>
          <div>
            <div className="space-y-4">
               <Accordion items={faqs} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
