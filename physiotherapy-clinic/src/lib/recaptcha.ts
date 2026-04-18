const RECAPTCHA_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";
const SCORE_THRESHOLD = 0.5;
const isDev = process.env.NODE_ENV !== "production";

interface RecaptchaVerifyResponse {
  success: boolean;
  score: number;
  action: string;
  challenge_ts: string;
  hostname: string;
  "error-codes"?: string[];
}

export async function verifyRecaptcha(
  token: string
): Promise<{ success: boolean; score?: number }> {
  // Skip verification in development so local testing is unblocked
  if (isDev) return { success: true, score: 1.0 };

  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    console.error("RECAPTCHA_SECRET_KEY is not defined");
    return { success: false };
  }

  try {
    const response = await fetch(RECAPTCHA_VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret: secretKey, response: token }),
    });

    const data: RecaptchaVerifyResponse = await response.json();

    if (!data.success) {
      console.error("reCAPTCHA failed:", data["error-codes"]);
      return { success: false, score: data.score };
    }

    if (data.score < SCORE_THRESHOLD) {
      console.warn(`reCAPTCHA score too low: ${data.score} (threshold: ${SCORE_THRESHOLD})`);
      return { success: false, score: data.score };
    }

    return { success: true, score: data.score };
  } catch (err) {
    console.error("reCAPTCHA verification error:", err);
    return { success: false };
  }
}
