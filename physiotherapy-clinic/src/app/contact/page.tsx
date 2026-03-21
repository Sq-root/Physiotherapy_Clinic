"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  MessageSquare,
  User,
  Building2,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Stethoscope,
  HeartHandshake,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import type { Easing } from "framer-motion";
import { siteConfig } from "@/config/site";

// Animation variants
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
  { code: "+974", country: "QA", flag: "🇶🇦" },
  { code: "+968", country: "OM", flag: "🇴🇲" },
  { code: "+965", country: "KW", flag: "🇰🇼" },
  { code: "+973", country: "BH", flag: "🇧🇭" },
  { code: "+61", country: "AU", flag: "🇦🇺" },
  { code: "+1", country: "CA", flag: "🇨🇦" },
  { code: "+49", country: "DE", flag: "🇩🇪" },
] as const;

type CountryCode = (typeof COUNTRY_CODES)[number]["code"];

// Form data interface
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

// Contact info data
const contactInfo = [
  {
    icon: Phone,
    title: "Call Us",
    primary: siteConfig.contact.phone,
    secondary: siteConfig.contact.timing,
    action: `tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, "")}`,
    color: "bg-seafoam",
  },
  {
    icon: Mail,
    title: "Email Us",
    primary: siteConfig.contact.email,
    secondary: "We reply within 24 hours",
    action: `mailto:${siteConfig.contact.email}`,
    color: "bg-lime",
  },
  // {
  //   icon: MapPin,
  //   title: "Visit Us",
  //   primary: siteConfig.contact.address.line1,
  //   secondary: `${siteConfig.contact.address.city}, ${siteConfig.contact.address.zip}`,
  //   action: "https://maps.google.com",
  //   color: "bg-forest",
  // },
  {
    icon: Clock,
    title: "Working Hours",
    primary: siteConfig.contact.timing,
    secondary: "Sun: Closed",
    action: null,
    color: "bg-amber",
  },
];

// Services list
const services = [
  "Orthopedic Care",
  "Sports Rehabilitation",
  "Neurological Therapy",
  "Manual Therapy",
  "Senior Care",
  "Post-Surgery Recovery",
  "General Inquiry",
  "Online Consultation",
  "Others",
];

