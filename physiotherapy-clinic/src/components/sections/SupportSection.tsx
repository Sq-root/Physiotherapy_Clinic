export function SupportSection() {
  return (
    <section className="relative py-10 bg-section mx-3 lg:mx-6 my-12 rounded-tl-[3rem] rounded-tr-[3rem] overflow-hidden" id="about">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          
          {/* Left Column (Images Collage) */}
          <div className="relative w-full max-w-md mx-auto lg:mx-0" style={{aspectRatio: '1/0.82'}}>
            {/* Left Large Portrait */}
            <div className="absolute top-0 left-0 w-[55%] h-[90%] rounded-[3rem] overflow-hidden shadow-card">
              <img 
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600" 
                alt="Senior Physiotherapist" 
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Top Right Small Image */}
            <div className="absolute top-0 right-0 w-[40%] h-[42%] rounded-[2rem] overflow-hidden shadow-card">
              <img 
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=400" 
                alt="Patient Stretching Session" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Bottom Right Small Image */}
            <div className="absolute bottom-0 right-0 w-[40%] h-[53%] rounded-[2rem] overflow-hidden shadow-card">
              <img 
                src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400" 
                alt="Massage Therapy Session" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Circular Badge Overlapping Center */}
            <div className="absolute top-1/2 left-[55%] -translate-x-1/2 -translate-y-[40%] size-24 md:size-28 bg-forest text-white rounded-full flex flex-col items-center justify-center border-[5px] border-sage z-20 shadow-lg overflow-hidden">
               <div className="absolute top-[-20%] right-[-20%] size-full bg-seafoam/10 rounded-full blur-xl pointer-events-none"></div>
               <span className="text-2xl md:text-3xl font-sans font-bold mb-0.5 tracking-tight">7+</span>
               <span className="text-[7px] md:text-[8px] font-bold uppercase tracking-[0.12em] text-center px-2 leading-tight">Years Of<br/>Expertise</span>
            </div>
          </div>

          {/* Right Column (Content) */}
          <div className="flex flex-col justify-center">
            {/* Pre-header */}
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-10 h-[1.5px] bg-seafoam"></div>
              <span className="text-forest text-[10px] font-bold uppercase tracking-[0.2em]">Our Trusted Support</span>
            </div>

            {/* Heading */}
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-sans text-forest leading-[1.2] font-medium tracking-tight mb-4">
              Passionate About <span className="text-seafoam font-normal">Providing<br/>Expert Care</span> And Support
            </h2>

            {/* Body Text Primary */}
            <p className="text-forest/80 text-sm md:text-base mb-4 leading-relaxed font-medium">
              Behind every successful recovery is a physiotherapist's passion for care, relentless support, and expert guidance relieving pain, and changing lives beyond treatment.
            </p>

            {/* Body Text Quote */}
            <div className="mb-6">
              <p className="text-forest text-xs md:text-sm leading-relaxed font-medium opacity-80 italic">
                "True Healing Comes From More Than Treatments—It's Built On Trust, Patience, And Compassion, Reflected In Each Small Victory And Ongoing Encouragement."
              </p>
            </div>

            {/* Signature Block */}
            <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-3">
                <img 
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200" 
                  alt="Dr. Priya Sharma" 
                  className="size-12 rounded-full object-cover border-2 border-white shadow-md object-top"
                />
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-forest/50 mb-0.5">Senior Doctor</p>
                  <p className="text-forest font-bold text-sm">Dr. Priya Sharma</p>
                </div>
              </div>
              <div className="font-script text-seafoam text-4xl -rotate-6">
                Priya
              </div>
            </div>

            {/* CTA Button */}
            <div>
              <a className="inline-flex items-center gap-3 pl-5 pr-1.5 py-1.5 bg-seafoam text-white font-medium rounded-full hover:bg-forest transition-colors duration-300 group shadow-md" href="#about">
                <span className="text-xs tracking-wide">Learn More</span>
                <span className="size-7 rounded-full bg-forest flex items-center justify-center text-white group-hover:bg-white group-hover:text-forest transition-colors">
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </span>
              </a>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}

