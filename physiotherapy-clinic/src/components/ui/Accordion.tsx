'use client';

import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  index?: number;
}

export function AccordionItem({ question, answer, isOpen, onClick, index }: AccordionItemProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: (index || 0) * 0.05 }}
      className={cn(
        "rounded-2xl border transition-all duration-300 overflow-hidden",
        isOpen 
          ? "bg-lime border-transparent shadow-lg shadow-lime/10" 
          : "bg-white/60 border-forest/5 hover:border-forest/10 hover:bg-white"
      )}
    >
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between p-5 md:p-6 text-left transition-all duration-300"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-4">
          {index !== undefined && (
            <span className={cn(
              "text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-300",
              isOpen ? "bg-forest text-white" : "bg-forest/5 text-forest/40"
            )}>
              {index + 1}
            </span>
          )}
          <span className={cn(
            "text-[15px] md:text-[17px] font-bold tracking-tight transition-colors duration-300 leading-tight",
            isOpen ? "text-forest" : "text-forest/80"
          )}>
            {question}
          </span>
        </div>
        
        <motion.div 
          className={cn(
            "size-8 rounded-full flex items-center justify-center transition-colors duration-300",
            isOpen ? "bg-forest/10" : "bg-forest/5"
          )}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <ChevronDown className={cn(
            "size-4 transition-colors duration-300",
            isOpen ? "text-forest" : "text-forest/40"
          )} />
        </motion.div>
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
            <div className="px-5 md:px-6 pb-6 pt-0">
              <div className="h-[1px] w-full bg-forest/5 mb-4" />
              <p className="text-forest/80 leading-relaxed max-w-2xl text-[14px] md:text-[15px] font-medium">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

interface AccordionProps {
  items: { question: string; answer: string }[];
  className?: string;
  defaultOpenIndex?: number | null;
}

export function Accordion({ items, className, defaultOpenIndex = 0 }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  return (
    <div className={cn("max-w-3xl mx-auto space-y-3", className)}>
      {items.map((item, i) => (
        <AccordionItem 
          key={i} 
          index={i}
          question={item.question} 
          answer={item.answer} 
          isOpen={openIndex === i}
          onClick={() => setOpenIndex(openIndex === i ? null : i)}
        />
      ))}
    </div>
  );
}
