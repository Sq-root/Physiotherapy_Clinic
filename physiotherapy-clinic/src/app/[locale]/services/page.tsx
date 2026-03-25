import { setRequestLocale } from "next-intl/server";

// Re-export the services page component
// For now keeping it simple - the services page component will handle translations
export { default } from "./ServicesPageClient";

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
