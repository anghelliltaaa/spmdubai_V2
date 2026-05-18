'use client';

import { useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
  MotionValue,
} from 'framer-motion';
import { SectionHeader } from '@/components/ui/section-header';
import { timeline } from '@/data/timeline';
import { slideInLeft, slideInRight } from '@/lib/animations';
import { useLang } from '@/contexts/LangContext';
import type { Translations } from '@/lib/translations';

// ─── Mobile timeline item — activates via scroll progress ────────────────────
function MobileTimelineItem({
  year, title, description, isKeyYear, isFuture, isLast, threshold, smoothProgress,
}: {
  year: number;
  title: string;
  description: string;
  isKeyYear?: boolean;
  isFuture: boolean;
  isLast: boolean;
  threshold: number;
  smoothProgress: MotionValue<number>;
}) {
  const [active, setActive] = useState(false);
  useMotionValueEvent(smoothProgress, 'change', (v) => {
    setActive(v >= threshold);
  });

  return (
    <div className="flex gap-4">
      {/* Left: animated dot */}
      <div className="flex flex-col items-center shrink-0" style={{ width: 16 }}>
        <motion.div
          className="rounded-full mt-1.5 shrink-0 z-10"
          animate={active
            ? { background: 'var(--gold)', boxShadow: '0 0 0 4px rgba(201,168,76,0.2), 0 0 12px rgba(201,168,76,0.6)', scale: 1.3 }
            : { background: isKeyYear ? 'var(--gold)' : 'var(--bg-border-heavy)', boxShadow: 'none', scale: 1 }
          }
          transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
          style={{ width: 10, height: 10, position: 'relative' }}
        />
      </div>
      {/* Right: content */}
      <div className="pb-6 min-w-0">
        <motion.div
          animate={active
            ? { color: 'var(--gold)', opacity: 1 }
            : { color: isKeyYear ? 'var(--gold)' : 'var(--text-muted)', opacity: 0.6 }
          }
          transition={{ duration: 0.4 }}
          className="font-bold leading-none mb-1"
          style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(22px, 5.5vw, 30px)' }}
        >
          {year}
          {isFuture ? <span className="text-[0.45em] ml-1.5 align-middle">✶</span> : ''}
        </motion.div>
        <motion.h3
          animate={active
            ? { opacity: 1, y: 0, filter: 'blur(0px)' }
            : { opacity: 0.45, y: 8, filter: 'blur(1px)' }
          }
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className={`font-sans font-semibold mb-1 leading-snug ${isFuture ? 'italic' : ''}`}
          style={{ fontSize: 'clamp(13px, 3.5vw, 15px)', color: isFuture ? 'var(--text-muted)' : 'var(--text-primary)' }}
        >
          {title}
        </motion.h3>
        <motion.p
          animate={active
            ? { opacity: 1, y: 0 }
            : { opacity: 0.3, y: 10 }
          }
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: active ? 0.08 : 0 }}
          className="font-sans font-light leading-relaxed"
          style={{ fontSize: 'clamp(12px, 3vw, 13px)', color: 'var(--text-muted)' }}
        >
          {description}
        </motion.p>
      </div>
    </div>
  );
}

// ─── Glowing tip that rides the front of the progress line ───────────────────
function LineTip({ lineHeight }: { lineHeight: MotionValue<string> }) {
  return (
    <motion.div
      className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
      style={{ top: lineHeight }}
      aria-hidden="true"
    >
      <motion.div
        className="absolute rounded-full"
        style={{ width: 24, height: 24, top: -12, left: -12, border: '1px solid rgba(201,168,76,0.5)' }}
        animate={{ scale: [1, 2.0, 1], opacity: [0.6, 0, 0.6] }}
        transition={{ duration: 1.8, ease: 'easeOut', repeat: Infinity }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{ width: 14, height: 14, top: -7, left: -7, border: '1px solid rgba(201,168,76,0.65)' }}
        animate={{ scale: [1, 1.7, 1], opacity: [0.8, 0, 0.8] }}
        transition={{ duration: 1.8, ease: 'easeOut', repeat: Infinity, delay: 0.3 }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: 6, height: 6, top: -3, left: -3,
          background: 'var(--gold-light)',
          boxShadow: '0 0 8px 3px rgba(201,168,76,0.75), 0 0 20px 6px rgba(201,168,76,0.3)',
        }}
      />
    </motion.div>
  );
}

