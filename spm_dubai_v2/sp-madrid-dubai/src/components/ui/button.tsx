'use client';

import { forwardRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'gold' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
  href?: string;
}

const MotionButton = motion.create('button');

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'gold', size = 'md', children, ...props }, ref) => {
    const [hovered, setHovered] = useState(false);

    const base =
      'relative overflow-hidden inline-flex items-center justify-center gap-2 font-sans font-bold tracking-widest uppercase cursor-pointer transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold)]';

    const variants = {
      gold:    'bg-[var(--gold)] text-[#07090f] hover:bg-[var(--gold-light)] shadow-[0_4px_20px_rgba(201,168,76,0.22)] hover:shadow-[0_6px_28px_rgba(201,168,76,0.35)]',
      ghost:   'bg-transparent text-[var(--text-primary)] border border-[var(--bg-border-heavy)] hover:border-[var(--gold)] hover:text-[var(--gold)]',
      outline: 'bg-transparent text-[var(--gold)] border border-[var(--gold-border)] hover:bg-[var(--gold-dim)] hover:border-[var(--gold)]',
    };

    const sizes = {
      sm: 'text-[10px] px-5 py-2.5',
      md: 'text-[11px] px-7 py-3.5',
      lg: 'text-[12px] px-10 py-4',
    };

    // Sheen color per variant
    const sheenColor = {
      gold:    'rgba(255,255,255,0.28)',
      ghost:   'rgba(201,168,76,0.18)',
      outline: 'rgba(201,168,76,0.22)',
    };

    return (
      <MotionButton
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileHover={{ y: -3, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
        whileTap={{ scale: 0.96, y: 0, transition: { type: 'spring', stiffness: 500, damping: 25 } }}
        {...(props as React.ComponentProps<typeof MotionButton>)}
      >
        {/* Sheen sweep overlay */}
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: `linear-gradient(105deg, transparent 40%, ${sheenColor[variant]} 50%, transparent 60%)`,
          }}
          initial={{ x: '-100%' }}
          animate={hovered ? { x: '100%' } : { x: '-100%' }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
        />
        {/* Content sits above sheen */}
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </MotionButton>
    );
  }
);
Button.displayName = 'Button';

