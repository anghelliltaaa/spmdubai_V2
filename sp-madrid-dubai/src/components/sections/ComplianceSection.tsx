'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, FileText, ClipboardList } from 'lucide-react';
import { SectionHeader } from '@/components/ui/section-header';
import { slideInLeft, slideInRight, slideUp, staggerContainer, EASE_OUT_EXPO } from '@/lib/animations';
import { useLang } from '@/contexts/LangContext';

export function ComplianceSection() {
  const { locale } = useLang();
  const isAr = locale === 'ar';

  const PILLARS = [
    {
      icon:  ShieldCheck,
      title: isAr ? 'حماية البيانات' : 'Data Protection',
      desc:  isAr
        ? 'تشفير على مستوى المؤسسات ومعالجة بيانات متوافقة مع معايير DIFC وADGM.'
        : 'Enterprise-grade encryption and data handling aligned with DIFC and ADGM standards.',
      badge: 'ISO 27001',
    },
    {
      icon:  FileText,
      title: isAr ? 'الامتثال التنظيمي' : 'Regulatory Adherence',
      desc:  isAr
        ? 'امتثال كامل لإرشادات مصرف الإمارات المركزي وقانون حماية البيانات الشخصية والأطر التنظيمية الإقليمية.'
        : 'Full compliance with UAE Central Bank guidelines, PDPL, and regional regulatory frameworks.',
      badge: 'CBUAE · PDPL',
    },
    {
      icon:  ClipboardList,
      title: isAr ? 'جاهزية التدقيق' : 'Audit Ready',
      desc:  isAr
        ? 'مسارات تدقيق شاملة وتوثيق لجميع أنشطة الاسترداد والاتصالات.'
        : 'Comprehensive audit trails and documentation for all recovery activities and communications.',
      badge: 'DIFC · DFSA',
    },
  ];

  const variants = [slideInLeft, slideUp, slideInRight];

  return (
    <section
      id="compliance"
      className="py-16 md:py-28 relative overflow-hidden"
      style={{ background: 'var(--bg-surface)' }}
      aria-label="Data Privacy & Regulatory Compliance"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 90% 20%, rgba(201,168,76,0.05) 0%, transparent 55%), radial-gradient(ellipse 50% 40% at 10% 80%, rgba(201,168,76,0.03) 0%, transparent 50%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <SectionHeader
          eyebrow={isAr ? 'الامتثال والخصوصية' : 'Trust & Compliance'}
          title={isAr ? 'خصوصية البيانات والامتثال التنظيمي' : 'Data Privacy & Regulatory Compliance'}
          sub={isAr
            ? 'نحمي بياناتك بأعلى معايير الأمان ونضمن الامتثال الكامل للأطر التنظيمية الإقليمية والدولية.'
            : 'We protect your data to the highest security standards and ensure full compliance with regional and international regulatory frameworks.'}
          align="center"
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
        >
          {PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                variants={variants[i]}
                className="relative flex flex-col p-5 sm:p-6 md:p-8 border overflow-hidden"
                style={{ background: 'var(--bg-card)', borderColor: 'var(--bg-border)' }}
                whileHover={{ borderColor: 'rgba(201,168,76,0.35)', y: -6, boxShadow: '0 20px 48px rgba(201,168,76,0.08)', transition: { duration: 0.3, ease: EASE_OUT_EXPO } } as never}
              >
                {/* Corner gold accent */}
                <div
                  className="absolute top-0 left-0 w-12 h-12 pointer-events-none"
                  style={{ borderTop: '2px solid var(--gold)', borderLeft: '2px solid var(--gold)', opacity: 0.4 }}
                  aria-hidden="true"
                />

                {/* Icon */}
                <motion.div
                  className="mb-5"
                  whileHover={{ rotate: 10, scale: 1.1, transition: { duration: 0.3 } }}
                >
                  <Icon size={26} color="var(--gold)" aria-hidden="true" />
                </motion.div>

                {/* Badge */}
                <div
                  className="inline-flex items-center font-sans text-[9px] font-bold tracking-[0.22em] uppercase px-2.5 py-1 mb-4 self-start"
                  style={{ background: 'var(--gold-dim)', border: '1px solid rgba(201,168,76,0.25)', color: 'var(--gold)' }}
                >
                  {pillar.badge}
                </div>

                <h3
                  className="font-bold text-[18px] leading-tight mb-3"
                  style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-primary)' }}
                >
                  {pillar.title}
                </h3>

                <p
                  className="font-sans text-[13px] font-light leading-[1.8]"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {pillar.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom trust bar */}
        <motion.div
          className="mt-12 flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-8"
          style={{ borderTop: '1px solid var(--bg-border)' }}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
        >
          {['DIFC Licensed', 'CBUAE Compliant', 'ISO 27001', 'PDPL Aligned', '0 Violations'].map((badge) => (
            <motion.div
              key={badge}
              variants={{
                hidden:  { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_OUT_EXPO } },
              }}
              className="font-sans text-[10px] font-bold tracking-[0.22em] uppercase px-4 py-2"
              style={{ background: 'var(--bg-card-2)', border: '1px solid var(--bg-border)', color: 'var(--text-muted)' }}
            >
              {badge}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
