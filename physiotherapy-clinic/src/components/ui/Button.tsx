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
    'inline-flex items-center justify-center font-bold uppercase tracking-widest rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 cursor-pointer disabled:opacity-50 disabled:pointer-events-none';

  const variants: Record<ButtonVariant, string> = {
    primary:
      'bg-seafoam text-white hover:bg-white hover:text-forest hover:-translate-y-1 shadow-xl',
    secondary:
      'bg-black/40 backdrop-blur-md text-white border border-white/40 hover:bg-white/20 hover:border-white/60 hover:-translate-y-1 shadow-lg',
    ghost:
      'bg-transparent text-white hover:bg-white/10 focus-visible:ring-white/20',
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
