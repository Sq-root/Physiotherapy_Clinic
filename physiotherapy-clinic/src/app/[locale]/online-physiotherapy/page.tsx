import dynamic from "next/dynamic";
import Image from "next/image";
import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { AnimateOnView } from "@/components/ui/AnimateOnView";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildService, buildBreadcrumbList } from "@/lib/seo/jsonLd";
import { siteConfig } from "@/config/site";
import type { Metadata } from "next";
import {
  Monitor,
  Globe,
  Shield,
  Clock,
  Heart,
  Users,
  Video,
  Calendar,
  Activity,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  Briefcase,
  Zap,
  MapPin,
} from "lucide-react";

const AppointmentSection = dynamic(() =>
  import("@/components/sections/AppointmentSection").then(
    (m) => m.AppointmentSection
  )
);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";

  const title = isAr
    ? "العلاج الطبيعي عبر الإنترنت | د. إيشا شاه — رعاية سريرية في أي مكان"
    : "Online Physiotherapy Consultations Worldwide | Dr. Isha Shah";

  const description = isAr
    ? "احجز استشارة علاج طبيعي عبر الإنترنت مع د. إيشا شاه، المرخصة من هيئة الصحة بدبي. تقييم مباشر عبر الفيديو، خطط تأهيل مخصصة، ودعم مستمر — من أي مكان في العالم."
    : "Book an online physiotherapy consultation with Dr. Isha Shah, DHA-licensed physiotherapist in Dubai. Live video assessment, personalised rehabilitation plans, and ongoing support — delivered anywhere in the world.";

  return {
    title,
    description,
    keywords: [
      "online physiotherapy",
      "virtual physiotherapy",
      "telehealth physiotherapy",
      "online physio consultation",
      "remote physiotherapy",
      "online physical therapy",
      "tele-rehabilitation",
      "DHA licensed physiotherapist online",
      "online physiotherapy Dubai",
      "physiotherapy video consultation",
    ],
    alternates: {
      canonical: `${siteConfig.url}/${locale}/online-physiotherapy`,
      languages: {
        en: `${siteConfig.url}/en/online-physiotherapy`,
        ar: `${siteConfig.url}/ar/online-physiotherapy`,
        "x-default": `${siteConfig.url}/en/online-physiotherapy`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/${locale}/online-physiotherapy`,
      locale: isAr ? "ar_AE" : "en_AE",
      images: [
        {
          url: `${siteConfig.url}/services/Neck_pain.webp`,
          width: 1200,
          height: 630,
          alt: "Online Physiotherapy with Dr. Isha Shah",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteConfig.url}/services/Neck_pain.webp`],
    },
  };
}

const CONDITIONS = [
  { key: "neck" as const, image: "/services/neck_cervical_pain.webp" },
  { key: "disc" as const, image: "/services/disc_prolapse_sciatica.webp" },
  { key: "shoulder" as const, image: "/services/shoulder_impingement.webp" },
  { key: "ergonomics" as const, image: "/services/ergonomics_workplace.webp" },
  { key: "womens" as const, image: "/services/womens_health.webp" },
  { key: "postnatal" as const, image: "/services/prenatal_postnatal.webp" },
  { key: "senior" as const, image: "/services/senior_care.webp" },
  { key: "injury" as const, image: "/services/injury_prevention.webp" },
  { key: "surgical" as const, image: "/services/post_surgical_bento_hd.webp" },
] as const;

const STEP_ICONS = [Calendar, Video, Activity] as const;
const BENEFIT_ICONS = [Clock, MapPin, Shield, Monitor, Heart, Users] as const;
const WHO_ICONS = [Globe, Briefcase, Heart, Activity, Zap, Monitor] as const;

