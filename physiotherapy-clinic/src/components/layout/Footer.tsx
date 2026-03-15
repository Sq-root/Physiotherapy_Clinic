import { siteConfig } from '@/config/site';
import Link from 'next/link';
import { Flower2 } from 'lucide-react';

export function Footer() {
  const socialLinks = [
    { name: 'Facebook', icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z', href: siteConfig.socialLinks.facebook },
    { name: 'Instagram', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z', href: siteConfig.socialLinks.instagram },
    { name: 'Twitter', icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z', href: siteConfig.socialLinks.twitter },
    { name: 'LinkedIn', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z', href: siteConfig.socialLinks.linkedin },
    { name: 'YouTube', icon: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z', href: siteConfig.socialLinks.youtube },
  ];



  const services = [
    'Orthopedic Care',
    'Sports Rehab',
    'Neurological',
    'Manual Therapy',
    'Senior Wellness',
  ];

  return (
    <footer className="bg-forest text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}
      />

      {/* Main Footer Content */}
      <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8 pt-12 pb-6 relative z-10">
        
        {/* Top Section - Logo & Social */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-8 border-b border-white/10">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex size-10 items-center justify-center border-2 border-white/30 rounded-full bg-white/5">
              <Flower2 className="w-5 h-5 text-seafoam" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-white font-sans uppercase leading-none">{siteConfig.name.split(' ')[0]}</span>
              <span className="text-[10px] font-bold tracking-[0.2em] text-seafoam uppercase leading-none">{siteConfig.name.split(' ').slice(1).join(' ')}</span>
            </div>
          </Link>

          {/* Social Links */}
          <div className="flex items-center gap-2">
            <span className="text-white/40 text-xs mr-2 hidden sm:block">Follow Us:</span>
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                aria-label={social.name}
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-seafoam hover:border-seafoam transition-all duration-300 group"
              >
                <svg className="w-3.5 h-3.5 fill-white/60 group-hover:fill-forest transition-colors" viewBox="0 0 24 24">
                  <path d={social.icon} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Middle Section - Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-b border-white/10">
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-[10px] uppercase tracking-[0.15em] text-seafoam mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {siteConfig.nav.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-white/50 text-xs hover:text-seafoam transition-colors flex items-center gap-1 group">
                    <span className="w-0 group-hover:w-2 h-px bg-seafoam transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-[10px] uppercase tracking-[0.15em] text-seafoam mb-4">Services</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <Link href="/services" className="text-white/50 text-xs hover:text-seafoam transition-colors flex items-center gap-1 group">
                    <span className="w-0 group-hover:w-2 h-px bg-seafoam transition-all duration-200" />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-[10px] uppercase tracking-[0.15em] text-seafoam mb-4">Contact</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, '')}`} 
                  className="text-white/50 text-xs hover:text-seafoam transition-colors flex items-center gap-2"
                >
                  <svg className="w-3 h-3 text-seafoam" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div className="flex items-center gap-2">
                    <img 
                      src="/logo/ae_flag.svg" 
                      alt="UAE Flag" 
                      className="w-6 h-auto rounded shadow-sm border border-white/10"
                    />
                    <span className="font-medium">{siteConfig.contact.phone}</span>
                  </div>
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.contact.email}`} className="text-white/50 text-xs hover:text-seafoam transition-colors flex items-center gap-2">
                  <svg className="w-3 h-3 text-seafoam" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="text-white/50 text-xs flex items-center gap-2">
                <svg className="w-3 h-3 text-seafoam" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {siteConfig.contact.timing}
              </li>
            </ul>
          </div>

          {/* Location Mini Map */}
          <div>
            <h4 className="font-semibold text-[10px] uppercase tracking-[0.15em] text-seafoam mb-4">Location</h4>
            <div className="relative rounded-lg overflow-hidden h-20 bg-white/5 border border-white/10 mb-2">
              {/* Mini Map Placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-5 h-5 text-seafoam mx-auto mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-[9px] text-white/40">View on Map</p>
                </div>
              </div>
            </div>
            <p className="text-white/50 text-[10px] leading-relaxed mt-2 text-center">
              {siteConfig.contact.address.line1}<br />
              {siteConfig.contact.address.line2}, {siteConfig.contact.address.city} {siteConfig.contact.address.zip}
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6">
          <p className="text-white/30 text-[10px]">
            © {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {['Privacy', 'Terms', 'Cookies'].map((item) => (
              <a key={item} href="#" className="text-white/30 text-[10px] hover:text-seafoam transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
