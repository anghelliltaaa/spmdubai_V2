'use client';

import { motion } from 'framer-motion';
import { MapEmbed } from '@/components/shared/MapEmbed';
import { SectionHeader } from '@/components/ui/section-header';
import { slideInLeft, slideInRight } from '@/lib/animations';

/* ── Section stats ── */
const HIGHLIGHTS = [
  { value: '57F', label: 'Floors' },
  { value: 'DIFC', label: 'District' },
  { value: '249m', label: 'Height' },
  { value: '2009', label: 'Completed' },
];

export function AspinTowerSection() {
  return (
    <section
      id="tower"
      className="py-28 relative overflow-hidden"
      style={{ background: 'var(--bg-surface)' }}
      aria-label="Aspin Commercial Tower — Our Dubai Home"
    >
      {/* Atmospheric gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 55% at 30% 50%, rgba(201,168,76,0.05) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <SectionHeader
          eyebrow="Our Dubai Home"
          title="Aspin Commercial Tower"
          sub="Strategically located in the Dubai International Financial Centre — MENA's premier regulated financial hub."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Map */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="relative overflow-hidden"
            style={{
              height: 'clamp(340px, 50vw, 520px)',
              border: '1px solid var(--bg-border)',
            }}
          >
            {/* Corner accent lines */}
            <div
              className="absolute top-0 left-0 w-8 h-8 pointer-events-none z-10"
              style={{ borderTop: '1px solid var(--gold)', borderLeft: '1px solid var(--gold)', opacity: 0.6 }}
              aria-hidden="true"
            />
            <div
              className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none z-10"
              style={{ borderBottom: '1px solid var(--gold)', borderRight: '1px solid var(--gold)', opacity: 0.6 }}
              aria-hidden="true"
            />

            <MapEmbed className="absolute inset-0" />
          </motion.div>

          {/* Info panel */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col gap-8"
          >
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3">
              {HIGHLIGHTS.map((h) => (
                <div
                  key={h.label}
                  className="flex flex-col items-center justify-center py-7 px-4 text-center"
                  style={{
                    background: 'var(--bg-card-2)',
                    border: '1px solid var(--bg-border)',
                  }}
                >
                  <div
                    className="font-bold leading-none mb-1"
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: 'clamp(22px, 3vw, 32px)',
                      color: 'var(--gold)',
                    }}
                  >
                    {h.value}
                  </div>
                  <div className="font-sans text-[10px] font-normal tracking-widest uppercase text-[var(--text-faint)]">
                    {h.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div>
              <div className="font-sans text-[9px] font-black tracking-[0.3em] uppercase text-[var(--gold)] mb-3">Why DIFC?</div>
              <p className="font-sans text-[13px] font-light leading-[1.85] mb-4" style={{ color: 'var(--text-muted)' }}>
                The Dubai International Financial Centre operates under an independent common-law framework, regulated by the DFSA. Our DIFC location gives clients direct access to enforceable legal recourse across MENA, Asia, and Europe — critical for complex cross-border debt recovery.
              </p>
              <p className="font-sans text-[13px] font-light leading-[1.85]" style={{ color: 'var(--text-muted)' }}>
                From the 30th floor of Aspin Tower, SPM Dubai oversees recovery operations spanning 14 countries — with court filings handled simultaneously across the UAE, Manila, and London.
              </p>
            </div>

            <div className="flex items-start gap-2 text-[12px] font-sans" style={{ color: 'var(--text-faint)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                104, Aspin Commercial Tower, Sheikh Zayed Road, Dubai
              </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
