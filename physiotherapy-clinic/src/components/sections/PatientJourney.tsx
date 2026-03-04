'use client';

export function PatientJourney() {
  const steps = [
    {
      num: 1,
      title: "Assessment",
      desc: "Detailed breakdown of your injury history, biomechanics, and personal goals.",
    },
    {
      num: 2,
      title: "Hands-On Therapy",
      desc: "Targeted manual techniques to reduce pain, improve mobility, and restore function.",
    },
    {
      num: 3,
      title: "Progress Tracking",
      desc: "Data-driven milestones to ensure you're healing on schedule.",
    },
    {
      num: 4,
      title: "Recovery & Bloom",
      desc: "Return to full activity with a resilient body and the knowledge to stay healthy.",
    },
  ];

  const tags = [
    {
      id: 1,
      title: "Neck Stiffness",
      desc: "Therapeutic Touch, Controlled Motion, Reduce Stiffness",
      img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80&w=200",
      top: "10%",
      left: "0%",
      pointX: "50%",
      pointY: "18%",
    },
    {
      id: 2,
      title: "Hand Tightness",
      desc: "Reclaim Hand Function Through Targeted Treatment",
      img: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&q=80&w=200",
      top: "2%",
      right: "0%",
      pointX: "68%",
      pointY: "53%",
    },
    {
      id: 3,
      title: "Leg Fatigue",
      desc: "Restore Strength and Comfort in Your Legs Through Expert Therapy",
      img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=200",
      bottom: "25%",
      left: "0%",
      pointX: "43%",
      pointY: "72%",
    },
    {
      id: 4,
      title: "Palm Discomfort",
      desc: "Personalized hand therapy to relieve stress and tension.",
      img: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80&w=200",
      bottom: "10%",
      right: "0%",
      pointX: "50%",
      pointY: "30%",
    },
  ];

  return (
    <section className="bg-forest py-24 relative overflow-hidden" id="journey">
      {/* Subtle diamond pattern overlay */}
      <div
        className="absolute inset-0 opacity-5 bg-cover bg-center pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60' fill='none'%3E%3Cg opacity='1'%3E%3Cpath d='M30 0L60 30L30 60L0 30L30 0Z' fill='%23FCFFFF'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center relative z-10">

        {/* ── LEFT — Body Diagram with Interactive Tags ── */}
        <div className="relative h-[650px] w-full flex items-center justify-center">
          
          {/* Body Diagram Image */}
          <div className="relative h-[90%] w-auto group">
            <img
              src="/body-diagram.png"
              alt="Anatomical Body Diagram"
              className="h-full w-auto object-contain z-10 relative brightness-110"
            />
            
            {/* Soft radial glow behind body */}
            <div className="absolute inset-0 bg-seafoam/10 filter blur-[80px] rounded-full scale-75 -z-10 animate-pulse"></div>

            {/* Interactive Tags/Cards */}
            {tags.map((tag) => (
              <div
                key={tag.id}
                className="absolute z-20 group/tag"
                style={{
                  top: tag.top,
                  bottom: tag.bottom,
                  left: tag.left,
                  right: tag.right,
                  width: '240px',
                }}
              >
                {/* Connector Line (Simplified) */}
                <div 
                  className={`hidden lg:block absolute h-px bg-white/20 z-0 origin-left transition-all duration-500 group-hover/tag:bg-seafoam/40
                  ${tag.left !== undefined ? 'left-full top-1/2' : 'right-full top-1/2'}`}
                  style={{
                    width: '30px',
                    transform: tag.left !== undefined ? 'rotate(0deg)' : 'rotate(180deg)'
                  }}
                ></div>

                {/* Card Container */}
                <div className="bg-white/95 backdrop-blur-md p-2.5 rounded-2xl shadow-xl border border-white/20 transition-all duration-300 group-hover/tag:-translate-y-1 group-hover/tag:shadow-2xl flex gap-3">
                  <div className="size-14 rounded-lg overflow-hidden shrink-0 border border-forest/5 shadow-inner">
                    <img src={tag.img} alt={tag.title} className="w-full h-full object-cover transition-transform duration-500 group-hover/tag:scale-110" />
                  </div>
                  <div className="flex flex-col justify-center min-w-0">
                    <h4 className="text-forest font-bold text-[11px] leading-tight mb-0.5 truncate">{tag.title}</h4>
                    <p className="text-forest/60 text-[9px] leading-tight line-clamp-2">{tag.desc}</p>
                    <a href="#services" className="text-seafoam text-[8px] font-bold mt-1 flex items-center gap-0.5 hover:gap-1 transition-all">
                      View Services <span className="material-symbols-outlined text-[9px]">arrow_forward</span>
                    </a>
                  </div>
                </div>

                {/* Body Point Marker */}
                <div 
                   className="absolute size-2.5 rounded-full bg-white border-2 border-seafoam shadow-md z-30 animate-ping opacity-75"
                   style={{
                     left: tag.pointX,
                     top: tag.pointY,
                     transform: 'translate(-50%, -50%)',
                     pointerEvents: 'none'
                   }}
                ></div>
                <div 
                   className="absolute size-2.5 rounded-full bg-white border-2 border-seafoam shadow-md z-30"
                   style={{
                     left: tag.pointX,
                     top: tag.pointY,
                     transform: 'translate(-50%, -50%)'
                   }}
                ></div>
              </div>
            ))}
          </div>

          {/* Proven Methodology card */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-forest/80 backdrop-blur-md p-3.5 rounded-full border border-white/10 shadow-2xl z-30 flex items-center gap-3 px-6">
            <div className="size-7 rounded-full bg-seafoam flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-white text-sm">verified</span>
            </div>
            <p className="text-white font-bold text-[13px] whitespace-nowrap">Evidence-based recovery tracks</p>
          </div>
        </div>

        {/* ── RIGHT — Process label + Heading + Steps ── */}
        <div className="pl-0 lg:pl-10">

          {/* Section label */}
          <span className="text-seafoam font-bold tracking-widest uppercase text-xs mb-4 block">
            Process
          </span>

          {/* Heading */}
          <h2 className="text-5xl font-serif italic text-white mb-10 leading-tight">
            Your Journey from{" "}
            <br />
            <span className="text-lime not-italic">Pain-to-Peace</span>
          </h2>

          {/* Steps */}
          <div className="space-y-8 relative">
            {/* Vertical connector line */}
            <div className="absolute left-[22px] top-4 bottom-4 w-0.5 bg-white/10 rounded-full" />

            {steps.map((step, i) => (
              <div key={i} className="relative flex gap-8 group">
                {/* Step number circle */}
                <div
                  className={`relative z-10 shrink-0 size-11 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 shadow-md
                    ${i === 0
                      ? "bg-white border-4 border-forest text-forest"
                      : "bg-forest border-2 border-white/20 text-white group-hover:bg-white group-hover:text-forest group-hover:border-white"
                    }`}
                >
                  {step.num}
                </div>

                {/* Step content */}
                <div className="pt-1.5">
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-seafoam transition-colors duration-200">
                    {step.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed font-medium max-w-sm">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