// ─── Diamond node ─────────────────────────────────────────────────────────────
function DiamondNode({ active }: { active: boolean }) {
  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: 44, height: 44 }}
      aria-hidden="true"
    >
      {/* Flash burst — fires once on activation */}
      <motion.div
        className="absolute rounded-full"
        style={{ width: 44, height: 44, top: 0, left: 0 }}
        animate={active ? { scale: [1, 2.6], opacity: [0.8, 0] } : { scale: 1, opacity: 0 }}
        transition={active ? { duration: 0.5, ease: [0.2, 0.8, 0.4, 1] } : { duration: 0 }}
        initial={false}
      >
        <div className="w-full h-full rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.55) 0%, transparent 70%)' }} />
      </motion.div>

      {/* Outer pulse ring */}
      <motion.div
        className="absolute"
        style={{ width: 32, height: 32, border: '1px solid', rotate: 45, transformOrigin: 'center' }}
        animate={active ? {
          borderColor: ['rgba(201,168,76,0.85)', 'rgba(201,168,76,0)', 'rgba(201,168,76,0.85)'],
          scale: [1, 2.0, 1], opacity: [1, 0, 1],
        } : { borderColor: 'rgba(0,0,0,0)', scale: 1, opacity: 0 }}
        transition={active ? { duration: 1.8, ease: 'easeOut', repeat: Infinity } : { duration: 0.25 }}
      />

      {/* Inner pulse ring */}
      <motion.div
        className="absolute"
        style={{ width: 22, height: 22, border: '1px solid', rotate: 45, transformOrigin: 'center' }}
        animate={active ? {
          borderColor: ['rgba(201,168,76,0.55)', 'rgba(201,168,76,0)', 'rgba(201,168,76,0.55)'],
          scale: [1, 1.6, 1], opacity: [0.85, 0, 0.85],
        } : { borderColor: 'rgba(0,0,0,0)', scale: 1, opacity: 0 }}
        transition={active ? { duration: 1.8, ease: 'easeOut', repeat: Infinity, delay: 0.45 } : { duration: 0.25 }}
      />

      {/* Diamond body */}
      <motion.div
        animate={active ? 'on' : 'off'}
        variants={{
          off: { background: 'rgba(0,0,0,0)', borderColor: 'rgba(180,150,60,0.35)', boxShadow: 'none', scale: 1, rotate: 45 },
          on:  { background: '#C9A84C', borderColor: '#E8C96A', boxShadow: '0 0 0 4px rgba(201,168,76,0.18), 0 0 24px rgba(201,168,76,0.75)', scale: 1.3, rotate: 45 },
        }}
        transition={{ duration: 0.55, ease: [0.34, 1.56, 0.64, 1] }}
        style={{ width: 13, height: 13, border: '2px solid', position: 'relative', zIndex: 2 }}
      />
    </div>
  );
}

