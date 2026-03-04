import { cn } from '@/lib/utils';
import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  asChild?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className,
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 cursor-pointer disabled:opacity-50 disabled:pointer-events-none';

  const variants: Record<ButtonVariant, string> = {
    primary:
      'bg-[#19e65e] text-white hover:bg-[#14cd53] hover:-translate-y-px focus-visible:ring-[#19e65e] shadow-sm',
    secondary:
      'bg-transparent text-[#19e65e] border-2 border-[#19e65e] hover:bg-[#19e65e] hover:text-white focus-visible:ring-[#19e65e]',
    ghost:
      'bg-transparent text-[#1a1a2e] hover:bg-gray-100 focus-visible:ring-gray-400',
  };

  const sizes: Record<ButtonSize, string> = {
    sm: 'text-sm px-4 py-2',
    md: 'text-[15px] px-7 py-3',
    lg: 'text-base px-8 py-4',
  };

  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}
