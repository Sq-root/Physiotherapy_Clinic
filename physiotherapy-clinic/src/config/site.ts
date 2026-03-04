export const siteConfig = {
    name: 'Vitality Path',
    tagline: 'Begin Your Inner Recovery Journey',
    description:
        'Embark on a journey of self-discovery and physical healing with our expert therapists in a serene, nature-inspired environment.',
    url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',

    nav: [
        { label: 'Home', href: '/' },
        { label: 'Services', href: '#services' },
        { label: 'About', href: '#journey' },
        { label: 'Contact', href: '#contact' },
    ],

    social: {
        livesRestored: '1,200+',
        therapists: '25+',
        yearsExperience: '12+',
        recoveryRate: '98%',
    },
} as const;
