'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import type { Easing } from 'framer-motion';
import { Hand, ArrowRight, Activity, Brain, ArrowDown, ArrowLeft, Quote, Plus, Minus } from 'lucide-react';

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

// Bento Grid Hero Section - Exact Reference Design
function ServicesBentoHero() {
  return (
    <section className="relative pt-40 pb-20 overflow-hidden min-h-screen flex flex-col justify-center bg-section">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-section opacity-50 z-0" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-lime rounded-full blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white rounded-full blur-[80px] opacity-40 translate-y-1/3 -translate-x-1/4" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 w-full">
        {/* Header */}
        <motion.div 
          className="text-center max-w-2xl mx-auto mb-12"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.span 
            variants={fadeInUp}
            className="inline-block py-1.5 px-4 rounded-full bg-white/50 border border-forest/10 backdrop-blur-sm text-forest font-bold uppercase tracking-widest text-[10px] mb-4 shadow-sm"
          >
            Explore Your Recovery
          </motion.span>
          <motion.h1 
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-forest mb-4 tracking-tight"
          >
            Active <span className="text-lime font-serif italic">Life</span> Design
          </motion.h1>
          <motion.p 
            variants={fadeInUp}
            className="text-base md:text-lg text-forest/80 font-medium max-w-xl mx-auto leading-relaxed"
          >
            Choose a pathway tailored to your body&apos;s needs. From elite sports performance to post-operative care, we design movement that heals.
          </motion.p>
        </motion.div>
        
        {/* Bento Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 auto-rows-[220px]"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          {/* Manual Therapy - Large Left Card (spans 2 rows) */}
          <motion.div 
            variants={fadeInUp}
            className="lg:col-span-6 row-span-2 group relative overflow-hidden rounded-[2.5rem] border-[3px] border-white shadow-xl cursor-pointer hover:shadow-[6px_6px_0px_0px_#A4C639] transition-all duration-300"
          >
            <Image
              src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80&auto=format&fit=crop"
              alt="Manual Therapy"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
            <div className="absolute bottom-0 left-0 p-8 w-full z-10">
              <div className="bg-lime text-forest p-2.5 rounded-full w-fit mb-3">
                <Hand className="w-6 h-6" />
              </div>
              <h3 className="text-2xl md:text-3xl text-white font-bold mb-2">Manual Therapy</h3>
              <p className="text-white/90 text-sm md:text-base font-medium max-w-sm">Hands-on mobilization for immediate pain relief and joint function.</p>
              <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                <span className="text-lime font-bold uppercase tracking-wider text-xs">Explore Treatment</span>
                <ArrowRight className="w-4 h-4 text-lime" />
              </div>
            </div>
          </motion.div>
          
          {/* Sports Recovery - White Card */}
          <motion.div 
            variants={fadeInUp}
            className="lg:col-span-3 row-span-2 group relative overflow-hidden rounded-[2rem] border-[3px] border-white shadow-lg cursor-pointer hover:shadow-[5px_5px_0px_0px_#002D04] transition-all duration-300 bg-white"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-10 group-hover:opacity-[0.05]"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80')` }}
            />
            <div className="relative h-full flex flex-col justify-between p-6">
              <div>
                <div className="w-12 h-12 rounded-full bg-forest flex items-center justify-center mb-4 group-hover:bg-lime group-hover:text-forest transition-colors text-white">
                  <Activity className="w-6 h-6" />
                </div>
                <h3 className="text-2xl text-forest font-bold mb-3">Sports Recovery</h3>
                <p className="text-forest/70 font-medium leading-relaxed text-sm">Biomechanics analysis to return to your peak performance safely.</p>
              </div>
              <div className="mt-4 pt-4 border-t border-forest/10">
                <p className="text-[10px] font-bold text-forest uppercase tracking-widest mb-2">Success Story</p>
                <div className="flex items-center gap-3">
                  <Image 
                    src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=100&q=80&auto=format&fit=crop"
                    alt="Athlete"
                    width={32}
                    height={32}
                    className="rounded-full object-cover border border-lime"
                  />
                  <p className="text-xs italic text-forest/80">&quot;Back to marathons in 3 months.&quot;</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Pain Mgmt - Lime Card */}
          <motion.div 
            variants={fadeInUp}
            className="lg:col-span-3 row-span-1 group relative overflow-hidden rounded-[2rem] bg-lime border-[3px] border-white shadow-lg cursor-pointer hover:shadow-[5px_5px_0px_0px_#002D04] transition-all duration-300 flex flex-col justify-center items-center text-center p-5"
          >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
            <Brain className="w-10 h-10 text-forest mb-2 group-hover:scale-110 transition-transform relative z-10" />
            <h3 className="text-xl text-forest font-bold relative z-10">Pain Mgmt</h3>
            <ArrowDown className="w-4 h-4 text-forest mt-1 opacity-0 group-hover:opacity-100 transition-opacity relative z-10" />
          </motion.div>
          
          {/* Post-Surgical - Dark Card with Image */}
          <motion.div 
            variants={fadeInUp}
            className="lg:col-span-3 row-span-1 group relative overflow-hidden rounded-[2rem] bg-forest border-[3px] border-white shadow-lg cursor-pointer hover:shadow-[5px_5px_0px_0px_#A4C639] transition-all duration-300"
          >
            <Image
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80&auto=format&fit=crop"
              alt="Post Op"
              fill
              className="object-cover opacity-60 group-hover:opacity-40 transition-opacity"
              sizes="(max-width: 768px) 100vw, 25vw"
            />
            <div className="absolute inset-0 flex flex-col justify-end p-5 z-10">
              <h3 className="text-lg text-white font-bold mb-1">Post-Surgical</h3>
              <p className="text-lime text-xs font-bold uppercase tracking-wider">Rehab</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Therapeutic Deep Dive Section
function TherapeuticDeepDive() {
  const serviceData = [
    {
      image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&q=80',
      category: 'Mobility',
      title: 'Active Aging',
      description: 'Maintaining independence and strength through tailored low-impact movement strategies.',
      quote: 'I can play with my grandkids again without knee pain.',
      author: 'Margaret, 72',
    },
    {
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80',
      category: 'Recovery',
      title: 'Hydrotherapy',
      description: 'Low-impact aquatic resistance training to rebuild muscle without joint stress.',
      quote: 'The water resistance helped me recover twice as fast.',
      author: 'David, 45',
    },
    {
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80',
      category: 'Prevention',
      title: 'Corrective Exercise',
      description: 'Fixing imbalances and posture issues before they become injuries.',
      quote: 'My chronic back pain vanished after fixing my posture.',
      author: 'Sarah, 29',
    },
  ];
  
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Top Curve */}
      <div className="absolute top-0 left-0 w-full h-24 bg-section" style={{ borderRadius: '0 0 160px 160px' }} />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-10 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-forest mb-4">
              Therapeutic <br/>
              <span className="text-lime italic font-serif">Deep Dive</span>
            </h2>
            <p className="text-forest/70 text-base font-medium max-w-xl">
              Explore our specialized treatments designed to integrate seamlessly into your lifestyle.
            </p>
          </div>
          <div className="flex gap-2">
            <button className="w-12 h-12 rounded-full border-2 border-forest flex items-center justify-center hover:bg-lime hover:border-lime hover:text-forest transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button className="w-12 h-12 rounded-full bg-forest text-white border-2 border-forest flex items-center justify-center hover:bg-lime hover:border-lime hover:text-forest transition-colors shadow-[4px_4px_0px_0px_#A4C639]">
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Service Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceData.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-section/20 rounded-[2rem] p-3 group hover:bg-lime/10 transition-colors duration-500"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] mb-5 shadow-sm group-hover:shadow-[5px_5px_0px_0px_#002D04] transition-all duration-300 border-2 border-white">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-forest shadow-sm">
                  {service.category}
                </div>
              </div>
              
              {/* Content */}
              <div className="px-3 pb-3">
                <h3 className="text-2xl font-bold text-forest mb-2 group-hover:text-[#8BA630] transition-colors">{service.title}</h3>
                <p className="text-forest/70 font-medium leading-relaxed mb-5 text-sm">{service.description}</p>
                
                {/* Testimonial Quote Card */}
                <div className="bg-white p-4 rounded-3xl shadow-sm border border-forest/5 relative">
                  <div className="absolute -top-3 -right-3 bg-lime text-forest rounded-full p-1.5 shadow-sm">
                    <Quote className="w-4 h-4" />
                  </div>
                  <div className="flex items-start gap-3">
                    <Image
                      src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=100&q=80&auto=format&fit=crop"
                      alt="Client"
                      width={40}
                      height={40}
                      className="rounded-full object-cover border-2 border-section"
                    />
                    <div>
                      <p className="text-xs italic text-forest font-serif leading-tight">&quot;{service.quote}&quot;</p>
                      <p className="text-[10px] font-bold text-forest/60 mt-1.5 uppercase tracking-wide">— {service.author}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// FAQ Section
function ServiceFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(1);
  
  const faqs = [
    {
      question: 'Which therapy is right for acute injuries?',
      answer: 'For acute injuries (occurring within the last 48-72 hours), we typically recommend starting with a diagnostic consultation followed by gentle Manual Therapy to manage inflammation and pain before progressing to active rehabilitation.',
    },
    {
      question: 'Can I combine treatments?',
      answer: 'Absolutely. Our "Vitality Path" is holistic. Most successful recovery plans involve a mix of Manual Therapy for immediate relief and Corrective Exercise for long-term prevention.',
    },
    {
      question: 'Do you offer post-op packages?',
      answer: 'Yes. Our Post-Surgical Rehab program is comprehensive. We bundle initial assessments, wound care checks, and a 12-week progressive strength track to get you back to normal life.',
    },
    {
      question: 'Is sports recovery only for professionals?',
      answer: 'Not at all. Whether you\'re a weekend warrior, a daily jogger, or an elite athlete, our Sports Recovery protocols are designed to help any active body recover faster and prevent injury.',
    },
  ];
  
  return (
    <section className="py-24 relative" id="faq">
      {/* Dark Background with rounded top */}
      <div className="absolute inset-x-0 bottom-0 h-full bg-forest rounded-t-[5rem] z-0" />
      
      <div className="mx-auto max-w-5xl px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-lime font-bold uppercase tracking-[0.3em] text-sm">Clarity</span>
          <h2 className="text-5xl font-bold text-white mt-4 mb-6">Common Service Questions</h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">Understanding your treatment plan is part of the healing process.</p>
        </div>
        
        {/* FAQ Items */}
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className={cn(
                "p-8 rounded-[3rem] cursor-pointer transition-all duration-300",
                openIndex === index
                  ? "bg-lime border-2 border-lime shadow-lg shadow-lime/20"
                  : "bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white hover:border-white group"
              )}
            >
              <div className="flex justify-between items-center">
                <h3 className={cn(
                  "text-xl font-bold transition-colors",
                  openIndex === index ? "text-forest" : "text-white group-hover:text-forest"
                )}>
                  {faq.question}
                </h3>
                <span className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full transition-colors",
                  openIndex === index ? "bg-forest text-white" : "bg-lime text-forest"
                )}>
                  {openIndex === index ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </span>
              </div>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="mt-4 text-forest font-medium leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
        
        {/* CTA Button */}
        <div className="mt-16 text-center">
          <Link 
            href="#contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-lime text-forest font-bold uppercase tracking-widest rounded-full hover:bg-white transition-all shadow-lg hover:scale-105"
          >
            Still have questions?
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// CTA Section
function ServicesCTA() {
  return (
    <section className="py-20 bg-section relative overflow-hidden">
      {/* Background Blur */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white opacity-40 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-6xl md:text-8xl font-bold text-forest mb-8 tracking-tighter">
            Let&apos;s Get <span className="text-transparent bg-clip-text bg-gradient-to-r from-forest to-lime">Moving</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="#appointment"
              className="h-16 px-12 bg-forest text-white font-bold uppercase tracking-wider text-lg min-w-[200px] hover:bg-lime hover:text-forest transition-all shadow-[6px_6px_0px_0px_#A4C639] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] rounded-full flex items-center justify-center"
            >
              Book Initial Consult
            </Link>
            <p className="text-forest font-bold text-sm uppercase tracking-widest mt-4 sm:mt-0 opacity-60">
              or call (555) 123-4567
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Main Services Page
export default function ServicesPage() {
  return (
    <main className="overflow-x-clip">
      <ServicesBentoHero />
      <TherapeuticDeepDive />
      <ServiceFAQ />
      <ServicesCTA />
    </main>
  );
}
