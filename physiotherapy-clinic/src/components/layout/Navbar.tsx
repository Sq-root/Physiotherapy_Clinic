"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Globe } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Logo } from "@/components/ui/Logo";
import { NavbarServicesDropdown } from "@/components/layout/NavbarServicesDropdown";
import { MobileServicesAccordion } from "@/components/layout/MobileServicesAccordion";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { localeNames, localeFlags, type Locale } from "@/i18n/config";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const [showLangMenu, setShowLangMenu] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const locale = useLocale() as Locale;
  const isRTL = locale === "ar";

  // Navigation items with translated labels
  const navItems = [
    { href: "/", label: t("home") },
    { href: "/services", label: t("services") },
    { href: "/about", label: t("aboutUs") },
    { href: "/faq", label: t("faq") },
    { href: "/contact", label: t("contact") },
  ];

  // Language switcher function
  const switchLocale = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
    setShowLangMenu(false);
  };

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

  // The Home page has a dark hero background, so it needs white text initially.
  // Other pages (including About, Services, Contact) have light backgrounds.
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
              <div className="shrink-0">
                <Logo useDarkStyle={useDarkStyle} />
              </div>

              {/* Desktop Navigation with Clean Design */}
              <nav className="hidden md:flex items-center relative">
                <div
                  className={cn(
                    "flex items-center gap-1.5 rounded-full px-2 py-1.5 transition-all duration-300",
                    useDarkStyle
                      ? "bg-forest/[0.04] border border-forest/[0.08]"
                      : "bg-white/10 backdrop-blur-sm border border-white/20",
                  )}
                >
                  {navItems.map((link) => {
                    const isActive =
                      activeLinkHref === link.href ||
                      (link.href === "/" && pathname === "/" && !activeHash) ||
                      (link.href === "/services" &&
                        pathname?.startsWith("/services"));

                    // Render dropdown for Services
                    if (link.href === "/services") {
                      return (
                        <NavbarServicesDropdown
                          key={link.label}
                          label={link.label}
                          isActive={isActive}
                          useDarkStyle={useDarkStyle}
                          isRTL={isRTL}
                        />
                      );
                    }

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

                        {/* Link Text - Refined Scale */}
                        <span
                          className={cn(
                            "relative z-10 text-[11px] font-semibold uppercase tracking-[0.1em] whitespace-nowrap transition-all duration-200",
                            isActive
                              ? useDarkStyle
                                ? "text-white"
                                : "text-forest"
                              : useDarkStyle
                                ? "text-forest/80 group-hover:text-forest"
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

              {/* CTA Button - Improved Visibility */}
              <div className="hidden md:flex items-center gap-3">
                {/* Language Switcher */}
                <div className="relative">
                  <button
                    aria-label="Toggle language menu"
                    aria-expanded={showLangMenu}
                    onClick={() => setShowLangMenu(!showLangMenu)}
                    className={cn(
                      "flex items-center gap-2 h-10 px-3 rounded-full text-sm font-medium transition-all duration-300",
                      useDarkStyle
                        ? "hover:bg-forest/5 text-forest/80 hover:text-forest"
                        : "hover:bg-white/10 text-white/80 hover:text-white",
                    )}
                  >
                    <Globe className="w-4 h-4" />
                    <span className="text-lg">{localeFlags[locale]}</span>
                  </button>

                  <AnimatePresence>
                    {showLangMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className={`absolute ${isRTL ? "left-0" : "right-0"} top-12 bg-white rounded-xl shadow-xl border border-forest/10 overflow-hidden min-w-[140px] z-50`}
                      >
                        {(["en", "ar"] as Locale[]).map((loc) => (
                          <button
                            key={loc}
                            onClick={() => switchLocale(loc)}
                            className={cn(
                              "w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors",
                              locale === loc
                                ? "bg-seafoam/10 text-seafoam font-medium"
                                : "text-forest/80 hover:bg-forest/5 hover:text-forest",
                            )}
                          >
                            <span className="text-lg">{localeFlags[loc]}</span>
                            <span>{localeNames[loc]}</span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <motion.div
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="shrink-0"
                >
                  <Link
                    href="#appointment"
                    className={cn(
                      "inline-flex items-center justify-center gap-2 h-10 px-6 text-[11px] font-bold uppercase tracking-widest rounded-full whitespace-nowrap transition-all duration-300 group outline-none",
                      useDarkStyle
                        ? "bg-forest text-white shadow-[3px_3px_0px_0px_#A4C639] hover:bg-seafoam hover:text-forest hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:translate-x-[3px] active:translate-y-[3px] active:shadow-none focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2"
                        : "bg-white text-forest shadow-[3px_3px_0px_0px_#A4C639] hover:bg-seafoam hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:translate-x-[3px] active:translate-y-[3px] active:shadow-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2",
                    )}
                  >
                    <span>{tCommon("bookAppointment")}</span>
                    <svg
                      className={`w-3.5 h-3.5 transition-transform ${isRTL ? "group-hover:-translate-x-0.5 rotate-180" : "group-hover:translate-x-0.5"}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
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
                {/* Language Switcher - Mobile */}
                <div className="flex gap-2 mb-6 pb-4 border-b border-forest/10">
                  {(["en", "ar"] as Locale[]).map((loc) => (
                    <button
                      key={loc}
                      onClick={() => {
                        switchLocale(loc);
                        setMobileOpen(false);
                      }}
                      className={cn(
                        "flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm transition-colors",
                        locale === loc
                          ? "bg-seafoam text-white font-medium"
                          : "bg-forest/5 text-forest/80 hover:bg-forest/10",
                      )}
                    >
                      <span>{localeFlags[loc]}</span>
                      <span>{localeNames[loc]}</span>
                    </button>
                  ))}
                </div>

                {/* Mobile Nav Links */}
                <nav className="space-y-1 mb-6">
                  {navItems.map((link, index) => {
                    // Render accordion for Services
                    if (link.href === "/services") {
                      return (
                        <MobileServicesAccordion
                          key={link.href}
                          label={link.label}
                          isRTL={isRTL}
                          onNavigate={() => setMobileOpen(false)}
                          index={index}
                        />
                      );
                    }

                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
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
                            className={cn(
                              "w-4 h-4 text-forest/30 group-hover:text-seafoam transition-all",
                              isRTL
                                ? "group-hover:-translate-x-1 rotate-180"
                                : "group-hover:translate-x-1",
                            )}
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
                    );
                  })}
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
                    className="flex items-center justify-center gap-2 w-full h-12 bg-forest text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300 shadow-[4px_4px_0px_0px_#A4C639] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                  >
                    <span>{tCommon("bookAppointment")}</span>
                    <svg
                      className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
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
                  <div className="flex flex-col gap-3 text-forest/80">
                    <a
                      href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, "")}`}
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
                      <div className="flex items-center gap-2">
                        <Image
                          src="/logo/ae_flag.svg"
                          alt="UAE Flag"
                          width={24}
                          height={14}
                          className="rounded shadow-sm border border-forest/10"
                        />
                        <span>{siteConfig.contact.phone}</span>
                      </div>
                    </a>
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
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
                      {siteConfig.contact.email}
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
