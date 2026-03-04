'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed z-50 transition-all duration-500 ease-in-out",
          scrolled 
            ? "top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl bg-white/90 backdrop-blur-md shadow-card rounded-full py-2" 
            : "top-0 left-0 w-full bg-transparent py-2"
        )}
      >
        <div className={cn(
          "mx-auto flex items-center justify-between px-8 transition-all duration-500",
          scrolled ? "h-16" : "h-24 max-w-7xl"
        )}>
          <Link href="/" className="flex items-center gap-3 group cursor-pointer">
            <div className={cn(
              "relative animate-in fade-in zoom-in duration-700 flex items-center justify-center border-2 rounded-full transition-all duration-500",
              scrolled ? "h-10 w-10 bg-forest border-forest" : "h-12 w-12 bg-white/10 border-white backdrop-blur-sm"
            )}>
              <span className={cn(
                "material-symbols-outlined text-xl font-bold transition-colors",
                scrolled ? "text-seafoam" : "text-white"
              )}>spa</span>
            </div>
            <div className="flex flex-col">
              <span className={cn(
                "text-xl font-bold tracking-tight font-sans uppercase leading-none transition-colors",
                scrolled ? "text-forest" : "text-white"
              )}>Vitality</span>
              <span className={cn(
                "text-xs font-bold tracking-[0.2em] uppercase leading-none transition-colors",
                scrolled ? "text-muted" : "text-seafoam"
              )}>Path</span>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center gap-1">
            <Link className={cn(
              "font-bold uppercase tracking-wider px-4 py-2 text-sm transition-colors",
              scrolled ? "text-forest hover:text-seafoam" : "text-seafoam"
            )} href="#">Home</Link>
            <Link className={cn(
              "font-bold uppercase tracking-wider px-4 py-2 text-sm transition-colors",
              scrolled ? "text-forest hover:text-lime" : "text-white/80 hover:text-white"
            )} href="#services">Services</Link>
            <Link className={cn(
              "font-bold uppercase tracking-wider px-4 py-2 text-sm transition-colors",
              scrolled ? "text-forest hover:text-lime" : "text-white/80 hover:text-white"
            )} href="#faq">FAQ</Link>
            <Link className={cn(
              "font-bold uppercase tracking-wider px-4 py-2 text-sm transition-colors",
              scrolled ? "text-forest hover:text-lime" : "text-white/80 hover:text-white"
            )} href="#journal">Blog</Link>
            <Link className={cn(
              "font-bold uppercase tracking-wider px-4 py-2 text-sm transition-colors",
              scrolled ? "text-forest hover:text-seafoam" : "text-white/80 hover:text-white"
            )} href="#contact">Contact</Link>
          </nav>
          
          <div className="hidden md:flex gap-4">
            <Link 
              className={cn(
                "flex items-center justify-center h-10 px-6 text-xs font-bold uppercase tracking-widest transition-all rounded-full",
                scrolled 
                  ? "bg-seafoam text-white hover:bg-forest shadow-sm" 
                  : "bg-seafoam text-white hover:bg-white hover:text-forest shadow-lg"
              )}
              href="#booking-form"
            >
              Make Appointment
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className={cn(
              "md:hidden p-2 rounded-lg transition-colors",
              scrolled ? "text-forest" : "text-white"
            )}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>
      
      {/* Mobile Drawer */}
      <div
        className={cn(
          'fixed inset-x-0 z-40 overflow-hidden transition-all duration-500 md:hidden',
          scrolled 
            ? 'top-24 left-1/2 -translate-x-1/2 w-[90%] bg-white/95 backdrop-blur-md rounded-3xl shadow-glow border border-forest/10' 
            : 'top-[96px] bg-forest/95 backdrop-blur-md border-b border-white/10 w-full left-0',
          mobileOpen ? 'max-h-96 py-8' : 'max-h-0 py-0'
        )}
      >
        <div className="flex flex-col items-center gap-6">
            <Link className={cn(
              "font-bold uppercase tracking-wider text-sm transition-colors",
              scrolled ? "text-forest" : "text-seafoam"
            )} href="#" onClick={() => setMobileOpen(false)}>Home</Link>
            <Link className={cn(
              "font-bold uppercase tracking-wider text-sm transition-colors",
              scrolled ? "text-forest" : "text-white/80"
            )} href="#services" onClick={() => setMobileOpen(false)}>Services</Link>
            <Link className={cn(
              "font-bold uppercase tracking-wider text-sm transition-colors",
              scrolled ? "text-forest" : "text-white/80"
            )} href="#faq" onClick={() => setMobileOpen(false)}>FAQ</Link>
            <Link className={cn(
              "font-bold uppercase tracking-wider text-sm transition-colors",
              scrolled ? "text-forest" : "text-white/80"
            )} href="#journal" onClick={() => setMobileOpen(false)}>Blog</Link>
            <Link className={cn(
              "font-bold uppercase tracking-wider text-sm transition-colors",
              scrolled ? "text-forest" : "text-white/80"
            )} href="#contact" onClick={() => setMobileOpen(false)}>Contact</Link>
            <Link 
              className={cn(
                "flex items-center justify-center h-12 px-10 text-sm font-bold uppercase tracking-widest transition-all rounded-full mt-4",
                scrolled ? "bg-forest text-white" : "bg-seafoam text-white"
              )} 
              href="#booking-form"
              onClick={() => setMobileOpen(false)}
            >
              Make Appointment
            </Link>
        </div>
      </div>
    </>
  );
}
