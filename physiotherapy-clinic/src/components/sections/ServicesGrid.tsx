"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  Activity,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import {
  services,
  serviceCategories,
  type ServiceCategory,
} from "@/lib/data/services";
import { ServiceQuickModal } from "@/components/ui/ServiceQuickModal";
import { DynamicIcon } from "@/components/ui/DynamicIcon";

// ─── Types ──────────────────────────────────────────────────────────────────

export type ServiceTranslation = {
  title: string;
  heroSubtitle: string;
  overview: string;
  symptoms?: string[];
  clinicalApproach?: string[];
  benefits: string[];
  idealFor: string[];
  outcome?: string;
  duration: string;
  frequency: string;
};

type Props = {
  translations: Record<string, ServiceTranslation>;
  categoryLabels: Record<string, string>;
  uiLabels: {
    quickView: string;
    viewDetails: string;
    closeModal: string;
    bookAppointment: string;
    serviceCount: string;
    mechanism: string;
    symptoms: string;
    clinicalApproach: string;
    outcome: string;
    benefits: string;
    idealFor: string;
  };
};

// ─── Patient-outcome "promise" statements ────────────────────────────────────
const PATIENT_OUTCOME: Record<string, string> = {
  "neck-pain": "Move your head freely again",
  "disc-prolapse-sciatica": "End the shooting leg pain",
  "shoulder-impingement": "Reach overhead without pain",
  "tennis-golfer-elbow": "Grip without flinching",
  "knee-pain-acl": "Run, cut & compete again",
  "plantar-fasciitis": "Take your first steps pain-free",
  osteoarthritis: "Keep moving for decades",
  "meniscus-injury": "Skip the surgery table",
  "post-surgical-rehab": "Reclaim full function",
  "dry-needling": "Reset your pain system",
  "kinesiology-taping": "Move supported, not restricted",
  neurodynamics: "Free trapped nerve pain",
  "injury-prevention": "Stay on the field, not the sideline",
  "return-to-play": "Return stronger than before",
  "womens-health": "Reclaim pelvic confidence",
  "prenatal-postnatal": "Carry comfortably, recover fully",
  "geriatric-mobility": "Live independently longer",
  "cancer-rehabilitation": "Rebuild energy and strength",
  ergonomics: "Work 8 hours without aching",
  "postural-education": "Stand taller, move better",
  osteoporosis: "Build bones that last a lifetime",
  "post-fracture-rehab": "Return stronger, break never again",
};

// Patient-relatable symptom chips per service
const SYMPTOM_CHIPS: Record<string, string[]> = {
  "neck-pain": ["Stiff neck", "Headaches", "Arm tingling"],
  "disc-prolapse-sciatica": ["Leg shooting pain", "Back spasms", "Numbness"],
  "shoulder-impingement": ["Can't lift arm", "Night pain", "Clicking"],
  "tennis-golfer-elbow": ["Grip weakness", "Elbow ache", "Forearm burn"],
  "knee-pain-acl": ["Knee giving way", "Swelling", "Can't squat"],
  "plantar-fasciitis": ["Heel pain on rising", "Arch pain", "Limping"],
  osteoarthritis: ["Morning stiffness", "Joint creak", "Aching at rest"],
  "meniscus-injury": ["Locking knee", "Joint line pain", "Can't kneel"],
  "post-surgical-rehab": ["Weakness post-op", "Scar tightness", "Limping"],
  "dry-needling": ["Chronic knots", "Referred pain", "Muscle guarding"],
  "kinesiology-taping": ["Swelling", "Instability", "Movement limitation"],
  neurodynamics: ["Radiating pain", "Pins & needles", "Nerve tension"],
  "injury-prevention": ["Recurring injuries", "Muscle imbalance", "At-risk athlete"],
  "return-to-play": ["Post-injury", "Fitness gaps", "Fear of re-injury"],
  "womens-health": ["Pelvic floor issues", "Leaking", "Pelvic pain"],
  "prenatal-postnatal": ["Back pain in pregnancy", "Diastasis", "Incontinence"],
  "geriatric-mobility": ["Falls risk", "Balance loss", "Weak legs"],
  "cancer-rehabilitation": ["Fatigue", "Lymphoedema", "Weakness post-chemo"],
  ergonomics: ["Desk neck pain", "RSI", "End-of-day aching"],
  "postural-education": ["Rounded shoulders", "Slouching", "Chronic tension"],
  osteoporosis: ["Low bone density", "Fracture risk", "Loss of height"],
  "post-fracture-rehab": ["Post-cast stiffness", "Muscle loss", "Fear of moving"],
};

