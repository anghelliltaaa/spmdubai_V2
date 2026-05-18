'use client';

import { motion } from 'framer-motion';
import { Users, Cpu, Heart } from 'lucide-react';
import { SectionHeader } from '@/components/ui/section-header';
import { slideInLeft, slideInRight, staggerList, listItem, EASE_OUT_EXPO } from '@/lib/animations';
import { useLang } from '@/contexts/LangContext';

const slideUp = {
  hidden:  { opacity: 0, y: 40, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0,  filter: 'blur(0px)', transition: { duration: 0.75, ease: EASE_OUT_EXPO } },
};

export function PhilippineAdvantage() {
  const { t } = useLang();

  const PILLARS = [
    {
      icon: Users,
      subtitle: t.adv_p1_sub,
      title: t.adv_p1_title,
      description: t.adv_p1_desc,
      points: [t.adv_p1_pt1, t.adv_p1_pt2, t.adv_p1_pt3],
    },
    {
      icon: Cpu,
      subtitle: t.adv_p2_sub,
      title: t.adv_p2_title,
      description: t.adv_p2_desc,
      points: [t.adv_p2_pt1, t.adv_p2_pt2, t.adv_p2_pt3],
    },
    {
      icon: Heart,
      subtitle: t.adv_p3_sub,
      title: t.adv_p3_title,
      description: t.adv_p3_desc,
      points: [t.adv_p3_pt1, t.adv_p3_pt2, t.adv_p3_pt3],
    },
  ];

  return (
    <section
      id="advantage"
      className="py-16 md:py-28 relative overflow-hidden"
      style={{ background: 'var(--bg-surface)' }}
      aria-label="The Philippine Advantage"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <SectionHeader
          eyebrow={t.adv_eyebrow}
          title={t.adv_title}
          sub={t.adv_sub}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            const variant = i === 0 ? slideInLeft : i === 2 ? slideInRight : slideUp;
            return (
              <motion.div
                key={pillar.title}
                variants={variant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                className="rounded-none p-5 sm:p-6 md:p-8 border flex flex-col"
                style={{
                  background: 'var(--bg-card)',
                  borderColor: 'var(--bg-border)',
                }}
                whileHover={{
                  y: -8,
                  borderColor: 'rgba(201,168,76,0.22)',
                  boxShadow: '0 24px 56px rgba(201,168,76,0.10)',
                  transition: { duration: 0.3, ease: EASE_OUT_EXPO },
                } as never}
              >
                {/* Icon — bare, no box */}
                <motion.div
                  className="mb-5"
                  whileHover={{ rotate: 15, scale: 1.1, transition: { duration: 0.3 } }}
                >
                  <Icon size={22} color="var(--gold)" aria-hidden="true" />
                </motion.div>

                <div className="font-sans text-[10px] font-bold tracking-widest uppercase text-[var(--gold)] mb-1">
                  {pillar.subtitle}
                </div>
                <h3
                  className="font-sans text-lg font-semibold text-[var(--text-primary)] mb-3"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  {pillar.title}
                </h3>
                <p className="font-sans text-sm font-light leading-relaxed text-[var(--text-muted)] mb-5">
                  {pillar.description}
                </p>

                {/* Bullet points stagger in */}
                <motion.ul
                  className="space-y-2 mt-auto"
                  variants={staggerList}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.5 }}
                >
                  {pillar.points.map((pt) => (
                    <motion.li
                      key={pt}
                      variants={listItem}
                      className="flex items-start gap-2.5 font-sans text-[12px] text-[var(--text-muted)]"
                    >
                      <motion.span
                        className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ background: 'var(--gold)' }}
                        aria-hidden="true"
                        whileInView={{ scale: [0, 1.4, 1] }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                      />
                      {pt}
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
