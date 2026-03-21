export type Testimonial = {
    name: string;
    role: string;
    content: string;
    rating: number;
    initials: string;
};

export const testimonials: Testimonial[] = [
    {
        name: 'Bhavesh Patel',
        role: 'Patient',
        content: 'I had been struggling with lower back pain for almost a year due to long hours at a desk. What I appreciated most was the detailed assessment and how clearly everything was explained. After 6 sessions, my pain reduced significantly and my mobility improved. The communication throughout the process made me feel confident that I was on the right recovery path.',
        rating: 5,
        initials: 'BP',
    },
    {
        name: 'Alex',
        role: 'DEEM',
        content: 'Very professional and structured approach to physiotherapy. I started treatment for persistent shoulder pain and noticed steady improvement over 7 sessions. Each session had a clear focus and progress was tracked, which made the recovery feel measurable. The guidance and attention to detail were excellent.',
        rating: 5,
        initials: 'AL',
    },
    {
        name: 'Ashish Gajjar',
        role: 'Patient',
        content: 'Frequent travel and long flights had aggravated my neck and upper back pain. The treatment plan was personalised and very well communicated. Within 5 sessions, there was a noticeable improvement in both pain and posture. I also appreciated the practical exercises I could continue while travelling',
        rating: 5,
        initials: 'AS',
    },
    {
        name: 'James O\'Brien',
        role: 'Retired Teacher',
        content: 'My father was struggling with balance and afraid of falling. After a few sessions, he’s much steadier and more confident walking around. The care and guidance were excellent.',
        rating: 5,
        initials: 'JO',
    },
];
