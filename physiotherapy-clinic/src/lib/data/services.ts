export type ServiceCategory =
  | 'pain'
  | 'techniques'
  | 'injury-prevention'
  | 'womens-health'
  | 'geriatric'
  | 'specialized';

export type Service = {
  id: string;
  slug: string;
  title: string;
  shortTitle?: string;
  description: string;
  icon: string;
  color: string;
  image?: string;
  category: ServiceCategory;
  features?: string[];
  /** Translation key used in serviceDetail namespace */
  translationKey: string;
};

// ─── 22 Services from Clinical Document ─────────────────────────────────────

export const services: Service[] = [

  // ── CATEGORY 1: Pain Management & Conditions ──────────────────────────────
  {
    id: 'neck-pain',
    slug: 'neck-pain',
    title: 'Neck Pain & Cervical Spondylosis',
    shortTitle: 'Neck Pain',
    description: 'Neck pain is rarely just neck pain. It is the physical manifestation of sustained load, unvarying posture, and a system operating beyond its mechanical capacity.',
    icon: 'Bone',
    color: '#66A182',
    image: '/services/neck_cervical_pain.webp',
    category: 'pain',
    translationKey: 'neckPain',
    features: ['Cervical Assessment', 'Manual Therapy', 'Dry Needling', 'Ergonomic Strategy'],
  },
  {
    id: 'disc-prolapse-sciatica',
    slug: 'disc-prolapse-sciatica',
    title: 'Disc Prolapse & Sciatica',
    shortTitle: 'Disc & Sciatica',
    description: 'A disc does not fail overnight. A prolapse is the eventual structural failure of a tissue that has been quietly exceeding its tolerance for months, or years.',
    icon: 'Zap',
    color: '#A4C639',
    image: '/services/disc_prolapse_sciatica.webp',
    category: 'pain',
    translationKey: 'discProlapse',
    features: ['Neural Offloading', 'Mechanical Correction', 'Progressive Loading', 'Core Control'],
  },
  {
    id: 'shoulder-impingement',
    slug: 'shoulder-impingement',
    title: 'Shoulder Impingement & Rotator Cuff',
    shortTitle: 'Shoulder',
    description: 'The shoulder sacrifices stability for mobility. When its intricate balance of muscular control and joint mechanics fails, the result is profound limitation and pain.',
    icon: 'PersonStanding',
    color: '#66A182',
    image: '/services/shoulder_impingement.webp',
    category: 'pain',
    translationKey: 'shoulderImpingement',
    features: ['Scapular Mechanics', 'Rotator Cuff Rebuild', 'Joint Mobilization', 'Overhead Loading'],
  },
  {
    id: 'tennis-golfer-elbow',
    slug: 'tennis-golfer-elbow',
    title: 'Tennis & Golfer\'s Elbow',
    shortTitle: 'Elbow Pain',
    description: 'Elbow pain is rarely just an elbow problem. It is a load transfer issue — the forearm forced to do work the shoulder and wrist should be sharing.',
    icon: 'Target',
    color: '#A4C639',
    image: '/services/tennis_golfer_elbow.webp',
    category: 'pain',
    translationKey: 'tennisElbow',
    features: ['Kinetic Chain Assessment', 'Tendon Loading', 'Neural Mobility', 'Grip Rehabilitation'],
  },
  {
    id: 'knee-pain-acl',
    slug: 'knee-pain-acl',
    title: 'Knee Pain, ACL & MCL Injury',
    shortTitle: 'Knee & ACL',
    description: 'The knee is a hinge caught between two highly mobile joints. When it hurts, it is rarely the culprit — it is the victim of poor mechanics above or below it.',
    icon: 'MoveVertical',
    color: '#66A182',
    image: '/services/knee_pain_acl.webp',
    category: 'pain',
    translationKey: 'kneePain',
    features: ['Integrated Evaluation', 'Neuromuscular Training', 'Single-Leg Stability', 'Return to Sport'],
  },
  {
    id: 'plantar-fasciitis',
    slug: 'plantar-fasciitis',
    title: 'Plantar Fasciitis & Achilles Tendinopathy',
    shortTitle: 'Foot & Heel Pain',
    description: 'Foot and heel pain fundamentally alters how you interact with the ground. It is the result of a breakdown in how your body absorbs shock with every step.',
    icon: 'Footprints',
    color: '#002D04',
    image: '/services/plantar_fasciitis.webp',
    category: 'pain',
    translationKey: 'plantarFasciitis',
    features: ['Gait Analysis', 'Tendon Rehabilitation', 'Load Management', 'Footwear Guidance'],
  },
  {
    id: 'osteoarthritis',
    slug: 'osteoarthritis',
    title: 'Osteoarthritis',
    shortTitle: 'Osteoarthritis',
    description: 'Wear and tear is a normal part of aging. Debilitating joint pain is not. A diagnosis of osteoarthritis is not a mandate to stop moving — it is a signal to start moving better.',
    icon: 'RefreshCw',
    color: '#66A182',
    image: '/services/osteoarthritis.webp',
    category: 'pain',
    translationKey: 'osteoarthritis',
    features: ['Progressive Loading', 'Joint Mechanics', 'Pain Education', 'Strength Building'],
  },
  {
    id: 'meniscus-injury',
    slug: 'meniscus-injury',
    title: 'Meniscus Injury',
    shortTitle: 'Meniscus',
    description: 'A meniscus tear does not automatically equal surgery. The knee\'s shock absorber can often be rehabilitated by strengthening the engine that drives it.',
    icon: 'CircleDot',
    color: '#A4C639',
    image: '/services/meniscus_injury.webp',
    category: 'pain',
    translationKey: 'meniscusInjury',
    features: ['Clinical Staging', 'Swelling Control', 'Rotational Control', 'Conservative Management'],
  },
  {
    id: 'post-surgical-rehab',
    slug: 'post-surgical-rehab',
    title: 'Post-Surgical Rehabilitation',
    shortTitle: 'Post-Surgery',
    description: 'The surgeon replaces the joint; we rebuild the function. Your new hardware is only as good as the muscular system that supports and drives it.',
    icon: 'Stethoscope',
    color: '#002D04',
    image: '/services/post_surgical_bento_hd.webp',
    category: 'pain',
    translationKey: 'postSurgicalRehab',
    features: ['Early Phase Control', 'Gait Retraining', 'Muscular Reactivation', 'Implant Longevity'],
  },

  // ── CATEGORY 2: Techniques & Therapy ──────────────────────────────────────
  {
    id: 'dry-needling',
    slug: 'dry-needling',
    title: 'Dry Needling',
    shortTitle: 'Dry Needling',
    description: 'Sometimes, hands-on therapy isn\'t enough to break a pain cycle. Dry needling resets the nervous system and releases chronic muscle guarding from the inside out.',
    icon: 'Syringe',
    color: '#66A182',
    image: '/services/dry_needling.webp',
    category: 'techniques',
    translationKey: 'dryNeedling',
    features: ['Trigger Point Release', 'Neurophysiological Reset', 'Pain Modulation', 'Active Rehab Integration'],
  },
  {
    id: 'kinesiology-taping',
    slug: 'kinesiology-taping',
    title: 'Kinesiology Taping',
    shortTitle: 'K-Taping',
    description: 'Support that moves with you. Kinesiology taping provides mechanical offloading and sensory feedback without restricting your freedom of movement.',
    icon: 'BandageIcon',
    color: '#A4C639',
    image: '/services/kinesiology_taping.webp',
    category: 'techniques',
    translationKey: 'kinesiologyTaping',
    features: ['Swelling Reduction', 'Proprioceptive Feedback', 'Pain Perception Reduction', 'Movement Support'],
  },
  {
    id: 'neurodynamics',
    slug: 'neurodynamics',
    title: 'Neurodynamics',
    shortTitle: 'Neurodynamics',
    description: 'Nerves are designed to slide and glide. When they get trapped or restricted, the result is radiating pain that traditional stretching will only make worse.',
    icon: 'Brain',
    color: '#66A182',
    image: '/services/neurodynamics.webp',
    category: 'techniques',
    translationKey: 'neurodynamics',
    features: ['Nerve Glides', 'Neural Mobilization', 'Sensitivity Reduction', 'Protective Guarding Relief'],
  },

  // ── CATEGORY 3: Injury Prevention & Return to Sports ──────────────────────
  {
    id: 'injury-prevention',
    slug: 'injury-prevention',
    title: 'Injury Prevention',
    shortTitle: 'Prevention',
    description: 'The most effective time to treat an injury is before the tissue fails. We identify the silent compensations quietly concentrating load on your vulnerable structures.',
    icon: 'ShieldCheck',
    color: '#A4C639',
    image: '/services/injury_prevention.webp',
    category: 'injury-prevention',
    translationKey: 'injuryPrevention',
    features: ['Movement Screening', 'Risk Profiling', 'Corrective Programming', 'Load Management'],
  },
  {
    id: 'return-to-play',
    slug: 'return-to-play',
    title: 'Return to Play & Performance',
    shortTitle: 'Return to Play',
    description: 'Clinical recovery is not athletic readiness. Being pain-free on a treatment table does not mean your body is prepared for the chaotic demands of competition.',
    icon: 'Trophy',
    color: '#002D04',
    image: '/services/return_to_play.webp',
    category: 'injury-prevention',
    translationKey: 'returnToPlay',
    features: ['Objective Testing', 'Fatigue Testing', 'Sport-Specific Loading', 'Psychological Readiness'],
  },

  // ── CATEGORY 4: Women's Health ─────────────────────────────────────────────
  {
    id: 'womens-health',
    slug: 'womens-health',
    title: 'Women\'s Health Physiotherapy',
    shortTitle: 'Women\'s Health',
    description: 'The female body handles distinct biomechanical and hormonal demands. Specialized care to address pelvic floor dysfunction with dignity and clinical precision.',
    icon: 'HeartPulse',
    color: '#66A182',
    image: '/services/womens_health.webp',
    category: 'womens-health',
    translationKey: 'womensHealth',
    features: ['Pelvic Floor Assessment', 'Core Stabilization', 'Scar Management', 'Return to Sport'],
  },
  {
    id: 'prenatal-postnatal',
    slug: 'prenatal-postnatal',
    title: 'Pre & Postnatal Physiotherapy',
    shortTitle: 'Pre/Postnatal',
    description: 'Supporting your body through its most profound physical transformation. We provide the structural strategies required to carry comfortably and recover strongly.',
    icon: 'Baby',
    color: '#A4C639',
    image: '/services/prenatal_postnatal.webp',
    category: 'womens-health',
    translationKey: 'prenatalPostnatal',
    features: ['Trimester Calibration', 'Diastasis Recti', 'Postnatal Rehab', 'Scar Mobilization'],
  },

  // ── CATEGORY 5: Geriatric Rehabilitation ──────────────────────────────────
  {
    id: 'geriatric-mobility',
    slug: 'geriatric-mobility',
    title: 'Geriatric Mobility & Fall Prevention',
    shortTitle: 'Geriatric Care',
    description: 'Aging is inevitable. Decline is not. We reject the idea that getting older means accepting a smaller, more restricted life.',
    icon: 'Users',
    color: '#66A182',
    image: '/services/senior_care_hero_hd.webp',
    category: 'geriatric',
    translationKey: 'geriatricMobility',
    features: ['Balance Training', 'Reactive Balance', 'Strength Building', 'Fall Risk Assessment'],
  },

  // ── CATEGORY 6: Specialized Therapy ───────────────────────────────────────
  {
    id: 'cancer-rehabilitation',
    slug: 'cancer-rehabilitation',
    title: 'Cancer Rehabilitation',
    shortTitle: 'Cancer Rehab',
    description: 'Cancer treatment is extraordinary in what it achieves. The rehabilitation that follows should be extraordinary in what it restores.',
    icon: 'Sparkles',
    color: '#002D04',
    image: '/services/cancer_rehabilitation.webp',
    category: 'specialized',
    translationKey: 'cancerRehabilitation',
    features: ['Capacity Assessment', 'Lymphoedema Management', 'Fatigue Recovery', 'Neural Work'],
  },
  {
    id: 'ergonomics',
    slug: 'ergonomics',
    title: 'Ergonomics & Workplace Health',
    shortTitle: 'Ergonomics',
    description: 'Your workstation should support your output, not break your body down. We optimize how you interact with your environment to eliminate workplace-driven pain.',
    icon: 'Monitor',
    color: '#66A182',
    image: '/services/ergonomics_workplace.webp',
    category: 'specialized',
    translationKey: 'ergonomics',
    features: ['Workstation Optimization', 'Postural Retraining', 'Micro-Recovery Integration', 'Physical Rehab'],
  },
  {
    id: 'postural-education',
    slug: 'postural-education',
    title: 'Postural Education',
    shortTitle: 'Posture',
    description: 'Posture is not just about how you sit; it is about how you move and load your body through life. We teach you to correct the root causes of physical inefficiency.',
    icon: 'ScanLine',
    color: '#A4C639',
    image: '/services/chronic_back_pain_hero_hd.webp',
    category: 'specialized',
    translationKey: 'posturalEducation',
    features: ['Dynamic Assessment', 'Mobility Work', 'Posterior Chain Strengthening', 'Habit Retraining'],
  },
  {
    id: 'osteoporosis',
    slug: 'osteoporosis',
    title: 'Osteoporosis & Bone Health',
    shortTitle: 'Bone Health',
    description: 'Building resilient bones requires intelligent, targeted loading. We provide the deliberate physical programming needed to build skeletal resilience and safely reduce fracture risk.',
    icon: 'Dumbbell',
    color: '#66A182',
    image: '/services/active_aging_deep_dive_hd.webp',
    category: 'specialized',
    translationKey: 'osteoporosis',
    features: ['Progressive Resistance', 'Impact Training', 'Fall Prevention', 'Movement Safety'],
  },
  {
    id: 'post-fracture-rehab',
    slug: 'post-fracture-rehab',
    title: 'Post-Fracture Rehabilitation',
    shortTitle: 'Post-Fracture',
    description: 'Healing the broken bone is only the first step. True rehabilitation means restoring total body strength, mechanics, and confidence to ensure it never happens again.',
    icon: 'Wrench',
    color: '#A4C639',
    image: '/services/sports_recovery_bento_hd.webp',
    category: 'specialized',
    translationKey: 'postFractureRehab',
    features: ['Load Protection', 'Mobility Restoration', 'Muscle Rebuilding', 'Balance Deficit Correction'],
  },
];