// ─── Category visual config ──────────────────────────────────────────────────
const CATEGORY_CONFIG: Record<
  string,
  {
    gradient: string;
    overlayGradient: string;
    accentColor: string;
    chipBg: string;
    chipText: string;
    filterBg: string;
    filterText: string;
    filterActiveBg: string;
    iconBg: string;
  }
> = {
  pain: {
    gradient: "from-rose-600 via-rose-700 to-rose-900",
    overlayGradient: "from-rose-900/90 via-rose-800/60 to-transparent",
    accentColor: "#f43f5e",
    chipBg: "bg-rose-50",
    chipText: "text-rose-600",
    filterBg: "bg-rose-50 border-rose-100 text-rose-700",
    filterText: "text-rose-700",
    filterActiveBg: "bg-rose-600 text-white",
    iconBg: "bg-rose-50",
  },
  techniques: {
    gradient: "from-sky-600 via-sky-700 to-sky-900",
    overlayGradient: "from-sky-900/90 via-sky-800/60 to-transparent",
    accentColor: "#0ea5e9",
    chipBg: "bg-sky-50",
    chipText: "text-sky-600",
    filterBg: "bg-sky-50 border-sky-100 text-sky-700",
    filterText: "text-sky-700",
    filterActiveBg: "bg-sky-600 text-white",
    iconBg: "bg-sky-50",
  },
  "injury-prevention": {
    gradient: "from-emerald-600 via-emerald-700 to-emerald-900",
    overlayGradient: "from-emerald-900/90 via-emerald-800/60 to-transparent",
    accentColor: "#10b981",
    chipBg: "bg-emerald-50",
    chipText: "text-emerald-600",
    filterBg: "bg-emerald-50 border-emerald-100 text-emerald-700",
    filterText: "text-emerald-700",
    filterActiveBg: "bg-emerald-600 text-white",
    iconBg: "bg-emerald-50",
  },
  "womens-health": {
    gradient: "from-pink-500 via-pink-600 to-pink-900",
    overlayGradient: "from-pink-900/90 via-pink-700/60 to-transparent",
    accentColor: "#ec4899",
    chipBg: "bg-pink-50",
    chipText: "text-pink-600",
    filterBg: "bg-pink-50 border-pink-100 text-pink-700",
    filterText: "text-pink-700",
    filterActiveBg: "bg-pink-600 text-white",
    iconBg: "bg-pink-50",
  },
  geriatric: {
    gradient: "from-amber-500 via-amber-600 to-amber-800",
    overlayGradient: "from-amber-900/90 via-amber-700/60 to-transparent",
    accentColor: "#f59e0b",
    chipBg: "bg-amber-50",
    chipText: "text-amber-700",
    filterBg: "bg-amber-50 border-amber-100 text-amber-700",
    filterText: "text-amber-700",
    filterActiveBg: "bg-amber-600 text-white",
    iconBg: "bg-amber-50",
  },
  specialized: {
    gradient: "from-violet-600 via-violet-700 to-violet-900",
    overlayGradient: "from-violet-900/90 via-violet-700/60 to-transparent",
    accentColor: "#8b5cf6",
    chipBg: "bg-violet-50",
    chipText: "text-violet-600",
    filterBg: "bg-violet-50 border-violet-100 text-violet-700",
    filterText: "text-violet-700",
    filterActiveBg: "bg-violet-600 text-white",
    iconBg: "bg-violet-50",
  },
};

