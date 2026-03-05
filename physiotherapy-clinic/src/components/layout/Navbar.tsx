'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Journey', href: '#journey' },
  { label: 'Journal', href: '#blog' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out",
          scrolled && "pointer-events-none"
        )}
      >
        {/* Background layer for non-scrolled state */}
        <div className={cn(
          "absolute inset-0 transition-opacity duration-500",
          scrolled ? "opacity-0" : "opacity-100"
        )} />

        {/* Floating navbar container when scrolled */}
        <div className={cn(
          "mx-auto transition-all duration-500 ease-out pointer-events-auto",
          scrolled 
            ? "mt-4 max-w-5xl mx-4 md:mx-auto" 
            : "max-w-[1400px]"
        )}>
          <div className={cn(
            "relative transition-all duration-500 ease-out",
            scrolled 
              ? "bg-white/95 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,45,4,0.12)] rounded-2xl border border-forest/5" 
              : "bg-transparent"
          )}>
            <div className={cn(
              "flex items-center justify-between transition-all duration-500",
              scrolled ? "px-6 h-16" : "px-6 lg:px-8 h-20"
            )}>
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2.5 group relative z-10">
                <motion.div 
                  className={cn(
                    "relative flex items-center justify-center rounded-full transition-all duration-500",
                    scrolled 
                      ? "w-10 h-10 bg-[#E8EFE3] border border-[#002D04]/10" 
                      : "w-10 h-10 bg-[#E8EFE3] border border-[#002D04]/10"
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="material-symbols-outlined text-[20px] text-[#002D04]">eco</span>
                </motion.div>
                <div className="flex flex-col">
                  <span className={cn(
                    "text-base font-bold tracking-tight uppercase leading-none transition-colors duration-500",
                    scrolled ? "text-forest" : "text-[#002D04]"
                  )}>Vitality</span>
                  <span className="text-[9px] font-bold tracking-[0.2em] uppercase leading-none text-[#66A182]">Path</span>
                </div>
              </Link>
              
              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-1">
                {navLinks.map((link) => {
                  const isActive = link.href === pathname || 
                    (link.href === '/' && pathname === '/') ||
                    (link.href !== '/' && pathname?.startsWith(link.href.split('#')[0]) && link.href.split('#')[0] !== '/');
                  
                  return (
                    <Link 
                      key={link.label}
                      href={link.href}
                      className={cn(
                        "relative px-4 py-2 rounded-full transition-all duration-300",
                        isActive && "bg-[#b8c96a]"
                      )}
                    >
                      <span className={cn(
                        "text-xs font-semibold uppercase tracking-wider transition-colors duration-300",
                        isActive 
                          ? "text-[#002D04]"
                          : scrolled 
                            ? "text-[#002D04]/70 hover:text-[#002D04]" 
                            : "text-[#002D04]/70 hover:text-[#002D04]"
                      )}>
                        {link.label}
                      </span>
                    </Link>
                  );
                })}
              </nav>
              
              {/* CTA Button */}
              <div className="hidden md:block">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link 
                    href="#appointment"
                    className={cn(
                      "inline-flex items-center justify-center h-10 px-6 text-[11px] font-bold uppercase tracking-wider rounded-full transition-all duration-300",
                      scrolled 
                        ? "bg-forest text-white hover:bg-forest/90 shadow-sm" 
                        : "bg-forest text-white hover:bg-forest/90"
                    )}
                  >
                    Book Visit
                  </Link>
                </motion.div>
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                className={cn(
                  "md:hidden relative w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300",
                  scrolled 
                    ? "bg-forest/5 text-forest" 
                    : "bg-white/10 text-white"
                )}
                onClick={() => setMobileOpen(!mobileOpen)}
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle menu"
              >
                <div className="relative w-5 h-4 flex flex-col justify-between">
                  <motion.span 
                    className={cn(
                      "block h-0.5 rounded-full transition-colors",
                      scrolled ? "bg-forest" : "bg-white"
                    )}
                    animate={{ 
                      rotate: mobileOpen ? 45 : 0,
                      y: mobileOpen ? 7 : 0,
                      width: mobileOpen ? '100%' : '100%'
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.span 
                    className={cn(
                      "block h-0.5 rounded-full transition-colors",
                      scrolled ? "bg-forest" : "bg-white"
                    )}
                    animate={{ 
                      opacity: mobileOpen ? 0 : 1,
                      x: mobileOpen ? -10 : 0
                    }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.span 
                    className={cn(
                      "block h-0.5 rounded-full transition-colors",
                      scrolled ? "bg-forest" : "bg-white"
                    )}
                    animate={{ 
                      rotate: mobileOpen ? -45 : 0,
                      y: mobileOpen ? -7 : 0,
                      width: mobileOpen ? '100%' : '60%'
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>
      
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-forest/60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            
            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className={cn(
                "fixed z-50 md:hidden overflow-hidden",
                scrolled 
                  ? "top-24 left-4 right-4 bg-white rounded-2xl shadow-2xl" 
                  : "top-24 left-4 right-4 bg-white rounded-2xl shadow-2xl"
              )}
            >
              <div className="p-6">
                {/* Mobile Nav Links */}
                <nav className="space-y-1 mb-6">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link 
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center justify-between py-3 px-4 rounded-xl text-forest hover:bg-forest/5 transition-colors group"
                      >
                        <span className="text-sm font-semibold uppercase tracking-wider">{link.label}</span>
                        <svg className="w-4 h-4 text-forest/30 group-hover:text-seafoam group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </motion.div>
                  ))}
                </nav>
                
                {/* Mobile CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Link 
                    href="#appointment"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 w-full h-12 bg-forest text-white text-sm font-bold uppercase tracking-wider rounded-xl hover:bg-forest/90 transition-colors"
                  >
                    <span>Book Appointment</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </motion.div>
                
                {/* Contact Info */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-6 pt-6 border-t border-forest/10"
                >
                  <div className="flex items-center gap-4 text-forest/60">
                    <a href="tel:+15551234567" className="flex items-center gap-2 text-xs hover:text-seafoam transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      (555) 123-4567
                    </a>
                    <span className="w-px h-4 bg-forest/20" />
                    <a href="mailto:hello@vitalitypath.com" className="flex items-center gap-2 text-xs hover:text-seafoam transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Email Us
                    </a>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