// ─── Helpers ────────────────────────────────────────────────────────────────

export const getServiceBySlug = (slug: string) => services.find(s => s.slug === slug);
export const getAllServiceSlugs = () => services.map(s => s.slug);
export const getServicesByCategory = (category: ServiceCategory) =>
  services.filter(s => s.category === category);

// ─── Category Metadata ──────────────────────────────────────────────────────

export const serviceCategories: {
  id: ServiceCategory;
  label: string;
  icon: string;
  color: string;
  description: string;
}[] = [
  {
    id: 'pain',
    label: 'Pain Management',
    icon: 'Stethoscope',
    color: 'bg-red-50 border-red-100',
    description: 'Conditions, injuries, and chronic pain — root cause resolution.',
  },
  {
    id: 'techniques',
    label: 'Techniques & Therapy',
    icon: 'Microscope',
    color: 'bg-blue-50 border-blue-100',
    description: 'Precision clinical tools integrated into active rehabilitation.',
  },
  {
    id: 'injury-prevention',
    label: 'Injury Prevention',
    icon: 'ShieldCheck',
    color: 'bg-green-50 border-green-100',
    description: 'Screen, correct, and return to peak performance safely.',
  },
  {
    id: 'womens-health',
    label: "Women's Health",
    icon: 'HeartPulse',
    color: 'bg-pink-50 border-pink-100',
    description: 'Pelvic health, pregnancy, and postnatal recovery.',
  },
  {
    id: 'geriatric',
    label: 'Geriatric Care',
    icon: 'Users',
    color: 'bg-amber-50 border-amber-100',
    description: 'Strength, balance, and independence at every age.',
  },
  {
    id: 'specialized',
    label: 'Specialized Therapy',
    icon: 'Star',
    color: 'bg-purple-50 border-purple-100',
    description: 'Cross-disciplinary care for unique clinical needs.',
  },
];
