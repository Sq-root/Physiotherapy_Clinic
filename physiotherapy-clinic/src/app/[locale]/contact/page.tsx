import { setRequestLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import ContactPageClient from "./ContactPageClient";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const messages = await getMessages();
  const contactMessages = {
    contact: messages.contact,
    common: messages.common,
  };

  return (
    <NextIntlClientProvider messages={contactMessages}>
      <ContactPageClient />
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
    title: locale === "ar" ? "تواصل معنا" : "Contact Us",
    description:
      locale === "ar"
        ? "تواصل مع عيادة العلاج الطبيعي في دبي. احجز موعدك اليوم."
        : "Get in touch with our physiotherapy clinic in Dubai. Book your appointment today.",
  };
}
