"use client";

import { useState, useRef, useEffect } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bone,
  Zap,
  Brain,
  Hand,
  Heart,
  Hospital,
  Stethoscope,
  Lock,
  Star,
  Phone,
  Clock,
  User,
  Mail,
  Calendar,
  ArrowRight,
  Loader2,
  AlertCircle,
  PartyPopper,
  MessageSquare,
  ChevronDown,
  Globe,
  MoreHorizontal,
} from "lucide-react";

import type { ServiceType, TimeSlot } from "@/lib/supabase/types";
import { siteConfig } from "@/config/site";

const serviceIconMap: Record<ServiceType, typeof Bone> = {
  ortho: Bone,
  sports: Zap,
  neuro: Brain,
  manual: Hand,
  senior: Heart,
  surgery: Hospital,
  online: Globe,
  others: MoreHorizontal,
};

const serviceLabels: Record<ServiceType, string> = {
  ortho: "Orthopedic Care",
  sports: "Sports Rehabilitation",
  neuro: "Neurological Therapy",
  manual: "Manual Therapy",
  senior: "Senior Care",
  surgery: "Post-Surgery Recovery",
  online: "Online Consultation",
  others: "Others",
};

const COUNTRY_CODES = [
  { code: "+971", country: "UAE", flag: "" },
  { code: "+91", country: "IN", flag: "" },
  { code: "+44", country: "UK", flag: "" },
  { code: "+1", country: "US", flag: "" },
  { code: "+966", country: "SA", flag: "" },
  { code: "+974", country: "QA", flag: "" },
  { code: "+968", country: "OM", flag: "" },
  { code: "+965", country: "KW", flag: "" },
  { code: "+973", country: "BH", flag: "" },
  { code: "+61", country: "AU", flag: "" },
  { code: "+1", country: "CA", flag: "" },
  { code: "+49", country: "DE", flag: "" },
] as const;

type CountryCode = (typeof COUNTRY_CODES)[number]["code"];

// Interface for slot availability - commented out for now
// interface SlotAvailability {
//   slot: TimeSlot;
//   available: boolean;
//   label: string;
// }

interface FormData {
  name: string;
  email: string;
  countryCode: CountryCode;
  phone: string;
  service: ServiceType | "";

  date: string;
  timeSlot: TimeSlot | "";
  message: string;
}

type FormStatus = "idle" | "loading" | "success" | "error";

