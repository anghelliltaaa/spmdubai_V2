'use client';

import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/ui/section-header';
import { scaleIn, staggerContainer } from '@/lib/animations';

const PROOF_POINTS = [
  { value: 'AED 2.1B+', label: 'Total Recovered',      detail: 'Dubai portfolio, since 2023' },
  { value: '94%',        label: 'Recovery Rate',         detail: 'Cross-sector average' },
  { value: '14+',        label: 'Countries Served',      detail: 'Simultaneous enforcement' },
  { value: '0',          label: 'Regulatory Violations', detail: 'DIFC · CBUAE · TDRA' },
  { value: '2,500+',     label: 'Professionals',         detail: 'Manila + Dubai combined' },
  { value: '18+',        label: 'Years of Experience',   detail: 'Founded 2004, Manila' },
];

export function DubaiProofPoint() {
  return (
    <section
      id="proof"
      className="py-28 relative overflow-hidden"
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
          eyebrow="By the Numbers"
          title="Dubai Proof Point"
          sub="Every metric is externally audited. Every figure is a promise kept."
        />

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3"
          style={{ border: '1px solid var(--bg-border)' }}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {PROOF_POINTS.map((pt) => (
            <motion.div
              key={pt.label}
              variants={scaleIn}
              className="flex flex-col items-center justify-center py-10 sm:py-14 px-5 sm:px-8 text-center group"
              style={{
                background: 'var(--bg-card-2)',
                borderBottom: '1px solid var(--bg-border)',
                borderRight: '1px solid var(--bg-border)',
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
                {pt.value}
              </div>
              <div className="font-sans text-[13px] font-semibold text-[var(--text-primary)] mb-1 leading-snug">
                {pt.label}
              </div>
              <div className="font-sans text-[11px] font-normal text-[var(--text-faint)] tracking-wide">
                {pt.detail}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