const DEFAULT_CONFIG = CATEGORY_CONFIG["pain"];

// ─── Service Card ─────────────────────────────────────────────────────────────
function ServiceCard({
  service,
  trans,
  categoryLabels,
  uiLabels,
  onQuickView,
}: {
  service: (typeof services)[number];
  trans: ServiceTranslation | undefined;
  categoryLabels: Record<string, string>;
  uiLabels: Props["uiLabels"];
  onQuickView: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const config = CATEGORY_CONFIG[service.category] ?? DEFAULT_CONFIG;
  const outcome = PATIENT_OUTCOME[service.id];
  const symptoms = SYMPTOM_CHIPS[service.id] ?? [];
  const features = service.features ?? [];
  const title = trans?.title || service.title;
  const subtitle = trans?.heroSubtitle || service.description;

  return (
    <motion.div
      className="group relative h-full"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* ── Card Shell ──────────────────── */}
      <div className="relative bg-white rounded-3xl overflow-hidden shadow-[0_2px_16px_rgba(0,45,4,0.08)] group-hover:shadow-[0_24px_60px_rgba(0,45,4,0.18)] transition-shadow duration-500 h-full flex flex-col border border-forest/[0.06]">

        {/* ══ TOP HERO IMAGE PANEL ══════════════════════════════════════ */}
        <div className="relative overflow-hidden flex-shrink-0" style={{ height: 220 }}>
          {/* Background: image or gradient fallback */}
          {service.image ? (
            <Image
              src={service.image}
              alt={title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.08]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient}`} />
          )}

          {/* Deep scrim for text on image */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#020d03]/85 via-[#020d03]/30 to-transparent" />

          {/* ── Top row: Category badge + Duration pill ── */}
          <div className="absolute top-4 inset-x-4 flex items-start justify-between z-10">
            {/* Category badge */}
            <span
              className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-[9px] font-bold uppercase tracking-[0.14em] bg-white/15 backdrop-blur-md border border-white/20 text-white"
            >
              <DynamicIcon name={service.icon} className="w-3 h-3" />
              {categoryLabels[service.category] || service.category}
            </span>

            {/* Duration pill - Commented out as requested
            <span className="inline-flex items-center gap-1 py-1 px-2.5 rounded-full text-[9px] font-bold bg-black/30 backdrop-blur-sm text-white/80 border border-white/10">
              <Clock className="w-2.5 h-2.5" />
              {trans?.duration || "45–60 min"}
            </span>
            */}
          </div>

          {/* ── Bottom of image: Title + outcome badge ── */}
          <div className="absolute bottom-0 inset-x-0 p-4 z-10">
            {/* Patient outcome promise */}
            {outcome && (
              <motion.div
                initial={false}
                animate={{ opacity: hovered ? 0 : 1, y: hovered ? 6 : 0 }}
                transition={{ duration: 0.22 }}
                className="mb-2 inline-flex items-center gap-1.5"
              >
                <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full bg-lime text-forest text-[10px] font-extrabold shadow-lg">
                  <Activity className="w-3 h-3" />
                  {outcome}
                </span>
              </motion.div>
            )}

            {/* Card title on image */}
            <h3 className="text-white text-[1.1rem] font-extrabold leading-snug tracking-tight drop-shadow-sm">
              {title}
            </h3>
          </div>

          {/* ── HOVER PANEL: slides in from bottom ── */}
          <motion.div
            initial={false}
            animate={{ y: hovered ? 0 : "105%" }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 bottom-0 bg-white/95 backdrop-blur-2xl shadow-[0_-10px_40px_rgba(0,45,4,0.12)] border-t border-white p-5 z-20"
          >
            {/* Approach label */}
            <p 
              className="text-[10px] font-black uppercase tracking-[0.25em] mb-4 flex items-center gap-2 text-forest/70"
            >
              <Sparkles className="w-3.5 h-3.5" style={{ color: config.accentColor }} />
              Our Clinical Approach
            </p>
            {/* Feature bullets */}
            <div className="flex flex-col gap-2.5 mb-5">
              {features.slice(0, 3).map((feat) => (
                <div key={feat} className="flex items-start gap-2">
                  <CheckCircle2 
                    className="w-4 h-4 shrink-0 mt-0.5" 
                    style={{ color: config.accentColor }} 
                  />
                  <span className="text-forest text-[13px] font-semibold leading-tight">{feat}</span>
                </div>
              ))}
            </div>
            {/* Quick view CTA */}
            <button
              onClick={onQuickView}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-forest/[0.04] hover:bg-forest/[0.08] border border-forest/10 transition-colors text-forest text-[14px] font-bold"
            >
              <DynamicIcon name={service.icon} className="w-4 h-4" style={{ color: config.accentColor }} />
              {uiLabels.quickView}
            </button>
          </motion.div>
        </div>

        {/* ══ CONTENT AREA ════════════════════════════════════════════ */}
        <div className="flex flex-col flex-1 p-5">

          {/* ── Symptom chips: "Do you feel...?" ── */}
          {symptoms.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3.5">
              {symptoms.slice(0, 3).map((s) => (
                <span
                  key={s}
                  className="bg-forest/[0.04] text-forest/70 text-[9px] font-bold px-2.5 py-1 rounded-full border border-forest/10"
                >
                  {s}
                </span>
              ))}
            </div>
          )}

          {/* ── Description: 2-lines ── */}
          <p className="text-forest/55 text-[0.8rem] leading-relaxed line-clamp-2 mb-4 font-light flex-1">
            {subtitle}
          </p>

          {/* ── Session frequency row ── - Commented out as requested
          <div className="flex items-center gap-2 mb-4 py-2.5 px-3 rounded-xl bg-section/60">
            <RotateCcw className="w-3.5 h-3.5 text-seafoam shrink-0" />
            <span className="text-[10px] font-bold text-forest/50 uppercase tracking-wider">
              Frequency:
            </span>
            <span className="text-[10px] font-extrabold text-forest/70 uppercase tracking-wide">
              {trans?.frequency || "2× / week"}
            </span>
          </div>
          */}

          {/* ── Divider ── */}
          <div className="h-px bg-forest/[0.06] mb-4" />

          {/* ── Bottom CTA row ── */}
          <div className="flex items-center justify-between">
            <Link
              href={`/services/${service.slug}`}
              onClick={(e) => e.stopPropagation()}
              className="group/cta inline-flex items-center gap-1.5 text-forest font-bold text-sm hover:text-seafoam transition-colors duration-200"
            >
              {uiLabels.viewDetails}
              <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover/cta:translate-x-1" />
            </Link>

            {/* Book / Quick-view icon button */}
            <button
              onClick={onQuickView}
              aria-label={uiLabels.quickView}
              style={{ backgroundColor: config.accentColor + "18", borderColor: config.accentColor + "30" }}
              className="w-9 h-9 rounded-xl flex items-center justify-center border transition-all duration-300 group-hover:scale-110"
            >
              <DynamicIcon
                name={service.icon}
                className="w-4 h-4"
                style={{ color: config.accentColor }}
              />
            </button>
          </div>
        </div>

        {/* ── Animated left accent bar ── */}
        <motion.div
          initial={false}
          animate={{ scaleY: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.35 }}
          className="absolute left-0 top-[220px] bottom-0 w-[3px] origin-bottom rounded-full"
          style={{ backgroundColor: config.accentColor }}
        />
      </div>
    </motion.div>
  );
}

// ─── Filter Tab ───────────────────────────────────────────────────────────────
function FilterTab({
  label,
  isActive,
  onClick,
  icon,
  count,
  accentColor,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
  icon?: string;
  count?: number;
  accentColor?: string;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
      className={`relative inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all duration-300 ${
        isActive
          ? "bg-forest text-white shadow-lg shadow-forest/30"
          : "bg-white text-forest/60 border border-forest/10 hover:border-forest/25 hover:text-forest hover:bg-forest/[0.03]"
      }`}
    >
      {isActive ? (
        <span
          className="w-2 h-2 rounded-full shrink-0"
          style={{ backgroundColor: accentColor ?? "#A4C639" }}
        />
      ) : icon ? (
        <DynamicIcon name={icon} className="w-3.5 h-3.5 opacity-50" />
      ) : null}
      {label}
      {count !== undefined && (
        <span
          className={`text-[9px] font-black px-1.5 py-0.5 rounded-full ${
            isActive
              ? "bg-white/20 text-white"
              : "bg-forest/[0.07] text-forest/40"
          }`}
        >
          {count}
        </span>
      )}
    </motion.button>
  );
}

// ─── Main Grid Component ──────────────────────────────────────────────────────
export function ServicesGrid({ translations, categoryLabels, uiLabels }: Props) {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory | "all">("all");
  const [modalService, setModalService] = useState<string | null>(null);

  const filteredServices = useMemo(
    () =>
      activeCategory === "all"
        ? services
        : services.filter((s) => s.category === activeCategory),
    [activeCategory]
  );

  const categoryCount = useMemo(() => {
    const counts: Record<string, number> = { all: services.length };
    for (const cat of serviceCategories) {
      counts[cat.id] = services.filter((s) => s.category === cat.id).length;
    }
    return counts;
  }, []);

  const selectedService = modalService
    ? services.find((s) => s.id === modalService)
    : null;

  return (
    <>
      {/* ── Category Filter Bar ──────────────────────────────────────── */}
      <div className="flex flex-wrap justify-center gap-2.5 mb-10">
        {/* All */}
        <FilterTab
          label={categoryLabels.all || "All"}
          isActive={activeCategory === "all"}
          onClick={() => setActiveCategory("all")}
          count={categoryCount["all"]}
          accentColor="#A4C639"
        />
        {/* Per-category */}
        {serviceCategories.map((cat) => {
          const config = CATEGORY_CONFIG[cat.id] ?? DEFAULT_CONFIG;
          return (
            <FilterTab
              key={cat.id}
              label={categoryLabels[cat.id] || cat.label}
              isActive={activeCategory === cat.id}
              onClick={() => setActiveCategory(cat.id)}
              icon={cat.icon}
              count={categoryCount[cat.id]}
              accentColor={config.accentColor}
            />
          );
        })}
      </div>

      {/* ── Service count label ─────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="flex items-center justify-center gap-3 mb-10"
        >
          <div className="h-px w-12 bg-forest/10" />
          <p className="text-forest/35 text-xs font-bold uppercase tracking-[0.35em]">
            {uiLabels.serviceCount.replace("{count}", String(filteredServices.length))}
          </p>
          <div className="h-px w-12 bg-forest/10" />
        </motion.div>
      </AnimatePresence>

      {/* ── Cards Grid ──────────────────────────────────────────────── */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredServices.map((service, idx) => {
            const trans = translations[service.translationKey];
            return (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, y: 28, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{
                  duration: 0.38,
                  delay: Math.min(idx * 0.045, 0.35),
                  ease: [0.21, 1.01, 0.35, 1],
                }}
                className="h-full"
              >
                <ServiceCard
                  service={service}
                  trans={trans}
                  categoryLabels={categoryLabels}
                  uiLabels={uiLabels}
                  onQuickView={() => setModalService(service.id)}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* ── Quick View Modal ─────────────────────────────────────────── */}
      {selectedService && translations[selectedService.translationKey] && (
        <ServiceQuickModal
          service={selectedService}
          translation={translations[selectedService.translationKey]}
          uiLabels={uiLabels}
          onClose={() => setModalService(null)}
        />
      )}
    </>
  );
}
