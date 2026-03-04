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
          "fixed top-0 z-50 w-full transition-all duration-300",
          scrolled ? "bg-forest/95 backdrop-blur-md shadow-md py-0" : "bg-transparent py-2"
        )}
      >
        <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3 group cursor-pointer">
            <div className="relative flex h-12 w-12 items-center justify-center border-2 border-white rounded-full bg-white/10 backdrop-blur-sm">
              <span className="material-symbols-outlined text-2xl text-white font-bold">spa</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-tight text-white font-sans uppercase leading-none">Vitality</span>
              <span className="text-sm font-bold tracking-[0.2em] text-lime uppercase leading-none">Path</span>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center gap-2">
            <Link className="text-lime font-bold uppercase tracking-wider px-6 py-2" href="#">Home</Link>
            <Link className="nav-link" href="#services">Services</Link>
            <Link className="nav-link" href="#faq">FAQ</Link>
            <Link className="nav-link" href="#journal">Blog</Link>
            <Link className="nav-link" href="#contact">Contact</Link>
          </nav>
          
          <div className="hidden md:flex gap-4">
            <Link 
              className="flex items-center justify-center h-12 px-8 bg-seafoam text-white text-sm font-bold uppercase tracking-widest transition-all hover:bg-white hover:text-forest rounded-full" 
              href="#booking-form"
            >
              Make Appointment
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-white"
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
          'fixed inset-x-0 top-[96px] z-40 bg-forest/95 backdrop-blur-md border-b border-white/10 overflow-hidden transition-all duration-300 md:hidden',
          mobileOpen ? 'max-h-96 py-4' : 'max-h-0 py-0'
        )}
      >
        <div className="flex flex-col items-center gap-4">
            <Link className="text-lime font-bold uppercase tracking-wider px-6 py-2" href="#" onClick={() => setMobileOpen(false)}>Home</Link>
            <Link className="nav-link" href="#services" onClick={() => setMobileOpen(false)}>Services</Link>
            <Link className="nav-link" href="#faq" onClick={() => setMobileOpen(false)}>FAQ</Link>
            <Link className="nav-link" href="#journal" onClick={() => setMobileOpen(false)}>Blog</Link>
            <Link className="nav-link" href="#contact" onClick={() => setMobileOpen(false)}>Contact</Link>
            <Link 
              className="flex items-center justify-center h-12 px-8 bg-seafoam text-white text-sm font-bold uppercase tracking-widest transition-all rounded-full mt-4" 
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
