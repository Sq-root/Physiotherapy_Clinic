export type Service = {
    id: string;
    slug: string;
    title: string;
    description: string;
    icon: string;
    color: string;
};

export const services: Service[] = [
    {
        id: 'orthopedic',
        slug: 'orthopedic-care',
        title: 'Orthopedic Care',
        description:
            'Specialized treatment for musculoskeletal disorders including joint pain, fractures, and post-surgical rehabilitation.',
        icon: '🦴',
        color: '#19e65e',
    },
    {
        id: 'sports',
        slug: 'sports-rehab',
        title: 'Sports Rehab',
        description:
            'Expert rehabilitation for athletes — from injury diagnosis to full return-to-sport performance recovery.',
        icon: '🏃',
        color: '#19e65e',
    },
    {
        id: 'neurological',
        slug: 'neurological',
        title: 'Neurological',
        description:
            'Compassionate care for neurological conditions including stroke, Parkinson\'s, and multiple sclerosis.',
        icon: '🧠',
        color: '#19e65e',
    },
    {
        id: 'pediatric',
        slug: 'pediatric',
        title: 'Pediatric',
        description:
            'Gentle, play-based therapy tailored for children\'s developmental needs, movement disorders, and injury recovery.',
        icon: '👶',
        color: '#19e65e',
    },
];
