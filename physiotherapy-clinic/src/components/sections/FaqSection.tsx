import {
  PersonStanding,
  Zap,
  CheckCircle,
} from "lucide-react";
import { getTranslations, getLocale } from "next-intl/server";
import { AnimateOnView } from "@/components/ui/AnimateOnView";
import { FaqInteractive } from "./FaqInteractive";

export async function FaqSection() {
  const t = await getTranslations("faq");
  const locale = await getLocale();
  const isRTL = locale === "ar";

  // Category configuration with translation keys
  const categoryKeys = ["gettingStarted", "treatment", "insurance", "aftercare"];

  // Pre-resolve translations to pass as serializable props
  const categories = categoryKeys.map((key) => ({
    id: key,
    label: t(`categories.${key}.label`),
    faqs: t.raw(`categories.${key}.faqs`) as Array<{ question: string; answer: string }>,
  }));

  return (
    <section
      id="faq"
      className="bg-white py-16 md:py-24 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(#002D04 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-seafoam/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-lime/5 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8 relative z-10">
        {/* Header — Server Rendered */}
        <AnimateOnView className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-seafoam/10 flex items-center justify-center">
              <span className="text-seafoam text-sm">?</span>
            </div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-seafoam">
              {t("badge")}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-sans text-forest font-semibold leading-[1.1] tracking-tight mb-4">
            {t("title")}{" "}
            <span className="text-seafoam">{t("titleHighlight")}</span>
          </h2>
          <p className="text-forest/80 text-sm md:text-base max-w-2xl mx-auto">
            {t("description")}
          </p>
        </AnimateOnView>

        {/* Interactive Client Island */}
        <FaqInteractive
          categories={categories}
          isRTL={isRTL}
          stillHaveQuestions={t("stillHaveQuestions")}
          description={t("description")}
          contactUs={t("contactUs")}
        />

        {/* Quick Stats — Server Rendered */}
        <AnimateOnView delay={0.3} className="mt-6 grid grid-cols-3 gap-3">
          <div className="text-center p-4 bg-section/50 rounded-2xl border border-forest/5">
            <PersonStanding className="w-5 h-5 mx-auto mb-2 text-seafoam" />
            <p className="text-lg md:text-xl font-bold text-forest">15+</p>
            <p className="text-[10px] text-forest/50 uppercase tracking-wider">
              Body Areas
            </p>
          </div>
          <div className="text-center p-4 bg-section/50 rounded-2xl border border-forest/5">
            <Zap className="w-5 h-5 mx-auto mb-2 text-seafoam" />
            <p className="text-lg md:text-xl font-bold text-forest">
              &lt;2hr
            </p>
            <p className="text-[10px] text-forest/50 uppercase tracking-wider">
              Response Time
            </p>
          </div>
          <div className="text-center p-4 bg-section/50 rounded-2xl border border-forest/5">
            <CheckCircle className="w-5 h-5 mx-auto mb-2 text-seafoam" />
            <p className="text-lg md:text-xl font-bold text-forest">98%</p>
            <p className="text-[10px] text-forest/50 uppercase tracking-wider">
              Resolution Rate
            </p>
          </div>
        </AnimateOnView>
      </div>
    </section>
  );
}
