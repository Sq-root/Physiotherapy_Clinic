// Type-safe i18n types for the physiotherapy clinic
// This provides autocomplete and type checking for translations

export type Locale = 'en' | 'ar';

export type LocaleDirection = 'ltr' | 'rtl';

// Define the structure of your messages JSON
export interface Messages {
  common: {
    bookAppointment: string;
    learnMore: string;
    viewAll: string;
    readMore: string;
    submit: string;
    loading: string;
    success: string;
    error: string;
    close: string;
    back: string;
    next: string;
    previous: string;
    followUs: string;
    quickLinks: string;
    services: string;
    contact: string;
    phone: string;
    email: string;
    address: string;
    hours: string;
    viewServices: string;
  };
  nav: {
    home: string;
    services: string;
    faq: string;
    contact: string;
    aboutUs: string;
  };
  hero: {
    slides: {
      sportsRecovery: HeroSlide;
      seniorCare: HeroSlide;
      painRelief: HeroSlide;
      postSurgery: HeroSlide;
    };
    cta: {
      book: string;
      explore: string;
    };
  };
  support: {
    badge: string;
    title: string;
    titleHighlight: string;
    description: string;
    highlights: {
      globalStandard: string;
      personalized: string;
      outcomeDriven: string;
    };
    cta: string;
    stats: {
      yearsExperience: string;
      patients: string;
      success: string;
    };
  };
  servicesSection: {
    badge: string;
    title: string;
    titleHighlight: string;
    description: string;
    viewAllServices: string;
    services: {
      orthopedic: ServiceItem;
      sports: ServiceItem;
      neurological: ServiceItem;
      manual: ServiceItem;
      senior: ServiceItem;
    };
  };
  patientJourney: {
    badge: string;
    title: string;
    titleHighlight: string;
    description: string;
    cta: string;
    steps: {
      assessment: JourneyStep;
      plan: JourneyStep;
      therapy: JourneyStep;
      recovery: JourneyStep;
    };
    painPoints: {
      neckShoulder: PainPoint;
      upperBack: PainPoint;
      lowerBack: PainPoint;
      kneeLeg: PainPoint;
    };
  };
  testimonials: {
    badge: string;
    title: string;
    titleHighlight: string;
    description: string;
    trustBadges: {
      verified: string;
      fullRecovery: string;
    };
  };
  faq: {
    badge: string;
    title: string;
    titleHighlight: string;
    description: string;
    categories: {
      gettingStarted: FaqCategory;
      treatment: FaqCategory;
      insurance: FaqCategory;
      aftercare: FaqCategory;
    };
    stillHaveQuestions: string;
    contactUs: string;
  };
  appointment: {
    badge: string;
    title: string;
    titleHighlight: string;
    description: string;
    form: AppointmentForm;
    serviceLabels: Record<string, string>;
    timeSlots: Record<string, string>;
    trustIndicators: {
      secure: string;
      response: string;
      rated: string;
    };
  };
  footer: {
    followUs: string;
    quickLinks: string;
    services: string;
    contact: string;
    servicesLinks: Record<string, string>;
    copyright: string;
    madeWith: string;
    privacyPolicy: string;
    termsOfService: string;
  };
  about: AboutSection;
  contact: ContactSection;
  servicesPage: ServicesPageSection;
  faqPage: FaqPageSection;
  metadata: MetadataSection;
}

// Sub-types
interface HeroSlide {
  badge: string;
  title: string;
  highlight: string;
  description: string;
}

interface ServiceItem {
  title: string;
  shortDesc: string;
  fullDesc: string;
  features: string[];
}

interface JourneyStep {
  title: string;
  shortTitle: string;
  desc: string;
  duration: string;
}

interface PainPoint {
  title: string;
  conditions: string[];
}

interface FaqCategory {
  label: string;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

interface AppointmentForm {
  name: string;
  namePlaceholder: string;
  email: string;
  emailPlaceholder: string;
  phone: string;
  phonePlaceholder: string;
  service: string;
  serviceDefault: string;
  date: string;
  timeSlot: string;
  timeSlotDefault: string;
  message: string;
  messagePlaceholder: string;
  submit: string;
  submitting: string;
  successTitle: string;
  successMessage: string;
  errorMessage: string;
}

interface AboutSection {
  badge: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription1: string;
  heroDescription2: string;
  experienceBadge: string;
  credentials: Record<string, string>;
  clinicalFocus: {
    title: string;
    items: Record<string, string>;
  };
  standards: {
    title: string;
    private: { title: string; desc: string };
    digital: { title: string; desc: string };
    clinical: { title: string; desc: string };
  };
  ethos: Record<string, string>;
}

interface ContactSection {
  badge: string;
  title: string;
  titleHighlight: string;
  description: string;
  info: Record<string, string>;
  form: Record<string, string>;
  serviceOptions: Record<string, string>;
  trustIndicators: Record<string, string>;
}

interface ServicesPageSection {
  badge: string;
  title: string;
  titleHighlight: string;
  description: string;
  bookConsultation: string;
}

interface FaqPageSection {
  badge: string;
  title: string;
  titleHighlight: string;
  description: string;
  searchPlaceholder: string;
  noResults: string;
}

interface MetadataSection {
  home: { title: string; description: string };
  about: { title: string; description: string };
  services: { title: string; description: string };
  contact: { title: string; description: string };
  faq: { title: string; description: string };
}

// Helper type for useTranslations
export type TranslationKey = keyof Messages;
