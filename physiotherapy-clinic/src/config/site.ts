export const siteConfig = {
    name: 'Dr. Isha Shah',
    tagline: 'Begin Your Inner Recovery Journey',
    description:
        'Embark on a journey of self-discovery and physical healing with our expert therapists in a serene, nature-inspired environment.',
    url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',

    nav: [
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'FAQ', href: '/faq' },
        { label: 'Contact', href: '/contact' },
        { label: 'About Us', href: '/about' },
    ],

    doctorName: 'Dr. Isha Shah',

    social: {
        livesRestored: '3000+',
        therapists: '25+',
        yearsExperience: '7+',
        recoveryRate: '98%',
        bodyAreas: '15+',
        conditions: '50+',
        servicesCount: '15+',
    },

    contact: {
        email: 'drishashah95@gmail.com',
        phone: '+971 50 412 0369',
        whatsapp: '+971 50 412 0369',
        address: {
            line1: '',
            line2: '',
            city: 'Dubai, United Arab Emirates',
            zip: ''
        },
        timing: 'Mon-Sat: 9:00 AM - 7:00 PM',
    },

    socialLinks: {
        facebook: 'https://www.facebook.com/share/1Bs4aqivhy/?mibextid=wwXIfr',
        instagram: 'https://www.instagram.com/drishashah_uae?igsh=MTRxanlzYTNycGppcw%3D%3D&utm_source=qr',
        twitter: 'https://twitter.com',
        linkedin: 'https://www.linkedin.com/in/dr-isha-shah-442395237?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
        youtube: 'https://youtube.com',
    }
} as const;
