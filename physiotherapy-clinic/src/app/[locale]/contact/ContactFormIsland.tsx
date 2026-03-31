"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  CheckCircle,
  Loader2,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

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

export default function ContactFormIsland({ labels, services }: ContactFormIslandProps) {
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
          <h3 className="text-2xl font-bold text-forest mb-3">{labels.successTitle}</h3>
          <p className="text-forest/70">{labels.successMessage}</p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-8 px-8 py-3 bg-forest text-white rounded-full font-bold hover:bg-seafoam hover:text-forest transition-all"
          >
            {labels.close}
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
              <label className="block text-forest font-medium text-sm mb-2">{labels.firstName}</label>
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
              <label className="block text-forest font-medium text-sm mb-2">{labels.lastName}</label>
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
            <label className="block text-forest font-medium text-sm mb-2">{labels.email}</label>
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
            <label className="block text-forest font-medium text-sm mb-2">{labels.phone}</label>
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
            <label className="block text-forest font-medium text-sm mb-2">{labels.service}</label>
            <select
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              className={cn(
                "w-full h-14 px-5 rounded-2xl bg-white border transition-all text-forest",
                errors.service ? "border-red-400" : "border-forest/10 focus:border-seafoam"
              )}
            >
              <option value="">{labels.serviceDefault}</option>
              {services.map((s) => (
                <option key={s.key} value={s.key}>{s.label}</option>
              ))}
            </select>
          </div>

          <div className="mt-6">
            <label className="block text-forest font-medium text-sm mb-2">{labels.message}</label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={4}
              placeholder={labels.messagePlaceholder}
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
                {labels.submitting}
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                {labels.submit}
              </>
            )}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
