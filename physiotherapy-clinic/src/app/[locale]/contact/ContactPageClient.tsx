"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  Loader2,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Stethoscope,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Easing } from "framer-motion";
import { siteConfig } from "@/config/site";
import { useTranslations } from "next-intl";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as Easing },
  },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const COUNTRY_CODES = [
  { code: "+971", country: "UAE", flag: "🇦🇪" },
  { code: "+91", country: "IN", flag: "🇮🇳" },
  { code: "+44", country: "UK", flag: "🇬🇧" },
  { code: "+1", country: "US", flag: "🇺🇸" },
  { code: "+966", country: "SA", flag: "🇸🇦" },
] as const;

type CountryCode = (typeof COUNTRY_CODES)[number]["code"];

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  countryCode: CountryCode;
  phone: string;
  service: string;
  message: string;
}

type FormStatus = "idle" | "loading" | "success" | "error";

export default function ContactPageClient() {
  const t = useTranslations("contact");
  const tCommon = useTranslations("common");

  const contactInfo = [
    {
      icon: Phone,
      title: t("info.callUs"),
      primary: siteConfig.contact.phone,
      secondary: siteConfig.contact.timing,
      action: `tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, "")}`,
      color: "bg-seafoam",
    },
    {
      icon: Mail,
      title: t("info.emailUs"),
      primary: siteConfig.contact.email,
      secondary: t("info.replyTime"),
      action: `mailto:${siteConfig.contact.email}`,
      color: "bg-lime",
    },
    {
      icon: Clock,
      title: t("info.workingHours"),
      primary: siteConfig.contact.timing,
      secondary: t("info.sundayClosed"),
      action: null,
      color: "bg-amber",
    },
  ];

  const services = [
    { key: "orthopedic", label: t("serviceOptions.orthopedic") },
    { key: "sports", label: t("serviceOptions.sports") },
    { key: "neurological", label: t("serviceOptions.neurological") },
    { key: "manual", label: t("serviceOptions.manual") },
    { key: "senior", label: t("serviceOptions.senior") },
    { key: "postSurgery", label: t("serviceOptions.postSurgery") },
    { key: "general", label: t("serviceOptions.general") },
    { key: "online", label: t("serviceOptions.online") },
    { key: "others", label: t("serviceOptions.others") },
  ];

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "+971",
    phone: "",
    service: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowCountryDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.firstName.trim() || formData.firstName.trim().length < 2) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim() || formData.lastName.trim().length < 2) {
      newErrors.lastName = "Last name is required";
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Valid email required";
    }
    const cleanPhone = formData.phone.replace(/\D/g, "");
    if (!cleanPhone || cleanPhone.length !== 10) {
      newErrors.phone = "Valid phone required";
    }
    if (!formData.service) {
      newErrors.service = "Please select a service";
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setStatus("error");
      return;
    }

    setStatus("loading");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setStatus("success");

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      countryCode: "+971",
      phone: "",
      service: "",
      message: "",
    });
  };

  return (
    <main className="overflow-x-clip">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-white/40 to-section">
        <div className="absolute top-0 end-0 w-[30rem] h-[30rem] bg-lime/10 rounded-full blur-[100px] z-0 translate-x-1/4 rtl:-translate-x-1/4 -translate-y-1/4" />
        <div className="absolute bottom-0 start-0 w-[22rem] h-[22rem] bg-white/30 rounded-full blur-[80px] z-0 -translate-x-1/4 rtl:translate-x-1/4 translate-y-1/4" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/60 border border-forest/10 shadow-sm backdrop-blur-md"
            >
              <div className="w-6 h-6 rounded-full bg-seafoam/20 flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-seafoam" />
              </div>
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-forest/80">
                {t("badge")}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-forest mb-6 tracking-tight leading-[1.1]"
            >
              {t("title")} <br className="hidden md:block" />
              <span className="text-lime font-serif italic">{t("titleHighlight")}</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-base md:text-xl text-forest/60 font-medium max-w-2xl mx-auto leading-relaxed"
            >
              {t("description")}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-12 md:py-16 bg-white relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 -mt-16 md:-mt-24 relative z-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {contactInfo.map((item) => (
              <motion.div key={item.title} variants={fadeInUp}>
                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-forest/5 hover:border-seafoam/30 transition-all duration-300 group h-full">
                  <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6", item.color)}>
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-forest mb-2">{item.title}</h3>
                  <p className="text-forest font-semibold">{item.primary}</p>
                  <p className="text-forest/50 text-sm mt-1">{item.secondary}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 md:py-28 bg-white relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column */}
            <motion.div
              className="lg:col-span-5"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-forest mb-6 tracking-tight leading-[1.1]">
                {t("title")} <span className="text-seafoam">{t("titleHighlight")}</span>
              </h2>
              <p className="text-forest/70 text-base md:text-lg leading-relaxed max-w-md">
                {t("description")}
              </p>

              <div className="mt-10 space-y-6">
                <div className="flex gap-4">
                  <div className="shrink-0 w-12 h-12 rounded-2xl bg-forest/5 flex items-center justify-center">
                    <Stethoscope className="w-6 h-6 text-forest" />
                  </div>
                  <div>
                    <h4 className="text-forest font-bold">{t("trustIndicators.professional")}</h4>
                    <p className="text-forest/60 text-sm">{t("description")}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="shrink-0 w-12 h-12 rounded-2xl bg-seafoam/10 flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-seafoam" />
                  </div>
                  <div>
                    <h4 className="text-forest font-bold">{t("trustIndicators.secure")}</h4>
                    <p className="text-forest/60 text-sm">{t("trustIndicators.personalized")}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-section rounded-3xl p-12 text-center"
                  >
                    <div className="w-20 h-20 rounded-full bg-seafoam/20 mx-auto mb-6 flex items-center justify-center">
                      <CheckCircle className="w-10 h-10 text-seafoam" />
                    </div>
                    <h3 className="text-2xl font-bold text-forest mb-3">{t("form.successTitle")}</h3>
                    <p className="text-forest/70">{t("form.successMessage")}</p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="mt-8 px-8 py-3 bg-forest text-white rounded-full font-bold hover:bg-seafoam hover:text-forest transition-all"
                    >
                      {tCommon("close")}
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="bg-section rounded-3xl p-8 md:p-12"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-forest font-medium text-sm mb-2">{t("form.firstName")}</label>
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className={cn(
                            "w-full h-14 px-5 rounded-2xl bg-white border transition-all text-forest",
                            errors.firstName ? "border-red-400" : "border-forest/10 focus:border-seafoam"
                          )}
                        />
                      </div>
                      <div>
                        <label className="block text-forest font-medium text-sm mb-2">{t("form.lastName")}</label>
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className={cn(
                            "w-full h-14 px-5 rounded-2xl bg-white border transition-all text-forest",
                            errors.lastName ? "border-red-400" : "border-forest/10 focus:border-seafoam"
                          )}
                        />
                      </div>
                    </div>

                    <div className="mt-6">
                      <label className="block text-forest font-medium text-sm mb-2">{t("form.email")}</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={cn(
                          "w-full h-14 px-5 rounded-2xl bg-white border transition-all text-forest",
                          errors.email ? "border-red-400" : "border-forest/10 focus:border-seafoam"
                        )}
                      />
                    </div>

                    <div className="mt-6">
                      <label className="block text-forest font-medium text-sm mb-2">{t("form.phone")}</label>
                      <div className="flex gap-3">
                        <div ref={dropdownRef} className="relative">
                          <button
                            type="button"
                            onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                            className="h-14 px-4 rounded-2xl bg-white border border-forest/10 flex items-center gap-2 min-w-[100px]"
                          >
                            <span>{COUNTRY_CODES.find(c => c.code === formData.countryCode)?.flag}</span>
                            <span className="text-forest font-medium">{formData.countryCode}</span>
                            <ChevronDown className="w-4 h-4 text-forest/50" />
                          </button>
                          {showCountryDropdown && (
                            <div className="absolute top-full mt-2 bg-white rounded-xl shadow-lg border border-forest/10 py-2 z-50 min-w-[160px]">
                              {COUNTRY_CODES.map((country) => (
                                <button
                                  key={country.code + country.country}
                                  type="button"
                                  onClick={() => {
                                    setFormData({ ...formData, countryCode: country.code });
                                    setShowCountryDropdown(false);
                                  }}
                                  className="w-full px-4 py-2 flex items-center gap-3 hover:bg-section transition-colors text-start"
                                >
                                  <span>{country.flag}</span>
                                  <span className="text-forest font-medium">{country.code}</span>
                                  <span className="text-forest/50 text-sm">{country.country}</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className={cn(
                            "flex-1 h-14 px-5 rounded-2xl bg-white border transition-all text-forest",
                            errors.phone ? "border-red-400" : "border-forest/10 focus:border-seafoam"
                          )}
                        />
                      </div>
                    </div>

                    <div className="mt-6">
                      <label className="block text-forest font-medium text-sm mb-2">{t("form.service")}</label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className={cn(
                          "w-full h-14 px-5 rounded-2xl bg-white border transition-all text-forest",
                          errors.service ? "border-red-400" : "border-forest/10 focus:border-seafoam"
                        )}
                      >
                        <option value="">{t("form.serviceDefault")}</option>
                        {services.map((s) => (
                          <option key={s.key} value={s.key}>{s.label}</option>
                        ))}
                      </select>
                    </div>

                    <div className="mt-6">
                      <label className="block text-forest font-medium text-sm mb-2">{t("form.message")}</label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={4}
                        placeholder={t("form.messagePlaceholder")}
                        className={cn(
                          "w-full p-5 rounded-2xl bg-white border transition-all text-forest resize-none",
                          errors.message ? "border-red-400" : "border-forest/10 focus:border-seafoam"
                        )}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="mt-8 w-full h-16 bg-forest text-white font-bold text-lg rounded-2xl hover:bg-seafoam hover:text-forest transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          {t("form.submitting")}
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          {t("form.submit")}
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact FAQ Section */}
      <ContactFAQ />
    </main>
  );
}

// ContactFAQ Component
function ContactFAQ() {
  const t = useTranslations("contact");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = t.raw("faq.questions") as Array<{ question: string; answer: string }>;

  return (
    <section className="py-20 md:py-28 bg-forest/5 relative">
      <div className="absolute inset-0 bg-white/40 backdrop-blur-3xl z-0" />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block py-1.5 px-4 rounded-full bg-white/60 border border-forest/10 text-forest font-bold uppercase tracking-widest text-[10px] mb-4 shadow-sm backdrop-blur-md">
            {t("faq.badge")}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-forest tracking-tight">
            {t("faq.title")}
          </h2>
        </motion.div>

        <motion.div
          className="space-y-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                variants={fadeInUp}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-white border-forest/10 shadow-[0_8px_30px_rgb(0,0,0,0.06)] scale-[1.02]"
                    : "bg-white/60 border-forest/5 hover:bg-white hover:border-forest/10 hover:shadow-sm"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-start focus:outline-none focus-visible:ring-2 focus-visible:ring-seafoam/50 rounded-2xl"
                >
                  <span
                    className={`font-semibold text-base md:text-lg pe-8 transition-colors ${
                      isOpen ? "text-forest" : "text-forest/80"
                    }`}
                  >
                    {faq.question}
                  </span>
                  <div
                    className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 border ${
                      isOpen
                        ? "bg-forest border-forest rotate-180"
                        : "bg-white border-forest/10 text-forest hover:bg-forest/5"
                    }`}
                  >
                    <ArrowRight
                      className={`w-5 h-5 transition-transform duration-500 ${
                        isOpen ? "text-white -rotate-90" : "text-forest rotate-90"
                      }`}
                    />
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 md:px-8 pb-8 pt-2">
                        <div className="w-12 h-1 bg-seafoam/20 rounded-full mb-6" />
                        <p className="text-forest/70 text-base leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