export function AppointmentSection() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    countryCode: "+971",
    phone: "",
    service: "",

    date: "",
    timeSlot: "",
    message: "",
  });

  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<string[]>([]);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [isRecaptchaReady, setIsRecaptchaReady] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Monitor reCAPTCHA readiness
  useEffect(() => {
    if (executeRecaptcha) {
      setIsRecaptchaReady(true);
    }
  }, [executeRecaptcha]);

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

  // const [slots, setSlots] = useState<SlotAvailability[]>([]);
  // const [loadingSlots, setLoadingSlots] = useState(false);
  const [bookedAppointment, setBookedAppointment] = useState<{
    id: string;
    date: string;
    timeSlot: string;
    service: string;
  } | null>(null);

  const services: ServiceType[] = [
    "ortho",
    "sports",
    "neuro",
    "manual",
    "senior",
    "surgery",
    "online",
    "others",
  ];

  // Get minimum date (today)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  // Get maximum date (90 days from now)
  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 90);
    return maxDate.toISOString().split("T")[0];
  };

  // Slot availability checking - commented out for now (duplicates allowed)
  // const fetchAvailableSlots = useCallback(async (date: string, service: ServiceType) => {
  //   setLoadingSlots(true);
  //   try {
  //     const response = await fetch(
  //       `/api/appointments?date=${date}&service=${service}`
  //     );
  //     const data = await response.json();
  //
  //     if (data.success) {
  //       setSlots(data.data.slots);
  //     } else {
  //       setSlots([]);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching slots:', error);
  //     setSlots([]);
  //   } finally {
  //     setLoadingSlots(false);
  //   }
  // }, []);

  // useEffect(() => {
  //   if (formData.date && formData.service) {
  //     fetchAvailableSlots(formData.date, formData.service);
  //     setFormData(prev => ({ ...prev, timeSlot: '' })); // Reset time slot
  //   }
  // }, [formData.date, formData.service, fetchAvailableSlots]);

  const timeSlotOptions = [
    { slot: "morning", label: "Morning (9AM-12PM)" },
    { slot: "afternoon", label: "Afternoon (12PM-5PM)" },
    { slot: "evening", label: "Evening (5PM-7PM)" },
  ];

  // Client-side validation
  const validateForm = (): string[] => {
    const validationErrors: string[] = [];

    if (!formData.name || formData.name.trim().length < 2) {
      validationErrors.push("Name must be at least 2 characters");
    }

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      validationErrors.push("Please provide a valid email address");
    }

    const cleanPhone = formData.phone.replace(/\D/g, "");
    if (!cleanPhone || cleanPhone.length !== 10) {
      validationErrors.push("Please provide a valid 10-digit phone number");
    }

    if (!formData.service) {
      validationErrors.push("Please select a service");
    }

    if (!formData.date) {
      validationErrors.push("Please select an appointment date");
    }

    if (!formData.timeSlot) {
      validationErrors.push("Please select a time slot");
    }

    return validationErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrors([]);

    try {
      if (!executeRecaptcha) {
        setErrors([
          "Security check is loading. Please wait a moment and try again.",
          "If the problem persists, please refresh the page.",
        ]);
        setStatus("error");
        return;
      }

      let recaptchaToken: string;
      try {
        recaptchaToken = await executeRecaptcha("appointment_booking");
      } catch (recaptchaError) {
        console.error("reCAPTCHA execution failed:", recaptchaError);
        setErrors(["Failed to verify security check. Please try again."]);
        setStatus("error");
        return;
      }

      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone
            ? `${formData.countryCode}${formData.phone}`
            : undefined,
          service: formData.service,
          date: formData.date,
          timeSlot: formData.timeSlot,
          message: formData.message || undefined,
          recaptchaToken,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        setBookedAppointment({
          id: data.data.id,
          date: data.data.date,
          timeSlot: data.data.timeSlot,
          service: data.data.service,
        });
        // Reset form
        setFormData({
          name: "",
          email: "",
          countryCode: "+971",
          phone: "",
          service: "",
          date: "",
          timeSlot: "",
          message: "",
        });
        // setSlots([]);
      } else {
        setErrors(data.errors || ["Failed to book appointment"]);
        setStatus("error");
      }
    } catch (error) {
      console.error("Booking error:", error);
      setErrors(["An unexpected error occurred. Please try again."]);
      setStatus("error");
    }
  };

  const resetForm = () => {
    setStatus("idle");
    setErrors([]);
    setBookedAppointment(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getTimeSlotLabel = (slot: string) => {
    const labels: Record<string, string> = {
      morning: "Morning (9AM-12PM)",
      afternoon: "Afternoon (12PM-5PM)",
      evening: "Evening (5PM-10PM)",
    };
    return labels[slot] || slot;
  };

  return (
    <section
      id="appointment"
      className="relative py-12 md:py-16 overflow-hidden"
    >
      {/* Split Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-forest" />
        <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full bg-white hidden lg:block" />
      </div>

      {/* Background Pattern on Dark Side */}
      <div className="absolute inset-0 lg:w-1/2 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
          }}
        />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-seafoam/10 rounded-full blur-[80px]" />
      </div>

      <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-0 items-center">
          {/* Left - Content */}
          <motion.div
            className="lg:pr-12"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-seafoam">
                Available Now
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans text-white font-semibold leading-[1.1] tracking-tight mb-4">
              Book Your
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-seafoam to-lime">
                Assessment
              </span>
            </h2>

            <p className="text-white/50 text-sm md:text-base max-w-md mb-8">
              Start your recovery with expert that will create your personalized
              treatment plan.
            </p>

            {/* Feature List */}
            <div className="space-y-3 mb-8">
              {[
                { text: "Same-day appointments available", Icon: Zap },
                { text: "Expert physiotherapists on staff", Icon: Stethoscope },
                // { text: "Insurance accepted & verified", Icon: CheckCircle },
              ].map((item, i) => (
                <motion.div
                  key={item.text}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                >
                  <item.Icon className="w-4 h-4 text-seafoam" />
                  <span className="text-white/70 text-sm">{item.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Contact Quick Links */}
            <div className="flex items-center gap-6">
              <a
                href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, "")}`}
                className="group flex items-center gap-2"
              >
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-seafoam/20 transition-colors">
                  <Phone className="w-4 h-4 text-seafoam" />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">Call Us</p>
                  <div className="flex items-center gap-2">
                    <Image
                      src="/logo/ae_flag.svg"
                      alt="UAE Flag"
                      width={24}
                      height={14}
                      className="rounded shadow-sm border border-white/20"
                    />
                    <p className="text-white/50 text-xs">
                      {siteConfig.contact.phone}
                    </p>
                  </div>
                </div>
              </a>
              <div className="w-px h-10 bg-white/10" />
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-seafoam" />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">Hours</p>
                  <p className="text-white/50 text-xs">
                    {siteConfig.contact.timing}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:pl-8"
          >
            <div className="bg-white rounded-2xl p-5 md:p-6 shadow-2xl shadow-forest/10 lg:shadow-none border border-forest/5 lg:border-0">
              <AnimatePresence mode="wait">
                {/* Success State */}
                {status === "success" && bookedAppointment ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 bg-seafoam/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <PartyPopper className="w-8 h-8 text-seafoam" />
                    </div>
                    <h3 className="text-xl font-bold text-forest mb-2">
                      Appointment Booked!
                    </h3>
                    <p className="text-forest/80 text-sm mb-6">
                      We&apos;ve received your booking request. A confirmation
                      email will be sent to your inbox shortly.
                    </p>

                    <div className="bg-section/50 rounded-xl p-4 mb-6 text-left">
                      <h4 className="text-xs font-semibold text-forest/50 uppercase tracking-wider mb-3">
                        Booking Details
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-forest/80">
                            Service
                          </span>
                          <span className="text-sm font-medium text-forest">
                            {
                              serviceLabels[
                                bookedAppointment.service as ServiceType
                              ]
                            }
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-forest/80">Date</span>
                          <span className="text-sm font-medium text-forest">
                            {formatDate(bookedAppointment.date)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-forest/80">Time</span>
                          <span className="text-sm font-medium text-forest">
                            {getTimeSlotLabel(bookedAppointment.timeSlot)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-forest/80">
                            Reference
                          </span>
                          <span className="text-xs font-mono text-forest/50">
                            {bookedAppointment.id.slice(0, 8).toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={resetForm}
                      className="text-seafoam text-sm font-medium hover:underline"
                    >
                      Book Another Appointment
                    </button>
                  </motion.div>
                ) : (
                  /* Form State */
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Error Messages */}
                    <AnimatePresence>
                      {status === "error" && errors.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-red-50 border border-red-200 rounded-lg p-3"
                        >
                          <div className="flex items-start gap-2">
                            <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                            <div>
                              {errors.map((error, i) => (
                                <p key={i} className="text-red-600 text-xs">
                                  {error}
                                </p>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Name & Email Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2">
                          <User className="w-4 h-4 text-forest/30" />
                        </div>
                        <input
                          type="text"
                          aria-label="Name"
                          placeholder="Name *"
                          required
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          disabled={status === "loading"}
                          className="w-full pl-9 pr-3 py-3 bg-section/40 border-0 rounded-xl text-sm text-forest placeholder:text-forest/40 focus:outline-none focus:ring-2 focus:ring-seafoam/30 disabled:opacity-50 transition-all font-medium"
                        />
                      </div>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2">
                          <Mail className="w-4 h-4 text-forest/30" />
                        </div>
                        <input
                          type="email"
                          aria-label="Email Address"
                          placeholder="Email *"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          disabled={status === "loading"}
                          className="w-full pl-9 pr-3 py-3 bg-section/40 border-0 rounded-xl text-sm text-forest placeholder:text-forest/40 focus:outline-none focus:ring-2 focus:ring-seafoam/30 disabled:opacity-50 transition-all font-medium"
                        />
                      </div>
                    </div>

                    {/* Phone Row - Now full width for better space */}
                    <div className="relative group/phone">
                      {/* Country Code Selection */}
                      <div className="absolute left-[3px] top-[1px] bottom-[1px] z-20">
                        <button
                          type="button"
                          onClick={() =>
                            setShowCountryDropdown(!showCountryDropdown)
                          }
                          disabled={status === "loading"}
                          className="flex items-center gap-1.5 h-full px-3 rounded-xl hover:bg-forest/5 transition-colors text-forest"
                        >
                          <span className="text-xl leading-none">
                            {
                              COUNTRY_CODES.find(
                                (c) => c.code === formData.countryCode,
                              )?.flag
                            }
                          </span>
                          <span className="text-xs font-bold font-mono">
                            {formData.countryCode}
                          </span>
                          <ChevronDown
                            className={cn(
                              "w-3.5 h-3.5 text-forest/40 transition-transform duration-300",
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
                              className="absolute top-full left-0 mt-3 w-56 max-h-72 overflow-y-auto bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,45,4,0.15)] border border-forest/5 p-2 z-[60] scroller-hide"
                            >
                              <div className="px-2 py-1.5 mb-1.5 border-b border-forest/5">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-forest/40">
                                  Select Country
                                </span>
                              </div>
                              {COUNTRY_CODES.map((country) => (
                                <button
                                  key={`${country.country}-${country.code}`}
                                  type="button"
                                  onClick={() => {
                                    setFormData({
                                      ...formData,
                                      countryCode: country.code,
                                    });
                                    setShowCountryDropdown(false);
                                  }}
                                  className={cn(
                                    "flex items-center justify-between w-full p-2.5 rounded-xl text-left transition-all",
                                    formData.countryCode === country.code
                                      ? "bg-forest/5 text-forest"
                                      : "hover:bg-forest/5 text-forest/80 hover:translate-x-0.5",
                                  )}
                                >
                                  <div className="flex items-center gap-3">
                                    <span className="text-xl">
                                      {country.flag}
                                    </span>
                                    <div className="flex flex-col">
                                      <span className="text-xs font-bold">
                                        {country.country}
                                      </span>
                                    </div>
                                  </div>
                                  <span className="text-[10px] font-mono text-forest/40 bg-forest/5 px-1.5 py-0.5 rounded">
                                    {country.code}
                                  </span>
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      <input
                        type="tel"
                        aria-label="Phone Number"
                        placeholder="Phone Number *"
                        required
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            phone: e.target.value.replace(/[^\d\s\-+()]/g, ""),
                          })
                        }
                        disabled={status === "loading"}
                        className={cn(
                          "w-full pr-4 py-3.5 bg-section/40 border-0 rounded-xl text-sm sm:text-base text-forest placeholder:text-forest/30 focus:outline-none focus:ring-2 focus:ring-seafoam/30 disabled:opacity-50 transition-all font-medium",
                          // Padding left adjustment: [Flag + Code + Chevron] needs ~110px
                          "pl-[115px]",
                        )}
                      />
                    </div>
                    {/* Service Selection Grid */}

                    <div>
                      <p className="text-[10px] text-forest/50 uppercase tracking-wider font-medium mb-2">
                        Select Service *
                      </p>
                      <div className="grid grid-cols-4 sm:grid-cols-4 gap-2 sm:gap-1.5">
                        {services.map((service) => {
                          const IconComponent = serviceIconMap[service];
                          return (
                            <button
                              key={service}
                              type="button"
                              onClick={() =>
                                setFormData({ ...formData, service })
                              }
                              disabled={status === "loading"}
                              className={`flex flex-col items-center p-2.5 sm:p-2 rounded-lg transition-all duration-200 disabled:opacity-50 ${
                                formData.service === service
                                  ? "bg-forest text-white shadow-md"
                                  : "bg-section/40 text-forest/80 hover:bg-section"
                              }`}
                            >
                              <IconComponent className="w-5 h-5 sm:w-4 sm:h-4 mb-1 sm:mb-0.5" />
                              <span className="text-[10px] sm:text-[9px] font-medium leading-tight">
                                {serviceLabels[service]}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Date & Time Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2">
                          <Calendar className="w-4 h-4 text-forest/30" />
                        </div>
                        <input
                          type="date"
                          aria-label="Appointment Date"
                          required
                          min={getMinDate()}
                          max={getMaxDate()}
                          value={formData.date}
                          onChange={(e) =>
                            setFormData({ ...formData, date: e.target.value })
                          }
                          disabled={status === "loading"}
                          className="w-full pl-9 pr-3 py-2.5 bg-section/40 border-0 rounded-lg text-sm sm:text-xs text-forest focus:outline-none focus:ring-2 focus:ring-seafoam/30 cursor-pointer disabled:opacity-50"
                        />
                      </div>
                      <div className="relative">
                        {/* Slot availability loading - commented out
                        {loadingSlots ? (
                          <div className="flex items-center justify-center h-full px-3 py-2.5 bg-section/40 rounded-lg">
                            <Loader2 className="w-4 h-4 text-forest/40 animate-spin" />
                            <span className="ml-2 text-xs text-forest/40">Loading...</span>
                          </div>
                        ) : ( */}
                        <select
                          required
                          aria-label="Time Slot"
                          value={formData.timeSlot}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              timeSlot: e.target.value as TimeSlot,
                            })
                          }
                          disabled={status === "loading"}
                          className="w-full px-3 py-2.5 bg-section/40 border-0 rounded-lg text-sm sm:text-xs text-forest focus:outline-none focus:ring-2 focus:ring-seafoam/30 cursor-pointer disabled:opacity-50"
                        >
                          <option value="">Select Time *</option>
                          {timeSlotOptions.map((slot) => (
                            <option key={slot.slot} value={slot.slot}>
                              {slot.label}
                            </option>
                          ))}
                        </select>
                        {/* )} */}
                      </div>
                    </div>

                    {/* Message Field */}
                    <div className="relative">
                      <div className="absolute left-3 top-3">
                        <MessageSquare className="w-4 h-4 text-forest/30" />
                      </div>
                      <textarea
                        placeholder="Additional notes or concerns (optional)"
                        aria-label="Additional Message"
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        disabled={status === "loading"}
                        rows={2}
                        className="w-full pl-9 pr-3 py-2.5 bg-section/40 border-0 rounded-lg text-sm sm:text-xs text-forest placeholder:text-forest/40 focus:outline-none focus:ring-2 focus:ring-seafoam/30 resize-none disabled:opacity-50"
                      />
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={status === "loading" || !isRecaptchaReady}
                      className="w-full py-4 bg-forest text-white font-bold uppercase tracking-widest rounded-xl flex items-center justify-center gap-3 transition-all duration-300 shadow-[4px_4px_0px_0px_#A4C639] hover:bg-seafoam hover:translate-x-[2.5px] hover:translate-y-[2.5px] hover:shadow-none hover:text-forest active:translate-x-[4px] active:translate-y-[4px] disabled:opacity-70 disabled:cursor-not-allowed outline-none focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2"
                      whileHover={{ scale: 1 }}
                      whileTap={{ scale: 1 }}
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Booking...</span>
                        </>
                      ) : !isRecaptchaReady ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Loading Security...</span>
                        </>
                      ) : (
                        <>
                          <span>Book Assessment</span>
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </motion.button>

                    {/* Trust Row */}
                    <div className="flex items-center justify-center gap-4 pt-1">
                      <span className="flex items-center gap-1 text-[10px] text-forest/40">
                        <Lock className="w-3 h-3" /> Secure
                      </span>
                      <span className="flex items-center gap-1 text-[10px] text-forest/40">
                        <Star className="w-3 h-3" /> 5-Star
                      </span>
                      {/* <span className="flex items-center gap-1 text-[10px] text-forest/40">
                        <Check className="w-3 h-3" /> Free
                      </span> */}
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
