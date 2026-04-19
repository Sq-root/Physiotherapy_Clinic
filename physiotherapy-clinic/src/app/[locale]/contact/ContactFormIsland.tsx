"use client";

import { useState, useRef, useEffect } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  CheckCircle,
  Loader2,
  ChevronDown,
  MessageSquare,
  User,
  Mail,
  Phone,
  Stethoscope,
  MessageCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/routing";

// ── Country codes (flag text replaced with ISO country code text after emoji removal) ──
const COUNTRY_CODES = [
  { code: "+971", country: "AE", label: "UAE" },
  { code: "+91",  country: "IN", label: "India" },
  { code: "+44",  country: "GB", label: "UK" },
  { code: "+1",   country: "US", label: "USA" },
  { code: "+966", country: "SA", label: "KSA" },
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

interface Service {
  key: string;
  label: string;
}

interface ContactFormIslandProps {
  labels: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    service: string;
    serviceDefault: string;
    message: string;
    messagePlaceholder: string;
    submit: string;
    submitting: string;
    successTitle: string;
    successMessage: string;
    close: string;
  };
  services: Service[];
}

// ── Shared input class ──────────────────────────────────────────────────────────
const inputBase =
  "w-full h-12 px-4 rounded-xl bg-white border text-forest text-sm placeholder:text-forest/30 outline-none transition-all duration-200 focus:border-seafoam focus:ring-2 focus:ring-seafoam/10";

