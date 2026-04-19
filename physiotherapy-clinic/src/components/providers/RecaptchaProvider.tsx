"use client";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

export function RecaptchaProvider({ children }: { children: React.ReactNode }) {
  const reCaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  if (!reCaptchaKey) {
    // Informative warning for production — do not reference dev-only files like .env.local
    console.warn(
      "reCAPTCHA site key is not defined. Set NEXT_PUBLIC_RECAPTCHA_SITE_KEY in your production environment and rebuild the app."
    );
  }

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={reCaptchaKey ?? ""}
      scriptProps={{ async: true, defer: true }}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
}
