"use client";

import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/", isHash: false },
  { label: "Services", href: "/services", isHash: false },
  // { label: 'Journey', href: '/#journey', isHash: true },
  { label: "FAQ", href: "/faq", isHash: false },
  { label: "Contact", href: "/contact", isHash: false },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const pathname = usePathname();

  // Detect active section based on scroll position (for hash links)
  const updateActiveHash = useCallback(() => {
    if (pathname !== "/") {
      setActiveHash("");
      return;
    }

    const sections = ["journey", "blog", "contact"];
    const scrollPosition = window.scrollY + 150;

    for (const section of sections.reverse()) {
      const element = document.getElementById(section);
      if (element && element.offsetTop <= scrollPosition) {
        setActiveHash(`#${section}`);
        return;
      }
    }
    setActiveHash("");
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
      updateActiveHash();
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled, updateActiveHash]);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Determine active link
  const getActiveLink = () => {
    // Check for services page first
    if (pathname === "/services" || pathname?.startsWith("/services/")) {
      return "/services";
    }
    // Check for FAQ page
    if (pathname === "/faq" || pathname?.startsWith("/faq/")) {
      return "/faq";
    }
    // On home page, check for hash sections
    if (pathname === "/") {
      if (activeHash) {
        return `/${activeHash}`;
      }
      return "/";
    }
    return pathname;
  };

  const activeLinkHref = getActiveLink();

  // Pages without a dark hero need dark navbar text even before scroll
  const isLightPage = pathname !== "/";
  // Use dark styling when scrolled OR on a light-background page
  const useDarkStyle = scrolled || isLightPage;

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out",
          scrolled && "pointer-events-none",
        )}
      >
        {/* Background layer for non-scrolled state */}
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-500",
            scrolled ? "opacity-0" : "opacity-100",
          )}
        />

        {/* Floating navbar container when scrolled */}
        <div
          className={cn(
            "mx-auto transition-all duration-500 ease-out pointer-events-auto",
            scrolled ? "mt-4 max-w-5xl mx-4 md:mx-auto" : "max-w-[1400px]",
          )}
        >
          <div
            className={cn(
              "relative transition-all duration-500 ease-out",
              scrolled
                ? "bg-white/95 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,45,4,0.12)] rounded-2xl border border-forest/5"
                : "bg-transparent",
            )}
          >
            <div
              className={cn(
                "flex items-center justify-between transition-all duration-500",
                scrolled ? "px-6 h-16" : "px-6 lg:px-8 h-20",
              )}
            >
              {/* Logo */}
              <Link
                href="/"
                className="flex items-center gap-2.5 group relative z-10"
              >
                <motion.div
                  className={cn(
                    "relative flex items-center justify-center rounded-full transition-all duration-500",
                    useDarkStyle
                      ? "w-10 h-10 bg-[#E8EFE3] border border-[#002D04]/10"
                      : "w-10 h-10 bg-white/20 backdrop-blur-sm border border-white/30",
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Leaf
                    className={cn(
                      "w-5 h-5 transition-colors duration-500",
                      useDarkStyle ? "text-[#002D04]" : "text-white",
                    )}
                  />
                </motion.div>
                <div className="flex flex-col">
                  <span
                    className={cn(
                      "text-base font-bold tracking-tight uppercase leading-none transition-colors duration-500",
                      useDarkStyle ? "text-forest" : "text-white",
                    )}
                  >
                    Vitality
                  </span>
                  <span
                    className={cn(
                      "text-[9px] font-bold tracking-[0.2em] uppercase leading-none transition-colors duration-500",
                      useDarkStyle ? "text-[#66A182]" : "text-white/70",
                    )}
                  >
                    Path
                  </span>
                </div>
              </Link>

              {/* Desktop Navigation with Clean Design */}
              <nav className="hidden md:flex items-center relative">
                <div
                  className={cn(
                    "flex items-center gap-1 rounded-full px-1.5 py-1 transition-all duration-300",
                    useDarkStyle
                      ? "bg-forest/[0.04] border border-forest/[0.08]"
                      : "bg-white/10 backdrop-blur-sm border border-white/20",
                  )}
                >
                  {navLinks.map((link) => {
                    const isActive =
                      activeLinkHref === link.href ||
                      (link.href === "/" && pathname === "/" && !activeHash) ||
                      (link.href === "/services" &&
                        pathname?.startsWith("/services"));

                    return (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="relative px-4 py-2 rounded-full group"
                      >
                        {/* Animated Active Background */}
                        {isActive && (
                          <motion.div
                            layoutId="navbar-active-pill"
                            className={cn(
                              "absolute inset-0 rounded-full",
                              useDarkStyle
                                ? "bg-forest shadow-sm"
                                : "bg-white/95 shadow-md",
                            )}
                            initial={false}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 35,
                              mass: 0.8,
                            }}
                          />
                        )}

                        {/* Link Text */}
                        <span
                          className={cn(
                            "relative z-10 text-[11px] font-semibold uppercase tracking-[0.1em] transition-all duration-200",
                            isActive
                              ? useDarkStyle
                                ? "text-white"
                                : "text-forest"
                              : useDarkStyle
                                ? "text-forest/70 group-hover:text-forest"
                                : "text-white/80 group-hover:text-white",
                          )}
                        >
                          {link.label}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </nav>

              {/* CTA Button */}
              <div className="hidden md:block">
                <motion.div
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Link
                    href="#appointment"
                    className={cn(
                      "inline-flex items-center justify-center gap-2 h-10 px-5 text-[10px] font-bold uppercase tracking-wider rounded-full transition-all duration-300 group",
                      useDarkStyle
                        ? "bg-forest text-white hover:bg-forest/90 shadow-lg shadow-forest/20"
                        : "bg-white text-forest hover:bg-white/90 shadow-lg shadow-white/20",
                    )}
                  >
                    <span>Book Visit</span>
                    <svg
                      className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                </motion.div>
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                className={cn(
                  "md:hidden relative w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300",
                  useDarkStyle
                    ? "bg-forest/5 text-forest"
                    : "bg-white/10 text-white",
                )}
                onClick={() => setMobileOpen(!mobileOpen)}
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle menu"
              >
                <div className="relative w-5 h-4 flex flex-col justify-between">
                  <motion.span
                    className={cn(
                      "block h-0.5 rounded-full transition-colors",
                      useDarkStyle ? "bg-forest" : "bg-white",
                    )}
                    animate={{
                      rotate: mobileOpen ? 45 : 0,
                      y: mobileOpen ? 7 : 0,
                      width: mobileOpen ? "100%" : "100%",
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.span
                    className={cn(
                      "block h-0.5 rounded-full transition-colors",
                      useDarkStyle ? "bg-forest" : "bg-white",
                    )}
                    animate={{
                      opacity: mobileOpen ? 0 : 1,
                      x: mobileOpen ? -10 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.span
                    className={cn(
                      "block h-0.5 rounded-full transition-colors",
                      useDarkStyle ? "bg-forest" : "bg-white",
                    )}
                    animate={{
                      rotate: mobileOpen ? -45 : 0,
                      y: mobileOpen ? -7 : 0,
                      width: mobileOpen ? "100%" : "60%",
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
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={cn(
                "fixed z-50 md:hidden overflow-hidden",
                scrolled
                  ? "top-24 left-4 right-4 bg-white rounded-2xl shadow-2xl"
                  : "top-24 left-4 right-4 bg-white rounded-2xl shadow-2xl",
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
                        <span className="text-sm font-semibold uppercase tracking-wider">
                          {link.label}
                        </span>
                        <svg
                          className="w-4 h-4 text-forest/30 group-hover:text-seafoam group-hover:translate-x-1 transition-all"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
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
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
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
                    <a
                      href="tel:+15551234567"
                      className="flex items-center gap-2 text-xs hover:text-seafoam transition-colors"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      (555) 123-4567
                    </a>
                    <span className="w-px h-4 bg-forest/20" />
                    <a
                      href="mailto:hello@vitalitypath.com"
                      className="flex items-center gap-2 text-xs hover:text-seafoam transition-colors"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
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
