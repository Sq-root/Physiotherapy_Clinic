import { setRequestLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import ServicesPageClient from "./ServicesPageClient";

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const messages = await getMessages();
  const servicesMessages = {
    servicesPage: messages.servicesPage,
    servicesSection: messages.servicesSection,
  };

  return (
    <NextIntlClientProvider messages={servicesMessages}>
      <ServicesPageClient />
    </NextIntlClientProvider>
  );
}

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