export default function ContactPage() {
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

  // Validation function
  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.firstName.trim() || formData.firstName.trim().length < 2) {
      newErrors.firstName = "First name is required (min 2 characters)";
    }

    if (!formData.lastName.trim() || formData.lastName.trim().length < 2) {
      newErrors.lastName = "Last name is required (min 2 characters)";
    }

    if (
      !formData.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Please enter a valid email address";
    }

    const cleanPhone = formData.phone.replace(/\D/g, "");
    if (!cleanPhone || cleanPhone.length !== 10) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
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

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // For now, just show success (API integration can be added later)
    setStatus("success");

    // Reset form after success
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

  const resetForm = () => {
    setStatus("idle");
    setErrors({});
  };

  return (
    <main className="overflow-x-clip">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-white/40 to-section">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-lime/10 rounded-full blur-[100px] z-0 translate-x-1/4 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[22rem] h-[22rem] bg-white/30 rounded-full blur-[80px] z-0 -translate-x-1/4 translate-y-1/4" />

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
                Contact Our Team
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-forest mb-6 tracking-tight leading-[1.1]"
            >
              Let&apos;s Start Your <br className="hidden md:block" />
              <span className="text-lime font-serif italic relative inline-block">
                Recovery Journey
                <svg
                  className="absolute w-full h-3 -bottom-1 left-0 text-seafoam/30"
                  viewBox="0 0 100 20"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 10 Q 50 20 100 10"
                    fill="transparent"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-base md:text-xl text-forest/60 font-medium max-w-2xl mx-auto leading-relaxed"
            >
              Have questions? Ready to book an appointment? Reach out to our
              expert team and we’ll be in touch within 24 hours.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Cards Section */}
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
              <motion.div
                key={item.title}
                variants={fadeInUp}
                className="group"
              >
                {item.action ? (
                  <a
                    href={item.action}
                    target={
                      item.action.startsWith("http") ? "_blank" : undefined
                    }
                    rel={
                      item.action.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="block h-full"
                  >
                    <ContactCard item={item} />
                  </a>
                ) : (
                  <ContactCard item={item} />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main Contact Form Section */}
      <section className="py-20 md:py-28 bg-white relative overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-[20%] -right-[10%] w-[70vw] h-[70vw] rounded-full bg-forest/5 blur-[80px]" />
          <div className="absolute top-[60%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-seafoam/5 blur-[80px]" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column - Info & Why Choose Us */}
            <motion.div
              className="lg:col-span-5 flex flex-col justify-center h-full"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-10">
                <span className="inline-block py-1.5 px-4 rounded-full bg-forest/5 border border-forest/10 text-forest font-bold uppercase tracking-[0.15em] text-[10px] mb-4">
                  Send a Request
                </span>
                <h2 className="text-3xl md:text-5xl font-bold text-forest mb-6 tracking-tight leading-[1.1]">
                  Ready to Feel <br />
                  <span className="text-seafoam relative inline-block">
                    Better?
                    <svg
                      className="absolute w-full h-2 -bottom-0 left-0 text-lime/40"
                      viewBox="0 0 100 20"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M0 10 Q 50 20 100 10"
                        fill="transparent"
                        stroke="currentColor"
                        strokeWidth="6"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </h2>
                <p className="text-forest/70 text-base md:text-lg leading-relaxed max-w-md">
                  Fill out the form and our care coordinators will match you
                  with the right specialist for your needs.
                </p>
              </div>

              {/* Why Choose Us Features */}
              <div className="space-y-6 mt-4">
                <div className="flex gap-4">
                  <div className="shrink-0 w-12 h-12 rounded-2xl bg-forest/5 flex items-center justify-center border border-forest/10">
                    <Stethoscope className="w-6 h-6 text-forest" />
                  </div>
                  <div>
                    <h4 className="text-forest font-bold text-base mb-1">
                      Expert Specialists
                    </h4>
                    <p className="text-forest/60 text-sm leading-relaxed">
                      Highly trained physiotherapists dedicated to your full
                      recovery.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="shrink-0 w-12 h-12 rounded-2xl bg-seafoam/10 flex items-center justify-center border border-seafoam/20">
                    <ShieldCheck className="w-6 h-6 text-seafoam" />
                  </div>
                  <div>
                    <h4 className="text-forest font-bold text-base mb-1">
                      Premium Facility
                    </h4>
                    <p className="text-forest/60 text-sm leading-relaxed">
                      State-of-the-art equipment in a calming, hygienic
                      environment.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="shrink-0 w-12 h-12 rounded-2xl bg-lime/10 flex items-center justify-center border border-lime/20">
                    <HeartHandshake className="w-6 h-6 text-lime" />
                  </div>
                  <div>
                    <h4 className="text-forest font-bold text-base mb-1">
                      Personalized Care
                    </h4>
                    <p className="text-forest/60 text-sm leading-relaxed">
                      Tailored treatment plans designed specifically for your
                      body and goals.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Contact Form */}
            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-white rounded-[2rem] p-6 sm:p-10 md:p-12 shadow-[0_20px_60px_rgb(0,0,0,0.06)] border border-forest/5 relative">
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-lime/10 rounded-bl-[4rem] rounded-tr-[2rem] -z-10" />

                <AnimatePresence mode="wait">
                  {status === "success" ? (
                    <SuccessState onReset={resetForm} />
                  ) : (
                    <ContactForm
                      formData={formData}
                      setFormData={setFormData}
                      errors={errors}
                      status={status}
                      onSubmit={handleSubmit}
                      showCountryDropdown={showCountryDropdown}
                      setShowCountryDropdown={setShowCountryDropdown}
                      dropdownRef={dropdownRef}
                    />
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <ContactFAQ />
    </main>
  );
}

// Contact Card Component
function ContactCard({ item }: { item: (typeof contactInfo)[0] }) {
  const Icon = item.icon;
  return (
    <div className="h-full p-6 sm:p-8 rounded-3xl bg-white/70 backdrop-blur-md border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-400 group relative overflow-hidden">
      <div
        className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-transparent to-${item.color.replace("bg-", "")}/10 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500`}
      />

      <div
        className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center mb-6 shadow-md shadow-${item.color.replace("bg-", "")}/20 group-hover:rotate-6 transition-transform duration-300`}
      >
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="font-bold text-forest text-lg mb-2">{item.title}</h3>
      <div className="flex flex-col gap-1 items-start">
        {item.title === "Call Us" && (
          <img
            src="/logo/ae_flag.svg"
            alt="UAE Flag"
            className="w-5 h-auto rounded-[2px] shadow-sm border border-forest/5 mb-1 opacity-80"
          />
        )}
        <p className="text-forest text-base font-semibold group-hover:text-seafoam transition-colors">
          {item.primary}
        </p>
      </div>
      <p className="text-forest/60 text-sm mt-2">{item.secondary}</p>

      {item.action && (
        <div className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forest/40 group-hover:text-forest transition-colors">
          <span>{item.title === "Call Us" ? "Call Now" : "Send Email"}</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </div>
      )}
    </div>
  );
}

