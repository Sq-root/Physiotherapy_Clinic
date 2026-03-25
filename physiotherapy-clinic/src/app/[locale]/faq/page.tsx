import { setRequestLocale } from "next-intl/server";

// Re-export the FAQ page component
export { default } from "./FaqPageClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return {
    title: locale === "ar" ? "الأسئلة الشائعة" : "FAQ",
    description:
      locale === "ar"
        ? "الأسئلة الشائعة حول خدمات وعلاجات العلاج الطبيعي لدينا."
        : "Frequently asked questions about our physiotherapy services and treatments.",
  };
}
