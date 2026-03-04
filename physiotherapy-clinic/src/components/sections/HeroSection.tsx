'use client';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
            alt="Serene Clinic Garden" 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDldKYYAG93Fy6_M_0J-LjzMLpzP4F9IlHnAwNzoV3v8adKBkK4r2myxsdwxZui_GGvL-YpXtSOlOrhDYQva0qYFEL-fAIRd-0a2KCXaA5q5QH1G01WMmZpsNKjtM6fATRvmtJCqGWw7iGFiQrO7pAzM6E2moS1HQOzOM_aOYIZ6kHibVb9Jjxk6C6UncuFGgtbbXO0_9uyrug_Po0AaRJqwzrrVWeurisZ2m2vakwssTtUMSTYlrlFmeDewOT9KKj_oT0ZxZJeulbk"
        />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-forest/60 via-transparent to-black/40"></div>
      </div>
      
      <div className="absolute bottom-0 left-0 z-10 w-1/3 max-w-[400px] pointer-events-none">
        <svg className="botanical-art w-full h-auto" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path d="M10,190 Q50,150 40,80 T80,20 M10,190 Q80,170 120,120 T150,50 M10,190 Q120,190 170,140 T190,80" fill="none" stroke="white" strokeWidth="0.5"></path>
          <circle cx="80" cy="20" fill="white" r="2"></circle>
          <circle cx="150" cy="50" fill="white" r="2"></circle>
          <circle cx="190" cy="80" fill="white" r="2"></circle>
          <path d="M40,80 L35,70 Q40,65 45,70 Z M120,120 L115,110 Q120,105 125,110 Z" fill="white"></path>
        </svg>
      </div>

      <div className="relative z-20 mx-auto max-w-4xl px-6 text-center text-white mt-24">
        <div className="inline-block bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-8">
          <span className="text-xs font-bold uppercase tracking-[0.3em]">Boutique Physiotherapy</span>
        </div>
        
        <h1 className="text-5xl md:text-8xl font-sans font-normal text-white leading-[1.1] mb-6">
          Begin Your <br/>
          <span className="font-script text-lime block mt-2 text-6xl md:text-9xl normal-case">Inner Recovery Journey</span>
        </h1>
        
        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
          Embark on a journey of self-discovery and physical healing with our expert therapists in a serene, nature-inspired environment.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <a 
            className="h-16 px-12 bg-seafoam text-white font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-forest transition-all rounded-full flex items-center shadow-xl cursor-pointer" 
            href="#booking-form"
          >
            Make An Appointment
          </a>
          <a 
            className="h-16 px-12 bg-forest/40 backdrop-blur-md border border-white/30 text-white font-bold uppercase tracking-widest text-sm hover:bg-white/20 transition-all rounded-full flex items-center cursor-pointer" 
            href="#services"
          >
            Explore Services
          </a>
        </div>
        
        <div className="mt-16 flex flex-col items-center gap-4 opacity-80">
          <div className="flex -space-x-3">
            <img alt="User" className="w-10 h-10 rounded-full border-2 border-white/50 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5ZCevtNNTZCHVhC88hP8Y3KUMrJzlSGalWN75be9_XboR-mWEdpxLgn0NSwyKpYD0vVT78O8nZocVFQtW7z72VXhiYuPqz0FZ1cGZiCCvenkBgugfKoWDTwKYwakka4nQGbfXMs-CVROoPQqa9TtrPuTLlrzw__W5eF-C48623m_MUgKe7ZFSrjr0Txp71QVdevTei10F_HIHUHjwSEywFMIpurKYXpTxUmRgj0kJ38_2vH_3mwGxAzVzf3SyexT9lBzD6c_mdHV7"/>
            <img alt="User" className="w-10 h-10 rounded-full border-2 border-white/50 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5ZCevtNNTZCHVhC88hP8Y3KUMrJzlSGalWN75be9_XboR-mWEdpxLgn0NSwyKpYD0vVT78O8nZocVFQtW7z72VXhiYuPqz0FZ1cGZiCCvenkBgugfKoWDTwKYwakka4nQGbfXMs-CVROoPQqa9TtrPuTLlrzw__W5eF-C48623m_MUgKe7ZFSrjr0Txp71QVdevTei10F_HIHUHjwSEywFMIpurKYXpTxUmRgj0kJ38_2vH_3mwGxAzVzf3SyexT9lBzD6c_mdHV7"/>
            <img alt="User" className="w-10 h-10 rounded-full border-2 border-white/50 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_JfxnUTxS996Y5F8wO8-dk_fSCKHC5UfLsIJyGMAB9Lk3DcKmrHFrSFG3vWqAro4yEwpYrN0oNt2PMJkVjMr9krFgJfW5k1ijqPtLepW0WpL0nk8cWzL9NicOG2K3KLIu2ufiCdbzXYqjMKb1-_HN38tWPfzhCMotrqKi_pCcgije0gtkTOL3-iqE0sfNhAHTHsR7QpcEHpDn4fRCFLnrqxsHEtRiRDxbH1zUhFFaXNlCMOS-i5ccFa8rzZGqNSKp-p-UUWOCOqrV"/>
          </div>
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-white/70">1,200+ Lives Restored</p>
          </div>
        </div>
      </div>
    </section>
  );
}
