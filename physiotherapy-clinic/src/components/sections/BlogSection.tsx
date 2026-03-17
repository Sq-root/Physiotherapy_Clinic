import { ArrowRight } from 'lucide-react';

export function BlogSection() {
  return (
    <section className="py-24 bg-white" id="journal">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <span className="text-seafoam font-bold tracking-widest uppercase text-sm mb-4 block">Recovery Journal</span>
            <h2 className="text-5xl font-sans italic text-forest mb-4">Insights & Healing</h2>
            <p className="text-forest/70 text-lg font-medium">Expert advice, patient stories, and tips for maintaining a healthy, active lifestyle.</p>
          </div>
          <a className="inline-flex items-center gap-2 font-bold text-seafoam hover:text-forest transition-colors group" href="#">
            View All Articles
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Article 1 */}
          <article className="group cursor-pointer">
            <div className="relative h-64 overflow-hidden rounded-3xl mb-6 shadow-md">
              <img alt="Blog Post" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="/services/IMG_0119.webp"/>
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-forest uppercase tracking-widest">Therapy Tips</div>
            </div>
            <div className="flex items-center gap-4 text-sm text-forest/60 mb-3 font-medium">
              <span>Oct 12, 2023</span>
              <span className="w-1 h-1 rounded-full bg-seafoam"></span>
              <span>5 min read</span>
            </div>
            <h3 className="text-2xl font-bold text-forest mb-3 leading-snug group-hover:text-seafoam transition-colors">5 Stretches to Alleviate Lower Back Pain at Your Desk</h3>
            <p className="text-forest/70 line-clamp-2 font-medium">Simple movements you can integrate into your workday to prevent stiffness and maintain spinal health.</p>
          </article>

          {/* Article 2 */}
          <article className="group cursor-pointer">
            <div className="relative h-64 overflow-hidden rounded-3xl mb-6 shadow-md">
              <img alt="Blog Post" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="/services/IMG_0114.webp"/>
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-forest uppercase tracking-widest">Sports Rehab</div>
            </div>
            <div className="flex items-center gap-4 text-sm text-forest/60 mb-3 font-medium">
              <span>Nov 05, 2023</span>
              <span className="w-1 h-1 rounded-full bg-seafoam"></span>
              <span>7 min read</span>
            </div>
            <h3 className="text-2xl font-bold text-forest mb-3 leading-snug group-hover:text-seafoam transition-colors">Return to Sport: A Phased Approach to Athletic Recovery</h3>
            <p className="text-forest/70 line-clamp-2 font-medium">Learn the evidence-backed framework our therapists use to safely return athletes to peak performance after injury.</p>
          </article>

          {/* Article 3 */}
          <article className="group cursor-pointer">
            <div className="relative h-64 overflow-hidden rounded-3xl mb-6 shadow-md">
              <img alt="Blog Post" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="/services/IMG_0014.webp"/>
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-forest uppercase tracking-widest">Wellness</div>
            </div>
            <div className="flex items-center gap-4 text-sm text-forest/60 mb-3 font-medium">
              <span>Dec 18, 2023</span>
              <span className="w-1 h-1 rounded-full bg-seafoam"></span>
              <span>6 min read</span>
            </div>
            <h3 className="text-2xl font-bold text-forest mb-3 leading-snug group-hover:text-seafoam transition-colors">The Mind-Body Connection in Physiotherapy</h3>
            <p className="text-forest/70 line-clamp-2 font-medium">Explore how psychological wellbeing and physical recovery are more deeply intertwined than most patients realize.</p>
          </article>
        </div>
      </div>
    </section>
  );
}
