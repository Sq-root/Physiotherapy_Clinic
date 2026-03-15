'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, Mail, MapPin, Clock, Send, CheckCircle, 
  AlertCircle, Loader2, MessageSquare, User, 
  Building2, ArrowRight, Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import type { Easing } from 'framer-motion';
import { siteConfig } from '@/config/site';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as Easing } }
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Form data interface
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

// Contact info data
const contactInfo = [
  { 
    icon: Phone, 
    title: 'Call Us',
    primary: siteConfig.contact.phone, 
    secondary: 'Mon–Fri, 8am–6pm',
    action: `tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, '')}`,
    color: 'bg-seafoam'
  },
  { 
    icon: Mail, 
    title: 'Email Us',
    primary: siteConfig.contact.email, 
    secondary: 'We reply within 24 hours',
    action: `mailto:${siteConfig.contact.email}`,
    color: 'bg-lime'
  },
  { 
    icon: MapPin, 
    title: 'Visit Us',
    primary: siteConfig.contact.address.line1, 
    secondary: `${siteConfig.contact.address.city}, ${siteConfig.contact.address.zip}`,
    action: 'https://maps.google.com',
    color: 'bg-forest'
  },
  { 
    icon: Clock, 
    title: 'Working Hours',
    primary: siteConfig.contact.timing, 
    secondary: 'Sun: Closed',
    action: null,
    color: 'bg-amber'
  },
];

