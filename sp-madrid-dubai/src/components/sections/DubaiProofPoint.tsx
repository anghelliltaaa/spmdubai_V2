'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionHeader } from '@/components/ui/section-header';
import { staggerContainer, scaleIn } from '@/lib/animations';
import { useLang } from '@/contexts/LangContext';

// Animated number counter — counts up when it enters the viewport
function CountUp({ value, duration = 1.4 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: '-80px' });
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!inView) { setDisplay('0'); return; }
    // Extract leading number from value string (e.g. "AED 2.1B+" → 2.1, "94%" → 94)
    const match = value.match(/[\d.]+/);
    if (!match) { setDisplay(value); return; }
    const target = parseFloat(match[0]);
    const prefix = value.slice(0, value.indexOf(match[0]));
    const suffix = value.slice(value.indexOf(match[0]) + match[0].length);
    const isDecimal = match[0].includes('.');
    const steps = 40;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;
      setDisplay(prefix + (isDecimal ? current.toFixed(1) : Math.round(current).toString()) + suffix);
      if (step >= steps) clearInterval(timer);
    }, (duration * 1000) / steps);
    return () => clearInterval(timer);
  }, [inView, value, duration]);

  return <div ref={ref}>{inView ? display : '0'}</div>;
}

export function DubaiProofPoint() {
  const { t } = useLang();

  const PROOF_POINTS = [
    { value: t.proof_val_recovered, label: t.proof_lbl_recovered, detail: t.proof_det_recovered },
    { value: t.proof_val_rate,      label: t.proof_lbl_rate,      detail: t.proof_det_rate },
    { value: t.proof_val_countries, label: t.proof_lbl_countries, detail: t.proof_det_countries },
    { value: t.proof_val_violations,label: t.proof_lbl_violations,detail: t.proof_det_violations },
    { value: t.proof_val_professionals, label: t.proof_lbl_professionals, detail: t.proof_det_professionals },
    { value: t.proof_val_years,     label: t.proof_lbl_years,     detail: t.proof_det_years },
  ];

  return (
    <section
      id="proof"
      className="py-16 md:py-28 relative overflow-hidden"
      style={{ background: 'var(--bg)' }}
      aria-label="SPM by the Numbers"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 88% 18%, rgba(201,168,76,0.055) 0%, transparent 50%), radial-gradient(ellipse 50% 40% at 12% 82%, rgba(201,168,76,0.035) 0%, transparent 45%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <SectionHeader
          eyebrow={t.proof_eyebrow}
          title={t.proof_title}
          sub={t.proof_sub}
        />

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
          style={{ border: '1px solid var(--bg-border)' }}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
        >
          {PROOF_POINTS.map((pt) => (
            <motion.div
              key={pt.label}
              variants={scaleIn}
              className="flex flex-col items-center justify-center py-8 sm:py-10 md:py-14 px-4 sm:px-8 text-center group cursor-default"
              style={{
                background: 'var(--bg-card-2)',
                borderBottom: '1px solid var(--bg-border)',
                borderRight: '1px solid var(--bg-border)',
              }}
              whileHover={{
                y: -4,
                transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
              }}
            >
              <div
                className="font-bold leading-none mb-2.5 transition-colors duration-300 group-hover:text-[var(--gold-light)]"
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(30px, 4.5vw, 54px)',
                  color: 'var(--gold)',
                }}
              >
                <CountUp value={pt.value} />
              </div>
              <motion.div
                className="font-sans text-[13px] font-semibold text-[var(--text-primary)] mb-1 leading-snug"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {pt.label}
              </motion.div>
              <motion.div
                className="font-sans text-[11px] font-normal text-[var(--text-faint)] tracking-wide"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: 0.35 }}
              >
                {pt.detail}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