// Success State Component
function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="text-center py-16"
    >
      <div className="w-24 h-24 bg-lime/20 rounded-full flex items-center justify-center mx-auto mb-8 relative">
        <div className="absolute inset-0 bg-lime/20 rounded-full animate-ping opacity-20" />
        <CheckCircle className="w-12 h-12 text-forest" />
      </div>
      <h3 className="text-3xl font-bold text-forest mb-4 tracking-tight">
        Message Received!
      </h3>
      <p className="text-forest/60 text-lg mb-10 max-w-sm mx-auto leading-relaxed">
        Thank you for reaching out. Our care coordinators will get back to you
        within 24 hours to assist you further.
      </p>
      <button
        onClick={onReset}
        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-forest text-white font-bold hover:bg-seafoam transition-colors shadow-lg shadow-forest/20 hover:shadow-seafoam/20"
      >
        Send Another Message
        <ArrowRight className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

// Contact Form Component
function ContactForm({
  formData,
  setFormData,
  errors,
  status,
  onSubmit,
  showCountryDropdown,
  setShowCountryDropdown,
  dropdownRef,
}: {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  errors: Partial<FormData>;
  status: FormStatus;
  onSubmit: (e: React.FormEvent) => void;
  showCountryDropdown: boolean;
  setShowCountryDropdown: (v: boolean) => void;
  dropdownRef: React.RefObject<HTMLDivElement>;
}) {
  const inputClasses = (hasError: boolean) =>
    `w-full px-5 py-4 bg-forest/[0.02] border rounded-2xl text-base text-forest placeholder:text-forest/30 focus:outline-none focus:bg-white transition-all duration-300 ${
      hasError
        ? "border-red-300 focus:border-red-400 focus:ring-4 focus:ring-red-100"
        : "border-forest/10 hover:border-forest/20 focus:border-seafoam focus:ring-4 focus:ring-seafoam/10"
    }`;

  return (
    <motion.form
      key="form"
      onSubmit={onSubmit}
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-lime/20 rounded-2xl flex items-center justify-center">
          <MessageSquare className="w-6 h-6 text-forest" />
        </div>
        <div>
          <h3 className="font-bold text-forest text-2xl tracking-tight">
            Send a Message
          </h3>
          <p className="text-forest/50 text-sm mt-0.5">
            We&apos;ll respond within 24 hours
          </p>
        </div>
      </div>

      {/* Error Banner */}
      <AnimatePresence>
        {status === "error" && Object.keys(errors).length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-red-50 border border-red-200 rounded-xl p-4"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-red-700 font-medium text-sm">
                  Please fix the following errors:
                </p>
                <ul className="mt-1 space-y-0.5">
                  {Object.values(errors).map((error, i) => (
                    <li key={i} className="text-red-600 text-xs">
                      {error}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Name Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-forest mb-2">
            <span className="flex items-center gap-2">
              <User className="w-4 h-4 text-forest/40" />
              First Name *
            </span>
          </label>
          <input
            type="text"
            placeholder="John"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            disabled={status === "loading"}
            className={inputClasses(!!errors.firstName)}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-forest mb-2">
            <span className="flex items-center gap-2">
              <User className="w-4 h-4 text-forest/40" />
              Last Name *
            </span>
          </label>
          <input
            type="text"
            placeholder="Doe"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            disabled={status === "loading"}
            className={inputClasses(!!errors.lastName)}
          />
        </div>
      </div>

      {/* Email & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-forest mb-2">
            <span className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-forest/40" />
              Email *
            </span>
          </label>
          <input
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            disabled={status === "loading"}
            className={inputClasses(!!errors.email)}
          />
        </div>
        <div className="relative group/phone">
          <label className="block text-sm font-semibold text-forest mb-2">
            <span className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-forest/40" />
              Phone Number *
            </span>
          </label>
          <div className="relative">
            {/* Country Code Selection */}
            <div
              className="absolute left-[3px] top-[3px] bottom-[3px] z-10"
              ref={dropdownRef}
            >
              <button
                type="button"
                onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                className="flex items-center gap-1.5 h-full px-3.5 rounded-xl border-r border-forest/5 hover:bg-forest/5 transition-colors bg-white/50"
              >
                <span className="text-xl leading-none">
                  {
                    COUNTRY_CODES.find((c) => c.code === formData.countryCode)
                      ?.flag
                  }
                </span>
                <span className="text-sm font-bold text-forest">
                  {formData.countryCode}
                </span>
                <ChevronDown
                  className={cn(
                    "w-3.5 h-3.5 text-forest/40 transition-transform duration-200",
                    showCountryDropdown && "rotate-180",
                  )}
                />
              </button>

              <AnimatePresence>
                {showCountryDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full left-0 mt-2 w-[240px] bg-white rounded-2xl shadow-2xl border border-forest/10 py-3 z-50 overflow-hidden"
                  >
                    <div className="px-4 py-2 mb-2 border-b border-forest/5">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-forest/40">
                        Select Country
                      </p>
                    </div>
                    <div className="max-h-[280px] overflow-y-auto custom-scrollbar">
                      {COUNTRY_CODES.map((c) => (
                        <button
                          key={c.code + c.country}
                          type="button"
                          onClick={() => {
                            setFormData({ ...formData, countryCode: c.code });
                            setShowCountryDropdown(false);
                          }}
                          className={cn(
                            "flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-seafoam/5 transition-colors group",
                            formData.countryCode === c.code && "bg-seafoam/10",
                          )}
                        >
                          <span className="text-2xl leading-none">
                            {c.flag}
                          </span>
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-forest">
                              {c.country}
                            </span>
                            <span className="text-xs text-forest/40">
                              {c.code}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <input
              type="tel"
              placeholder="50 412 0369"
              value={formData.phone}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  phone: e.target.value.replace(/[^\d\s\-+()]/g, ""),
                })
              }
              disabled={status === "loading"}
              className={cn(inputClasses(!!errors.phone), "pl-[120px]")}
            />
          </div>
        </div>
      </div>

      {/* Service Selection */}
      <div>
        <label className="block text-sm font-semibold text-forest mb-2">
          <span className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-forest/40" />
            Service of Interest *
          </span>
        </label>
        <select
          value={formData.service}
          onChange={(e) =>
            setFormData({ ...formData, service: e.target.value })
          }
          disabled={status === "loading"}
          className={inputClasses(!!errors.service)}
        >
          <option value="">Select a service...</option>
          {services.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-semibold text-forest mb-2">
          <span className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-forest/40" />
            Message *
          </span>
        </label>
        <textarea
          rows={4}
          placeholder="Tell us about your condition, questions, or how we can help..."
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          disabled={status === "loading"}
          className={`${inputClasses(!!errors.message)} resize-none`}
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={status === "loading"}
        className="w-full !bg-forest hover:!bg-seafoam !h-14 !rounded-2xl !text-base shadow-lg shadow-forest/10 hover:shadow-seafoam/20 transition-all duration-300"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
            Sending Message...
          </>
        ) : (
          <>
            <Send className="w-5 h-5 mr-2" />
            Send Message
          </>
        )}
      </Button>

      <p className="text-xs text-center text-forest/40 pt-2">
        By submitting this form, you agree to our Privacy Policy and Terms of
        Service.
      </p>
    </motion.form>
  );
}

// Contact FAQ Section
function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How do I schedule my first appointment?",
      answer:
        "You can schedule your first appointment by calling us, filling out the contact form above, or using our online booking system. Our team will confirm your appointment within 24 hours.",
    },
    {
      question: "What should I bring to my first visit?",
      answer:
        "Please bring your ID, insurance card, any relevant medical records or imaging studies, a list of current medications, and comfortable clothing that allows easy movement for your assessment.",
    },
    {
      question: "Do you accept insurance?",
      answer:
        "Yes, we accept most major insurance plans. We recommend contacting your insurance provider or our office to verify your coverage before your appointment.",
    },
    {
      question: "What are your Hygiene protocols?",
      answer:
        "We maintain strict hygiene protocols including regular sanitization, air filtration systems, and optional mask requirements. Our facilities are thoroughly cleaned between each patient visit.",
    },
    {
      question: "Can I cancel or reschedule my appointment?",
      answer:
        "Yes, we understand schedules change. Please provide at least 24 hours notice for cancellations or rescheduling to avoid any cancellation fees.",
    },
  ];

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
            Common Questions
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-forest tracking-tight">
            Frequently Asked Questions
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
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-seafoam/50 rounded-2xl"
                >
                  <span
                    className={`font-semibold text-base md:text-lg pr-8 transition-colors ${isOpen ? "text-forest" : "text-forest/80"}`}
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
                        isOpen
                          ? "text-white -rotate-90"
                          : "text-forest rotate-90"
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