// Services list
const services = [
  'Orthopedic Care',
  'Sports Rehabilitation',
  'Neurological Therapy',
  'Manual Therapy',
  'Senior Care',
  'Post-Surgery Recovery',
  'General Inquiry'
];

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errors, setErrors] = useState<Partial<FormData>>({});

  // Validation function
  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.firstName.trim() || formData.firstName.trim().length < 2) {
      newErrors.firstName = 'First name is required (min 2 characters)';
    }
    
    if (!formData.lastName.trim() || formData.lastName.trim().length < 2) {
      newErrors.lastName = 'Last name is required (min 2 characters)';
    }
    
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (formData.phone && !/^[\d\s\-+()]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!formData.service) {
      newErrors.service = 'Please select a service';
    }
    
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setStatus('error');
      return;
    }
    
    setStatus('loading');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // For now, just show success (API integration can be added later)
    setStatus('success');
    
    // Reset form after success
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      service: '',
      message: '',
    });
  };

  const resetForm = () => {
    setStatus('idle');
    setErrors({});
  };

  return (
    <main className="overflow-x-clip">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden bg-section">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-section opacity-50 z-0" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-lime rounded-full blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-seafoam rounded-full blur-[80px] opacity-20 translate-y-1/3 -translate-x-1/4" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center max-w-2xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.div 
              variants={fadeInUp}
              className="inline-flex items-center gap-2 mb-4"
            >
              <div className="w-8 h-8 rounded-full bg-seafoam/20 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-seafoam" />
              </div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-seafoam">Get In Touch</span>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-forest mb-4 tracking-tight"
            >
              Let&apos;s Start Your <span className="text-lime font-serif italic">Recovery</span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-base md:text-lg text-forest/70 font-medium max-w-xl mx-auto leading-relaxed"
            >
              Have questions? Ready to book an appointment? Reach out and our team will be in touch within 24 hours.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Cards Section */}
      <section className="py-12 md:py-16 bg-white relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {contactInfo.map((item) => (
              <motion.div
                key={item.title}
                variants={fadeInUp}
                className="group"
              >
                {item.action ? (
                  <a 
                    href={item.action}
                    target={item.action.startsWith('http') ? '_blank' : undefined}
                    rel={item.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="block h-full"
                  >
                    <ContactCard item={item} />
                  </a>
                ) : (
                  <ContactCard item={item} />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main Contact Form Section */}
      <section className="py-16 md:py-24 bg-section relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `radial-gradient(#002D04 1px, transparent 1px)`,
              backgroundSize: '24px 24px'
            }}
          />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            
            {/* Left Column - Info & Map */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block py-1.5 px-4 rounded-full bg-white/50 border border-forest/10 backdrop-blur-sm text-forest font-bold uppercase tracking-widest text-[10px] mb-4 shadow-sm">
                Contact Information
              </span>
              
              <h2 className="text-3xl md:text-4xl font-bold text-forest mb-4 tracking-tight">
                We&apos;re Here to <span className="text-seafoam">Help</span>
              </h2>
              
              <p className="text-forest/70 text-base md:text-lg leading-relaxed mb-8 max-w-md">
                Visit our clinic or reach out through any of our channels. Our dedicated team is committed to your recovery journey.
              </p>

              {/* Quick Contact List */}
              <div className="space-y-4 mb-8">
                {contactInfo.slice(0, 3).map(({ icon: Icon, title, primary, secondary }) => (
                  <div key={title} className="flex items-start gap-4 group">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                      <Icon className="w-5 h-5 text-seafoam" />
                    </div>
                    <div>
                      <p className="font-semibold text-forest text-sm">{title}</p>
                      <p className="text-forest/80 text-sm">{primary}</p>
                      <p className="text-forest/50 text-xs mt-0.5">{secondary}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Embedded Map */}
              <div className="rounded-2xl overflow-hidden border-4 border-white shadow-xl">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1!2d-73.98!3d40.75!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ1JzAwLjAiTiA3M8KwNTgnNDguMCJX!5e0!3m2!1sen!2sus!4v1600000000000!5m2!1sen!2sus"
                  width="100%"
                  height="280"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Clinic Location"
                  className="grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </motion.div>

            {/* Right Column - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl border border-forest/5">
                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <SuccessState onReset={resetForm} />
                  ) : (
                    <ContactForm
                      formData={formData}
                      setFormData={setFormData}
                      errors={errors}
                      status={status}
                      onSubmit={handleSubmit}
                    />
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <ContactFAQ />
    </main>
  );
}

// Contact Card Component
function ContactCard({ item }: { item: typeof contactInfo[0] }) {
  const Icon = item.icon;
  return (
    <div className={`h-full p-5 sm:p-6 rounded-2xl bg-white border-2 border-forest/5 hover:border-seafoam/30 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}>
      <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center mb-4`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <h3 className="font-bold text-forest text-sm mb-1">{item.title}</h3>
      <div className="flex items-center gap-2">
        {item.title === 'Call Us' && (
          <img 
            src="/logo/ae_flag.svg" 
            alt="UAE Flag" 
            className="w-6 h-auto rounded shadow-sm border border-forest/10" 
          />
        )}
        <p className="text-forest text-sm font-medium">{item.primary}</p>
      </div>
      <p className="text-forest/50 text-xs mt-1">{item.secondary}</p>
    </div>
  );
}

// Success State Component
function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="text-center py-12"
    >
      <div className="w-20 h-20 bg-seafoam/10 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-10 h-10 text-seafoam" />
      </div>
      <h3 className="text-2xl font-bold text-forest mb-3">
        Message Sent!
      </h3>
      <p className="text-forest/60 text-base mb-8 max-w-sm mx-auto">
        Thank you for reaching out. Our team will get back to you within 24 hours.
      </p>
      <button
        onClick={onReset}
        className="inline-flex items-center gap-2 text-seafoam font-semibold hover:underline"
      >
        Send Another Message
        <ArrowRight className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

// Contact Form Component
function ContactForm({
  formData,
  setFormData,
  errors,
  status,
  onSubmit,
}: {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  errors: Partial<FormData>;
  status: FormStatus;
  onSubmit: (e: React.FormEvent) => void;
}) {
  const inputClasses = (hasError: boolean) =>
    `w-full px-4 py-3.5 bg-section/30 border-2 rounded-xl text-sm text-forest placeholder:text-forest/40 focus:outline-none focus:bg-white transition-all duration-200 ${
      hasError 
        ? 'border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100' 
        : 'border-transparent focus:border-seafoam/50 focus:ring-2 focus:ring-seafoam/10'
    }`;

  return (
    <motion.form
      key="form"
      onSubmit={onSubmit}
      className="space-y-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-seafoam/10 rounded-xl flex items-center justify-center">
          <MessageSquare className="w-5 h-5 text-seafoam" />
        </div>
        <div>
          <h3 className="font-bold text-forest text-xl">Send Us a Message</h3>
          <p className="text-forest/50 text-xs">We&apos;ll respond within 24 hours</p>
        </div>
      </div>

      {/* Error Banner */}
      <AnimatePresence>
        {status === 'error' && Object.keys(errors).length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-red-50 border border-red-200 rounded-xl p-4"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-red-700 font-medium text-sm">Please fix the following errors:</p>
                <ul className="mt-1 space-y-0.5">
                  {Object.values(errors).map((error, i) => (
                    <li key={i} className="text-red-600 text-xs">{error}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Name Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-forest mb-2">
            <span className="flex items-center gap-2">
              <User className="w-4 h-4 text-forest/40" />
              First Name *
            </span>
          </label>
          <input
            type="text"
            placeholder="John"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            disabled={status === 'loading'}
            className={inputClasses(!!errors.firstName)}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-forest mb-2">
            <span className="flex items-center gap-2">
              <User className="w-4 h-4 text-forest/40" />
              Last Name *
            </span>
          </label>
          <input
            type="text"
            placeholder="Doe"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            disabled={status === 'loading'}
            className={inputClasses(!!errors.lastName)}
          />
        </div>
      </div>

      {/* Email & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-forest mb-2">
            <span className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-forest/40" />
              Email *
            </span>
          </label>
          <input
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            disabled={status === 'loading'}
            className={inputClasses(!!errors.email)}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-forest mb-2">
            <span className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-forest/40" />
              Phone (Optional)
            </span>
          </label>
          <input
            type="tel"
            placeholder="+1 (555) 123-4567"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            disabled={status === 'loading'}
            className={inputClasses(!!errors.phone)}
          />
        </div>
      </div>

      {/* Service Selection */}
      <div>
        <label className="block text-sm font-semibold text-forest mb-2">
          <span className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-forest/40" />
            Service of Interest *
          </span>
        </label>
        <select
          value={formData.service}
          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
          disabled={status === 'loading'}
          className={inputClasses(!!errors.service)}
        >
          <option value="">Select a service...</option>
          {services.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-semibold text-forest mb-2">
          <span className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-forest/40" />
            Message *
          </span>
        </label>
        <textarea
          rows={4}
          placeholder="Tell us about your condition, questions, or how we can help..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          disabled={status === 'loading'}
          className={`${inputClasses(!!errors.message)} resize-none`}
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={status === 'loading'}
        className="w-full !bg-forest hover:!bg-seafoam"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-5 h-5 mr-2" />
            Send Message
          </>
        )}
      </Button>

      <p className="text-xs text-center text-forest/40 pt-2">
        By submitting this form, you agree to our Privacy Policy and Terms of Service.
      </p>
    </motion.form>
  );
}

// Contact FAQ Section
function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'How do I schedule my first appointment?',
      answer: 'You can schedule your first appointment by calling us, filling out the contact form above, or using our online booking system. Our team will confirm your appointment within 24 hours.'
    },
    {
      question: 'What should I bring to my first visit?',
      answer: 'Please bring your ID, insurance card, any relevant medical records or imaging studies, a list of current medications, and comfortable clothing that allows easy movement for your assessment.'
    },
    {
      question: 'Do you accept insurance?',
      answer: 'Yes, we accept most major insurance plans. We recommend contacting your insurance provider or our office to verify your coverage before your appointment.'
    },
    {
      question: 'What are your COVID-19 safety protocols?',
      answer: 'We maintain strict hygiene protocols including regular sanitization, air filtration systems, and optional mask requirements. Our facilities are thoroughly cleaned between each patient visit.'
    },
    {
      question: 'Can I cancel or reschedule my appointment?',
      answer: 'Yes, we understand schedules change. Please provide at least 24 hours notice for cancellations or rescheduling to avoid any cancellation fees.'
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block py-1.5 px-4 rounded-full bg-section border border-forest/10 text-forest font-bold uppercase tracking-widest text-[10px] mb-4">
            Common Questions
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-forest tracking-tight">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <motion.div 
          className="space-y-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="border border-forest/10 rounded-2xl overflow-hidden bg-section/30 hover:bg-section/50 transition-colors"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-semibold text-forest text-sm sm:text-base pr-4">
                  {faq.question}
                </span>
                <div className={`w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                  <ArrowRight className={`w-4 h-4 text-forest transition-transform duration-300 ${openIndex === index ? 'rotate-90' : ''}`} />
                </div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-forest/70 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
