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
    'inline-flex items-center justify-center font-bold uppercase tracking-wider rounded-full transition-all duration-300 focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2 outline-none cursor-pointer disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]';

  const variants: Record<ButtonVariant, string> = {
    primary:
      'bg-forest text-white shadow-[4px_4px_0px_0px_#A4C639] hover:bg-seafoam hover:text-forest hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:translate-x-[3px] active:translate-y-[3px]',
    secondary:
      'bg-white text-forest border border-forest/10 hover:bg-forest hover:text-white shadow-sm hover:shadow-md active:translate-y-[1px]',
    ghost:
      'bg-transparent text-forest hover:bg-forest/5 focus-visible:ring-forest/20',
  };

  const sizes: Record<ButtonSize, string> = {
    sm: 'text-[11px] px-5 py-2.5 tracking-[0.1em]',
    md: 'text-sm px-7 py-3.5 tracking-wider',
    lg: 'text-base px-9 py-4.5 tracking-widest',
  };

  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}
