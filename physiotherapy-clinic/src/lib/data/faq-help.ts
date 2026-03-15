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
        title: 'General Information & Suitability',
        items: [
          {
            id: 'tr-gen-1',
            question: 'What is Tele-Rehabilitation and who can benefit from it?',
            answer: 'Tele-rehabilitation is the delivery of expert physiotherapy services through secure video calls. It is ideal for people recovering from injuries, managing chronic pain, needing post-surgery rehab, or dealing with conditions like back pain, arthritis, or sports injuries from the comfort of their home.'
          },
          {
            id: 'tr-gen-2',
            question: 'Is remote physiotherapy as effective as in-person clinic visits?',
            answer: 'Yes! Research shows that telehealth can be just as effective as in-person care for many musculoskeletal and neurological conditions, as we focus heavily on accurate assessment, education, and guided corrective exercises.'
          },
          {
            id: 'tr-gen-3',
            question: 'Is tele-rehabilitation approved by health authorities in the UAE?',
            answer: 'Yes, tele-rehabilitation is fully recognized and regulated under the UAE’s healthcare laws and is permitted by health authorities such as the Dubai Health Authority (DHA), Department of Health (DOH) – Abu Dhabi, and Ministry of Health and Prevention (MOHAP).'
          }
        ]
      },
      {
        title: 'Session Details & Preparation',
        items: [
          {
            id: 'tr-prep-1',
            question: 'What happens during a tele-rehab session and how long does it last?',
            answer: 'Each session lasts between 30-45 minutes. Your physiotherapist will assess your condition through questions, guided movements, and observation. You’ll receive a personalized exercise program with clear instructions and follow-ups as needed.'
          },
          {
            id: 'tr-prep-2',
            question: 'What equipment do I need and how do I prepare for my online session?',
            answer: 'All you need is a smartphone, tablet, or computer with a camera and an internet connection. A quiet, open space where you can move around freely is helpful. We will send you a secure video link to join the session.'
          },
          {
            id: 'tr-prep-3',
            question: 'Is my session private and do I need a doctor’s referral?',
            answer: 'No referral is necessary; you can book directly with us. Rest assured, your session is completely private. We use encrypted, secure platforms that comply with privacy regulations. If technical difficulties arise (like dropped video/audio), we seamlessly reconnect or switch to a phone call.'
          }
        ]
      }
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
        title: 'About Home Physiotherapy',
        items: [
          {
            id: 'hp-abt-1',
            question: 'What is home physiotherapy and how does it compare to clinic treatment?',
            answer: 'It is physiotherapy delivered at your home by a licensed professional, offering the same clinical standards as a clinic—without the travel or waiting rooms. It is often more effective because treatment is personalized, uninterrupted, and performed in your real environment, improving functional recovery and compliance.'
          },
          {
            id: 'hp-abt-2',
            question: 'Who is home physiotherapy ideal for and what conditions do you treat?',
            answer: 'It is perfect for busy professionals, elderly patients, post-surgery recovery, chronic pain sufferers, and those with neurological conditions. We treat back & neck pain, knee/shoulder/ankle injuries, post-operative rehab, sports injuries, stroke & neurological rehab, and postural issues.'
          }
        ]
      },
      {
        title: 'Safety & Professionalism',
        items: [
          {
            id: 'hp-safe-1',
            question: 'Are the visiting physiotherapists licensed and is the treatment safe?',
            answer: 'Yes, our physiotherapists are fully licensed, clinically experienced, and outcome-driven. Home treatment is highly safe as it reduces travel risk, infection exposure, and unnecessary physical strain—especially during pain flare-ups.'
          },
          {
            id: 'hp-safe-2',
            question: 'Do you provide specialized post-surgery rehabilitation at home?',
            answer: 'Absolutely. Early, structured rehabilitation at home often leads to faster and safer recovery compared to delayed clinic visits. We ensure you get the right care at the most critical time.'
          }
        ]
      },
      {
        title: 'Session Logistics',
        items: [
          {
            id: 'hp-log-1',
            question: 'What equipment do you bring and what should I prepare?',
            answer: 'We bring all essential portable, clinical-grade equipment and adapt exercises to your unique home setup for real-life rehab. All you need to do is wear comfortable clothing and clear a small open space.'
          },
          {
            id: 'hp-log-2',
            question: 'How long is each home visit and how many sessions will I need?',
            answer: 'Each session lasts 45–60 minutes, ensuring full focus with no rushing. The total number of sessions depends on your condition, severity, and goals. After the first assessment, you’ll receive a clear treatment plan with no guesswork.'
          },
          {
            id: 'hp-log-3',
            question: 'What geographic areas do you cover for home visits?',
            answer: 'We currently provide home visits across Dubai. Please contact us directly to confirm availability in your specific location.'
          }
        ]
      }
    ],
    cta: {
      heading: 'Prefer the clinical setting?',
      description: 'Visit our high-end facility for specialized equipment access.',
      buttonText: 'Book Clinic Visit',
      variant: 'outline',
    },
  },
  {
    id: 'payment-insurance',
    label: 'Payment & Insurance',
    title: 'Payment & Insurance',
    subtitle: 'Transparent pricing and coverage information.',
    subcategories: [
      {
        title: 'Billing & Coverage Information',
        items: [
          {
            id: 'pi-1',
            question: 'How much does a session cost and what are the payment modes?',
            answer: 'Please contact us directly for current rates and session packages. For your convenience, we seamlessly accept both Bank Transfers and Online transfers.'
          },
          {
            id: 'pi-2',
            question: 'Is my treatment covered by insurance?',
            answer: 'Many private insurance plans, workers\' compensation boards, and some public health systems now cover both tele-rehabilitation and home physiotherapy sessions. We strongly recommend contacting your insurer to confirm your specific coverage details.'
          },
          {
            id: 'pi-3',
            question: 'Do you provide receipts for insurance reimbursement?',
            answer: 'Yes, we issue official, DHA-compliant e-invoices for every session. These invoices contain all the necessary clinical details and codes required for you to submit to your insurer for reimbursement.'
          }
        ]
      }
    ],
    cta: {
      heading: 'Have billing questions?',
      description: 'Our team is happy to assist with your insurance queries.',
      buttonText: 'Contact Billing',
      variant: 'outline',
    },
  }
];
