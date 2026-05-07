'use client';

import { motion } from 'framer-motion';
import { Users, Cpu, Heart } from 'lucide-react';
import { SectionHeader } from '@/components/ui/section-header';
import { slideInLeft, slideInRight } from '@/lib/animations';

const PILLARS = [
  {
    icon: Users,
    subtitle: 'Regional Expertise',
    title: 'The Human Engine',
    description: 'Filipino legal professionals educated in both civil-law and common-law systems, fluent in Arabic, English, Tagalog and Spanish — uniquely equipped for Gulf cross-border disputes.',
    points: [
      '320+ bilingual attorneys across MENA and Asia',
      'Average 9 years Gulf-region experience',
      'Licensed in 6 jurisdictions simultaneously',
    ],
  },
  {
    icon: Cpu,
    subtitle: 'Operational Depth',
    title: 'The Back-Office Advantage',
    description: 'Two decades of building enterprise-grade recovery infrastructure in Manila enables us to run operations at a scale and cost that no GCC-only firm can replicate.',
    points: [
      'ISO 9001 certified Manila operations hub',
      '24 / 7 case tracking via client portal',
      'AED cost savings passed to clients',
    ],
  },
  {
    icon: Heart,
    subtitle: 'Cultural Bridge',
    title: 'East–West Fluency',
    description: "The Philippines has been the Gulf's workforce backbone for 40 years. That cultural proximity accelerates negotiations, prevents misunderstandings, and builds debtor trust faster.",
    points: [
      'Culturally aligned with GCC debtor profiles',
      'Sharia-informed negotiation frameworks',
      'Proven mediation success rate: 74%',
    ],
  },
];

const slideUp = {
  hidden: { opacity: 0, y: 35 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' as const } },
};

export function PhilippineAdvantage() {
  return (
    <section
      id="advantage"
      className="py-28 relative overflow-hidden"
      style={{ background: 'var(--bg-surface)' }}
      aria-label="The Philippine Advantage"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <SectionHeader
          eyebrow="The Philippine Advantage"
          title="Why Our Roots Make Us Stronger"
          sub="Twenty years of excellence in Manila built the operational foundation that makes SPM Dubai the most capable recovery partner in the Gulf."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            const variant = i === 0 ? slideInLeft : i === 2 ? slideInRight : slideUp;
            return (
              <motion.div
                key={pillar.title}
                variants={variant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="rounded-none p-8 border flex flex-col"
                style={{
                  background: 'var(--bg-card)',
                  borderColor: 'var(--bg-border)',
                  transition: 'border-color 0.25s',
                }}
                whileHover={{ borderColor: 'var(--gold-border)' } as never}
              >
                <div className="mb-5">
                  <Icon size={26} color="var(--gold)" aria-hidden="true" />
                </div>
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
                <ul className="space-y-2 mt-auto">
                  {pillar.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5 font-sans text-[12px] text-[var(--text-muted)]">
                      <span
                        className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ background: 'var(--gold)' }}
                        aria-hidden="true"
                      />
                      {pt}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
