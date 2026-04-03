import { notFound } from "next/navigation";
import Image from "next/image";
import {
  ArrowRight,
  Clock,
  CalendarCheck,
  CheckCircle2,
  Users,
  Sparkles,
  ChevronRight,
  AlertCircle,
  Target,
  Quote,
} from "lucide-react";
import { setRequestLocale, getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { AnimateOnView } from "@/components/ui/AnimateOnView";
import { services, getAllServiceSlugs, getServiceBySlug } from "@/lib/data/services";
import { routing } from "@/i18n/routing";
import { ServiceDetailInteractive } from "./ServiceDetailInteractive";

// ─── Static Params ──────────────────────────────────────────────────
export function generateStaticParams() {
  const slugs = getAllServiceSlugs();
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

// ─── Metadata ───────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const service = getServiceBySlug(slug);
  if (!service) return {};

  const t = await getTranslations("serviceDetail");

  return {
    title: t(`${service.translationKey}.metaTitle`),
    description: t(`${service.translationKey}.metaDescription`),
  };
}

// ─── Page Component (Server) ────────────────────────────────────────
export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const t = await getTranslations("serviceDetail");
  const tCommon = await getTranslations("common");
  const currentLocale = await getLocale();
  const isRTL = currentLocale === "ar";
  const key = service.translationKey;

  // Pre-resolve data for client islands
  const benefits = t.raw(`${key}.benefits`) as string[];
  const idealFor = t.raw(`${key}.idealFor`) as string[];

  // Safely get new fields (symptoms, clinicalApproach, outcome)
  let symptoms: string[] = [];
  let clinicalApproach: string[] = [];
  let outcome = "";
  try { symptoms = t.raw(`${key}.symptoms`) as string[]; } catch {}
  try { clinicalApproach = t.raw(`${key}.clinicalApproach`) as string[]; } catch {}
  try { outcome = t(`${key}.outcome`); } catch {}

  // Get related services (same category, excluding current)
  const relatedServices = services
    .filter((s) => s.category === service.category && s.id !== service.id)
    .slice(0, 3);

  // If not enough from same category, fill from other categories
  const otherServices =
    relatedServices.length < 3
      ? [
          ...relatedServices,
          ...services
            .filter((s) => s.id !== service.id && s.category !== service.category)
            .slice(0, 3 - relatedServices.length),
        ]
      : relatedServices;

  return (
    <main className="overflow-x-clip">
      {/* ═══════════════════════════════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-section">
        {/* Background Image */}
        {service.image && (
          <div className="absolute inset-0 z-0">
            <Image
              src={service.image}
              alt={t(`${key}.title`)}
              fill
              className="object-cover opacity-15"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-section via-section/90 to-section" />
          </div>
        )}

        {/* Decorative Blobs */}
        <div className="absolute top-0 end-0 w-[500px] h-[500px] bg-seafoam rounded-full blur-[120px] opacity-10 -translate-y-1/2 translate-x-1/3 rtl:-translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 start-0 w-[300px] h-[300px] bg-lime rounded-full blur-[100px] opacity-10 translate-y-1/3 -translate-x-1/4 rtl:translate-x-1/4 pointer-events-none" />

        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <AnimateOnView className="mb-8">
            <nav className="flex items-center gap-2 text-sm text-forest/50">
              <Link href="/" className="hover:text-forest transition-colors">
                {isRTL ? "الرئيسية" : "Home"}
              </Link>
              <ChevronRight className={`w-3.5 h-3.5 ${isRTL ? "rotate-180" : ""}`} />
              <Link href="/services" className="hover:text-forest transition-colors">
                {t("backToServices")}
              </Link>
              <ChevronRight className={`w-3.5 h-3.5 ${isRTL ? "rotate-180" : ""}`} />
              <span className="text-forest font-medium">{t(`${key}.title`)}</span>
            </nav>
          </AnimateOnView>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Content */}
            <AnimateOnView className="order-2 lg:order-1">
              {/* Category Badge */}
              <div className="flex items-center gap-3 mb-6">
                <span
                  className="py-1.5 px-4 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] shadow-sm"
                  style={{
                    backgroundColor: service.color + "20",
                    color: service.color === "#002D04" ? "#002D04" : service.color,
                  }}
                >
                  {service.category}
                </span>
                <span className="text-3xl">{service.icon}</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-forest mb-4 tracking-tight leading-[1.1]">
                {t(`${key}.title`)}
              </h1>

              <p className="text-lg md:text-xl text-seafoam font-medium mb-6 italic">
                {t(`${key}.heroSubtitle`)}
              </p>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-4 mb-10">
                <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl px-5 py-3 border border-forest/5 shadow-sm">
                  <Clock className="w-5 h-5 text-seafoam" />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-forest/40">
                      {t("duration")}
                    </p>
                    <p className="text-sm font-semibold text-forest">
                      {t(`${key}.duration`)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl px-5 py-3 border border-forest/5 shadow-sm">
                  <CalendarCheck className="w-5 h-5 text-seafoam" />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-forest/40">
                      {t("frequency")}
                    </p>
                    <p className="text-sm font-semibold text-forest">
                      {t(`${key}.frequency`)}
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 bg-forest text-white font-bold uppercase tracking-wider rounded-full hover:bg-seafoam hover:text-forest transition-all duration-300 shadow-[4px_4px_0px_0px_#A4C639] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
              >
                {t("bookThisService")}
                <ArrowRight className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`} />
              </Link>
            </AnimateOnView>

            {/* Hero Image */}
            <AnimateOnView delay={0.2} direction="right" className="order-1 lg:order-2">
              {service.image && (
                <div className="relative">
                  <div className="aspect-[4/5] md:aspect-[5/6] relative rounded-[3rem] overflow-hidden shadow-2xl border-[8px] border-white ring-1 ring-forest/5">
                    <Image
                      src={service.image}
                      alt={t(`${key}.title`)}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                    />
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-forest/20 to-transparent" />
                  </div>

                  {/* Floating Stats Card */}
                  <div
                    className={`absolute -bottom-6 ${isRTL ? "-right-4 md:-right-8" : "-left-4 md:-left-8"} bg-white rounded-2xl p-5 shadow-xl border border-forest/5 backdrop-blur-sm`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-lime/20 flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-lime" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-forest">98%</p>
                        <p className="text-[10px] font-semibold text-forest/40 uppercase tracking-wider">
                          {isRTL ? "رضا المرضى" : "Patient Satisfaction"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </AnimateOnView>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          THE THEORY / MECHANISM SECTION
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-forest relative overflow-hidden rounded-b-[4rem]">
        <div className="absolute top-0 end-0 w-[600px] h-[600px] bg-seafoam rounded-full blur-[150px] opacity-5 -translate-y-1/2 translate-x-1/3 rtl:-translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 start-0 w-[400px] h-[400px] bg-lime rounded-full blur-[120px] opacity-5 translate-y-1/3 -translate-x-1/4 rtl:translate-x-1/4 pointer-events-none" />

        <div className="mx-auto max-w-5xl px-6 lg:px-8 relative z-10">
          <AnimateOnView className="text-center mb-16">
            <span className="text-seafoam font-bold uppercase tracking-[0.3em] text-xs">
              {t("mechanism")}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mt-4 tracking-tight">
              {t("mechanismSubtitle")}
            </h2>
          </AnimateOnView>

          <AnimateOnView>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-[2.5rem] p-8 md:p-12">
              <p className="text-white/90 text-lg md:text-xl font-light leading-relaxed">
                {t(`${key}.overview`)}
              </p>
            </div>
          </AnimateOnView>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SYMPTOMS SECTION
          ═══════════════════════════════════════════════════════════════ */}
      {symptoms.length > 0 && (
        <section className="py-20 md:py-28 bg-white relative overflow-hidden">
          <div className="absolute top-0 start-0 w-full h-24 bg-section/30" style={{ borderRadius: "0 0 200px 200px" }} />

          <div className="mx-auto max-w-6xl px-6 lg:px-8 pt-8 relative z-10">
            <AnimateOnView className="text-center mb-16">
              <span className="text-seafoam font-bold uppercase tracking-[0.3em] text-xs">
                {t("symptoms")}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-forest mt-4 tracking-tight">
                {t("symptomsSubtitle")}
              </h2>
            </AnimateOnView>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {symptoms.map((symptom, index) => (
                <AnimateOnView
                  key={index}
                  delay={index * 0.1}
                  className="flex items-start gap-5 p-6 rounded-[2rem] bg-section/50 border border-forest/5 hover:bg-section hover:shadow-lg hover:border-seafoam/20 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center shrink-0 mt-0.5">
                    <AlertCircle className="w-5 h-5 text-red-400" />
                  </div>
                  <p className="text-forest font-medium leading-relaxed">{symptom}</p>
                </AnimateOnView>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          CLINICAL APPROACH SECTION
          ═══════════════════════════════════════════════════════════════ */}
      {clinicalApproach.length > 0 && (
        <section className="py-20 md:py-28 bg-section relative overflow-hidden">
          <div className="absolute top-0 end-0 w-[500px] h-[500px] bg-seafoam rounded-full blur-[150px] opacity-5 -translate-y-1/2 translate-x-1/3 rtl:-translate-x-1/3 pointer-events-none" />

          <div className="mx-auto max-w-5xl px-6 lg:px-8 relative z-10">
            <AnimateOnView className="text-center mb-16">
              <span className="text-lime font-bold uppercase tracking-[0.3em] text-xs">
                {t("clinicalApproach")}
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-forest mt-4 tracking-tight">
                {t(`${key}.title`)}
              </h2>
            </AnimateOnView>

            {/* Approach Timeline */}
            <div className="relative">
              {/* Vertical line */}
              <div className={`absolute top-0 bottom-0 ${isRTL ? "right-6 md:right-1/2" : "left-6 md:left-1/2"} w-px bg-forest/10`} />

              <div className="space-y-12">
                {clinicalApproach.map((step, index) => {
                  const parts = step.split(": ");
                  const stepTitle = parts.length > 1 ? parts[0] : `Step ${index + 1}`;
                  const stepDesc = parts.length > 1 ? parts.slice(1).join(": ") : step;

                  return (
                    <AnimateOnView
                      key={index}
                      delay={index * 0.1}
                      direction={!isRTL && index % 2 === 0 ? "right" : "left"}
                      className={`relative flex items-start gap-6 md:gap-12 ${
                        index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                      }`}
                    >
                      {/* Step Number */}
                      <div
                        className={`absolute ${isRTL ? "right-0" : "left-0"} md:left-1/2 md:-translate-x-1/2 w-12 h-12 rounded-full bg-white border-2 border-lime flex items-center justify-center z-10 shadow-lg shadow-lime/20`}
                      >
                        <span className="text-forest font-bold text-sm">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      {/* Content Card */}
                      <div
                        className={`${isRTL ? "mr-16 md:mr-0" : "ml-16 md:ml-0"} md:w-[calc(50%-3rem)] ${
                          index % 2 === 0 ? "" : "md:text-end"
                        }`}
                      >
                        <div className="bg-white backdrop-blur-sm border border-forest/5 rounded-2xl p-6 hover:shadow-lg hover:border-seafoam/20 transition-all duration-300">
                          <h3 className="text-forest font-bold text-lg mb-2">{stepTitle}</h3>
                          <p className="text-forest/70 font-light leading-relaxed">{stepDesc}</p>
                        </div>
                      </div>

                      {/* Spacer for alternating layout */}
                      <div className="hidden md:block md:w-[calc(50%-3rem)]" />
                    </AnimateOnView>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          BENEFITS + IDEAL FOR SECTION
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-white relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Key Benefits */}
            <AnimateOnView>
              <div className="mb-8">
                <div className="h-px w-16 bg-lime mb-6" />
                <h2 className="text-3xl md:text-4xl font-bold text-forest tracking-tight">
                  {t("benefits")}
                </h2>
              </div>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <AnimateOnView
                    key={index}
                    delay={index * 0.08}
                    className="flex items-start gap-4 p-4 rounded-2xl bg-section/50 border border-forest/5 hover:bg-section hover:shadow-sm transition-all duration-300"
                  >
                    <div className="w-8 h-8 rounded-xl bg-lime/20 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4 text-lime" />
                    </div>
                    <p className="text-forest font-medium">{benefit}</p>
                  </AnimateOnView>
                ))}
              </div>
            </AnimateOnView>

            {/* Ideal For */}
            <AnimateOnView delay={0.15}>
              <div className="mb-8">
                <div className="h-px w-16 bg-seafoam mb-6" />
                <h2 className="text-3xl md:text-4xl font-bold text-forest tracking-tight">
                  {t("idealFor")}
                </h2>
              </div>
              <div className="space-y-4">
                {idealFor.map((item, index) => (
                  <AnimateOnView
                    key={index}
                    delay={index * 0.08 + 0.15}
                    className="flex items-start gap-4 p-4 rounded-2xl bg-seafoam/5 border border-seafoam/10 hover:bg-seafoam/10 hover:shadow-sm transition-all duration-300"
                  >
                    <div className="w-8 h-8 rounded-xl bg-seafoam/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Users className="w-4 h-4 text-seafoam" />
                    </div>
                    <p className="text-forest font-medium">{item}</p>
                  </AnimateOnView>
                ))}
              </div>
            </AnimateOnView>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          OUTCOME SECTION
          ═══════════════════════════════════════════════════════════════ */}
      {outcome && (
        <section className="py-16 md:py-24 bg-forest relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#66A182_0%,_transparent_70%)] opacity-10" />
          <div className="mx-auto max-w-4xl px-6 lg:px-8 relative z-10">
            <AnimateOnView className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
                  <Target className="w-7 h-7 text-seafoam" />
                </div>
              </div>
              <span className="text-seafoam font-bold uppercase tracking-[0.3em] text-xs block mb-6">
                {t("outcome")}
              </span>
              <blockquote className="text-2xl md:text-3xl lg:text-4xl font-light text-white leading-relaxed tracking-tight">
                <Quote className="w-8 h-8 text-white/20 mx-auto mb-4" />
                {outcome}
              </blockquote>
            </AnimateOnView>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          WHAT TO EXPECT + INTERACTIVE SECTION
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-white relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* What to Expect Text */}
            <AnimateOnView>
              <div className="mb-6">
                <div className="h-px w-16 bg-lime mb-6" />
                <h2 className="text-3xl md:text-4xl font-bold text-forest tracking-tight mb-6">
                  {t("whatToExpect")}
                </h2>
              </div>
              <p className="text-forest/70 text-lg font-light leading-relaxed mb-8">
                {t(`${key}.whatToExpect`)}
              </p>

              {/* Features from service data */}
              {service.features && (
                <div className="flex flex-wrap gap-3">
                  {service.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-4 py-2 rounded-full bg-section text-forest/70 text-sm font-medium border border-forest/5"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              )}
            </AnimateOnView>

            {/* Interactive Client Island */}
            <AnimateOnView delay={0.15} direction="right">
              <ServiceDetailInteractive
                benefits={benefits}
                serviceColor={service.color}
                serviceIcon={service.icon}
                serviceTitle={t(`${key}.title`)}
              />
            </AnimateOnView>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          CTA SECTION
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-section relative overflow-hidden">
        <div className="absolute top-0 end-0 w-[400px] h-[400px] bg-white opacity-40 rounded-full blur-3xl translate-x-1/2 rtl:-translate-x-1/2 -translate-y-1/2" />

        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center relative z-10">
          <AnimateOnView>
            <span className="text-3xl mb-6 block">{service.icon}</span>
            <h2 className="text-4xl md:text-6xl font-bold text-forest mb-6 tracking-tighter">
              {t("readyToStart")}
            </h2>
            <p className="text-forest/60 text-lg font-light max-w-2xl mx-auto mb-10 leading-relaxed">
              {t("readyCta")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/contact"
                className="h-14 px-10 bg-forest text-white font-bold uppercase tracking-wider text-sm hover:bg-seafoam hover:text-forest transition-all duration-300 shadow-[4px_4px_0px_0px_#A4C639] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] rounded-full flex items-center justify-center gap-3"
              >
                {tCommon("bookAppointment")}
                <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
              </Link>
              <Link
                href="/services"
                className="h-14 px-10 bg-white text-forest font-bold uppercase tracking-wider text-sm hover:bg-forest hover:text-white transition-all duration-300 rounded-full flex items-center justify-center gap-3 border border-forest/10"
              >
                {t("backToServices")}
              </Link>
            </div>
          </AnimateOnView>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          RELATED SERVICES
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AnimateOnView className="text-center mb-16">
            <div className="h-px w-16 bg-seafoam mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-forest tracking-tight">
              {t("exploreMore")}
            </h2>
          </AnimateOnView>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {otherServices.map((related, index) => (
              <AnimateOnView
                key={related.id}
                delay={index * 0.1}
                className="group"
              >
                <Link
                  href={`/services/${related.slug}`}
                  className="block bg-section rounded-[2.5rem] overflow-hidden border border-forest/5 hover:shadow-xl hover:border-seafoam/20 transition-all duration-500"
                >
                  {/* Image */}
                  {related.image && (
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={related.image}
                        alt={related.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-forest/40 to-transparent" />
                      <div className={`absolute bottom-4 ${isRTL ? "right-4" : "left-4"}`}>
                        <span className="text-3xl">{related.icon}</span>
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6">
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-forest/40">
                      {related.category}
                    </span>
                    <h3 className="text-xl font-bold text-forest mt-2 mb-2 tracking-tight group-hover:text-seafoam transition-colors duration-300">
                      {related.title}
                    </h3>
                    <p className="text-forest/60 text-sm font-light leading-relaxed line-clamp-2">
                      {related.description}
                    </p>
                    <div className={`flex items-center gap-2 mt-4 text-seafoam text-sm font-semibold ${isRTL ? "flex-row-reverse" : ""}`}>
                      <span>{isRTL ? "اعرف المزيد" : "Learn More"}</span>
                      <ArrowRight className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${isRTL ? "rotate-180 group-hover:-translate-x-1" : ""}`} />
                    </div>
                  </div>
                </Link>
              </AnimateOnView>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
