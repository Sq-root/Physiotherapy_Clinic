import { Sparkles } from "lucide-react";
import { getTranslations, getLocale } from "next-intl/server";
import { AnimateOnView } from "@/components/ui/AnimateOnView";
import { PatientJourneyInteractive } from "./PatientJourneyInteractive";
import { siteConfig } from "@/config/site";

export async function PatientJourney() {
  const t = await getTranslations("patientJourney");
  const locale = await getLocale();
  const isRTL = locale === "ar";

  // Step configuration — pre-resolve translations (serializable)
  const steps = [
    { num: 1, key: "assessment", color: "from-blue-500/20 to-blue-600/20" },
    { num: 2, key: "plan", color: "from-purple-500/20 to-purple-600/20" },
    { num: 3, key: "therapy", color: "from-seafoam/20 to-lime/20" },
    { num: 4, key: "recovery", color: "from-lime/20 to-yellow-500/20" },
  ].map((s) => ({
    ...s,
    title: t(`steps.${s.key}.title`),
    shortTitle: t(`steps.${s.key}.shortTitle`),
    desc: t(`steps.${s.key}.desc`),
    duration: t(`steps.${s.key}.duration`),
  }));

  // Pain points — pre-resolve translations (serializable)
  const painPoints = [
    { id: 1, key: "neckShoulder", position: { top: "18%", left: "50%" } },
    { id: 2, key: "upperBack", position: { top: "27%", left: "50%" } },
    { id: 3, key: "lowerBack", position: { top: "42%", left: "50%" } },
    { id: 4, key: "kneeLeg", position: { top: "75%", left: "50%" } },
  ].map((p) => ({
    ...p,
    title: t(`painPoints.${p.key}.title`),
    conditions: t.raw(`painPoints.${p.key}.conditions`) as string[],
  }));

  return (
    <section className="bg-forest py-16 md:py-24 relative overflow-hidden" id="journey">
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-seafoam/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-lime/5 rounded-full blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8 relative z-10">
        {/* Header — Server Rendered */}
        <AnimateOnView className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-seafoam/20 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-seafoam" />
            </div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-seafoam">
              {t("badge")}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-sans text-white font-semibold leading-[1.1] tracking-tight mb-4">
            {t("title")} <span className="text-lime">{t("titleHighlight")}</span>
          </h2>
          <p className="text-white/60 text-sm md:text-base max-w-2xl mx-auto">
            {t("description")}
          </p>
        </AnimateOnView>

        {/* Interactive Client Island */}
        <PatientJourneyInteractive
          steps={steps}
          painPoints={painPoints}
          isRTL={isRTL}
          ctaLabel={t("cta")}
          description={t("description")}
          bodyAreasCount={siteConfig.social.bodyAreas}
          conditionsCount={siteConfig.social.conditions}
        />
      </div>
    </section>
  );
}
