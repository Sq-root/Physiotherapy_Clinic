'use client';

import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function ContactSection() {
  return (
    <section id="contact" className="section-padding bg-white">
      <div className="container-main">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left — Info */}
          <div>
            <span className="text-[#19e65e] text-sm font-semibold uppercase tracking-widest mb-3 block">
              Get In Touch
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a2e] mb-4">
              Book Your Appointment
            </h2>
            <p className="text-[#6b7280] text-lg leading-relaxed mb-8">
              Ready to start your recovery journey? Fill out the form and one of our therapists
              will contact you within 24 hours.
            </p>

            <div className="space-y-5">
              {[
                { icon: Phone, label: '+1 (555) 123-4567', sub: 'Mon–Fri, 8am–6pm' },
                { icon: Mail, label: 'hello@vitalitypath.com', sub: 'We reply within 24 hours' },
                { icon: MapPin, label: '123 Healing Ave, Wellness District', sub: 'WD 10001' },
                { icon: Clock, label: 'Mon–Sat: 8:00 AM – 7:00 PM', sub: 'Sun: 10:00 AM – 4:00 PM' },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#19e65e]/10 rounded-lg flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-[#19e65e]" />
                  </div>
                  <div>
                    <p className="font-medium text-[#1a1a2e] text-sm">{label}</p>
                    <p className="text-[#6b7280] text-xs mt-0.5">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Form (UI only, API coming later) */}
          <div className="bg-[#f5f5f5] rounded-2xl p-8 border border-[#e5e7eb]">
            <h3 className="font-bold text-[#1a1a2e] text-xl mb-6">Send Us a Message</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#1a1a2e] mb-1.5">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="John"
                    className="w-full px-4 py-3 bg-white border border-[#e5e7eb] rounded-lg text-sm text-[#1a1a2e] placeholder:text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#19e65e]/40 focus:border-[#19e65e] transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1a1a2e] mb-1.5">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Doe"
                    className="w-full px-4 py-3 bg-white border border-[#e5e7eb] rounded-lg text-sm text-[#1a1a2e] placeholder:text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#19e65e]/40 focus:border-[#19e65e] transition-all duration-200"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1a1a2e] mb-1.5">Email</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 bg-white border border-[#e5e7eb] rounded-lg text-sm text-[#1a1a2e] placeholder:text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#19e65e]/40 focus:border-[#19e65e] transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1a1a2e] mb-1.5">
                  Service of Interest
                </label>
                <select className="w-full px-4 py-3 bg-white border border-[#e5e7eb] rounded-lg text-sm text-[#1a1a2e] focus:outline-none focus:ring-2 focus:ring-[#19e65e]/40 focus:border-[#19e65e] transition-all duration-200">
                  <option value="">Select a service...</option>
                  <option>Orthopedic Care</option>
                  <option>Sports Rehab</option>
                  <option>Neurological</option>
                  <option>Pediatric</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1a1a2e] mb-1.5">Message</label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your condition or questions..."
                  className="w-full px-4 py-3 bg-white border border-[#e5e7eb] rounded-lg text-sm text-[#1a1a2e] placeholder:text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#19e65e]/40 focus:border-[#19e65e] transition-all duration-200 resize-none"
                />
              </div>
              <Button variant="primary" size="md" className="w-full" type="submit">
                Send Message
              </Button>
              <p className="text-xs text-center text-[#6b7280]">
                API integration coming soon — form is UI-only for now.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
