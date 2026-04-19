"use client";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

export function RecaptchaProvider({ children }: { children: React.ReactNode }) {
  const reCaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

  if (!reCaptchaKey) {
    const errorMsg =
      "reCAPTCHA site key is not defined. Please set NEXT_PUBLIC_RECAPTCHA_SITE_KEY in your environment variables.";
    console.error(errorMsg);
    if (typeof window !== "undefined") {
      console.error("Ensure .env.local contains: NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-key");
    }
  }

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={reCaptchaKey || "invalid-key"}
      scriptProps={{ async: true, defer: true, nonce: undefined }}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
}