// ─── Per-row — activation driven by the SAME section scroll progress ──────────
// Each row knows its own fractional position in the timeline (threshold).
// It activates when the shared smoothProgress passes that threshold.
function TimelineRow({
  item, i, total, isEven, isFuture, t, smoothProgress,
}: {
  item: typeof import('@/data/timeline').timeline[0];
  i: number;
  total: number;
  isEven: boolean;
  isFuture: boolean;
  t: Translations;
  smoothProgress: MotionValue<number>;
}) {
  // The threshold at which this node should activate:
  // evenly spaced from 0.05 (first) to 0.95 (last)
  const threshold = 0.05 + (i / (total - 1)) * 0.90;

  const [active, setActive] = useState(false);
  useMotionValueEvent(smoothProgress, 'change', (v) => {
    // Bidirectional — activate when line reaches this node, deactivate when it retreats
    setActive(v >= threshold);
  });

  const title = t[item.titleKey as keyof Translations] as string;
  const description = t[item.descKey as keyof Translations] as string;

  return (
    <motion.div
      variants={isEven ? slideInLeft : slideInRight}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      className="md:flex items-stretch gap-0"
    >
      {/* Mobile: single column with left border accent */}
      <div className="md:hidden flex gap-4 py-4 border-l-2 pl-4" style={{ borderColor: active ? 'var(--gold)' : 'var(--bg-border-heavy)', transition: 'border-color 0.4s ease' }}>
        <NodeText year={item.year} title={title} description={description}
          isKeyYear={item.isKeyYear} isFuture={isFuture} active={active} />
      </div>

      {/* Desktop: Left column */}
      <div className={`flex-1 md:py-10 hidden md:block`} style={{ order: 1 }}>
        {isEven && (
          <div className="py-4 md:py-0 md:pr-14 md:text-right">
            <NodeText year={item.year} title={title} description={description}
              isKeyYear={item.isKeyYear} isFuture={isFuture} active={active} />
          </div>
        )}
      </div>

      {/* Desktop: Center node */}
      <div className="hidden md:flex shrink-0 w-10 items-center justify-center relative" style={{ order: 2 }}>
        <DiamondNode active={active} />
      </div>

      {/* Desktop: Right column */}
      <div className={`flex-1 md:py-10 hidden md:block`} style={{ order: 3 }}>
        {!isEven && (
          <div className="py-4 md:py-0 md:pl-14 md:text-left">
            <NodeText year={item.year} title={title} description={description}
              isKeyYear={item.isKeyYear} isFuture={isFuture} active={active} />
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function LegacyTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useLang();

  // Section-level scroll: 0 when section top hits viewport top,
  // 1 when section bottom exits viewport bottom — full content range.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Moderate spring — tracks scroll deliberately without racing ahead
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 28, damping: 32, restDelta: 0.001 });
  const lineHeight = useTransform(smoothProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      ref={sectionRef}
      id="legacy"
      className="py-16 md:py-28 relative overflow-hidden"
      style={{ background: 'var(--bg-surface)' }}
      aria-label="Company Legacy"
    >
      {/* ── Arabic 8-pointed star (khatam) tiled pattern ── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ opacity: 0.11 }}
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id="khatam" x="0" y="0" width="96" height="96" patternUnits="userSpaceOnUse">
            {/* Outer octagon */}
            <polygon
              points="28,0 68,0 96,28 96,68 68,96 28,96 0,68 0,28"
              fill="none" stroke="#8A8A8A" strokeWidth="1.2"
            />
            {/* Square 1 — axis-aligned */}
            <rect x="18" y="18" width="60" height="60"
              fill="none" stroke="#8A8A8A" strokeWidth="1.1"
              transform="rotate(0 48 48)" />
            {/* Square 2 — rotated 45° to form 8-pointed star */}
            <rect x="18" y="18" width="60" height="60"
              fill="none" stroke="#8A8A8A" strokeWidth="1.1"
              transform="rotate(45 48 48)" />
            {/* Inner octagon */}
            <polygon
              points="38,24 58,24 72,38 72,58 58,72 38,72 24,58 24,38"
              fill="none" stroke="#8A8A8A" strokeWidth="0.9"
            />
            {/* Inner circle */}
            <circle cx="48" cy="48" r="11" fill="none" stroke="#8A8A8A" strokeWidth="0.9" />
            {/* Center dot */}
            <circle cx="48" cy="48" r="3" fill="#8A8A8A" />
            {/* Cardinal spokes */}
            <line x1="48" y1="18" x2="48" y2="37" stroke="#8A8A8A" strokeWidth="0.85" />
            <line x1="48" y1="59" x2="48" y2="78" stroke="#8A8A8A" strokeWidth="0.85" />
            <line x1="18" y1="48" x2="37" y2="48" stroke="#8A8A8A" strokeWidth="0.85" />
            <line x1="59" y1="48" x2="78" y2="48" stroke="#8A8A8A" strokeWidth="0.85" />
            {/* Diagonal spokes */}
            <line x1="27" y1="27" x2="40" y2="40" stroke="#8A8A8A" strokeWidth="0.8" />
            <line x1="56" y1="56" x2="69" y2="69" stroke="#8A8A8A" strokeWidth="0.8" />
            <line x1="69" y1="27" x2="56" y2="40" stroke="#8A8A8A" strokeWidth="0.8" />
            <line x1="27" y1="69" x2="40" y2="56" stroke="#8A8A8A" strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#khatam)" />
      </svg>

      {/* Very soft edge fade — only clips the outermost corners */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 100% 90% at 50% 50%, transparent 70%, var(--bg-surface) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Gold atmospheric glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 40% 50% at 5% 50%, rgba(201,168,76,0.06) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        {/* Section header with boosted text opacity */}
        <SectionHeader
          eyebrow={t.timeline_eyebrow}
          title={t.timeline_title}
          sub={t.timeline_sub}
          className="[&_h2]:opacity-100 [&_h2]:text-[var(--text-primary)] [&_p]:opacity-90 [&_p]:text-[var(--text-mid)]"
        />

        {/* ── Mobile timeline: scroll-animated vertical list ── */}
        <div className="md:hidden relative mb-8">
          {/* Left progress track */}
          <div
            className="absolute left-[7px] top-0 bottom-0 w-[2px]"
            style={{
              background: 'linear-gradient(to bottom, transparent, var(--bg-border-heavy) 5%, var(--bg-border-heavy) 95%, transparent)',
            }}
            aria-hidden="true"
          />
          {/* Animated gold fill on left track */}
          <div
            className="absolute left-[7px] top-0 w-[2px] overflow-hidden"
            style={{ height: '100%' }}
            aria-hidden="true"
          >
            <motion.div
              className="w-full"
              style={{
                height: lineHeight,
                background: 'linear-gradient(to bottom, var(--gold-light), var(--gold))',
                boxShadow: '0 0 6px 2px rgba(201,168,76,0.4)',
              }}
            />
          </div>

          <div className="space-y-0">
            {timeline.map((item, i) => {
              const title = t[item.titleKey as keyof Translations] as string;
              const description = t[item.descKey as keyof Translations] as string;
              const isFuture = item.year > 2024;
              const threshold = 0.05 + (i / (timeline.length - 1)) * 0.90;
              return (
                <MobileTimelineItem
                  key={item.year}
                  year={item.year}
                  title={title}
                  description={description}
                  isKeyYear={item.isKeyYear}
                  isFuture={isFuture}
                  isLast={i === timeline.length - 1}
                  threshold={threshold}
                  smoothProgress={smoothProgress}
                />
              );
            })}
          </div>
        </div>

        {/* ── Desktop timeline: animated center-line layout ── */}
        <div className="relative hidden md:block">
          {/* Static track */}
          <div
            className="absolute left-[calc(50%-1px)] top-0 bottom-0 w-[2px]"
            style={{
              background:
                'linear-gradient(to bottom, transparent, var(--bg-border-heavy) 6%, var(--bg-border-heavy) 94%, transparent)',
            }}
            aria-hidden="true"
          />

          {/* Animated gold fill */}
          <div
            className="absolute left-[calc(50%-1px)] top-0 w-[2px] overflow-hidden"
            style={{ height: '100%' }}
            aria-hidden="true"
          >
            <motion.div
              className="w-full relative overflow-hidden"
              style={{ height: lineHeight }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to bottom, var(--gold-light), var(--gold))',
                  boxShadow: '0 0 6px 2px rgba(201,168,76,0.45)',
                }}
              />
            </motion.div>
          </div>

          {/* Glowing tip */}
          <div
            className="absolute left-[calc(50%)] top-0"
            style={{ height: '100%', width: 0 }}
            aria-hidden="true"
          >
            <LineTip lineHeight={lineHeight} />
          </div>

          <div className="space-y-2">
            {timeline.map((item, i) => (
              <TimelineRow
                key={item.year}
                item={item}
                i={i}
                total={timeline.length}
                isEven={i % 2 === 0}
                isFuture={item.year > 2024}
                t={t}
                smoothProgress={smoothProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Text block ───────────────────────────────────────────────────────────────
function NodeText({
  year, title, description, isKeyYear, isFuture, active,
}: {
  year: number;
  title: string;
  description: string;
  isKeyYear?: boolean;
  isFuture: boolean;
  active: boolean;
}) {
  return (
    <>
      {/* Year — large, dominant */}
      <motion.div
        animate={active
          ? { color: 'var(--gold)', scale: [1, 1.06, 1], opacity: 1 }
          : { color: isKeyYear ? 'var(--gold)' : 'var(--text-muted)', scale: 1, opacity: 0.55 }
        }
        transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        className="font-bold leading-none tracking-tight mb-2 inline-block"
        style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px, 3.8vw, 48px)' }}
      >
        {year}
        {isFuture ? <span className="text-[0.45em] ml-1.5 align-middle">✶</span> : ''}
      </motion.div>

      {/* Title — medium, clear */}
      <div style={{ overflow: 'hidden' }}>
        <motion.h3
          animate={active
            ? { opacity: 1, y: 0, filter: 'blur(0px)' }
            : { opacity: 0.45, y: 10, filter: 'blur(1px)' }
          }
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={`font-sans font-semibold mb-2 leading-snug ${isFuture ? 'italic' : ''}`}
          style={{
            fontSize: 'clamp(14px, 1.4vw, 17px)',
            color: isFuture ? 'var(--text-muted)' : 'var(--text-primary)',
          }}
        >
          {title}
        </motion.h3>
      </div>

      {/* Description — smaller, supporting */}
      <div style={{ overflow: 'hidden' }}>
        <motion.p
          animate={active
            ? { opacity: 1, y: 0, filter: 'blur(0px)' }
            : { opacity: 0.3, y: 14, filter: 'blur(1.5px)' }
          }
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: active ? 0.09 : 0 }}
          className="font-sans font-light leading-[1.8]"
          style={{ fontSize: 'clamp(11px, 1.1vw, 13px)', color: 'var(--text-muted)' }}
        >
          {description}
        </motion.p>
      </div>
    </>
  );
}
