'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export function AppointmentSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
  });

  const services = [
    { id: "ortho", label: "Orthopedic", icon: "🦴" },
    { id: "sports", label: "Sports", icon: "⚡" },
    { id: "neuro", label: "Neuro", icon: "🧠" },
    { id: "manual", label: "Manual", icon: "🤲" },
    { id: "senior", label: "Senior", icon: "💚" },
    { id: "surgery", label: "Post-Op", icon: "🏥" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <section id="appointment" className="relative py-12 md:py-16 overflow-hidden">
      {/* Split Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-forest" />
        <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full bg-white hidden lg:block" />
      </div>

      {/* Background Pattern on Dark Side */}
      <div className="absolute inset-0 lg:w-1/2 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}
        />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-seafoam/10 rounded-full blur-[80px]" />
      </div>

      <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-0 items-center">
          
          {/* Left - Content */}
          <motion.div
            className="lg:pr-12"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-seafoam">Available Now</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans text-white font-semibold leading-[1.1] tracking-tight mb-4">
              Book Your<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-seafoam to-lime">Free Assessment</span>
            </h2>
            
            <p className="text-white/50 text-sm md:text-base max-w-md mb-8">
              Start your recovery journey with a complimentary consultation. Our experts will create your personalized treatment plan.
            </p>

            {/* Feature List */}
            <div className="space-y-3 mb-8">
              {[
                { text: "Same-day appointments available", icon: "⚡" },
                { text: "Expert physiotherapists on staff", icon: "👨‍⚕️" },
                { text: "Insurance accepted & verified", icon: "✅" },
              ].map((item, i) => (
                <motion.div
                  key={item.text}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-white/70 text-sm">{item.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Contact Quick Links */}
            <div className="flex items-center gap-6">
              <a href="tel:+15551234567" className="group flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-seafoam/20 transition-colors">
                  <svg className="w-4 h-4 text-seafoam" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white text-sm font-medium">Call Us</p>
                  <p className="text-white/50 text-xs">(555) 123-4567</p>
                </div>
              </a>
              <div className="w-px h-10 bg-white/10" />
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-seafoam" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white text-sm font-medium">Hours</p>
                  <p className="text-white/50 text-xs">Mon-Sat 9-10PM</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Modern Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:pl-8"
          >
            <div className="bg-white rounded-2xl p-5 md:p-6 shadow-2xl shadow-forest/10 lg:shadow-none border border-forest/5 lg:border-0">
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Inline Fields Row */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                      <svg className="w-4 h-4 text-forest/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-section/40 border-0 rounded-lg text-xs text-forest placeholder:text-forest/40 focus:outline-none focus:ring-2 focus:ring-seafoam/30"
                    />
                  </div>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                      <svg className="w-4 h-4 text-forest/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-section/40 border-0 rounded-lg text-xs text-forest placeholder:text-forest/40 focus:outline-none focus:ring-2 focus:ring-seafoam/30"
                    />
                  </div>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                      <svg className="w-4 h-4 text-forest/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <input
                      type="tel"
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-section/40 border-0 rounded-lg text-xs text-forest placeholder:text-forest/40 focus:outline-none focus:ring-2 focus:ring-seafoam/30"
                    />
                  </div>
                </div>

                {/* Service Selection Grid */}
                <div>
                  <p className="text-[10px] text-forest/50 uppercase tracking-wider font-medium mb-2">Select Service</p>
                  <div className="grid grid-cols-6 gap-1.5">
                    {services.map((service) => (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, service: service.id })}
                        className={`flex flex-col items-center p-2 rounded-lg transition-all duration-200 ${
                          formData.service === service.id
                            ? 'bg-forest text-white shadow-md'
                            : 'bg-section/40 text-forest/60 hover:bg-section'
                        }`}
                      >
                        <span className="text-base mb-0.5">{service.icon}</span>
                        <span className="text-[9px] font-medium leading-tight">{service.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date & Time Row */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                      <svg className="w-4 h-4 text-forest/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-section/40 border-0 rounded-lg text-xs text-forest focus:outline-none focus:ring-2 focus:ring-seafoam/30 cursor-pointer"
                    />
                  </div>
                  <select
                    className="px-3 py-2.5 bg-section/40 border-0 rounded-lg text-xs text-forest focus:outline-none focus:ring-2 focus:ring-seafoam/30 cursor-pointer"
                  >
                    <option value="">Preferred Time</option>
                    <option value="morning">Morning (9AM-12PM)</option>
                    <option value="afternoon">Afternoon (12PM-5PM)</option>
                    <option value="evening">Evening (5PM-10PM)</option>
                  </select>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  className="w-full py-3 bg-forest text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-forest/90 transition-all duration-300 group"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <span>Book Free Assessment</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.button>

                {/* Trust Row */}
                <div className="flex items-center justify-center gap-4 pt-1">
                  {[
                    { icon: "🔒", text: "Secure" },
                    { icon: "⭐", text: "5-Star" },
                    { icon: "✓", text: "Free" },
                  ].map((item) => (
                    <span key={item.text} className="flex items-center gap-1 text-[10px] text-forest/40">
                      <span>{item.icon}</span> {item.text}
                    </span>
                  ))}
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}