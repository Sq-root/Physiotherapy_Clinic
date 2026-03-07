'use client';

import { Sparkles } from 'lucide-react';

export function CtaBanner() {
  return (
    <section className="bg-gradient-to-br from-seafoam to-forest py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      
      <div className="mx-auto max-w-3xl px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur rounded-full px-4 py-2 mb-8 border border-white/20">
          <Sparkles className="w-4 h-4 text-white" />
          <span className="text-white text-xs font-bold tracking-[0.2em] uppercase">Start Your Recovery Today</span>
        </div>

        <h2 className="text-5xl md:text-7xl font-sans font-normal text-white mb-6">
          Ready to <span className="font-script text-white text-7xl md:text-9xl block mt-2 normal-case">Bloom?</span>
        </h2>
        
        <p className="text-white/90 text-lg max-w-xl mx-auto mb-12 font-medium">
          Take the first step toward a pain-free life. Your journey to recovery starts with a single conversation.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="h-16 px-12 bg-white text-forest font-bold uppercase tracking-widest text-sm hover:scale-105 transition-all rounded-full flex items-center justify-center shadow-xl cursor-pointer"
          >
            Make An Appointment
          </button>
          <a 
            href="tel:+15551234567" 
            className="h-16 px-12 bg-transparent border-2 border-white/40 text-white font-bold uppercase tracking-widest text-sm hover:bg-white/10 hover:border-white transition-all rounded-full flex items-center justify-center cursor-pointer"
          >
            Call Us Now
          </a>
        </div>
      </div>
    </section>
  );
}
