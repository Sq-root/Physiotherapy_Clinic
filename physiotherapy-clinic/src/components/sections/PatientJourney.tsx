export function PatientJourney() {
  return (
    <section className="bg-forest py-24 relative overflow-hidden" id="journey">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIiBmaWxsPSJub25lIj48ZyBvcGFjaXR5PSIwLjA1Ij48cGF0aCBkPSJNMzAgMEw2MCAzMEwzMCA2MEwwIDMwTDMwIDBaIiBmaWxsPSIjRkNGRkZGIi8+PC9nPjwvc3ZnPg==')] opacity-5 bg-cover bg-center"></div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <div className="relative h-[600px] rounded-[4rem] overflow-hidden border-4 border-white/10 shadow-2xl bg-sage/10 backdrop-blur-sm group">
          <img alt="Therapy Session" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAuXHBjeyNYTrP-qPuDU-zhb0jdL5DHij1wBDrHe7iW7-JbszNbooy2kJrr6K7lHz9wISN1VReKtO2ygCUZ7K71_SIAYqQjronKxfRO38wILL8GAo2vkLW6Cx6VTONnQDnC1uJ4r8Gt0qsSyj9y1LkrGzJbEfHPu1aFz4D1HQYrfShKSQmPG63hhbBOhVyT8tVbt_J9h-sS9O2d7hRht9nruzbRJKAiwUgxfXsr0hrahzcEhJxeeU_LJM1_jUsptz--Xo2CwICSFADs"/>
          <div className="absolute bottom-10 left-10 right-10 bg-white/95 backdrop-blur p-6 rounded-3xl border border-forest/10 shadow-lg z-20">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-full bg-seafoam flex items-center justify-center">
                <span className="material-symbols-outlined text-white">verified</span>
              </div>
              <div>
                <p className="text-forest font-bold text-lg">Proven Methodology</p>
                <p className="text-sm text-forest/70">Evidence-based recovery tracks</p>
              </div>
            </div>
          </div>
        </div>
        <div className="pl-0 lg:pl-10">
          <span className="text-lime font-bold tracking-widest uppercase text-sm mb-4 block">Process</span>
          <h2 className="text-5xl font-serif italic text-white mb-12 leading-tight">Your Journey from <br/><span className="text-lime not-italic">Pain-to-Peace</span></h2>
          <div className="space-y-10 relative">
            <div className="absolute left-[22px] top-4 bottom-4 w-0.5 bg-white/10 rounded-full"></div>
            <div className="relative flex gap-8 group">
              <div className="relative z-10 shrink-0 size-12 rounded-full bg-white border-4 border-forest flex items-center justify-center text-forest font-bold text-xl">1</div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-lime transition-colors">Assessment</h3>
                <p className="text-white/70 leading-relaxed font-medium max-w-md">Detailed breakdown of your injury history, biomechanics, and personal goals.</p>
              </div>
            </div>
            <div className="relative flex gap-8 group">
              <div className="relative z-10 shrink-0 size-12 rounded-full bg-forest border-2 border-white/20 flex items-center justify-center text-white font-bold text-xl">2</div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-lime transition-colors">Hands-On Therapy</h3>
                <p className="text-white/70 leading-relaxed font-medium max-w-md">Targeted manual techniques to reduce pain, improve mobility, and restore function.</p>
              </div>
            </div>
            <div className="relative flex gap-8 group">
              <div className="relative z-10 shrink-0 size-12 rounded-full bg-forest border-2 border-white/20 flex items-center justify-center text-white font-bold text-xl">3</div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-lime transition-colors">Progress Tracking</h3>
                <p className="text-white/70 leading-relaxed font-medium max-w-md">Data-driven milestones to ensure you&apos;re healing on schedule.</p>
              </div>
            </div>
            <div className="relative flex gap-8 group">
              <div className="relative z-10 shrink-0 size-12 rounded-full bg-forest border-2 border-white/20 flex items-center justify-center text-white font-bold text-xl">4</div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-lime transition-colors">Recovery & Bloom</h3>
                <p className="text-white/70 leading-relaxed font-medium max-w-md">Return to full activity with a resilient body and the knowledge to stay healthy.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
