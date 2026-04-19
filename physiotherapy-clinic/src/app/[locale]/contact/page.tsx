import { setRequestLocale, getTranslations } from "next-intl/server";
import {
  Phone,
  Mail,
  Clock,
  Sparkles,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { AnimateOnView } from "@/components/ui/AnimateOnView";
import ContactFormIsland from "./ContactFormIsland";
import ContactFAQIsland from "./ContactFAQIsland";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("contact");
  const tCommon = await getTranslations("common");

  // Pre-resolve all translations for client islands
  const formLabels = {
    firstName: t("form.firstName"),
    lastName: t("form.lastName"),
    email: t("form.email"),
    phone: t("form.phone"),
    service: t("form.service"),
    serviceDefault: t("form.serviceDefault"),
    message: t("form.message"),
    messagePlaceholder: t("form.messagePlaceholder"),
    submit: t("form.submit"),
    submitting: t("form.submitting"),
    successTitle: t("form.successTitle"),
    successMessage: t("form.successMessage"),
    close: tCommon("close"),
  };

  const services = [
    { key: "orthopedic", label: t("serviceOptions.orthopedic") },
    { key: "sports", label: t("serviceOptions.sports") },
    { key: "neurological", label: t("serviceOptions.neurological") },
    { key: "manual", label: t("serviceOptions.manual") },
    { key: "senior", label: t("serviceOptions.senior") },
    { key: "postSurgery", label: t("serviceOptions.postSurgery") },
    { key: "general", label: t("serviceOptions.general") },
    { key: "online", label: t("serviceOptions.online") },
    { key: "others", label: t("serviceOptions.others") },
  ];

  const contactInfo = [
    {
      icon: Phone,
      title: t("info.callUs"),
      primary: siteConfig.contact.phone,
      secondary: siteConfig.contact.timing,
      action: `tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, "")}`,
      color: "bg-seafoam",
    },
    {
      icon: Mail,
      title: t("info.emailUs"),
      primary: siteConfig.contact.email,
      secondary: t("info.replyTime"),
      action: `mailto:${siteConfig.contact.email}`,
      color: "bg-lime",
    },
    {
      icon: Clock,
      title: t("info.workingHours"),
      primary: siteConfig.contact.timing,
      secondary: t("info.sundayClosed"),
      action: null,
      color: "bg-amber",
    },
  ];

  const faqs = t.raw("faq.questions") as Array<{ question: string; answer: string }>;

  return (
    <main className="overflow-x-clip">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-white/40 to-section">
        <div className="absolute top-0 end-0 w-[30rem] h-[30rem] bg-lime/10 rounded-full blur-[100px] z-0 translate-x-1/4 rtl:-translate-x-1/4 -translate-y-1/4" />
        <div className="absolute bottom-0 start-0 w-[22rem] h-[22rem] bg-white/30 rounded-full blur-[80px] z-0 -translate-x-1/4 rtl:translate-x-1/4 translate-y-1/4" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <AnimateOnView delay={0}>
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/60 border border-forest/10 shadow-sm backdrop-blur-md">
                <div className="w-6 h-6 rounded-full bg-seafoam/20 flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-seafoam" />
                </div>
                <span className="text-xs font-bold uppercase tracking-[0.15em] text-forest/80">
                  {t("badge")}
                </span>
              </div>
            </AnimateOnView>

            <AnimateOnView delay={0.1}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-forest mb-6 tracking-tight leading-[1.1]">
                {t("title")} <br className="hidden md:block" />
                <span className="text-lime font-serif italic">{t("titleHighlight")}</span>
              </h1>
            </AnimateOnView>

            <AnimateOnView delay={0.2}>
              <p className="text-base md:text-xl text-forest/80 font-medium max-w-2xl mx-auto leading-relaxed">
                {t("description")}
              </p>
            </AnimateOnView>
          </div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-12 md:py-16 bg-white relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 -mt-16 md:-mt-24 relative z-20">
            {contactInfo.map((item, index) => (
              <AnimateOnView key={item.title} delay={index * 0.1}>
                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-forest/5 hover:border-seafoam/30 transition-all duration-300 group h-full">
                  <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6", item.color)}>
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-forest mb-2">{item.title}</h3>
                  <p className="text-forest font-semibold">{item.primary}</p>
                  <p className="text-forest/50 text-sm mt-1">{item.secondary}</p>
                </div>
              </AnimateOnView>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 md:py-28 bg-white relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column - Server Rendered */}
            <AnimateOnView className="lg:col-span-5" direction="left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full bg-seafoam/10 border border-seafoam/20">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-seafoam">
                  Send a Request
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-forest mb-5 tracking-tight leading-[1.1]">
                Ready to Feel<br />
                <span className="text-seafoam font-serif italic">Better?</span>
              </h2>
              <p className="text-forest/80 text-base leading-relaxed max-w-sm">
                Fill out the form and our care coordinators will match you with the right specialist for your needs.
              </p>

              <div className="mt-10 space-y-6">
                <div className="flex gap-4">
                  <div className="shrink-0 w-12 h-12 rounded-2xl bg-forest/5 flex items-center justify-center">
                    <Stethoscope className="w-6 h-6 text-forest" />
                  </div>
                  <div>
                    <h4 className="text-forest font-bold">{t("trustIndicators.professional")}</h4>
                    <p className="text-forest/80 text-sm">
                      Highly trained physiotherapists dedicated to your full recovery.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="shrink-0 w-12 h-12 rounded-2xl bg-seafoam/10 flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-seafoam" />
                  </div>
                  <div>
                    <h4 className="text-forest font-bold">{t("trustIndicators.secure")}</h4>
                    <p className="text-forest/80 text-sm">
                      State-of-the-art equipment in a calming, hygienic environment.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="shrink-0 w-12 h-12 rounded-2xl bg-lime/15 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-forest" />
                  </div>
                  <div>
                    <h4 className="text-forest font-bold">{t("trustIndicators.personalized")}</h4>
                    <p className="text-forest/80 text-sm">
                      Tailored treatment plans designed specifically for your body and goals.
                    </p>
                  </div>
                </div>
              </div>
            </AnimateOnView>

            {/* Form - Client Island */}
            <AnimateOnView className="lg:col-span-7" direction="right">
              <ContactFormIsland labels={formLabels} services={services} />
            </AnimateOnView>
          </div>
        </div>
      </section>

      {/* Contact FAQ Section */}
      <section className="py-20 md:py-28 bg-forest/5 relative">
        <div className="absolute inset-0 bg-white/40 backdrop-blur-3xl z-0" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimateOnView className="text-center mb-16">
            <span className="inline-block py-1.5 px-4 rounded-full bg-white/60 border border-forest/10 text-forest font-bold uppercase tracking-widest text-[10px] mb-4 shadow-sm backdrop-blur-md">
              {t("faq.badge")}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-forest tracking-tight">
              {t("faq.title")}
            </h2>
          </AnimateOnView>

          <ContactFAQIsland faqs={faqs} />
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

  const isAr = locale === 'ar';
  const title = isAr ? 'تواصل معنا | د. عيشة شاه' : 'Contact Us | Dr. Isha Shah Physiotherapy Dubai';
  const description = isAr
    ? 'تواصل مع عيادة د. عيشة شاه للعلاج الطبيعي في دبي. احجز موعدك للعيادة أو زيارة منزلية أو استشارة أونلاين.'
    : 'Get in touch with Dr. Isha Shah physiotherapy clinic in Dubai. Book an in-clinic session, home visit, or online consultation worldwide.';
  return {
    title,
    description,
    alternates: {
      canonical: `${siteConfig.url}/${locale}/contact`,
      languages: { en: `${siteConfig.url}/en/contact`, ar: `${siteConfig.url}/ar/contact`, 'x-default': `${siteConfig.url}/en/contact` },
    },
    openGraph: {
      title, description,
      url: `${siteConfig.url}/${locale}/contact`,
      type: 'website',
      locale: isAr ? 'ar_AE' : 'en_AE',
      images: [{ url: '/logo/Dr_isha_Logo.png', width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: { card: 'summary_large_image', title, description, images: ['/logo/Dr_isha_Logo.png'] },
  };
}
