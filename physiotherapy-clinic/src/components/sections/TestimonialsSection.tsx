import { testimonials } from '@/lib/data/testimonials';

export function TestimonialsSection() {
  return (
    <section className="bg-sage/10 py-24" id="testimonials">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-lime font-bold tracking-widest uppercase text-sm mb-4 block">Patient Stories</span>
          <h2 className="text-5xl font-serif italic text-forest mb-4">Real Transformations</h2>
          <p className="text-forest/70 text-lg font-medium">Hear from the people who&apos;ve walked this path and found their way back to life.</p>
        </div>
        
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-8 shadow-sm border border-forest/5 relative group hover:-translate-y-2 transition-transform duration-300"
            >
              <span className="material-symbols-outlined text-4xl text-lime/40 absolute top-8 right-8 transition-transform group-hover:scale-110">format_quote</span>
              
              <div className="flex gap-1 mb-6 text-lime">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <span key={j} className="material-symbols-outlined text-lg">star</span>
                ))}
              </div>

              <p className="text-forest text-sm leading-relaxed font-medium mb-8 italic">
                &ldquo;{t.content}&rdquo;
              </p>

              <div className="flex items-center gap-4 mt-auto pt-4 border-t border-forest/10">
                <div className="flex-shrink-0 size-10 rounded-full bg-forest text-white font-bold flex items-center justify-center text-xs">
                  {t.initials}
                </div>
                <div>
                  <p className="font-bold text-forest text-sm">{t.name}</p>
                  <p className="text-xs text-forest/60">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
