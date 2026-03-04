import { siteConfig } from '@/config/site';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-forest text-white border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6 group cursor-pointer inline-flex">
              <div className="relative flex size-10 items-center justify-center border-2 border-white rounded-full bg-white/10 backdrop-blur-sm">
                <span className="material-symbols-outlined text-xl text-white font-bold">spa</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-white font-sans uppercase leading-none">Vitality</span>
                <span className="text-xs font-bold tracking-[0.2em] text-seafoam uppercase leading-none">Path</span>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs font-medium">
              {siteConfig.description}
            </p>
            <div className="flex items-center gap-3 mt-6">
              {['language', 'share', 'thumb_up'].map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="size-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-seafoam hover:text-forest transition-colors duration-300"
                >
                  <span className="material-symbols-outlined text-[18px]">{icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest text-seafoam mb-6">
              Services
            </h4>
            <ul className="space-y-3">
              {['Orthopedic Care', 'Sports Rehab', 'Neurological', 'Pediatric'].map((s) => (
                <li key={s}>
                  <a href="#services" className="text-white/60 text-sm font-medium hover:text-seafoam transition-colors duration-200">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest text-seafoam mb-6">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-4 link-hover">
                <span className="material-symbols-outlined text-seafoam text-[20px] shrink-0">location_on</span>
                <span className="text-white/60 text-sm font-medium">123 Healing Ave, Wellness District</span>
              </li>
              <li className="flex items-center gap-4">
                <span className="material-symbols-outlined text-seafoam text-[20px] shrink-0">call</span>
                <a href="tel:+15551234567" className="text-white/60 text-sm font-medium hover:text-seafoam transition-colors duration-200">
                  +1 (555) 123-4567
                </a>
              </li>
              <li className="flex items-center gap-4">
                <span className="material-symbols-outlined text-seafoam text-[20px] shrink-0">mail</span>
                <a href="mailto:hello@vitalitypath.com" className="text-white/60 text-sm font-medium hover:text-seafoam transition-colors duration-200">
                  hello@vitalitypath.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm font-medium">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service'].map((item) => (
              <a key={item} href="#" className="text-white/40 text-sm font-medium hover:text-seafoam transition-colors duration-200">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
