'use client';

import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

export function AccordionItem({ question, answer, isOpen, onClick }: AccordionItemProps) {
  return (
    <div className="border-b border-forest/5 last:border-0 group">
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between py-6 text-left transition-all duration-300 group-hover:pl-2"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-4">
          <div className={cn(
            "h-1.5 w-1.5 rounded-full bg-lime transition-all duration-500",
            isOpen ? "opacity-100 scale-100" : "opacity-0 scale-0"
          )} />
          <span className={cn(
            "text-[17px] font-bold tracking-tight transition-colors duration-300",
            isOpen ? "text-forest" : "text-forest/70 group-hover:text-forest"
          )}>
            {question}
          </span>
        </div>
        
        <div className="relative size-6 flex items-center justify-center">
          <motion.span 
            className="absolute h-0.5 w-4 bg-lime rounded-full"
            animate={{ rotate: isOpen ? 0 : 90 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />
          <span className="absolute h-0.5 w-4 bg-lime rounded-full" />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-6 pl-5.5">
              <p className="text-forest/60 leading-relaxed max-w-2xl text-[15px] font-medium">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface AccordionProps {
  items: { question: string; answer: string }[];
}

export function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-3xl mx-auto border-t border-forest/5">
      {items.map((item, i) => (
        <AccordionItem 
          key={i} 
          question={item.question} 
          answer={item.answer} 
          isOpen={openIndex === i}
          onClick={() => setOpenIndex(openIndex === i ? null : i)}
        />
      ))}
    </div>
  );
}
