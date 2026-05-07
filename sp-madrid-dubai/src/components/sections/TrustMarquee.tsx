import { trustBadges } from '@/data/trust-badges';

export function TrustMarquee() {
  const badges = [...trustBadges, ...trustBadges, ...trustBadges];

  return (
    <section
      className="relative overflow-hidden py-8 border-y select-none"
      style={{ borderColor: 'var(--bg-border)', background: 'var(--bg-surface)' }}
      aria-label="Certifications and partnerships"
    >
      {/* Fade edges */}
      <div
        className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32"
        style={{ background: 'linear-gradient(to right, var(--bg-surface), transparent)' }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32"
        style={{ background: 'linear-gradient(to left, var(--bg-surface), transparent)' }}
        aria-hidden="true"
      />

      {/* Marquee track — pauses on hover */}
      <div className="relative flex overflow-hidden [&:hover>*]:pause-animation">
        <div
          className="flex shrink-0 gap-12 items-center"
          style={{ animation: 'marquee 55s linear infinite' }}
          aria-hidden="true"
        >
          {badges.map((badge, i) => (
            <div key={`${badge.id}-${i}`} className="flex items-center gap-3 shrink-0">
              <div className="flex flex-col">
                <div className="font-sans text-[12px] font-semibold text-[var(--text-mid)] whitespace-nowrap leading-tight">
                  {badge.name}
                </div>
                <div className="font-sans text-[9px] tracking-[0.15em] uppercase text-[var(--text-faint)]">
                  {badge.category}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
