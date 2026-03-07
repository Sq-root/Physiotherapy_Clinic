export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface FaqSubcategory {
  title: string;
  items: FaqItem[];
}

export interface FaqCategory {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  subcategories: FaqSubcategory[];
  cta: {
    heading: string;
    description: string;
    buttonText: string;
    variant: 'primary' | 'outline';
  };
}

export const faqCategories: FaqCategory[] = [
  {
    id: 'tele-rehab',
    label: 'Tele-Rehabilitation',
    title: 'Tele-Rehabilitation',
    subtitle: 'Remote clinical excellence from the comfort of your home.',
    subcategories: [
      {
        title: 'About the Service',
        items: [
          {
            id: 'q1',
            question: 'What is Tele-Rehabilitation?',
            answer:
              'Tele-rehabilitation is the delivery of rehabilitation services via information and communication technologies. It allows you to receive expert physiotherapy guidance through secure video consultations, ensuring continuity of care regardless of your location.',
          },
          {
            id: 'q2',
            question: 'Is it as effective as in-person sessions?',
            answer:
              'For many musculoskeletal conditions, research shows that tele-rehabilitation outcomes are comparable to face-to-face care. We focus heavily on education, guided corrective exercise, and self-management strategies which are key to long-term recovery.',
          },
        ],
      },
      {
        title: 'Appointments & Technical',
        items: [
          {
            id: 'q3',
            question: 'How do I prepare for my first session?',
            answer:
              'Ensure you have a stable internet connection, a quiet space with enough room to move, and wear comfortable athletic clothing. You\'ll receive a secure link 15 minutes before your scheduled appointment.',
          },
          {
            id: 'q4',
            question: 'What platforms do you use for video calls?',
            answer:
              'We use a HIPAA-compliant, end-to-end encrypted medical platform. No downloads are usually required as it runs directly in your web browser on mobile or desktop.',
          },
        ],
      },
    ],
    cta: {
      heading: 'Ready to start remote recovery?',
      description: 'Book your initial assessment in under 2 minutes.',
      buttonText: 'Book Now',
      variant: 'primary',
    },
  },
  {
    id: 'home-physio',
    label: 'Home Physiotherapy',
    title: 'Home Physiotherapy',
    subtitle: 'Premium concierge physical therapy brought to your doorstep.',
    subcategories: [
      {
        title: 'Effectiveness & Safety',
        items: [
          {
            id: 'h1',
            question: 'What area does your clinic cover?',
            answer:
              'We currently cover the entire metropolitan area and selected suburbs. Please enter your zip code during booking to confirm availability in your specific neighborhood.',
          },
          {
            id: 'h2',
            question: 'How do you ensure safety during home visits?',
            answer:
              'All our therapists follow strict sanitization protocols. We bring clinical-grade portable equipment which is disinfected before and after every session. Our staff is fully vaccinated and wears appropriate PPE.',
          },
        ],
      },
    ],
    cta: {
      heading: 'Prefer the clinical setting?',
      description: 'Visit our high-end facility for specialized equipment access.',
      buttonText: 'Book Clinic Visit',
      variant: 'outline',
    },
  },
];
