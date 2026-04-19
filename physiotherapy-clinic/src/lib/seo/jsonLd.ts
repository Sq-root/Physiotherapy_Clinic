import { siteConfig } from '@/config/site';
import type { FaqCategory } from '@/lib/data/faq-help';

const base = siteConfig.url;

// ─── Shared sub-objects ──────────────────────────────────────────────────────

const providerRef = {
  '@type': 'MedicalBusiness',
  name: siteConfig.name,
  url: base,
};

const addressObj = {
  '@type': 'PostalAddress',
  streetAddress: siteConfig.contact.address.line1,
  addressLocality: 'Dubai',
  addressRegion: 'Dubai',
  addressCountry: 'AE',
};

const openingHours = [
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '09:00',
    closes: '19:00',
  },
];

const areaServed = [
  { '@type': 'City', name: 'Dubai', containedInPlace: { '@type': 'Country', name: 'United Arab Emirates' } },
  { '@type': 'AdministrativeArea', name: 'Online — Worldwide' },
];

// ─── Schema builders ─────────────────────────────────────────────────────────

export function buildMedicalBusiness() {
  return {
    '@context': 'https://schema.org',
    '@type': ['MedicalBusiness', 'Physiotherapist'],
    '@id': `${base}/#organization`,
    name: siteConfig.name,
    url: base,
    description:
      'DHA-licensed physiotherapy clinic in Dubai offering in-clinic care, home visits, and online consultations worldwide. Led by Dr. Isha Shah — 7+ years, 3000+ patients, 98% recovery rate.',
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: addressObj,
    openingHoursSpecification: openingHours,
    areaServed,
    image: `${base}/logo/Dr_isha_Logo.png`,
    logo: `${base}/logo/Dr_isha_Logo.png`,
    founder: { '@type': 'Person', name: siteConfig.doctorName, '@id': `${base}/#person` },
    employee: { '@type': 'Person', name: siteConfig.doctorName, '@id': `${base}/#person` },
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      name: 'Dubai Health Authority (DHA) License',
      credentialCategory: 'Medical License',
      recognizedBy: { '@type': 'Organization', name: 'Dubai Health Authority' },
    },
    sameAs: [
      siteConfig.socialLinks.facebook,
      siteConfig.socialLinks.instagram,
      siteConfig.socialLinks.linkedin,
    ],
    priceRange: '$$',
    currenciesAccepted: 'AED, USD',
    paymentAccepted: 'Cash, Credit Card, Bank Transfer',
  };
}

export function buildPerson() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${base}/#person`,
    name: siteConfig.doctorName,
    jobTitle: 'Physiotherapist',
    description:
      'DHA-licensed physiotherapist specialising in spine rehabilitation, complex pain, post-surgical recovery, and postnatal restoration.',
    worksFor: { '@type': 'MedicalBusiness', name: siteConfig.name, '@id': `${base}/#organization` },
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'DHA License',
        credentialCategory: 'Medical License',
        recognizedBy: { '@type': 'Organization', name: 'Dubai Health Authority' },
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'MSCOTP',
        credentialCategory: 'Postgraduate Degree',
        recognizedBy: { '@type': 'Organization', name: 'India' },
      },
    ],
    knowsAbout: [
      'Spine Rehabilitation',
      'Post-Surgical Recovery',
      'Postnatal Physiotherapy',
      'Sports Injury Rehabilitation',
      'Chronic Pain Management',
      'Tele-Rehabilitation',
    ],
    sameAs: [
      siteConfig.socialLinks.instagram,
      siteConfig.socialLinks.linkedin,
      siteConfig.socialLinks.facebook,
    ],
    image: `${base}/logo/Dr_isha_Logo.png`,
    url: `${base}/en/about`,
  };
}

export function buildWebSite() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${base}/#website`,
    url: base,
    name: siteConfig.name,
    description: siteConfig.description,
    publisher: { '@id': `${base}/#organization` },
    inLanguage: ['en', 'ar'],
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${base}/en/services/{search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function buildFAQPage(categories: FaqCategory[]) {
  const allItems = categories.flatMap((c) =>
    c.subcategories.flatMap((s) => s.items),
  );
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

export function buildService({
  name,
  description,
  slug,
  locale,
}: {
  name: string;
  description: string;
  slug: string;
  locale: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalTherapy',
    name,
    description,
    url: `${base}/${locale}/services/${slug}`,
    provider: { '@id': `${base}/#organization` },
    areaServed,
    availableChannel: [
      { '@type': 'ServiceChannel', serviceType: 'In-Clinic', serviceLocation: { '@type': 'Place', name: 'Dr. Isha Shah Clinic, Dubai' } },
      { '@type': 'ServiceChannel', serviceType: 'Home Visit', areaServed: { '@type': 'City', name: 'Dubai' } },
      { '@type': 'ServiceChannel', serviceType: 'Online / Tele-Rehabilitation', availableLanguage: ['English', 'Arabic'] },
    ],
  };
}

export function buildBreadcrumbList(
  items: { name: string; href: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${base}${item.href}`,
    })),
  };
}
