import Image from 'next/image';
import { Target, Eye } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="font-sans text-forest antialiased selection:bg-seafoam selection:text-forest">
      {/* Editorial Hero Section */}
      <section className="relative w-full h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-forest/80 via-forest/40 to-transparent z-10"></div>
          <Image
            alt="Dr. Sarah Mitchell"
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=1600&q=80&auto=format&fit=crop"
            fill
            priority
          />
        </div>
        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-12 w-full pt-20">
          <div className="max-w-2xl">
            <span className="inline-block bg-lime text-forest px-5 py-2 rounded-full text-xs font-bold shadow-md shadow-lime/20 tracking-[0.2em] uppercase mb-6">
              Founder & Lead Physiotherapist
            </span>
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
              Dr. Sarah Mitchell
            </h2>
            <p className="text-xl text-white/90 font-light leading-relaxed mb-8 max-w-lg">
              Dedicated to restoring movement and enhancing the quality of life
              through empathetic, evidence-based care.
            </p>
          </div>
        </div>
      </section>

      {/* Overlapping Content Section (Mission & Vision) */}
      <section className="relative z-30 -mt-24 pb-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission Block */}
          <div className="bg-white/90 backdrop-blur-md p-10 md:p-14 rounded-2xl shadow-xl shadow-forest/5 border-l-[4px] border-lime">
            <div className="text-lime mb-6 size-12 bg-lime/10 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-forest" />
            </div>
            <h3 className="text-3xl tracking-tight font-bold mb-6 text-forest">
              Our Mission
            </h3>
            <p className="text-forest/70 text-base md:text-lg leading-relaxed font-light">
              To provide personalized, clinical excellence that empowers our
              patients to overcome physical limitations. We don&apos;t just treat
              symptoms; we treat individuals, ensuring every step of the recovery
              journey is supported by science and genuine care.
            </p>
          </div>

          {/* Vision Block */}
          <div className="bg-forest p-10 md:p-14 rounded-2xl shadow-2xl relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-lime/10 rounded-full blur-3xl z-0" />
            
            <div className="relative z-10 text-lime mb-6 size-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/5">
              <Eye className="w-6 h-6 text-lime" />
            </div>
            <h3 className="relative z-10 text-3xl tracking-tight font-bold mb-6 text-white">
              Our Vision
            </h3>
            <p className="relative z-10 text-white/70 text-base md:text-lg leading-relaxed font-light">
              To become the leading center for holistic physical rehabilitation,
              where innovation meets empathy. We envision a community where
              chronic pain and mobility issues are managed with world-class
              expertise, returning people to the lives they love.
            </p>
          </div>
        </div>
      </section>

      {/* Personal Introduction Section */}
      <section className="py-24 bg-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Image Column */}
            <div className="lg:col-span-5 relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-forest/20 group relative border-4 border-white/50">
                <Image
                  alt="Portrait of Dr. Sarah Mitchell"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src="https://images.unsplash.com/photo-1594824432247-41ecdfb8417c?w=800&q=80&auto=format&fit=crop"
                  fill
                />
              </div>
              
              <div className="absolute -bottom-8 -right-4 md:-right-8 bg-white/95 backdrop-blur-xl p-8 rounded-2xl shadow-xl shadow-forest/10 hidden md:block border border-forest/5">
                <p className="text-5xl font-bold text-forest mb-1">15<span className="text-lime">+</span></p>
                <p className="text-[10px] font-bold text-forest/50 uppercase tracking-[0.2em]">
                  Years of Experience
                </p>
              </div>
            </div>

            {/* Text Column */}
            <div className="lg:col-span-7 pt-4 md:pl-8">
              <h4 className="text-lime font-bold text-[10px] tracking-[0.2em] uppercase mb-4">
                The Heart of Vitality Path
              </h4>
              <h2 className="text-4xl md:text-5xl font-bold mb-10 leading-tight tracking-tight text-forest">
                A Personal Note from <br />
                <span className="relative inline-block mt-2">
                  <span className="relative z-10 font-script text-5xl md:text-6xl text-lime font-normal">Dr. Mitchell</span>
                </span>
              </h2>
              
              <div className="space-y-6 text-forest/70 text-lg leading-relaxed font-light">
                <p>
                  My journey into physiotherapy began with a simple observation:
                  the human body is remarkably resilient, yet often
                  misunderstood. After completing my Doctorate in Physical
                  Therapy, I spent a decade working with elite athletes and
                  clinical patients alike, noticing that the most successful
                  outcomes always stemmed from a partnership between therapist
                  and patient.
                </p>
                <p>
                  I founded this clinic because I wanted to create a space where
                  patients aren&apos;t just a number on a chart. Here, we take the
                  time to listen. We look at the biomechanics of how you move,
                  but we also listen to how your injury impacts your daily life,
                  your hobbies, and your mental well-being.
                </p>
                <div className="relative mt-8 mb-8 p-8 rounded-2xl bg-white/50 border border-forest/10 italic text-forest shadow-sm text-lg md:text-xl font-medium leading-relaxed">
                  <div className="absolute -left-3 -top-4 text-5xl text-lime/40 font-serif">&quot;</div>
                  My goal isn&apos;t just to get you back on your feet; it&apos;s to keep
                  you there, stronger and more confident than you were before.
                </div>
              </div>
              
              <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-forest/10 pt-10">
                <div>
                  <h5 className="font-bold text-forest mb-2 uppercase tracking-wider text-xs">Education</h5>
                  <p className="text-sm text-forest/60 font-medium">Doctorate of Physical Therapy</p>
                  <p className="text-xs text-forest/50 mt-1 font-light">Stanford University</p>
                </div>
                <div>
                  <h5 className="font-bold text-forest mb-2 uppercase tracking-wider text-xs">Specialization</h5>
                  <p className="text-sm text-forest/60 font-medium">Orthopedic Manual Therapy</p>
                  <p className="text-xs text-forest/50 mt-1 font-light">& Sports Medicine</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 lg:px-12 relative overflow-hidden bg-forest text-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
          {/* Subtle noise/texture using CSS class from globals if available, otherwise solid */}
        </div>
        
        <div className="max-w-4xl mx-auto relative z-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">
            Ready to start your recovery?
          </h2>
          <p className="text-lg md:text-xl text-white/70 font-light mb-12 max-w-2xl mx-auto">
            Join hundreds of patients who have found relief and regained their
            mobility under Dr. Mitchell&apos;s expert care.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <button className="bg-lime text-forest px-8 py-4 rounded-full font-bold hover:bg-white transition-all shadow-lg shadow-black/20 text-sm tracking-wide">
              Schedule an Evaluation
            </button>
            <button className="bg-white/10 backdrop-blur-sm text-white border border-white/20 px-8 py-4 rounded-full font-bold hover:bg-white/20 transition-all text-sm tracking-wide">
              View Our Services
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