export default async function OnlinePhysiotherapyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const currentLocale = await getLocale();
  const isRTL = currentLocale === "ar";

  const t = await getTranslations("onlinePhysio");

  const steps = t.raw("howItWorks.steps") as Array<{
    title: string;
    description: string;
  }>;
  const benefits = t.raw("why.benefits") as Array<{
    title: string;
    description: string;
  }>;
  const profiles = t.raw("whoFor.profiles") as Array<{
    title: string;
    description: string;
  }>;
  const techFeatures = t.raw("technology.features") as string[];

  const breadcrumbs = buildBreadcrumbList([
    { name: "Home", href: `/${locale}` },
    { name: "Online Physiotherapy", href: `/${locale}/online-physiotherapy` },
  ]);

  const serviceSchema = buildService({
    name: "Online Physiotherapy Consultation",
    description:
      "Live video physiotherapy assessment and personalised rehabilitation by DHA-licensed Dr. Isha Shah, available worldwide.",
    slug: "online-physiotherapy",
    locale,
  });

  return (
    <main>
      <JsonLd schema={[breadcrumbs, serviceSchema]} />

      {/* ── HERO ── */}
      <section className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden">
        <Image
          src="/services/Neck_pain.webp"
          alt="Online physiotherapy consultation with Dr. Isha Shah"
          fill
          priority
          fetchPriority="high"
          className="object-cover object-right sm:object-center"
        />
        <div
          className={`absolute inset-0 ${isRTL ? "bg-gradient-to-l" : "bg-gradient-to-r"} from-forest/95 via-forest/75 to-transparent`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/60 via-transparent to-forest/20" />

        <div className="relative z-10 h-full flex items-center">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full pt-20">
            <div className="max-w-2xl">
              <AnimateOnView delay={0.1}>
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-seafoam/20 border border-seafoam/40 text-seafoam text-[11px] font-semibold uppercase tracking-widest mb-6">
                  <Monitor className="w-3 h-3" />
                  {t("hero.badge")}
                </span>
              </AnimateOnView>

              <AnimateOnView delay={0.2}>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6">
                  {t("hero.title")}
                  <br />
                  <span className="text-seafoam">{t("hero.highlight")}</span>
                </h1>
              </AnimateOnView>

              <AnimateOnView delay={0.3}>
                <p className="text-white/75 text-lg leading-relaxed mb-10 max-w-xl">
                  {t("hero.description")}
                </p>
              </AnimateOnView>

              <AnimateOnView delay={0.4} className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest bg-white text-forest shadow-[4px_4px_0px_0px_#A4C639] hover:bg-seafoam hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2"
                >
                  <Video className="w-4 h-4" />
                  {t("hero.cta")}
                </Link>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest bg-white/10 border border-white/25 text-white backdrop-blur-sm hover:bg-white/20 transition-all duration-300 outline-none"
                >
                  {t("hero.ctaSecondary")}
                  <ChevronRight className="w-4 h-4" />
                </a>
              </AnimateOnView>
            </div>
          </div>
        </div>

        {/* Floating stat cards */}
        <div className="absolute bottom-16 right-8 hidden lg:flex flex-col gap-3 z-10">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4 text-white">
            <p className="text-3xl font-bold">{siteConfig.social.livesRestored}</p>
            <p className="text-xs text-white/55 uppercase tracking-wider mt-0.5">
              {t("statsPatients")}
            </p>
          </div>
          <div className="bg-seafoam/20 backdrop-blur-md border border-seafoam/30 rounded-2xl px-6 py-4">
            <p className="text-3xl font-bold text-seafoam">
              {siteConfig.social.recoveryRate}
            </p>
            <p className="text-xs text-seafoam/60 uppercase tracking-wider mt-0.5">
              {t("statsRate")}
            </p>
          </div>
        </div>

        {/* Curved bottom */}
        <div className="absolute -bottom-1 left-0 right-0 z-20">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            preserveAspectRatio="none"
            className="w-full h-16 md:h-24"
          >
            <path
              d="M0,120 L0,60 Q360,120 720,60 T1440,60 L1440,120 Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-28 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AnimateOnView className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-seafoam/10 text-seafoam text-xs font-semibold uppercase tracking-widest mb-4">
              {t("howItWorks.badge")}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-forest">
              {t("howItWorks.title")}
            </h2>
          </AnimateOnView>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {steps.map((step, i) => {
              const Icon = STEP_ICONS[i];
              return (
                <AnimateOnView key={i} delay={i * 0.15}>
                  <div className="relative p-8 rounded-3xl border border-gray-100 bg-white shadow-sm hover:shadow-lg transition-all duration-300 group hover:-translate-y-1">
                    <div className="absolute -top-5 left-8 w-10 h-10 bg-forest rounded-xl flex items-center justify-center text-seafoam font-bold text-sm shadow-md">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-seafoam/20 to-seafoam/5 flex items-center justify-center mb-6 mt-4 group-hover:from-seafoam/30 transition-colors">
                      <Icon className="w-8 h-8 text-seafoam" />
                    </div>
                    <h3 className="text-xl font-bold text-forest mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-500 leading-relaxed text-sm">
                      {step.description}
                    </p>
                    {i < steps.length - 1 && (
                      <div className="hidden md:flex absolute top-1/2 -right-4 z-10 w-8 h-8 rounded-full bg-seafoam/10 border border-seafoam/20 items-center justify-center">
                        <ArrowRight className="w-3.5 h-3.5 text-seafoam" />
                      </div>
                    )}
                  </div>
                </AnimateOnView>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHAT WE TREAT ONLINE ── */}
      <section className="py-28 bg-forest">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AnimateOnView className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-seafoam/20 text-seafoam text-xs font-semibold uppercase tracking-widest mb-4">
              {t("whatWeTreat.badge")}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              {t("whatWeTreat.title")}
            </h2>
            <p className="text-white/55 max-w-2xl mx-auto text-sm leading-relaxed">
              {t("whatWeTreat.description")}
            </p>
          </AnimateOnView>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 lg:gap-5">
            {CONDITIONS.map((condition, i) => (
              <AnimateOnView key={condition.key} delay={i * 0.07}>
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] group cursor-pointer">
                  <Image
                    src={condition.image}
                    alt={t(`whatWeTreat.${condition.key}`)}
                    fill
                    sizes="(max-width: 640px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/25 to-transparent" />
                  <div className="absolute inset-0 bg-forest/0 group-hover:bg-forest/20 transition-colors duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white font-semibold text-sm leading-tight">
                      {t(`whatWeTreat.${condition.key}`)}
                    </p>
                  </div>
                  <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-seafoam flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                    <CheckCircle2 className="w-4 h-4 text-forest" />
                  </div>
                </div>
              </AnimateOnView>
            ))}
          </div>

          <AnimateOnView className="text-center mt-14">
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest bg-white text-forest shadow-[4px_4px_0px_0px_#A4C639] hover:bg-seafoam hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2"
            >
              {t("viewAll")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </AnimateOnView>
        </div>
      </section>

      {/* ── WHY ONLINE PHYSIO ── */}
      <section className="py-28 bg-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image side */}
            <AnimateOnView direction={isRTL ? "right" : "left"}>
              <div className="relative">
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="/services/corrective_exercise_deep_dive_hd.webp"
                    alt="Online physiotherapy exercise demonstration"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-forest/30" />
                </div>
                {/* Floating accent cards */}
                <div className="absolute -bottom-8 -right-8 bg-seafoam rounded-2xl p-6 shadow-xl">
                  <p className="text-forest font-bold text-3xl">
                    {siteConfig.social.yearsExperience}
                  </p>
                  <p className="text-forest/70 text-xs mt-0.5">
                    {t("statsYears")}
                  </p>
                </div>
                <div className="absolute -top-6 -left-6 bg-forest rounded-2xl p-5 shadow-xl">
                  <p className="text-seafoam font-bold text-xl tracking-wider">
                    DHA
                  </p>
                  <p className="text-white/55 text-xs mt-0.5">
                    {t("statsDHA")}
                  </p>
                </div>
              </div>
            </AnimateOnView>

            {/* Text side */}
            <div>
              <AnimateOnView direction={isRTL ? "left" : "right"} delay={0.1}>
                <span className="inline-block px-4 py-1.5 rounded-full bg-seafoam/10 text-seafoam text-xs font-semibold uppercase tracking-widest mb-4">
                  {t("why.badge")}
                </span>
                <h2 className="text-3xl md:text-5xl font-bold text-forest mb-4">
                  {t("why.title")}
                </h2>
                <p className="text-gray-500 mb-10 leading-relaxed">
                  {t("why.description")}
                </p>
              </AnimateOnView>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {benefits.map((benefit, i) => {
                  const Icon = BENEFIT_ICONS[i];
                  return (
                    <AnimateOnView
                      key={i}
                      delay={0.15 + i * 0.08}
                      direction={isRTL ? "left" : "right"}
                    >
                      <div className="flex gap-3 p-4 rounded-2xl bg-gray-50 hover:bg-seafoam/5 border border-transparent hover:border-seafoam/20 transition-all">
                        <div className="w-9 h-9 rounded-xl bg-seafoam/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Icon className="w-4 h-4 text-seafoam" />
                        </div>
                        <div>
                          <p className="font-semibold text-forest text-sm mb-0.5">
                            {benefit.title}
                          </p>
                          <p className="text-gray-500 text-xs leading-relaxed">
                            {benefit.description}
                          </p>
                        </div>
                      </div>
                    </AnimateOnView>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHO IT'S FOR ── */}
      <section className="py-28 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AnimateOnView className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-seafoam/10 text-seafoam text-xs font-semibold uppercase tracking-widest mb-4">
              {t("whoFor.badge")}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-forest">
              {t("whoFor.title")}
            </h2>
          </AnimateOnView>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {profiles.map((profile, i) => {
              const Icon = WHO_ICONS[i];
              return (
                <AnimateOnView key={i} delay={i * 0.1}>
                  <div className="bg-white rounded-3xl p-7 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group border border-gray-100">
                    <div className="w-12 h-12 rounded-2xl bg-forest flex items-center justify-center mb-5 group-hover:bg-seafoam transition-colors duration-300">
                      <Icon className="w-5 h-5 text-seafoam group-hover:text-forest transition-colors duration-300" />
                    </div>
                    <h3 className="text-lg font-bold text-forest mb-2">
                      {profile.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {profile.description}
                    </p>
                  </div>
                </AnimateOnView>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TECHNOLOGY & TRUST ── */}
      <section className="py-28 bg-forest relative overflow-hidden">
        {/* Subtle background image */}
        <div className="absolute inset-0 opacity-15">
          <Image
            src="/services/manual_therapy_hd.webp"
            alt=""
            fill
            className="object-cover object-center"
            aria-hidden="true"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <AnimateOnView>
              <span className="inline-block px-4 py-1.5 rounded-full bg-seafoam/20 text-seafoam text-xs font-semibold uppercase tracking-widest mb-4">
                {t("technology.badge")}
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                {t("technology.title")}
              </h2>
              <p className="text-white/55 leading-relaxed mb-10">
                {t("technology.description")}
              </p>

              <ul className="space-y-4">
                {techFeatures.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-seafoam/20 border border-seafoam/40 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5 text-seafoam" />
                    </div>
                    <span className="text-white/80 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Stats row */}
              <div className="flex items-center gap-8 mt-12 pt-8 border-t border-white/10">
                <div>
                  <p className="text-3xl font-bold text-white">
                    {siteConfig.social.livesRestored}
                  </p>
                  <p className="text-white/45 text-xs uppercase tracking-wider mt-0.5">
                    {t("statsPatients")}
                  </p>
                </div>
                <div className="w-px h-10 bg-white/15" />
                <div>
                  <p className="text-3xl font-bold text-white">
                    {siteConfig.social.recoveryRate}
                  </p>
                  <p className="text-white/45 text-xs uppercase tracking-wider mt-0.5">
                    {t("statsRate")}
                  </p>
                </div>
                <div className="w-px h-10 bg-white/15 hidden sm:block" />
                <div className="hidden sm:block">
                  <p className="text-3xl font-bold text-white">
                    {siteConfig.social.yearsExperience}
                  </p>
                  <p className="text-white/45 text-xs uppercase tracking-wider mt-0.5">
                    {t("statsYears")}
                  </p>
                </div>
              </div>
            </AnimateOnView>

            {/* Image collage */}
            <AnimateOnView delay={0.2} direction={isRTL ? "left" : "right"}>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative aspect-square rounded-3xl overflow-hidden shadow-lg">
                  <Image
                    src="/services/senior_care_hero_hd.webp"
                    alt="Senior physiotherapy care"
                    fill
                    sizes="25vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-square rounded-3xl overflow-hidden shadow-lg mt-8">
                  <Image
                    src="/services/womens_health.webp"
                    alt="Women's health physiotherapy"
                    fill
                    sizes="25vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-square rounded-3xl overflow-hidden shadow-lg -mt-8">
                  <Image
                    src="/services/ergonomics_workplace.webp"
                    alt="Ergonomics and workplace physiotherapy"
                    fill
                    sizes="25vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-square rounded-3xl overflow-hidden shadow-lg">
                  <Image
                    src="/services/prenatal_postnatal.webp"
                    alt="Postnatal physiotherapy"
                    fill
                    sizes="25vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </AnimateOnView>
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ── */}
      <section className="py-24 bg-seafoam relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-forest/10 translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <AnimateOnView>
            <h2 className="text-3xl md:text-5xl font-bold text-forest mb-5">
              {t("cta.title")}
            </h2>
            <p className="text-forest/65 max-w-2xl mx-auto mb-10 leading-relaxed">
              {t("cta.description")}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-9 py-4 rounded-full text-xs font-bold uppercase tracking-widest bg-forest text-white shadow-[4px_4px_0px_0px_#002D04] hover:bg-white hover:text-forest hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2"
              >
                <Video className="w-4 h-4" />
                {t("cta.button")}
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 px-9 py-4 rounded-full text-xs font-bold uppercase tracking-widest bg-white text-forest border border-forest/10 hover:bg-forest hover:text-white shadow-sm hover:shadow-md transition-all duration-300 outline-none"
              >
                {t("cta.secondary")}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </AnimateOnView>
        </div>
      </section>

      {/* ── APPOINTMENT BOOKING ── */}
      <AppointmentSection />
    </main>
  );
}
