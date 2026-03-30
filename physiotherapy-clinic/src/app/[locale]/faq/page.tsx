import { setRequestLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import FaqPageClient from "./FaqPageClient";

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const messages = await getMessages();
  const faqMessages = {
    faqPage: messages.faqPage,
  };

  return (
    <NextIntlClientProvider messages={faqMessages}>
      <FaqPageClient />
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
    title: locale === "ar" ? "الأسئلة الشائعة" : "FAQ",
    description:
      locale === "ar"
        ? "الأسئلة الشائعة حول خدمات وعلاجات العلاج الطبيعي لدينا."
        : "Frequently asked questions about our physiotherapy services and treatments.",
  };
}
