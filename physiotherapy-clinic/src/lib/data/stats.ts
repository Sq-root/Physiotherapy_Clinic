export type Stat = {
    value: string;
    label: string;
};

export const stats: Stat[] = [
    { value: '1,200+', label: 'Lives Restored' },
    { value: '25+', label: 'Expert Therapists' },
    { value: '12+', label: 'Years Experience' },
    { value: '98%', label: 'Recovery Rate' },
];

export type JourneyStep = {
    step: number;
    title: string;
    description: string;
};

export const journeySteps: JourneyStep[] = [
    {
        step: 1,
        title: 'Assessment',
        description:
            'Detailed breakdown of injury history, biomechanics, and personal goals.',
    },
    {
        step: 2,
        title: 'Hands-On Therapy',
        description:
            'Targeted manual techniques to reduce pain, improve mobility, and restore function.',
    },
    {
        step: 3,
        title: 'Progress Tracking',
        description:
            'Data-driven milestones to ensure healing on schedule.',
    },
    {
        step: 4,
        title: 'Recovery & Bloom',
        description:
            'Return to full activity with a resilient body and knowledge to stay healthy.',
    },
];
