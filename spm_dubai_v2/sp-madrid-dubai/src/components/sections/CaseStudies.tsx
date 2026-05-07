'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { SectionHeader } from '@/components/ui/section-header';
import { caseStudies } from '@/data/case-studies';
import { cn } from '@/lib/utils';
import { useLang } from '@/contexts/LangContext';

const INTERVAL = 5000;

export function CaseStudies() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [hovered, setHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback((idx: number, direction: number) => {
    setDir(direction);
    setActive(((idx % caseStudies.length) + caseStudies.length) % caseStudies.length);
    setProgress(0);
  }, []);

  const next = useCallback(() => go(active + 1, 1), [active, go]);
  const prev = useCallback(() => go(active - 1, -1), [active, go]);

  // Touch / swipe support
  const touchStartX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 44) dx < 0 ? next() : prev();
    touchStartX.current = null;
  };

  useEffect(() => {
    if (hovered) { clearInterval(timerRef.current!); return; }
    timerRef.current = setInterval(next, INTERVAL);
    return () => clearInterval(timerRef.current!);
  }, [hovered, next]);

  // Progress bar
  useEffect(() => {
    setProgress(0);
    if (hovered) return;
    const step = 100 / (INTERVAL / 50);
    progressRef.current = setInterval(() => setProgress((p) => Math.min(p + step, 100)), 50);
    return () => clearInterval(progressRef.current!);
  }, [active, hovered]);

  // Keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [next, prev]);

  const card = caseStudies[active];
  const { t } = useLang();

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 80 : -80, scale: 0.96 }),
    center: { opacity: 1, x: 0, scale: 1 },
    exit:  (d: number) => ({ opacity: 0, x: d > 0 ? -80 : 80, scale: 0.96 }),
  };

  return (
    <section
      id="stories"
      className="py-28 relative overflow-hidden"
      style={{ background: 'var(--bg)' }}
      aria-label="Client Success Stories"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 12% 50%, rgba(201,168,76,0.04) 0%, transparent 50%),
            radial-gradient(ellipse at 88% 20%, rgba(201,168,76,0.03) 0%, transparent 40%)
          `,
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-8">
        <SectionHeader
          eyebrow={t.cs_eyebrow}
          title={t.cs_title}
          sub={t.cs_sub}
        />

        {/* Progress bar */}
        <div className="h-0.5 bg-[var(--bg-border)] mb-8 rounded-full overflow-hidden">
          <motion.div
            className="h-full"
            style={{ background: 'var(--gold)', width: `${progress}%` }}
            transition={{ duration: 0 }}
          />
        </div>

        {/* Card */}
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={active}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div
                className="grid grid-cols-1 md:grid-cols-2 border"
                style={{ background: 'var(--bg-card)', borderColor: 'var(--bg-border)', borderLeft: '2px solid var(--gold)' }}
              >
                {/* Left: challenge + results */}
                <div className="p-8 md:p-12 border-r" style={{ borderColor: 'var(--bg-border)' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin size={12} color="var(--text-muted)" />
                    <span className="font-sans text-xs text-[var(--text-muted)]">{card.location}</span>
                    <span
                      className="ml-auto font-sans text-[9px] font-bold tracking-widest uppercase px-2 py-1"
                      style={{ background: 'var(--gold-dim)', color: 'var(--gold)', border: '1px solid var(--gold-border)' }}
                    >
                      {card.sector}
                    </span>
                  </div>
                  <h3 className="font-sans text-xl font-semibold text-[var(--text-primary)] mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
                    {card.company}
                  </h3>

                  <div className="font-sans text-[10px] font-bold tracking-widest uppercase text-[var(--gold)] mb-2">{t.cs_challenge}</div>
                  <p className="font-sans text-sm font-light leading-relaxed text-[var(--text-muted)] mb-6">
                    {card.challenge}
                  </p>

                  <div
                    className="w-full h-px mb-5"
                    style={{ background: 'linear-gradient(to right, var(--gold), transparent)', opacity: 0.28 }}
                    aria-hidden="true"
                  />

                  <div className="font-sans text-[10px] font-bold tracking-widest uppercase text-[var(--gold)] mb-3">{t.cs_results}</div>
                  <div className="space-y-1.5">
                    {card.results.map((r) => (
                      <div key={r.value} className="flex items-baseline gap-2">
                        <span className="font-sans text-lg font-bold text-[var(--gold)]">{r.value}</span>
                        <span className="font-sans text-xs text-[var(--text-muted)]">{r.sub}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: quote + attribution */}
                <div className="p-8 md:p-12 flex flex-col justify-between">
                  <blockquote
                    className="font-sans text-base font-light italic leading-[1.8] text-[var(--text-mid)] border-l-2 pl-5 mb-8"
                    style={{ borderColor: 'rgba(201,168,76,0.28)' }}
                  >
                    &ldquo;{card.quote}&rdquo;
                  </blockquote>
                  <p className="font-sans text-sm text-[var(--text-muted)]">{card.attribution}</p>

                  <div className="mt-auto pt-8">
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-[var(--gold)] hover:gap-3 transition-all"
                    >
                      {t.cs_request_brief}
                      <ChevronRight size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mt-8">
          <div className="flex gap-2">
            <button
              onClick={prev}
              className="w-11 h-11 flex items-center justify-center border text-[var(--text-muted)] hover:text-[var(--gold)] hover:border-[var(--gold)] transition-colors"
              style={{ background: 'var(--bg-card-2)', borderColor: 'var(--bg-border)' }}
              aria-label="Previous case study"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              className="w-11 h-11 flex items-center justify-center border text-[var(--text-muted)] hover:text-[var(--gold)] hover:border-[var(--gold)] transition-colors"
              style={{ background: 'var(--bg-card-2)', borderColor: 'var(--bg-border)' }}
              aria-label="Next case study"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Dots */}
          <div className="flex gap-2 items-center">
            {caseStudies.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i, i > active ? 1 : -1)}
                className={cn(
                  'h-2 rounded-full transition-all duration-300',
                  i === active
                    ? 'w-6 bg-[var(--gold)]'
                    : 'w-2 bg-white/15 hover:bg-white/30'
                )}
                aria-label={`Go to case study ${i + 1}`}
                aria-current={i === active ? 'true' : undefined}
              />
            ))}
          </div>

          <div className="font-sans text-xs text-[var(--text-faint)]">
            {active + 1} / {caseStudies.length}
          </div>
        </div>
      </div>
    </section>
  );
}
