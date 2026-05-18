'use client';

import { trustBadges } from '@/data/trust-badges';

/*
  Bulletproof infinite marquee.

  Strategy:
  - Render 4 identical copies of the badge list inside ONE flex row.
  - Animate translateX(0) → translateX(-25%) — this shifts exactly one
    copy's worth of content off the left edge.
  - Because the remaining 3 copies are identical to the first, the visual
    result is indistinguishable from the start — perfect seamless loop.
  - 4 copies guarantees the row is always wider than any viewport.
  - No gap, no glitch, no position math needed.
*/

const DURATION = 36; // seconds per full loop

// One set of badges
function BadgeSet({ id }: { id: string }) {
  return (
    <>
      {trustBadges.map((badge) => (
        <div
          key={`${id}-${badge.id}`}
          className="flex items-center gap-3 shrink-0 px-8"
        >
          {/* Separator dot */}
          <span
            className="w-1 h-1 rounded-full shrink-0 opacity-30"
            style={{ background: 'var(--gold)' }}
            aria-hidden="true"
          />
          <div className="flex flex-col">
            <div
              className="font-sans text-[12px] font-semibold whitespace-nowrap leading-tight"
              style={{ color: 'var(--text-mid)' }}
            >
              {badge.name}
            </div>
            <div
              className="font-sans text-[9px] tracking-[0.15em] uppercase"
              style={{ color: 'var(--text-faint)' }}
            >
              {badge.category}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export function TrustMarquee() {
  return (
    <section
      dir="ltr"
      className="relative overflow-hidden py-6 sm:py-8 border-y select-none w-full"
      style={{ borderColor: 'var(--bg-border)', background: 'var(--bg-surface)' }}
      aria-label="Certifications and partnerships"
    >
      {/* Keyframe: shift by exactly 25% = one set of 4 */}
      <style>{`
        @keyframes marquee-loop {
          from { transform: translateX(0); }
          to   { transform: translateX(-25%); }
        }
      `}</style>

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

      {/* Single row — 4 identical sets, shifts by 25% = one set width */}
      <div
        className="flex items-center"
        style={{
          animation: `marquee-loop ${DURATION}s linear infinite`,
          willChange: 'transform',
          width: 'max-content',
        }}
        aria-hidden="true"
      >
        <BadgeSet id="a" />
        <BadgeSet id="b" />
        <BadgeSet id="c" />
        <BadgeSet id="d" />
      </div>
    </section>
  );
}
