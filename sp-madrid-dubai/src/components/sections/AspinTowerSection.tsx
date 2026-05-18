'use client';

import { motion } from 'framer-motion';
import { MapEmbed } from '@/components/shared/MapEmbed';
import { SectionHeader } from '@/components/ui/section-header';
import { slideInLeft, slideInRight, scaleIn, staggerContainer, EASE_OUT_EXPO } from '@/lib/animations';
import { useLang } from '@/contexts/LangContext';

export function AspinTowerSection() {
  const { t } = useLang();

  const HIGHLIGHTS = [
    { value: t.aspin_floor_val,    label: t.aspin_floor_lbl },
    { value: t.aspin_district_val, label: t.aspin_district_lbl },
    { value: t.aspin_height_val,   label: t.aspin_height_lbl },
    { value: t.aspin_year_val,     label: t.aspin_year_lbl },
  ];

  return (
    <section
      id="tower"
      className="py-16 md:py-28 relative overflow-hidden"
      style={{ background: 'var(--bg-surface)' }}
      aria-label="Aspin Commercial Tower — Our Dubai Home"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 55% at 30% 50%, rgba(201,168,76,0.05) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <SectionHeader
          eyebrow={t.aspin_eyebrow}
          title={t.aspin_title}
          sub={t.aspin_sub}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Map */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className="relative overflow-hidden"
            style={{
              height: 'clamp(340px, 50vw, 520px)',
              border: '1px solid var(--bg-border)',
            }}
          >
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
            viewport={{ once: false, amount: 0.3 }}
            className="flex flex-col gap-8"
          >
            {/* Stats grid — staggered */}
            <motion.div
              className="grid grid-cols-2 gap-3"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
            >
              {HIGHLIGHTS.map((h) => (
                <motion.div
                  key={h.label}
                  variants={scaleIn}
                  className="flex flex-col items-center justify-center py-7 px-4 text-center"
                  style={{
                    background: 'var(--bg-card-2)',
                    border: '1px solid var(--bg-border)',
            }}
                  whileHover={{
                    y: -4,
                    borderColor: 'rgba(201,168,76,0.22)',
                    background: 'var(--bg-card)',
                    transition: { duration: 0.25, ease: EASE_OUT_EXPO },
                  } as never}
                >
                  <motion.div
                    className="font-bold leading-none mb-1"
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: 'clamp(22px, 3vw, 32px)',
                      color: 'var(--gold)',
                    }}
                    initial={{ opacity: 0, scale: 0.7 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                  >
                    {h.value}
                  </motion.div>
                  <div className="font-sans text-[10px] font-normal tracking-widest uppercase" style={{ color: 'var(--text-faint)' }}>
                    {h.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Description — slides up */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
            >
              <div className="font-sans text-[9px] font-black tracking-[0.3em] uppercase mb-3" style={{ color: 'var(--gold)' }}>
                {t.aspin_why_label}
              </div>
              <p className="font-sans text-[13px] font-light leading-[1.85] mb-4" style={{ color: 'var(--text-muted)' }}>
                {t.aspin_p1}
              </p>
              <p className="font-sans text-[13px] font-light leading-[1.85]" style={{ color: 'var(--text-muted)' }}>
                {t.aspin_p2}
              </p>
            </motion.div>

            <motion.div
              className="flex items-start gap-2 text-[12px] font-sans"
              style={{ color: 'var(--text-faint)' }}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, ease: EASE_OUT_EXPO, delay: 0.2 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              {t.aspin_address}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
