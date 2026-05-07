'use client';

import { useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
} from 'framer-motion';
import { SectionHeader } from '@/components/ui/section-header';
import { timeline } from '@/data/timeline';
import { slideInLeft, slideInRight } from '@/lib/animations';
import { useLang } from '@/contexts/LangContext';

// ─── Diamond node ────────────────────────────────────────────────────────────
function DiamondNode({ active }: { active: boolean }) {

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: 36, height: 36 }}
      aria-hidden="true"
    >
      {/* Outer glow ring — pulses when active */}
      <motion.div
        className="absolute"
        style={{ width: 30, height: 30, border: '1px solid', rotate: 45, transformOrigin: 'center' }}
        animate={active ? {
          borderColor: ['rgba(201,168,76,0.8)', 'rgba(201,168,76,0)', 'rgba(201,168,76,0.8)'],
          scale: [1, 1.9, 1],
          opacity: [1, 0, 1],
        } : {
          borderColor: 'rgba(0,0,0,0)',
          scale: 1,
          opacity: 0,
        }}
        transition={active ? { duration: 1.4, ease: 'easeOut', repeat: Infinity } : { duration: 0.25 }}
      />

      {/* Inner glow ring — secondary pulse, offset */}
      <motion.div
        className="absolute"
        style={{ width: 22, height: 22, border: '1px solid', rotate: 45, transformOrigin: 'center' }}
        animate={active ? {
          borderColor: ['rgba(201,168,76,0.5)', 'rgba(201,168,76,0)', 'rgba(201,168,76,0.5)'],
          scale: [1, 1.6, 1],
          opacity: [0.8, 0, 0.8],
        } : {
          borderColor: 'rgba(0,0,0,0)',
          scale: 1,
          opacity: 0,
        }}
        transition={active ? { duration: 1.4, ease: 'easeOut', repeat: Infinity, delay: 0.35 } : { duration: 0.25 }}
      />

      {/* Diamond body */}
      <motion.div
        animate={active ? 'on' : 'off'}
        variants={{
          off: {
            background: 'transparent',
            borderColor: 'rgba(180,150,60,0.4)',
            boxShadow: 'none',
            scale: 1,
            rotate: 45,
          },
          on: {
            background: 'var(--gold)',
            borderColor: 'var(--gold)',
            boxShadow: '0 0 0 5px rgba(201,168,76,0.15), 0 0 20px rgba(201,168,76,0.65)',
            scale: 1.2,
            rotate: 45,
          },
        }}
        transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        style={{
          width: 12,
          height: 12,
          border: '2px solid',
          position: 'relative',
          zIndex: 2,
        }}
      />
    </div>
  );
}

// ─── Per-row component — each row self-activates via its own scroll target ────
function TimelineRow({
  item, i, isEven, isFuture,
}: {
  item: typeof import('@/data/timeline').timeline[0];
  i: number;
  isEven: boolean;
  isFuture: boolean;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  // Fires progress 0→1 as the row travels from 85% viewport height to 45%
  const { scrollYProgress: rowProgress } = useScroll({
    target: rowRef,
    offset: ['start 0.85', 'center 0.45'],
  });
  const [active, setActive] = useState(false);
  useMotionValueEvent(rowProgress, 'change', (v) => {
    if (!active && v >= 1) setActive(true);
  });

  return (
    <motion.div
      ref={rowRef}
      variants={isEven ? slideInLeft : slideInRight}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      className="md:flex items-stretch gap-0"
    >
      {/* Left column — even items have text here */}
      <div
        className={`flex-1 md:py-10 ${!isEven ? 'hidden md:block' : ''}`}
        style={{ order: 1 }}
      >
        {isEven && (
          <div className="py-4 md:py-0 md:pr-14 md:text-right">
            <NodeText item={item} isFuture={isFuture} active={active} />
          </div>
        )}
      </div>

      {/* Center node column — always order 2 */}
      <div
        className="hidden md:flex shrink-0 w-10 items-center justify-center relative"
        style={{ order: 2 }}
      >
        <DiamondNode active={active} />
      </div>

      {/* Right column — odd items have text here */}
      <div
        className={`flex-1 md:py-10 ${isEven ? 'hidden md:block' : ''}`}
        style={{ order: 3 }}
      >
        {!isEven && (
          <div className="py-4 md:py-0 md:pl-14 md:text-left">
            <NodeText item={item} isFuture={isFuture} active={active} />
          </div>
        )}
      </div>
    </motion.div>
  );
}
export function LegacyTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useLang();

  // offset 'start 0.5 / end 0.5': progress 0 when section top = viewport mid,
  // progress 1 when section bottom = viewport mid.
  // This maps threshold=i/(N-1) directly to when each node passes viewport center.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.5', 'end 0.5'],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 22 });
  const lineHeight = useTransform(smoothProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      ref={sectionRef}
      id="legacy"
      className="py-28 relative overflow-hidden"
      style={{ background: 'var(--bg-surface)' }}
      aria-label="Company Legacy"
    >
      {/* BG accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 55% 70% at 8% 55%, rgba(201,168,76,0.04) 0%, transparent 55%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <SectionHeader
          eyebrow={t.timeline_eyebrow}
          title={t.timeline_title}
          sub={t.timeline_sub}
        />

        <div className="relative">
          {/* Static track line */}
          <div
            className="absolute left-[calc(50%-0.5px)] top-0 bottom-0 w-px hidden md:block"
            style={{
              background:
                'linear-gradient(to bottom, transparent, var(--bg-border-heavy) 8%, var(--bg-border-heavy) 92%, transparent)',
            }}
            aria-hidden="true"
          />

          {/* Animated gold fill line */}
          <div
            className="absolute left-[calc(50%-0.5px)] top-0 w-px hidden md:block overflow-hidden"
            style={{ height: '100%' }}
            aria-hidden="true"
          >
            <motion.div
              className="w-full"
              style={{
                background: 'linear-gradient(to bottom, var(--gold), var(--gold-light))',
                height: lineHeight,
                boxShadow: '0 0 8px rgba(201,168,76,0.4)',
              }}
            />
          </div>

          <div className="space-y-2">
            {timeline.map((item, i) => (
              <TimelineRow
                key={item.year}
                item={item}
                i={i}
                isEven={i % 2 === 0}
                isFuture={item.year > 2024}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Extracted text block ─────────────────────────────────────────────────────
function NodeText({
  item,
  isFuture,
  active,
}: {
  item: { year: number; title: string; description: string; isKeyYear?: boolean };
  isFuture: boolean;
  active: boolean;
}) {
  return (
    <>
      <div
        className="font-bold leading-none tracking-[0.06em] mb-2"
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(20px, 2.2vw, 26px)',
          color: active || item.isKeyYear ? 'var(--gold)' : 'var(--text-muted)',
          transition: 'color 0.4s ease',
        }}
      >
        {item.year}
        {isFuture ? <span className="text-[0.55em] ml-1 align-middle">✶</span> : ''}
      </div>
      <h3
        className={`font-sans text-[15px] font-semibold mb-1.5 leading-snug ${isFuture ? 'italic' : ''}`}
        style={{ color: isFuture ? 'var(--text-muted)' : 'var(--text-primary)' }}
      >
        {item.title}
      </h3>
      <p className="font-sans text-[13px] font-light leading-[1.75] text-[var(--text-muted)]">
        {item.description}
      </p>

    </>
  );
}
