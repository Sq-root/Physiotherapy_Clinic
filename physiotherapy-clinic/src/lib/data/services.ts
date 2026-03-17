export type Service = {
    id: string;
    slug: string;
    title: string;
    shortTitle?: string;
    description: string;
    longDescription?: string;
    icon: string;
    materialIcon?: string;
    color: string;
    image?: string;
    category: 'primary' | 'therapeutic' | 'specialized';
    features?: string[];
};

export const services: Service[] = [
    // Primary Services (Bento Grid)
    {
        id: 'manual-therapy',
        slug: 'manual-therapy',
        title: 'Manual Therapy',
        shortTitle: 'Manual',
        description: 'Hands-on mobilization for immediate pain relief and joint function.',
        longDescription: 'Our certified manual therapists use evidence-based techniques including joint mobilization, soft tissue manipulation, and myofascial release to restore optimal movement and reduce pain.',
        icon: '🤲',
        materialIcon: 'back_hand',
        color: '#A4C639',
        image: '/services/manual_therapy_v2.webp',
        category: 'primary',
        features: ['Joint Mobilization', 'Soft Tissue Work', 'Trigger Point Release', 'Myofascial Techniques'],
    },
    {
        id: 'sports-recovery',
        slug: 'sports-recovery',
        title: 'Sports Recovery',
        shortTitle: 'Sports',
        description: 'Biomechanics analysis to return to your peak performance safely.',
        longDescription: 'From weekend warriors to professional athletes, our sports rehabilitation program combines cutting-edge diagnostics with personalized recovery protocols.',
        icon: '⚡',
        materialIcon: 'exercise',
        color: '#66A182',
        image: '/services/sports_recovery_bento_hd.webp',
        category: 'primary',
        features: ['Performance Analysis', 'Injury Prevention', 'Return-to-Sport', 'Athletic Conditioning'],
    },
    {
        id: 'pain-management',
        slug: 'pain-management',
        title: 'Pain Mgmt',
        shortTitle: 'Pain',
        description: 'Comprehensive pain management strategies for chronic conditions.',
        longDescription: 'Our multidisciplinary approach addresses the root causes of chronic pain through targeted interventions and holistic wellness strategies.',
        icon: '💆',
        materialIcon: 'self_improvement',
        color: '#002D04',
        image: '/services/pain_management_bento_hd.webp',
        category: 'primary',
        features: ['Chronic Pain Relief', 'Nerve Blocks', 'Holistic Approach', 'Long-term Solutions'],
    },
    {
        id: 'post-surgical',
        slug: 'post-surgical',
        title: 'Post-Surgical',
        shortTitle: 'Post-Op',
        description: 'Specialized rehabilitation following orthopedic surgeries.',
        longDescription: 'Our post-surgical protocols are designed in collaboration with leading orthopedic surgeons to ensure optimal recovery timelines and outcomes.',
        icon: '🏥',
        materialIcon: 'medical_services',
        color: '#A4C639',
        image: '/services/post_surgical_bento_hd.webp',
        category: 'primary',
        features: ['Joint Replacement', 'Spine Surgery', 'ACL Reconstruction', 'Rotator Cuff Repair'],
    },
    // Therapeutic Deep Dive Services
    {
        id: 'active-aging',
        slug: 'active-aging',
        title: 'Active Aging',
        description: 'Maintaining independence and strength through tailored low-impact movement strategies.',
        longDescription: 'Our senior wellness program focuses on maintaining mobility, preventing falls, and enhancing quality of life through gentle, effective exercises.',
        icon: '🧓',
        materialIcon: 'elderly',
        color: '#66A182',
        image: '/services/active_aging_deep_dive_hd.webp',
        category: 'therapeutic',
        features: ['Balance Training', 'Fall Prevention', 'Flexibility', 'Strength Maintenance'],
    },
    {
        id: 'hydrotherapy',
        slug: 'hydrotherapy',
        title: 'Hydrotherapy',
        description: 'Low-impact aquatic resistance training to rebuild muscle without joint stress.',
        longDescription: 'Our state-of-the-art aquatic therapy pool provides the ideal environment for rehabilitation, using water buoyancy to reduce joint loading.',
        icon: '🌊',
        materialIcon: 'pool',
        color: '#66A182',
        image: '/services/hydrotherapy_deep_dive_hd.webp',
        category: 'therapeutic',
        features: ['Aquatic Exercise', 'Joint Relief', 'Resistance Training', 'Warm Water Therapy'],
    },
    {
        id: 'corrective-exercise',
        slug: 'corrective-exercise',
        title: 'Corrective Exercise',
        description: 'Fixing imbalances and posture issues before they become injuries.',
        longDescription: 'Our corrective exercise specialists identify and address movement dysfunctions through targeted exercises and postural retraining.',
        icon: '🎯',
        materialIcon: 'sports_gymnastics',
        color: '#A4C639',
        image: '/services/corrective_exercise_deep_dive_hd.webp',
        category: 'therapeutic',
        features: ['Posture Correction', 'Movement Screening', 'Core Stability', 'Flexibility Training'],
    },
    // Specialized Services
    {
        id: 'neurological',
        slug: 'neurological',
        title: 'Neurological',
        description: 'Compassionate care for neurological conditions including stroke and Parkinson\'s.',
        longDescription: 'Our neurological rehabilitation team specializes in helping patients regain function and independence following strokes, brain injuries, and progressive conditions.',
        icon: '🧠',
        materialIcon: 'psychology',
        color: '#002D04',
        category: 'specialized',
        features: ['Stroke Recovery', 'Parkinson\'s Care', 'MS Management', 'Balance Retraining'],
    },
    {
        id: 'pediatric',
        slug: 'pediatric',
        title: 'Pediatric',
        description: 'Gentle, play-based therapy tailored for children\'s developmental needs.',
        longDescription: 'Our pediatric specialists create fun, engaging therapy sessions that help children reach their developmental milestones.',
        icon: '👶',
        materialIcon: 'child_care',
        color: '#A4C639',
        category: 'specialized',
        features: ['Developmental Delays', 'Motor Skills', 'Sensory Integration', 'Sports Injuries'],
    },
];

export const testimonialQuotes = [
    {
        serviceId: 'active-aging',
        quote: "Their gentle yet go-growth can make all difference now.",
        author: 'MARGARET, 72',
    },
    {
        serviceId: 'hydrotherapy',
        quote: "The aquatic sessions helped me recover without joint pain.",
        author: 'DAVID, 58',
    },
    {
        serviceId: 'corrective-exercise',
        quote: "My chronic back pain vanished after just six sessions.",
        author: 'SARAH, 34',
    },
];

export const getServicesByCategory = (category: Service['category']) => 
    services.filter(s => s.category === category);

export const getPrimaryServices = () => getServicesByCategory('primary');
export const getTherapeuticServices = () => getServicesByCategory('therapeutic');
export const getSpecializedServices = () => getServicesByCategory('specialized');
