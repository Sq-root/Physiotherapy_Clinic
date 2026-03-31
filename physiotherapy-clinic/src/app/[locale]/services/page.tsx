import { setRequestLocale, getTranslations, getLocale } from "next-intl/server";
import Image from "next/image";
import {
  Hand,
  ArrowRight,
  Activity,
  Brain,
  ArrowDown,
  ArrowLeft,
  Quote,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import { AnimateOnView } from "@/components/ui/AnimateOnView";
import { ServiceFAQInteractive } from "./ServiceFAQInteractive";

// ─── Static service data ────────────────────────────────────────────
const deepDiveServices = [
  { image: "/services/active_aging_deep_dive_hd.webp", key: "activeAging", avatar: "/services/IMG_0017.webp" },
  { image: "/services/hydrotherapy_deep_dive_hd.webp", key: "hydrotherapy", avatar: "/services/IMG_0120.webp" },
  { image: "/services/corrective_exercise_deep_dive_hd.webp", key: "correctiveExercise", avatar: "/services/IMG_0119.webp" },
];

const faqKeys = ["acuteInjuries", "combineTreatments", "postOpPackages", "sportsRecovery"];

// ─── Page Component (Server) ────────────────────────────────────────
export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("servicesPage");
  const tServices = await getTranslations("servicesSection");
  const currentLocale = await getLocale();
  const isRTL = currentLocale === "ar";

  // Pre-resolve FAQ data for the client island
  const faqData = faqKeys.map((key) => ({
    question: t(`faq.questions.${key}.question`),
    answer: t(`faq.questions.${key}.answer`),
  }));

  return (
    <main className="overflow-x-clip">
      {/* ═══════════════════════════════════════════════════════════════
          SECTION 1: Bento Hero
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative pt-32 pb-20 overflow-hidden min-h-screen flex flex-col justify-center bg-section">
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
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-forest mb-6 tracking-tight leading-[1.05]">
              {t("title")} <span className="text-lime font-script">{t("titleHighlight")}</span>
            </h1>
            <p className="text-lg md:text-xl text-forest/70 font-light max-w-2xl mx-auto leading-relaxed">
              {t("description")}
            </p>
          </AnimateOnView>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 auto-rows-[240px]">
            {/* Manual Therapy Card */}
            <AnimateOnView className="lg:col-span-6 row-span-2 group relative overflow-hidden rounded-[3rem] border border-forest/5 shadow-2xl cursor-pointer">
              <Image
                src="/services/manual_therapy_bento_hd.webp"
                alt="Manual Therapy"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              <div className="absolute bottom-0 start-0 p-10 w-full z-10">
                <div className="inline-flex items-center gap-2 mb-4 bg-seafoam px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-forest">
                  <Hand className="w-3.5 h-3.5" />
                  {tServices("services.manual.shortDesc")}
                </div>
                <h3 className="text-3xl md:text-4xl text-white font-bold mb-3 tracking-tight">
                  {tServices("services.manual.title")}
                </h3>
                <p className="text-white/80 text-base font-light max-w-md leading-relaxed">
                  {tServices("services.manual.fullDesc")}
                </p>
              </div>
            </AnimateOnView>

            {/* Sports Recovery Card */}
            <AnimateOnView delay={0.1} className="lg:col-span-3 row-span-2 group relative overflow-hidden rounded-[2.5rem] border border-forest/10 shadow-lg cursor-pointer bg-white">
              <Image
                src="/services/sports_recovery_bento_hd.webp"
                alt="Sports Recovery"
                fill
                className="object-cover opacity-10 group-hover:opacity-[0.15] transition-all duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
              <div className="relative h-full flex flex-col justify-between p-8">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-forest text-seafoam flex items-center justify-center mb-6 shadow-xl group-hover:bg-seafoam group-hover:text-forest transition-colors duration-500">
                    <Activity className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl text-forest font-bold mb-4 tracking-tight">
                    {tServices("services.sports.title")}
                  </h3>
                  <p className="text-forest/60 font-light leading-relaxed text-sm">
                    {tServices("services.sports.shortDesc")}
                  </p>
                </div>
              </div>
            </AnimateOnView>

            {/* Neurological Card */}
            <AnimateOnView delay={0.2} className="lg:col-span-3 row-span-1 group relative overflow-hidden rounded-[2.5rem] bg-seafoam border border-forest/5 shadow-lg cursor-pointer p-6">
              <div className="relative h-full flex flex-col justify-center items-center text-center">
                <div className="bg-forest/5 p-3 rounded-xl mb-3">
                  <Brain className="w-8 h-8 text-forest group-hover:scale-110 transition-transform duration-500" />
                </div>
                <h3 className="text-xl text-forest font-bold tracking-tight">
                  {tServices("services.neurological.title")}
                </h3>
                <ArrowDown className="w-4 h-4 text-forest mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300" />
              </div>
            </AnimateOnView>

            {/* Orthopedic Card */}
            <AnimateOnView delay={0.3} className="lg:col-span-3 row-span-1 group relative overflow-hidden rounded-[2.5rem] bg-forest border border-white/5 shadow-2xl cursor-pointer">
              <Image
                src="/services/post_surgical_bento_hd.webp"
                alt="Orthopedic"
                fill
                className="object-cover opacity-50 group-hover:opacity-30 transition-opacity duration-1000"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest to-transparent opacity-60" />
              <div className="absolute inset-0 flex flex-col justify-end p-8 z-10">
                <span className="text-[9px] text-seafoam font-bold uppercase tracking-[0.3em] mb-2">
                  {tServices("services.orthopedic.shortDesc")}
                </span>
                <h3 className="text-xl text-white font-bold tracking-tight">
                  {tServices("services.orthopedic.title")}
                </h3>
              </div>
            </AnimateOnView>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 2: Therapeutic Deep Dive
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div
          className="absolute top-0 start-0 w-full h-32 bg-section/30"
          style={{ borderRadius: "0 0 200px 200px" }}
        />

        <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-12 relative z-10">
          {/* Header */}
          <AnimateOnView className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <div className="h-px w-20 bg-seafoam mb-6" />
              <h2 className="text-5xl md:text-6xl font-bold text-forest mb-6 tracking-tight">
                {t("deepDive.title")} <br />
                <span className="text-lime font-script">{t("deepDive.titleHighlight")}</span>
              </h2>
              <p className="text-forest/60 text-lg font-light max-w-xl leading-relaxed">
                {t("deepDive.description")}
              </p>
            </div>
            <div className={`flex gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
              <button className="w-14 h-14 rounded-full border border-forest/10 flex items-center justify-center hover:bg-forest hover:text-white transition-all duration-300">
                <ArrowLeft className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`} />
              </button>
              <button className="w-14 h-14 rounded-full bg-forest text-white flex items-center justify-center hover:bg-seafoam hover:text-forest transition-all duration-300 shadow-xl">
                <ArrowRight className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`} />
              </button>
            </div>
          </AnimateOnView>

          {/* Service Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {deepDiveServices.map((service, index) => (
              <AnimateOnView
                key={service.key}
                delay={index * 0.1}
                className="bg-section p-4 rounded-[3.5rem] group hover:bg-white transition-all duration-700 hover:shadow-2xl border border-forest/5"
              >
                {/* Image Container */}
                <div className="relative aspect-[5/4] overflow-hidden rounded-[3rem] mb-8 shadow-inner border-[6px] border-white">
                  <Image
                    src={service.image}
                    alt={t(`deepDive.services.${service.key}.title`)}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className={`absolute top-4 ${isRTL ? "right-4" : "left-4"} bg-white/95 backdrop-blur-md px-4 py-2 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] text-forest shadow-sm`}>
                    {t(`deepDive.services.${service.key}.category`)}
                  </div>
                </div>

                {/* Content */}
                <div className="px-5 pb-6">
                  <h3 className="text-3xl font-bold text-forest mb-4 tracking-tight group-hover:text-seafoam transition-colors duration-500">
                    {t(`deepDive.services.${service.key}.title`)}
                  </h3>
                  <p className="text-forest/60 font-light leading-relaxed mb-10 text-base">
                    {t(`deepDive.services.${service.key}.description`)}
                  </p>

                  {/* Testimonial Card */}
                  <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-forest/5 relative group-hover:border-seafoam/20 transition-all duration-700">
                    <div className={`absolute -top-3 ${isRTL ? "-left-3" : "-right-3"} bg-seafoam text-forest rounded-full p-2.5 shadow-xl`}>
                      <Quote className="w-4 h-4" />
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-section p-0.5">
                        <Image
                          src={service.avatar}
                          alt={t(`deepDive.services.${service.key}.author`)}
                          width={48}
                          height={48}
                          className="rounded-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                        />
                      </div>
                      <div>
                        <p className="text-[13px] italic text-forest font-serif leading-snug">
                          &ldquo;{t(`deepDive.services.${service.key}.quote`)}&rdquo;
                        </p>
                        <p className="text-[10px] font-bold text-forest/40 mt-3 uppercase tracking-widest">
                          — {t(`deepDive.services.${service.key}.author`)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimateOnView>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 3: FAQ (Server shell + Client island for accordion)
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 relative" id="faq">
        <div className="absolute inset-x-0 bottom-0 h-full bg-forest rounded-t-[5rem] z-0" />

        <div className="mx-auto max-w-5xl px-6 lg:px-8 relative z-10">
          {/* Header — Server Rendered */}
          <AnimateOnView className="text-center mb-12 md:mb-16">
            <span className="text-seafoam font-bold uppercase tracking-[0.3em] text-xs md:text-sm">
              {t("faq.badge")}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mt-4 mb-6 tracking-tight">
              {t("faq.title")}
            </h2>
            <p className="text-white/70 text-base md:text-lg max-w-2xl mx-auto font-light">
              {t("faq.description")}
            </p>
          </AnimateOnView>

          {/* Interactive FAQ Accordion — Client Island */}
          <ServiceFAQInteractive faqs={faqData} />

          <AnimateOnView delay={0.3} className="mt-16 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-seafoam text-forest font-bold uppercase tracking-widest rounded-full hover:bg-white transition-all shadow-lg hover:scale-105"
            >
              {t("faq.stillHaveQuestions")}
              <ArrowRight className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`} />
            </Link>
          </AnimateOnView>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 4: CTA
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-section relative overflow-hidden">
        <div className="absolute top-0 end-0 w-[400px] h-[400px] bg-white opacity-40 rounded-full blur-3xl translate-x-1/2 rtl:-translate-x-1/2 -translate-y-1/2" />

        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center relative z-10">
          <AnimateOnView>
            <h2 className="text-5xl md:text-8xl font-bold text-forest mb-8 tracking-tighter">
              {t("title")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-forest to-seafoam">
                {t("titleHighlight")}
              </span>
            </h2>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                href="/contact"
                className="h-16 px-12 bg-forest text-white font-bold uppercase tracking-wider text-lg min-w-[200px] hover:bg-seafoam hover:text-forest transition-all shadow-[6px_6px_0px_0px_#A4C639] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] rounded-full flex items-center justify-center"
              >
                {t("bookConsultation")}
              </Link>
            </div>
          </AnimateOnView>
        </div>
      </section>
    </main>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return {
    title: locale === "ar" ? "خدماتنا" : "Our Services",
    description:
      locale === "ar"
        ? "خدمات علاج طبيعي شاملة تشمل رعاية العظام وإعادة التأهيل الرياضي والمزيد."
        : "Comprehensive physiotherapy services including orthopedic care, sports rehabilitation, and more.",
  };
}
