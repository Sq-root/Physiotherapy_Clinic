'use client';

import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface AccordionItemProps {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

export function AccordionItem({ question, answer, defaultOpen = false }: AccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-[#e5e7eb] last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left font-medium text-[#1a1a2e] hover:text-[#19e65e] transition-colors duration-200"
        aria-expanded={open}
      >
        <span className="pr-4 text-[17px]">{question}</span>
        <ChevronDown
          className={cn(
            'shrink-0 text-[#19e65e] transition-transform duration-300 w-5 h-5',
            open && 'rotate-180'
          )}
        />
      </button>
      <div
        className={cn(
          'overflow-hidden transition-all duration-300 ease-in-out',
          open ? 'max-h-96 pb-5' : 'max-h-0'
        )}
      >
        <p className="text-[#6b7280] leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

interface AccordionProps {
  items: { question: string; answer: string }[];
}

export function Accordion({ items }: AccordionProps) {
  return (
    <div className="divide-y-0">
      {items.map((item, i) => (
        <AccordionItem key={i} question={item.question} answer={item.answer} />
      ))}
    </div>
  );
}
