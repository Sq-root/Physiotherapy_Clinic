import { setRequestLocale } from "next-intl/server";

// Re-export the contact page component
export { default } from "./ContactPageClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return {
    title: locale === "ar" ? "تواصل معنا" : "Contact Us",
    description:
      locale === "ar"
        ? "تواصل مع عيادة العلاج الطبيعي في دبي. احجز موعدك اليوم."
        : "Get in touch with our physiotherapy clinic in Dubai. Book your appointment today.",
  };
}
