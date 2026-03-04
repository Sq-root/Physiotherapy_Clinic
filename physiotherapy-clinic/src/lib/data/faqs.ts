export type FAQ = {
    question: string;
    answer: string;
};

export const faqs: FAQ[] = [
    {
        question: 'Do I need a referral to book an appointment?',
        answer:
            'No referral is necessary. You can book directly through our website or by calling our clinic. We welcome self-referrals and work with most health insurance providers.',
    },
    {
        question: 'What should I wear to my session?',
        answer:
            'Wear comfortable, loose-fitting clothing that allows easy access to the area being treated. For lower body issues, shorts work best. For upper body, a tank top or loose t-shirt is ideal.',
    },
    {
        question: 'How long does a session last?',
        answer:
            'Initial assessment sessions are typically 60 minutes. Follow-up treatment sessions are usually 45–60 minutes depending on your condition and treatment plan.',
    },
    {
        question: 'Is the treatment painful?',
        answer:
            'Physiotherapy should not be significantly painful. You may experience mild discomfort during treatment as we work on tight or injured tissues, but we always work within your comfort level.',
    },
    {
        question: 'Is this the same as Chiropractic care?',
        answer:
            'While there are overlaps, physiotherapy and chiropractic care differ in approach. Physiotherapy focuses on rehabilitation, movement re-education, and exercise therapy in addition to manual techniques.',
    },
];
