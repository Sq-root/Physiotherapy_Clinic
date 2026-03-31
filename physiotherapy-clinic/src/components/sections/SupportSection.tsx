import Image from "next/image";
import { AnimateOnView } from "@/components/ui/AnimateOnView";
import { Target, FlaskConical, Heart } from "lucide-react";
import { siteConfig } from "@/config/site";
import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";

const highlightIconMap = {
  0: Target,
  1: FlaskConical,
  2: Heart,
};

export async function SupportSection() {
  const t = await getTranslations("support");
  const locale = await getLocale();
  const isRTL = locale === "ar";

  const highlights = [
    { label: t("highlights.globalStandard") },
    { label: t("highlights.personalized") },
    { label: t("highlights.outcomeDriven") },
  ];

  return (
    <section
      className="relative bg-white pt-4 pb-16 md:pt-8 md:pb-24 overflow-hidden"
      id="about"
    >
      {/* Subtle Background Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #002D04 1px, transparent 0)`,
          backgroundSize: "24px 24px",
        }}
      ></div>

      {/* Decorative Blob - Right */}
      <div className="absolute -top-20 -right-40 w-80 h-80 bg-seafoam/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Decorative Blob - Left */}
      <div className="absolute top-1/2 -left-40 w-80 h-80 bg-lime/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 relative z-10">
        {/* Mobile Layout */}
        <div className="md:hidden">
          <AnimateOnView
            className="bg-gradient-to-br from-section to-white rounded-2xl p-5 shadow-card border border-forest/5"
          >
            {/* Header Row */}
            <div className="flex items-start gap-4 mb-4">
              <div className="relative flex-shrink-0">
                <div className="w-20 h-24 rounded-xl overflow-hidden shadow-md relative">
                  <Image
                    src="/services/IMG_0120.webp"
                    alt="Physiotherapist"
                    fill
                    className="object-cover object-center"
                    sizes="80px"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 size-10 bg-seafoam rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                  <span className="text-white text-[10px] font-bold">
                    {siteConfig.social.yearsExperience}
                  </span>
                </div>
              </div>

              <div className="flex-1 pt-1">
                <div className="inline-flex items-center gap-1.5 bg-seafoam/10 rounded-full px-2.5 py-1 mb-2">
                  <span className="w-1.5 h-1.5 bg-seafoam rounded-full"></span>
                  <span className="text-seafoam text-[9px] font-semibold tracking-wider uppercase">
                    {t("badge")}
                  </span>
                </div>
                <h2 className="text-base font-bold text-forest leading-tight">
                  {t("title")} {t("titleHighlight")}
                </h2>
              </div>
            </div>

            {/* Stats Row */}
            {/* <div className="flex items-center justify-between bg-white rounded-xl p-3 mb-4">
              <div className="text-center flex-1">
                <p className="text-forest text-lg font-bold">5K+</p>
                <p className="text-forest/50 text-[8px] uppercase">Patients</p>
              </div>
              <div className="w-px h-8 bg-forest/10"></div>
              <div className="text-center flex-1">
                <p className="text-forest text-lg font-bold">98%</p>
                <p className="text-forest/50 text-[8px] uppercase">Success</p>
              </div>
              <div className="w-px h-8 bg-forest/10"></div>
              <div className="text-center flex-1">
                <p className="text-forest text-lg font-bold">4.9</p>
                <p className="text-forest/50 text-[8px] uppercase">Rating</p>
              </div>
            </div> */}

            {/* Highlights */}
            <div className="flex flex-wrap gap-1.5">
              {highlights.map((item, i) => {
                const IconComponent =
                  highlightIconMap[i as keyof typeof highlightIconMap];
                return (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 bg-white rounded-full px-2.5 py-1 text-[10px] font-medium text-forest shadow-sm border border-forest/5"
                  >
                    {IconComponent && (
                      <IconComponent className="w-3 h-3 text-seafoam" />
                    )}
                    {item.label}
                  </span>
                );
              })}
            </div>
          </AnimateOnView>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Image Collage */}
          <AnimateOnView className="relative">
            <div
              className="relative w-full max-w-lg mx-auto"
              style={{ aspectRatio: "1/0.85" }}
            >
              {/* Main Large Image */}
              <div className="absolute top-0 left-0 w-[62%] h-[88%] rounded-3xl overflow-hidden shadow-2xl z-10">
                <Image
                  src="/services/doctor_portrait_stretgth.webp"
                  alt="Senior Physiotherapist"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 50vw, 30vw"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-forest/30 to-transparent"></div>
              </div>

              {/* Top Right Image */}
              <div className="absolute top-0 right-0 w-[35%] h-[45%] rounded-2xl overflow-hidden shadow-xl z-10">
                <Image
                  src="/services/IMG_0122.webp"
                  alt="Patient Session"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 30vw, 15vw"
                />
              </div>

              {/* Bottom Right Image */}
              <div className="absolute bottom-0 right-0 w-[35%] h-[45%] rounded-2xl overflow-hidden shadow-xl z-10">
                <Image
                  src="/services/IMG_0116.webp"
                  alt="Therapy Session"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 30vw, 15vw"
                />
              </div>

              {/* Experience Badge */}
              <div className="absolute top-1/2 left-[58%] -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="relative">
                  {/* Rotating Ring */}
                  <div
                    className="absolute inset-0 w-28 h-28 lg:w-32 lg:h-32 border-2 border-dashed border-seafoam/40 rounded-full animate-spin"
                    style={{ animationDuration: "15s" }}
                  ></div>
                  {/* Badge */}
                  <div className="relative size-24 lg:size-28 bg-seafoam rounded-full flex flex-col items-center justify-center shadow-2xl border-4 border-white">
                    <span className="text-white text-2xl lg:text-3xl font-bold">
                      {siteConfig.social.yearsExperience}
                    </span>
                    <span className="text-white/80 text-[8px] font-bold uppercase tracking-wider">
                      Years Exp.
                    </span>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-lime/10 rounded-full blur-xl pointer-events-none"></div>
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-seafoam/10 rounded-full blur-xl pointer-events-none"></div>
            </div>
          </AnimateOnView>

          {/* Right - Content */}
          <AnimateOnView delay={0.1}>
            {/* Badge */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-[2px] bg-seafoam"></div>
              <span className="text-seafoam text-xs font-bold uppercase tracking-[0.2em]">
                {t("badge")}
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-sans text-forest leading-[1.15] font-bold tracking-tight mb-6">
              {t("title")}{" "}
              <span className="text-seafoam">{t("titleHighlight")}</span>
            </h2>

            {/* Description */}
            <p className="text-forest/80 text-base lg:text-lg mb-8 leading-relaxed">
              {t("description")}
            </p>

            {/* Highlights */}
            <div className="flex flex-wrap gap-3 mb-8">
              {highlights.map((item, i) => {
                const IconComponent =
                  highlightIconMap[i as keyof typeof highlightIconMap];
                return (
                  <span
                    key={i}
                    className="inline-flex items-center gap-2 bg-section rounded-full px-5 py-2.5 text-sm font-medium text-forest border border-forest/5 hover:border-seafoam/30 hover:shadow-md transition-all duration-300"
                  >
                    {IconComponent && (
                      <IconComponent className="w-4 h-4 text-seafoam" />
                    )}
                    {item.label}
                  </span>
                );
              })}
            </div>

            {/* Stats Row */}
            {/* <div className="flex items-center gap-8 py-6 px-8 bg-forest rounded-2xl mb-8">
              <div className="text-center">
                <p className="text-white text-3xl font-bold">5K+</p>
                <p className="text-white/60 text-xs uppercase tracking-wider">Patients</p>
              </div>
              <div className="w-px h-12 bg-white/20"></div>
              <div className="text-center">
                <p className="text-white text-3xl font-bold">98%</p>
                <p className="text-white/60 text-xs uppercase tracking-wider">Success</p>
              </div>
              <div className="w-px h-12 bg-white/20"></div>
              <div className="text-center">
                <p className="text-white text-3xl font-bold">4.9</p>
                <p className="text-white/60 text-xs uppercase tracking-wider">Rating</p>
              </div>
            </div> */}

            {/* Doctor + CTA */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Image
                    src="/services/IMG_0017.webp"
                    alt={siteConfig.doctorName}
                    width={56}
                    height={56}
                    className="size-14 rounded-full object-cover object-top border-2 border-seafoam shadow-lg"
                  />
                  <div className="absolute -bottom-1 -right-1 size-5 bg-lime rounded-full flex items-center justify-center border-2 border-white">
                    <svg
                      className="w-3 h-3 text-forest"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="text-forest font-bold">
                    {siteConfig.doctorName}
                  </p>
                  <p className="text-seafoam text-sm">Lead Physiotherapist</p>
                </div>
              </div>

              <Link
                href="/about"
                className={`group inline-flex items-center gap-2 bg-seafoam text-white ${isRTL ? 'pr-6 pl-2' : 'pl-6 pr-2'} py-2.5 rounded-full font-semibold text-sm hover:bg-forest transition-colors duration-300`}
              >
                <span>{t("cta")}</span>
                <span className="size-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <svg
                    className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </Link>
            </div>
          </AnimateOnView>
        </div>
      </div>
    </section>
  );
}