export default function ContactFormIsland({ labels, services }: ContactFormIslandProps) {
  const { executeRecaptcha } = useGoogleReCaptcha();
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
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close country dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowCountryDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ── Validation ────────────────────────────────────────────────────────────────
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (!formData.firstName.trim() || formData.firstName.trim().length < 2)
      newErrors.firstName = "Required";
    if (!formData.lastName.trim() || formData.lastName.trim().length < 2)
      newErrors.lastName = "Required";
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Valid email required";
    const cleanPhone = formData.phone.replace(/\D/g, "");
    if (!cleanPhone || cleanPhone.length < 7)
      newErrors.phone = "Valid phone required";
    if (!formData.service)
      newErrors.service = "Please select a service";
    if (!formData.message.trim() || formData.message.trim().length < 10)
      newErrors.message = "At least 10 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ── Submit ────────────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) { setStatus("error"); return; }
    if (!executeRecaptcha) return;

    setStatus("loading");
    setErrors({});

    try {
      const recaptchaToken = await executeRecaptcha("contact_form");
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, recaptchaToken }),
      });

      let result: { success?: boolean; errors?: Record<string, string> | string[]; error?: string } = {};
      try {
        result = await response.json();
      } catch {
        // Non-JSON response — treat as server down
      }

      if (response.ok && result.success !== false) {
        setStatus("success");
        setFormData({ firstName: "", lastName: "", email: "", countryCode: "+971", phone: "", service: "", message: "" });
        return;
      }

      if (response.status === 400 && result.errors && !Array.isArray(result.errors)) {
        // Field-level validation errors from the API
        setErrors(result.errors as Partial<Record<keyof FormData, string>>);
        setStatus("error");
        return;
      }

      setStatus("error");
      setErrors({ message: "Server is temporarily unavailable. Please try again in a few minutes." });
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("error");
      setErrors({ message: "Server is temporarily unavailable. Please try again in a few minutes." });
    }
  };

  const selectedCountry = COUNTRY_CODES.find((c) => c.code === formData.countryCode) ?? COUNTRY_CODES[0];

  // ── Helpers ──────────────────────────────────────────────────────────────────
  const field = (name: keyof FormData) => ({
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setFormData((prev) => ({ ...prev, [name]: e.target.value })),
    className: cn(inputBase, errors[name] ? "border-red-400 focus:border-red-400 focus:ring-red-100" : "border-forest/10"),
  });

  return (
    <AnimatePresence mode="wait">
      {/* ── Success State ──────────────────────────────────────────────────────── */}
      {status === "success" ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-3xl border border-forest/[0.08] shadow-xl p-12 text-center"
        >
          <div className="w-20 h-20 rounded-full bg-seafoam/15 mx-auto mb-6 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-seafoam" />
          </div>
          <h3 className="text-2xl font-bold text-forest mb-3">{labels.successTitle}</h3>
          <p className="text-forest/80 max-w-xs mx-auto">{labels.successMessage}</p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-8 px-8 py-3 bg-forest text-white rounded-full font-bold hover:bg-seafoam hover:text-forest transition-all"
          >
            {labels.close}
          </button>
        </motion.div>
      ) : (
        /* ── Form Card ─────────────────────────────────────────────────────── */
        <motion.div
          key="form"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          className="bg-white rounded-3xl border border-forest/[0.08] shadow-xl overflow-hidden"
        >
          {/* Card Header */}
          <div className="flex items-center gap-4 px-8 pt-7 pb-6 border-b border-forest/[0.06]">
            <div className="w-11 h-11 rounded-2xl bg-seafoam/10 flex items-center justify-center shrink-0">
              <MessageSquare className="w-5 h-5 text-seafoam" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-forest leading-tight">Send a Message</h3>
              <p className="text-xs text-forest/45 mt-0.5">We&apos;ll respond within 24 hours</p>
            </div>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit} noValidate className="px-8 pt-6 pb-8 space-y-5">

            {/* Row 1: First Name + Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-forest/80 uppercase tracking-wider mb-2">
                  <User className="w-3.5 h-3.5" />
                  {labels.firstName} <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="John"
                  value={formData.firstName}
                  {...field("firstName")}
                />
                {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-forest/80 uppercase tracking-wider mb-2">
                  <User className="w-3.5 h-3.5" />
                  {labels.lastName} <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Doe"
                  value={formData.lastName}
                  {...field("lastName")}
                />
                {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>}
              </div>
            </div>

            {/* Row 2: Email + Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Email */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-forest/80 uppercase tracking-wider mb-2">
                  <Mail className="w-3.5 h-3.5" />
                  {labels.email} <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  {...field("email")}
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Phone with country code */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-forest/80 uppercase tracking-wider mb-2">
                  <Phone className="w-3.5 h-3.5" />
                  {labels.phone} <span className="text-red-400">*</span>
                </label>
                <div className="flex gap-2">
                  {/* Country Code Picker */}
                  <div ref={dropdownRef} className="relative shrink-0">
                    <button
                      type="button"
                      onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                      className={cn(
                        "h-12 px-3 rounded-xl bg-white border flex items-center gap-1.5 text-sm font-semibold text-forest outline-none transition-all duration-200",
                        showCountryDropdown
                          ? "border-seafoam ring-2 ring-seafoam/10"
                          : "border-forest/10 hover:border-forest/30"
                      )}
                    >
                      <span className="text-[10px] font-bold text-forest/50 tracking-wider">
                        {selectedCountry.country}
                      </span>
                      <span>{selectedCountry.code}</span>
                      <ChevronDown
                        className={cn(
                          "w-3 h-3 text-forest/40 transition-transform duration-200",
                          showCountryDropdown && "rotate-180"
                        )}
                      />
                    </button>

                    {/* Dropdown */}
                    <AnimatePresence>
                      {showCountryDropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: 4, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 4, scale: 0.97 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full mt-2 left-0 bg-white rounded-xl shadow-lg border border-forest/10 py-1.5 z-50 min-w-[160px]"
                        >
                          {COUNTRY_CODES.map((c) => (
                            <button
                              key={c.code + c.country}
                              type="button"
                              onClick={() => {
                                setFormData((prev) => ({ ...prev, countryCode: c.code }));
                                setShowCountryDropdown(false);
                              }}
                              className={cn(
                                "w-full px-4 py-2 flex items-center gap-3 hover:bg-section transition-colors text-start text-sm",
                                c.code === formData.countryCode && "bg-section"
                              )}
                            >
                              <span className="text-[10px] font-bold text-forest/50 w-6">{c.country}</span>
                              <span className="text-forest font-semibold">{c.code}</span>
                              <span className="text-forest/40">{c.label}</span>
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Phone number input */}
                  <input
                    type="tel"
                    placeholder="50 412 0369"
                    value={formData.phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                    className={cn(
                      inputBase,
                      "flex-1",
                      errors.phone ? "border-red-400 focus:border-red-400 focus:ring-red-100" : "border-forest/10"
                    )}
                  />
                </div>
                {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
              </div>
            </div>

            {/* Service of Interest */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-forest/80 uppercase tracking-wider mb-2">
                <Stethoscope className="w-3.5 h-3.5" />
                {labels.service} <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <select
                  value={formData.service}
                  onChange={(e) => setFormData((prev) => ({ ...prev, service: e.target.value }))}
                  className={cn(
                    inputBase,
                    "appearance-none pr-10 cursor-pointer",
                    errors.service ? "border-red-400 focus:border-red-400 focus:ring-red-100" : "border-forest/10",
                    !formData.service && "text-forest/30"
                  )}
                >
                  <option value="" disabled>{labels.serviceDefault}</option>
                  {services.map((s) => (
                    <option key={s.key} value={s.key}>{s.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-forest/40 pointer-events-none" />
              </div>
              {errors.service && <p className="text-red-400 text-xs mt-1">{errors.service}</p>}
            </div>

            {/* Message */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-forest/80 uppercase tracking-wider mb-2">
                <MessageCircle className="w-3.5 h-3.5" />
                {labels.message} <span className="text-red-400">*</span>
              </label>
              <textarea
                rows={4}
                placeholder={labels.messagePlaceholder}
                value={formData.message}
                onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                className={cn(
                  "w-full p-4 rounded-xl bg-white border text-forest text-sm placeholder:text-forest/30 outline-none transition-all duration-200 resize-none focus:ring-2 focus:ring-seafoam/10",
                  errors.message
                    ? "border-red-400 focus:border-red-400 focus:ring-red-100"
                    : "border-forest/10 focus:border-seafoam"
                )}
              />
              {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-4.5 bg-forest text-white font-bold text-sm uppercase tracking-widest rounded-2xl transition-all duration-300 shadow-[4px_4px_0px_0px_#A4C639] hover:bg-seafoam hover:text-forest hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:translate-x-[3.5px] active:translate-y-[3.5px] active:shadow-none disabled:opacity-50 flex items-center justify-center gap-3 outline-none focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {labels.submitting}
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  {labels.submit}
                </>
              )}
            </button>

            {/* Privacy notice */}
            <p className="text-center text-[11px] text-forest/35 leading-relaxed">
              By submitting this form, you agree to our{" "}
              <Link href="/privacy" className="underline underline-offset-2 hover:text-forest/80 transition-colors">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link href="/terms" className="underline underline-offset-2 hover:text-forest/80 transition-colors">
                Terms of Service
              </Link>
              .
            </p>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
