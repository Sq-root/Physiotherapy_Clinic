import { setRequestLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { ArrowRight, Quote } from "lucide-react";
import { Link } from "@/i18n/routing";
import { AnimateOnView } from "@/components/ui/AnimateOnView";
import { ServiceFAQInteractive } from "./ServiceFAQInteractive";
import { ServicesGrid, type ServiceTranslation } from "@/components/sections/ServicesGrid";
import { services } from "@/lib/data/services";

// ─── Static service data ────────────────────────────────────────────
const deepDiveServices = [
  {
    image: "/services/active_aging_deep_dive_hd.webp",
    key: "activeAging",
    avatar: "/services/IMG_0017.webp",
  },
  {
    image: "/services/hydrotherapy_deep_dive_hd.webp",
    key: "hydrotherapy",
    avatar: "/services/IMG_0120.webp",
  },
  {
    image: "/services/corrective_exercise_deep_dive_hd.webp",
    key: "correctiveExercise",
    avatar: "/services/IMG_0119.webp",
  },
];

const faqKeys = [
  "acuteInjuries",
  "combineTreatments",
  "postOpPackages",
  "sportsRecovery",
];

// ─── Page Component (Server) ────────────────────────────────────────
export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("servicesPage");
  const tDetail = await getTranslations("serviceDetail");
  const tCommon = await getTranslations("common");
  const currentLocale = locale;
  const isRTL = currentLocale === "ar";

  // Pre-resolve FAQ data for the client island
  const faqData = faqKeys.map((key) => ({
    question: t(`faq.questions.${key}.question`),
    answer: t(`faq.questions.${key}.answer`),
  }));

  const serviceTranslations: Record<string, ServiceTranslation> = {};
  for (const service of services) {
    const key = service.translationKey;
    try {
      serviceTranslations[key] = {
        title: tDetail(`${key}.title`),
        heroSubtitle: tDetail(`${key}.heroSubtitle`),
        overview: tDetail(`${key}.overview`),
        duration: tDetail(`${key}.duration`),
        frequency: tDetail(`${key}.frequency`),
        benefits: tDetail.raw(`${key}.benefits`),
        idealFor: tDetail.raw(`${key}.idealFor`),
      };
      // Optionally include new fields
      try {
        serviceTranslations[key].symptoms = tDetail.raw(`${key}.symptoms`);
      } catch {}
      try {
        serviceTranslations[key].clinicalApproach = tDetail.raw(
          `${key}.clinicalApproach`,
        );
      } catch {}
      try {
        serviceTranslations[key].outcome = tDetail(`${key}.outcome`);
      } catch {}
    } catch {
      // Fallback for services without translation data yet
      serviceTranslations[key] = {
        title: service.title,
        heroSubtitle: service.description,
        overview: service.description,
        duration: "45-60 min",
        frequency: "2x per week",
        benefits: [],
        idealFor: [],
      };
    }
  }

  // Category labels
  let categoryLabels: Record<string, string> = {};
  try {
    categoryLabels = {
      all: t("categories.all"),
      pain: t("categories.pain"),
      techniques: t("categories.techniques"),
      "injury-prevention": t("categories.injury-prevention"),
      "womens-health": t("categories.womens-health"),
      geriatric: t("categories.geriatric"),
      specialized: t("categories.specialized"),
    };
  } catch {
    categoryLabels = {
      all: "All Services",
      pain: "Pain & Conditions",
      techniques: "Techniques",
      "injury-prevention": "Prevention & Sports",
      "womens-health": "Women's Health",
      geriatric: "Geriatric",
      specialized: "Specialized",
    };
  }

  // UI labels for grid component
  const uiLabels = {
    quickView: t("quickView"),
    viewDetails: t("viewDetails"),
    closeModal: t("closeModal"),
    bookAppointment: tCommon("bookAppointment"),
    serviceCount: t("serviceCount", { count: 9999 }).replace("9999", "{count}"),
    mechanism: tDetail("mechanism"),
    symptoms: tDetail("symptoms"),
    clinicalApproach: tDetail("clinicalApproach"),
    outcome: tDetail("outcome"),
    benefits: tDetail("benefits"),
    idealFor: tDetail("idealFor"),
  };

  return (
    <main className="overflow-x-clip">
      {/* ═══════════════════════════════════════════════════════════════
          SECTION 1: Hero
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-section">
        <div className="absolute inset-0 z-0">
          <Image
            src="/services/active_life_design_hero_bg.webp"
            alt="Active Life Design Concept"
            fill
            className="object-cover opacity-20"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-section via-section/80 to-section/40" />
        </div>

        <div className="absolute top-0 end-0 w-[600px] h-[600px] bg-seafoam rounded-full blur-[120px] opacity-10 -translate-y-1/2 translate-x-1/2 rtl:-translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 start-0 w-[400px] h-[400px] bg-white rounded-full blur-[100px] opacity-30 translate-y-1/3 -translate-x-1/4 rtl:translate-x-1/4 pointer-events-none" />

        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 w-full mt-10">
          {/* Header */}
          <AnimateOnView className="text-center max-w-3xl mx-auto mb-16">
            <div className="flex justify-center mb-6">
              <span className="py-1.5 px-5 rounded-full bg-forest text-white font-bold uppercase tracking-[0.25em] text-[9px] shadow-lg">
                {t("badge")}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-forest mb-6 tracking-tight leading-[1.05]">
              {t("title")}{" "}
              <span className="text-lime font-script">
                {t("titleHighlight")}
              </span>
            </h1>
            <p className="text-sm md:text-lg lg:text-xl text-forest/80 font-light max-w-2xl mx-auto leading-relaxed">
              {t("description")}
            </p>
          </AnimateOnView>

          {/* Quick CTA */}
          <AnimateOnView delay={0.2} className="flex justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 sm:gap-3 px-6 py-3.5 sm:px-8 sm:py-4 bg-forest text-white font-bold uppercase tracking-wide sm:tracking-wider text-sm sm:text-base whitespace-nowrap rounded-full transition-all duration-300 shadow-[4px_4px_0px_0px_#A4C639] hover:bg-seafoam hover:text-forest hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:translate-x-[3px] active:translate-y-[3px] active:shadow-none focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2 outline-none"
            >
              {t("bookConsultation")}
              <ArrowRight className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`} />
            </Link>
          </AnimateOnView>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 2: Full Service Grid with Category Filter
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-section relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          <ServicesGrid
            translations={serviceTranslations}
            categoryLabels={categoryLabels}
            uiLabels={uiLabels}
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 3: Therapeutic Deep Dive
          ═══════════════════════════════════════════════════════════════ */}
      {/* Hidden for now: The 22 service cards cover the scope effectively. */}
      {false && (
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Top shape separator */}
        <div
          className="absolute top-0 start-0 w-full h-32 bg-section/30"
          style={{ borderRadius: "0 0 200px 200px" }}
        />

        <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-12 relative z-10">
          {/* Section Header */}
          <AnimateOnView className="max-w-2xl mb-16">
            <div className="h-px w-20 bg-seafoam mb-6" />
            <h2 className="text-5xl md:text-6xl font-bold text-forest mb-4 tracking-tight">
              {t("deepDive.title")} <br />
              <span className="text-lime font-script">
                {t("deepDive.titleHighlight")}
              </span>
            </h2>
            <p className="text-forest/70 text-lg font-light max-w-xl leading-relaxed">
              {t("deepDive.description")}
            </p>
          </AnimateOnView>

          {/* Premium Portrait Card Grid — matches reference image */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {deepDiveServices.map((srv, index) => (
              <AnimateOnView
                key={srv.key}
                delay={index * 0.15}
                className="group cursor-pointer"
              >
                {/* Card container — tall portrait with heavily rounded corners */}
                <div className="relative rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-[0_32px_72px_rgba(0,45,4,0.28)] transition-all duration-700">
                  {/* Portrait image */}
                  <div
                    className="relative"
                    style={{
                      minHeight: "520px",
                      height: "clamp(460px,70vw,620px)",
                    }}
                  >
                    <Image
                      src={srv.image}
                      alt={t(`deepDive.services.${srv.key}.title`)}
                      fill
                      className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />

                    {/* Multi-layer gradient — match reference: dark at bottom, slight tint mid, clear at top */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030e04] via-[#030e04]/55 to-[#030e04]/0 opacity-95" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#030e04]/30 via-transparent to-transparent" />

                    {/* Category badge — top left like reference */}
                    <div className="absolute top-5 left-5">
                      <span className="text-[9px] font-bold text-seafoam uppercase tracking-[0.3em] bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/10">
                        {t(`deepDive.services.${srv.key}.category`)}
                      </span>
                    </div>
                  </div>

                  {/* Text overlay — absolutely positioned at bottom */}
                  <div className="absolute bottom-0 inset-x-0 p-7 z-10">
                    {/* Title */}
                    <h3 className="text-[1.75rem] md:text-[2rem] font-extrabold text-white tracking-tight leading-tight mb-2">
                      {t(`deepDive.services.${srv.key}.title`)}
                    </h3>

                    {/* Description */}
                    <p className="text-white/65 text-sm font-light leading-relaxed mb-5 max-w-[90%]">
                      {t(`deepDive.services.${srv.key}.description`)}
                    </p>

                    {/* Glass quote widget — exactly like reference */}
                    <div className="bg-[#0a1f0a]/70 backdrop-blur-xl rounded-2xl p-4 border border-white/[0.08]">
                      <div className="flex items-start gap-3">
                        {/* Circular avatar */}
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/25 shrink-0 shadow-lg">
                          <Image
                            src={srv.avatar}
                            alt="Patient"
                            width={40}
                            height={40}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        {/* Quote text + author */}
                        <div className="flex-1 min-w-0">
                          <p className="text-white/85 text-xs italic leading-relaxed">
                            <Quote className="w-3 h-3 inline-block mr-1 text-seafoam opacity-80" />
                            {t(`deepDive.services.${srv.key}.quote`)}
                          </p>
                          <p className="text-seafoam text-[10px] font-semibold mt-1.5 tracking-wide">
                            {t(`deepDive.services.${srv.key}.author`)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimateOnView>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 4: FAQ
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-section relative overflow-hidden">
        <div className="absolute top-0 end-0 w-[500px] h-[500px] bg-seafoam rounded-full blur-[120px] opacity-5 -translate-y-1/2 translate-x-1/3 rtl:-translate-x-1/3 pointer-events-none" />

        <div className="mx-auto max-w-4xl px-6 lg:px-8 relative z-10">
          <AnimateOnView className="text-center mb-16">
            <span className="py-1.5 px-5 rounded-full bg-forest text-white font-bold uppercase tracking-[0.25em] text-[9px] shadow-lg">
              {t("faq.badge")}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-forest mt-6 tracking-tight">
              {t("faq.title")}
            </h2>
            <p className="text-forest/60 text-sm md:text-base font-light mt-4 max-w-xl mx-auto">
              {t("faq.description")}
            </p>
          </AnimateOnView>

          <ServiceFAQInteractive faqs={faqData} />

          <AnimateOnView delay={0.3} className="text-center mt-12">
            <p className="text-forest/50 text-sm font-light mb-4">
              {t("faq.stillHaveQuestions")}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-forest font-bold uppercase tracking-wider rounded-full border border-forest/10 hover:bg-forest hover:text-white transition-all duration-300 text-[11px] shadow-sm hover:shadow-md active:translate-y-[1px]"
            >
              Contact Us
              <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
            </Link>
          </AnimateOnView>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 5: CTA
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-forest relative overflow-hidden rounded-t-[4rem]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#66A182_0%,_transparent_70%)] opacity-10" />

        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center relative z-10">
          <AnimateOnView>
            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tighter">
              Ready to Start?
            </h2>
            <p className="text-white/60 text-sm md:text-base lg:text-lg font-light max-w-2xl mx-auto mb-10 leading-relaxed">
              Take the first step toward recovery. Book your personalized
              consultation today.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-10 py-5 bg-forest text-white font-bold uppercase tracking-widest rounded-full transition-all duration-300 shadow-[4px_4px_0px_0px_#A4C639] hover:bg-seafoam hover:text-forest hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
            >
              {tCommon("bookAppointment")}
              <ArrowRight className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`} />
            </Link>
          </AnimateOnView>
        </div>
      </section>
    </main>
  );
}
