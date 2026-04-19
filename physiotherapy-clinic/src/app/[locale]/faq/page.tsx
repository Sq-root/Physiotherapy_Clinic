import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildFAQPage } from "@/lib/seo/jsonLd";
import Image from "next/image";
import { MessageCircle, MessageSquare, Phone } from "lucide-react";
import { Link } from "@/i18n/routing";
import { faqCategories } from "@/lib/data/faq-help";
import FaqInteractiveIsland from "./FaqInteractiveIsland";

/* Sidebar - Server Rendered */
function Sidebar({ isRTL }: { isRTL: boolean }) {
  return (
    <aside className="w-full lg:w-72 xl:w-80 shrink-0">
      <div className="sticky top-36 space-y-4">
        {/* Quick Contact Card */}
        <div className="bg-forest p-5 rounded-2xl shadow-xl shadow-forest/20 text-white relative overflow-hidden">
          <div className={`absolute ${isRTL ? "-left-8" : "-right-8"} -top-8 w-32 h-32 bg-lime/20 rounded-full blur-2xl`} />

          <div className="size-10 rounded-xl bg-white/10 flex items-center justify-center mb-4 backdrop-blur-sm border border-white/10 relative z-10">
            <MessageCircle className="w-5 h-5 text-lime" />
          </div>

          <h4 className="text-base font-bold mb-1 relative z-10 text-white">
            Quick Contact
          </h4>
          <p className="text-xs text-white/70 mb-5 font-light relative z-10">
            Our care coordinators are available 24/7 for urgent inquiries.
          </p>

          <div className="space-y-2.5 relative z-10">
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full bg-lime text-forest font-bold text-xs hover:bg-white transition-all shadow-md shadow-black/10"
            >
              <MessageSquare className="w-4 h-4" />
              WhatsApp Us
            </Link>
            <a
              href="tel:+"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full bg-white/10 border border-white/20 text-white font-bold text-xs hover:bg-white hover:text-forest transition-all backdrop-blur-sm"
            >
              <Phone className="w-4 h-4" />
              Call Directly
            </a>
          </div>

          <div className="mt-5 pt-4 border-t border-white/10 text-center relative z-10">
            <p className="text-[10px] text-lime">Response time: &lt; 5 mins</p>
          </div>
        </div>

        {/* Testimonial Card */}
        <div className="p-5 rounded-2xl bg-white/50 border border-white/60 shadow-lg shadow-forest/5 backdrop-blur-sm">
          <p className="text-sm text-forest leading-relaxed italic mb-4">
            &quot;The tele-rehab program changed how I view recovery.
            Professional, convenient, and incredibly effective.&quot;
          </p>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-gray-200 overflow-hidden ring-2 ring-white ring-offset-2 ring-offset-section">
              <Image
                src="/services/IMG_0017.webp"
                alt="James R."
                width={36}
                height={36}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="block text-xs font-bold text-forest">James R.</span>
              <span className="block text-[10px] text-forest/80 uppercase tracking-wider font-bold">
                Professional Athlete
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("faqPage");
  const isRTL = locale === "ar";

  // Pre-resolve labels for the client island
  const labels = {
    badge: t("badge"),
    title: t("title"),
    titleHighlight: t("titleHighlight"),
    searchPlaceholder: t("searchPlaceholder"),
    noResults: t("noResults"),
    clearSearch: "Clear Search",
  };

  return (
    <div className="bg-section text-forest font-sans antialiased overflow-x-hidden">
      <JsonLd schema={buildFAQPage(faqCategories)} />
      {/* Interactive Island - Hero, Nav, FAQ Content, and Sidebar */}
      <FaqInteractiveIsland
        categories={faqCategories}
        labels={labels}
        isRTL={isRTL}
      >
        {/* Sidebar - Server Rendered */}
        <Sidebar isRTL={isRTL} />
      </FaqInteractiveIsland>
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const isAr = locale === 'ar';
  const title = isAr
    ? 'الأسئلة الشائعة | د. عيشة شاه للعلاج الطبيعي'
    : 'FAQ | Dr. Isha Shah Physiotherapy Dubai & Online';
  const description = isAr
    ? 'أجوبة على أكثر الأسئلة شيوعاً حول العلاج الطبيعي، التأهيل عن بُعد، والزيارات المنزلية في دبي.'
    : 'Answers to common questions about physiotherapy in Dubai, tele-rehabilitation, home visit physio, insurance, and online consultations worldwide.';
  return {
    title,
    description,
    alternates: {
      canonical: `${siteConfig.url}/${locale}/faq`,
      languages: { en: `${siteConfig.url}/en/faq`, ar: `${siteConfig.url}/ar/faq`, 'x-default': `${siteConfig.url}/en/faq` },
    },
    openGraph: {
      title, description,
      url: `${siteConfig.url}/${locale}/faq`,
      type: 'website',
      locale: isAr ? 'ar_AE' : 'en_AE',
      images: [{ url: '/logo/Dr_isha_Logo.png', width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: { card: 'summary_large_image', title, description, images: ['/logo/Dr_isha_Logo.png'] },
  };
}
