content = r"""'use client';

import { useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from 'framer-motion';
import { SectionHeader } from '@/components/ui/section-header';
import { timeline } from '@/data/timeline';
import { slideInLeft, slideInRight } from '@/lib/animations';

// ─── Diamond node ────────────────────────────────────────────────────────────
interface DiamondProps {
  progress: MotionValue<number>;
  threshold: number;
}

function DiamondNode({ progress, threshold }: DiamondProps) {
  const [active, setActive] = useState(false);
  useMotionValueEvent(progress, 'change', (v) => setActive(v >= threshold));

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: 32, height: 32 }}
      aria-hidden="true"
    >
      {/* Glow ring — only when active */}
      {active && (
        <motion.div
          className="absolute"
          style={{
            width: 28,
            height: 28,
            border: '1px solid var(--gold)',
            rotate: 45,
            transformOrigin: 'center',
          }}
          initial={{ opacity: 0.8, scale: 0.6 }}
          animate={{ opacity: 0, scale: 1.8 }}
          transition={{ duration: 0.7, ease: 'easeOut', repeat: Infinity, repeatDelay: 0.8 }}
        />
      )}

      {/* Diamond */}
      <motion.div
        animate={active ? 'on' : 'off'}
        variants={{
          off: {
            background: 'transparent',
            borderColor: 'rgba(180,150,60,0.45)',
            boxShadow: 'none',
            scale: 1,
          },
          on: {
            background: 'var(--gold)',
            borderColor: 'var(--gold)',
            boxShadow: '0 0 0 4px rgba(201,168,76,0.18), 0 0 14px rgba(201,168,76,0.55)',
            scale: 1.15,
          },
        }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        style={{
          width: 12,
          height: 12,
          border: '2px solid',
          rotate: 45,
        }}
      />
    </div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────
export function LegacyTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const total = timeline.length;

  // Only start filling when top of section hits the middle of the viewport
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.5', 'end 0.5'],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 28 });
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
          eyebrow="20 Years of Excellence"
          title="From Manila to Dubai"
          sub="A two-decade journey building the most trusted debt recovery operation in Southeast Asia — and now the Gulf."
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
            {timeline.map((item, i) => {
              const isEven = i % 2 === 0;
              const isFuture = item.year > 2024;
              const threshold = i / (total - 1);

              return (
                <motion.div
                  key={item.year}
                  variants={isEven ? slideInLeft : slideInRight}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.35 }}
                  className="md:flex items-stretch gap-0"
                >
                  {/* Left text — even items; right text — odd items */}
                  <div
                    className="flex-1 md:py-6"
                    style={{ order: isEven ? 1 : 3 }}
                  >
                    {isEven && (
                      <div className="py-4 md:py-0 md:pr-14 md:text-right">
                        <NodeText item={item} isFuture={isFuture} />
                      </div>
                    )}
                  </div>

                  {/* Center node column — always order 2 */}
                  <div
                    className="hidden md:flex shrink-0 w-10 items-center justify-center relative"
                    style={{ order: 2 }}
                  >
                    <DiamondNode
                      progress={smoothProgress}
                      threshold={threshold}
                    />
                  </div>

                  {/* Right text — odd items; empty — even items */}
                  <div
                    className="flex-1 md:py-6"
                    style={{ order: isEven ? 3 : 1 }}
                  >
                    {!isEven && (
                      <div className="py-4 md:py-0 md:pl-14 md:text-left">
                        <NodeText item={item} isFuture={isFuture} />
                      </div>
                    )}
                    {/* Mobile fallback for even items */}
                  </div>

                  {/* Mobile-only text (shows below node on small screens) */}
                </motion.div>
              );
            })}
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
}: {
  item: { year: number; title: string; description: string; isKeyYear?: boolean };
  isFuture: boolean;
}) {
  return (
    <>
      <div
        className="font-sans text-[9px] font-black tracking-[0.3em] uppercase mb-2"
        style={{ color: item.isKeyYear ? 'var(--gold)' : 'var(--text-faint)' }}
      >
        {item.year}
        {isFuture ? ' \u2736' : ''}
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
      {isFuture && (
        <div
          className="mt-2 inline-block font-sans text-[8px] font-bold tracking-[0.25em] uppercase px-2 py-1"
          style={{
            background: 'var(--gold-dim)',
            color: 'var(--gold)',
            border: '1px solid var(--gold-border)',
          }}
        >
          Milestone
        </div>
      )}
    </>
  );
}
"""

with open("/Users/angel.e.factor/spm_dubai_v2/sp-madrid-dubai/src/components/sections/LegacyTimeline.tsx", "w") as f:
    f.write(content)

print("LegacyTimeline.tsx written successfully")
