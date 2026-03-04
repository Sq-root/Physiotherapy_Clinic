export function ServicesSection() {
  return (
    <section className="relative py-24 bg-sage/20" id="services">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="bg-lime/20 border border-lime text-forest font-bold uppercase tracking-widest text-xs mb-4 inline-block px-3 py-1 rounded-full">Our Expertise</span>
          <h2 className="text-5xl md:text-6xl font-bold text-forest mt-2 mb-6 font-serif italic">Bloom With Our Services</h2>
          <p className="text-forest/70 text-lg font-medium">Comprehensive care tailored to your specific stage of life and recovery.</p>
        </div>
      </div>
      
      <div className="sticky top-24 z-40 bg-white/80 backdrop-blur-md border-y border-forest/10 py-4 mb-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 flex justify-center">
          <nav className="flex gap-2 md:gap-8 overflow-x-auto no-scrollbar py-2">
            <a className="px-6 py-2 rounded-full bg-forest text-white text-sm font-bold uppercase tracking-wide hover:bg-seafoam transition-all whitespace-nowrap" href="#orthopedic">Orthopedic</a>
            <a className="px-6 py-2 rounded-full border border-forest/20 text-forest text-sm font-bold uppercase tracking-wide hover:bg-seafoam hover:text-white transition-all whitespace-nowrap bg-white" href="#sports">Sports</a>
            <a className="px-6 py-2 rounded-full border border-forest/20 text-forest text-sm font-bold uppercase tracking-wide hover:bg-seafoam hover:text-white transition-all whitespace-nowrap bg-white" href="#neurological">Neurological</a>
            <a className="px-6 py-2 rounded-full border border-forest/20 text-forest text-sm font-bold uppercase tracking-wide hover:bg-seafoam hover:text-white transition-all whitespace-nowrap bg-white" href="#pediatric">Pediatric</a>
          </nav>
        </div>
      </div>
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-32">
        <div className="scroll-mt-48 grid lg:grid-cols-2 gap-16 items-center" id="orthopedic">
          <div className="relative group">
            <div className="absolute -inset-4 bg-seafoam/10 rounded-5xl rotate-3 group-hover:rotate-6 transition-transform duration-500"></div>
            <img alt="Orthopedic" className="relative rounded-5xl shadow-xl w-full aspect-[4/3] object-cover z-10" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmM6vJbOVljNe8ImuH6Mt7nLdEXowsfKuxy-Ued0sWHrf3k5JSVupKi8O4N71dbNrcW0G6bpzM9hD9a1wCvq-_XxXZX_NRp8jf0hxFB6LaK7WrDO7OVXiD_z2lLNhCQztz5OdQQEl3l66PVxeOFst3iOH3W6CdYvpu8Pjq32wPHCZ5FQjzsjwgP_q3hB668s9ljcSYRsqoYgKOaJcwWU_hQ1_sy6KOI1tAM5gvfhBWgdVN3JuHRkT5OEXEkrMTQ5p5W6PGtBbYMKaS"/>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="p-3 rounded-full bg-seafoam text-white shadow-sm">
                <span className="material-symbols-outlined text-2xl">orthopedics</span>
              </span>
              <h3 className="text-4xl font-serif italic text-forest">Orthopedic Care</h3>
            </div>
            <p className="text-lg text-forest/80 mb-10 leading-relaxed font-medium">Restoring the structural integrity of your body through advanced manual techniques and strength conditioning.</p>
            <div className="grid sm:grid-cols-2 gap-8 mb-10">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-forest/5">
                <h4 className="font-bold text-seafoam uppercase tracking-wider text-xs mb-4 border-b border-seafoam/10 pb-2">Common Symptoms</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-sm text-forest/80 font-medium">
                    <span className="material-symbols-outlined text-seafoam text-base">check_circle</span> Back & Neck Pain
                  </li>
                  <li className="flex items-start gap-2 text-sm text-forest/80 font-medium">
                    <span className="material-symbols-outlined text-seafoam text-base">check_circle</span> Arthritis
                  </li>
                  <li className="flex items-start gap-2 text-sm text-forest/80 font-medium">
                    <span className="material-symbols-outlined text-seafoam text-base">check_circle</span> Joint Stiffness
                  </li>
                </ul>
              </div>
              <div className="bg-forest/5 p-6 rounded-3xl border border-forest/5">
                <h4 className="font-bold text-forest uppercase tracking-wider text-xs mb-4 border-b border-forest/10 pb-2">Our Approach</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-sm text-forest/80 font-medium">
                    <span className="material-symbols-outlined text-forest text-base">spa</span> Manual Therapy
                  </li>
                  <li className="flex items-start gap-2 text-sm text-forest/80 font-medium">
                    <span className="material-symbols-outlined text-forest text-base">spa</span> Joint Mobilization
                  </li>
                  <li className="flex items-start gap-2 text-sm text-forest/80 font-medium">
                    <span className="material-symbols-outlined text-forest text-base">spa</span> Posture Correction
                  </li>
                </ul>
              </div>
            </div>
            <a className="inline-flex items-center justify-center px-8 py-4 bg-seafoam text-white font-bold uppercase tracking-widest rounded-full hover:bg-forest transition-all shadow-lg" href="#booking-form">
              Book Specialized Session
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
