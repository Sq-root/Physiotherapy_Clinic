"use client";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

export function RecaptchaProvider({ children }: { children: React.ReactNode }) {
  const reCaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  if (!reCaptchaKey) {
    console.error(
      "reCAPTCHA site key is not defined. Please set NEXT_PUBLIC_RECAPTCHA_SITE_KEY in your environment variables."
    );
    // Render children without reCAPTCHA protection as fallback
    return <>{children}</>;
  }

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={reCaptchaKey}
      scriptProps={{ async: true, defer: true, nonce: undefined }}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
}
