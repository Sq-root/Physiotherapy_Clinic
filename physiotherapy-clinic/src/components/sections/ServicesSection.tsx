import { Sparkles, ArrowRight } from "lucide-react";
import { getTranslations, getLocale } from "next-intl/server";
import { AnimateOnView } from "@/components/ui/AnimateOnView";
import { ServicesInteractive } from "./ServicesInteractive";
import { Link } from "@/i18n/routing";

interface Service {
  id: string;
  key: string;
  icon: string;
  img: string;
  imagePosition: string;
}

// Service configuration (static)
const services: Service[] = [
  { id: "01", key: "orthopedic", icon: "bone", img: "/services/IMG_0122.webp", imagePosition: "object-center" },
  { id: "02", key: "sports", icon: "zap", img: "/services/sports_recovery_bento_hd.webp", imagePosition: "object-center" },
  { id: "03", key: "neurological", icon: "brain", img: "/services/IMG_0127.webp", imagePosition: "object-center" },
  { id: "04", key: "manual", icon: "hand", img: "/services/manual_therapy_hd.webp", imagePosition: "object-center" },
  { id: "05", key: "senior", icon: "heart", img: "/services/senior_care.webp", imagePosition: "object-center" },
];

export async function ServicesSection() {
  const t = await getTranslations("servicesSection");
  const tCommon = await getTranslations("common");
  const locale = await getLocale();
  const isRTL = locale === "ar";

  // Pre-resolve all service content on the server (serializable for client)
  const servicesData = services.map((s) => ({
    ...s,
    title: t(`services.${s.key}.title`),
    shortDesc: t(`services.${s.key}.shortDesc`),
    fullDesc: t(`services.${s.key}.fullDesc`),
    features: t.raw(`services.${s.key}.features`) as string[],
  }));

  return (
    <section className="relative py-16 md:py-24 bg-section overflow-hidden" id="services">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#002D04 1px, transparent 1px), linear-gradient(90deg, #002D04 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute top-20 right-20 w-96 h-96 border border-seafoam/10 rounded-full" />
        <div className="absolute top-24 right-24 w-80 h-80 border border-seafoam/5 rounded-full" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-seafoam/5 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8 relative z-10">
        {/* Header — Server Rendered */}
        <AnimateOnView className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-seafoam/10 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-seafoam" />
              </div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-seafoam">
                {t("badge")}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-sans text-forest font-semibold leading-[1.1] tracking-tight">
              {t("title")}
              <br className="hidden md:block" />
              <span className="text-seafoam">{t("titleHighlight")}</span>
            </h2>
          </div>
          <p className="text-forest/60 text-sm md:text-base max-w-md leading-relaxed">
            {t("description")}
          </p>
        </AnimateOnView>

        {/* Interactive Client Island */}
        <ServicesInteractive
          services={servicesData}
          isRTL={isRTL}
          learnMoreLabel={tCommon("learnMore")}
          servicesLabel={tCommon("services")}
        />

        {/* Bottom CTA — Server Rendered */}
        <AnimateOnView delay={0.3} className="mt-12 md:mt-16 flex justify-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-4 px-6 md:px-8 py-3 bg-forest text-white hover:bg-forest/90 transition-colors rounded-full text-sm font-medium tracking-wide group"
          >
            {t("viewAllServices")}
            <span className="size-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-seafoam transition-colors">
              <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
            </span>
          </Link>
        </AnimateOnView>
      </div>
    </section>
  );
}
