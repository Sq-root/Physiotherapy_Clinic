export type Testimonial = {
    name: string;
    role: string;
    content: string;
    rating: number;
    initials: string;
};

export const testimonials: Testimonial[] = [
    {
        name: 'Sarah Mitchell',
        role: 'Marathon Runner',
        content:
            'After my knee injury, I thought my running days were over. The team at Vitality Path not only got me back on track but helped me run my best marathon yet. Truly life-changing care.',
        rating: 5,
        initials: 'SM',
    },
    {
        name: 'David Chen',
        role: 'Office Professional',
        content:
            'Chronic back pain had been my reality for years. Within 8 sessions, I was pain-free and had the tools to keep it that way. The holistic approach here is unlike anything I\'ve experienced.',
        rating: 5,
        initials: 'DC',
    },
    {
        name: 'Priya Sharma',
        role: 'Mother of Two',
        content:
            'Post-pregnancy recovery with Vitality Path was an incredible experience. The therapists were compassionate, knowledgeable, and truly invested in my recovery. Highly recommend their approach.',
        rating: 5,
        initials: 'PS',
    },
    {
        name: 'James O\'Brien',
        role: 'Retired Teacher',
        content:
            'The stroke rehabilitation program changed my life. The progress tracking keeps me motivated and the entire team celebrates every milestone with you. I\'ve regained 90% of my function.',
        rating: 5,
        initials: 'JO',
    },
];
