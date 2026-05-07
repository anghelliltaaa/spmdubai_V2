import { cn } from '@/lib/utils';

interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
}

export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-3 font-sans text-[10px] font-bold tracking-[0.32em] uppercase text-[var(--gold)] mb-4',
        className
      )}
    >
      <span className="block w-8 h-px bg-[var(--gold)] opacity-40" aria-hidden="true" />
      {children}
      <span className="block w-8 h-px bg-[var(--gold)] opacity-40" aria-hidden="true" />
    </div>
  );
}

export function GoldRule({ className }: { className?: string }) {
  return (
    <div
      className={cn('w-10 h-px mx-auto mb-6', className)}
      style={{ background: 'linear-gradient(to right, transparent, var(--gold), transparent)' }}
      aria-hidden="true"
    />
  );
}

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  sub?: string;
  className?: string;
  align?: 'center' | 'left';
}

export function SectionHeader({ eyebrow, title, sub, className, align = 'center' }: SectionHeaderProps) {
  return (
    <header className={cn('mb-16', align === 'center' ? 'text-center' : 'text-left', className)}>
      <Eyebrow className={align === 'center' ? 'justify-center' : 'justify-start'}>{eyebrow}</Eyebrow>
      <GoldRule className={align === 'left' ? 'mx-0' : 'mx-auto'} />
      <h2
        className="font-bold leading-[1.1] tracking-tight text-[var(--text-primary)] mb-4"
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(30px, 4vw, 52px)',
        }}
      >
        {title}
      </h2>
      {sub && (
        <p className="font-sans text-[15px] font-light leading-[1.8] text-[var(--text-muted)] max-w-2xl"
          style={{ marginLeft: align === 'center' ? 'auto' : undefined, marginRight: align === 'center' ? 'auto' : undefined }}
        >
          {sub}
        </p>
      )}
    </header>
  );
}
