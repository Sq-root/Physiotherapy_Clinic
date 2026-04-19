"use client";

import React from "react";
import { NextIntlClientProvider } from "next-intl";

type Props = {
  locale?: string;
  messages?: Record<string, unknown>;
  children: React.ReactNode;
};

export default function NextIntlProviderClient({ locale, messages, children }: Props) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone={"UTC"}>
      {children}
    </NextIntlClientProvider>
  );
}
