export function ServicesSection() {
  const cards = [
    {
      title: "Advanced Physiotherapy Treatment",
      desc: "Our advanced physiotherapy treatments are designed to...",
      img: "https://images.unsplash.com/photo-1588286840104-8957b019727f?auto=format&fit=crop&q=80"
    },
    {
      title: "Lower Back Pain Management",
      desc: "Our lower back physiotherapy treatment focuses on...",
      img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80"
    },
    {
      title: "Manual Therapy",
      desc: "Manual therapy is a hands-on physiotherapy technique...",
      img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80"
    },
    {
      title: "Strength Recovery Therapy",
      desc: "Our shoulder rehabilitation therapy is specially designed...",
      img: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&q=80"
    },
    {
      title: "Neuromuscular Rehabilitation",
      desc: "Our specialized hand therapy program focuses on...",
      img: "https://images.unsplash.com/photo-1550831107-1553da8c8464?auto=format&fit=crop&q=80"
    }
  ];

  return (
    <section className="relative py-24 bg-section overflow-hidden" id="services">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-seafoam/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
      </div>

      <div className="mx-auto max-w-[1400px] px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-[1px] bg-seafoam"></div>
            <span className="text-forest text-[10px] font-bold uppercase tracking-[0.2em]">Recover With Confidence</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans text-forest leading-[1.2] font-medium tracking-tight max-w-4xl mx-auto">
            Expert <span className="text-seafoam font-normal">Therapy Focused</span> On <br/>Movement And Wellness
          </h2>
        </div>

        {/* Bento Grid Layout using Flex */}
        <div className="flex flex-col lg:flex-row gap-6 lg:h-[760px]">
          
          {/* Left Column */}
          <div className="flex flex-col gap-6 lg:w-[28%] lg:h-full">
            {/* Card 1 */}
            <div className="relative rounded-[2.5rem] overflow-hidden group flex-[1.1] w-full bg-white shadow-card">
              <img src={cards[0].img} alt={cards[0].title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/40 to-transparent"></div>
              <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end h-full">
                <div className="flex items-end justify-between gap-4 mt-auto">
                  <div className="pr-4">
                    <h3 className="text-xl xl:text-2xl font-bold text-white mb-3 leading-tight">{cards[0].title}</h3>
                    <p className="text-white/80 text-sm font-medium line-clamp-2 leading-relaxed">{cards[0].desc}</p>
                  </div>
                  <button className="flex-shrink-0 size-12 rounded-full bg-white text-forest flex items-center justify-center hover:bg-seafoam hover:text-white transition-all shadow-md group-hover:-translate-y-1">
                    <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="relative rounded-[2.5rem] overflow-hidden group flex-1 w-full bg-white shadow-card">
              <img src={cards[1].img} alt={cards[1].title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/40 to-transparent"></div>
              <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end h-full">
                <div className="flex items-end justify-between gap-4 mt-auto">
                  <div className="pr-4">
                    <h3 className="text-xl xl:text-2xl font-bold text-white mb-3 leading-tight">{cards[1].title}</h3>
                    <p className="text-white/80 text-sm font-medium line-clamp-2 leading-relaxed">{cards[1].desc}</p>
                  </div>
                  <button className="flex-shrink-0 size-12 rounded-full bg-white text-forest flex items-center justify-center hover:bg-seafoam hover:text-white transition-all shadow-md group-hover:-translate-y-1">
                    <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Column (Hero Card) */}
          <div className="lg:w-[44%] lg:h-full">
            <div className="relative rounded-[3rem] overflow-hidden group w-full h-[500px] lg:h-full bg-white shadow-card">
              <img src={cards[2].img} alt={cards[2].title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/20 to-transparent"></div>
              <div className="absolute inset-x-0 bottom-0 p-10 xl:p-12 flex flex-col justify-end h-full">
                 <div className="flex items-end justify-between gap-6 mt-auto">
                  <div className="pr-8">
                    <h3 className="text-3xl xl:text-4xl font-bold text-white mb-4 leading-tight">{cards[2].title}</h3>
                    <p className="text-white/80 text-base xl:text-lg font-medium line-clamp-3 leading-relaxed">{cards[2].desc}</p>
                  </div>
                  <button className="flex-shrink-0 size-16 rounded-full bg-white text-forest flex items-center justify-center hover:bg-seafoam hover:text-white transition-all shadow-lg group-hover:-translate-y-1">
                    <span className="material-symbols-outlined text-[24px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6 lg:w-[28%] lg:h-full">
             {/* Card 4 */}
             <div className="relative rounded-[2.5rem] overflow-hidden group flex-1 w-full bg-white shadow-card">
              <img src={cards[3].img} alt={cards[3].title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/40 to-transparent"></div>
              <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end h-full">
                <div className="flex items-end justify-between gap-4 mt-auto">
                  <div className="pr-4">
                    <h3 className="text-xl xl:text-2xl font-bold text-white mb-3 leading-tight">{cards[3].title}</h3>
                    <p className="text-white/80 text-sm font-medium line-clamp-2 leading-relaxed">{cards[3].desc}</p>
                  </div>
                  <button className="flex-shrink-0 size-12 rounded-full bg-white text-forest flex items-center justify-center hover:bg-seafoam hover:text-white transition-all shadow-md group-hover:-translate-y-1">
                    <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Card 5 */}
            <div className="relative rounded-[2.5rem] overflow-hidden group flex-[1.1] w-full bg-white shadow-card">
              <img src={cards[4].img} alt={cards[4].title} className="absolute inset-0 w-full h-full object-cover top-0 transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/40 to-transparent"></div>
               <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end h-full">
                <div className="flex items-end justify-between gap-4 mt-auto">
                  <div className="pr-4">
                    <h3 className="text-xl xl:text-2xl font-bold text-white mb-3 leading-tight">{cards[4].title}</h3>
                    <p className="text-white/80 text-sm font-medium line-clamp-2 leading-relaxed">{cards[4].desc}</p>
                  </div>
                  <button className="flex-shrink-0 size-12 rounded-full bg-white text-forest flex items-center justify-center hover:bg-seafoam hover:text-white transition-all shadow-md group-hover:-translate-y-1">
                    <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 flex justify-center">
          <a className="inline-flex items-center justify-center gap-4 px-8 py-3 bg-transparent border border-forest text-forest hover:bg-forest hover:text-white transition-colors rounded-full text-sm font-medium tracking-wide group" href="#all-services">
            View All Services
            <span className="size-8 rounded-full bg-seafoam flex items-center justify-center text-forest group-hover:bg-white transition-colors">
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
