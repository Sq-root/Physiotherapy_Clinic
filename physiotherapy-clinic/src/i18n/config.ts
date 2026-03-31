export const locales = ['en', 'ar'] as const;
export const defaultLocale = 'en' as const;

export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  en: 'English',
  ar: 'العربية',
};

export const localeDirection: Record<Locale, 'ltr' | 'rtl'> = {
  en: 'ltr',
  ar: 'rtl',
};

export const localeFlags: Record<Locale, string> = {
  en: '',
  ar: '',
};

// Helper function to get direction for a locale
export function getDirection(locale: Locale): 'ltr' | 'rtl' {
  return localeDirection[locale];
}

// Helper function to check if locale is RTL
export function isRTLLocale(locale: Locale): boolean {
  return localeDirection[locale] === 'rtl';
}