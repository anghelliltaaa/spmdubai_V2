'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod/v4';
import { SITE } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/ui/section-header';
import { cn } from '@/lib/utils';
import { useLang } from '@/contexts/LangContext';

const schema = z.object({
  name:         z.string().min(2, 'Full name required'),
  company:      z.string().min(2, 'Company name required'),
  email:        z.email('Valid email required'),
  phone:        z.string().optional(),
  portfolioAED: z.string().min(1, 'Portfolio size required'),
  message:      z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export function FinalCTA() {
  const [submitted, setSubmitted] = useState(false);
  const { t } = useLang();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  function onSubmit(data: FormValues) {
    const subject = encodeURIComponent(`Consultation Request — ${data.company}`);
    const body = encodeURIComponent(
      [
        `Name: ${data.name}`,
        `Company: ${data.company}`,
        `Reply-to: ${data.email}`,
        `Phone: ${data.phone || '—'}`,
        `Portfolio Size (AED): ${data.portfolioAED}`,
        '',
        data.message || '',
      ].join('\n')
    );
    const link = document.createElement('a');
    link.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
    link.click();
    setSubmitted(true);
  }

  const inputCls = (hasError: boolean) =>
    cn(
      'w-full font-sans text-[13px] text-[var(--text-primary)] bg-[var(--bg-card)] border px-4 py-3.5 focus:outline-none transition-colors duration-200 rounded-none placeholder:text-[var(--text-faint)]',
      hasError
        ? 'border-red-500/70 focus:border-red-400'
        : 'border-[var(--bg-border)] focus:border-[var(--gold)]'
    );

  return (
    <section
      id="contact"
      className="py-16 md:py-28 relative overflow-hidden"
      style={{ background: 'var(--bg-surface)' }}
      aria-label="Contact SPM Dubai"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 80% 30%, rgba(201,168,76,0.06) 0%, transparent 50%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <SectionHeader
          eyebrow={t.contact_eyebrow}
          title={t.contact_title}
          sub={t.contact_sub}
        />

        {submitted ? (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div
              className="w-16 h-16 flex items-center justify-center mx-auto mb-6 border-2"
              style={{ borderColor: 'var(--gold)', background: 'var(--gold-dim)' }}
            >
              <span className="text-[var(--gold)] text-2xl">✓</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-[var(--text-primary)] mb-3" style={{ fontFamily: 'var(--font-serif)' }}>
              {t.contact_success_title}
            </h3>
            <p className="font-sans text-sm text-[var(--text-muted)] max-w-sm mx-auto">
              {t.contact_success_sub}
            </p>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
            noValidate
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
            }}
          >
            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16,1,0.3,1] } } }}
            >
              <label className="block font-sans text-[10px] font-bold tracking-widest uppercase text-[var(--gold)] mb-1.5">
                {t.contact_name}
              </label>
              <input {...register('name')} placeholder="John Smith" className={inputCls(!!errors.name)} />
              {errors.name && <p className="mt-1 font-sans text-xs text-red-400">{errors.name.message}</p>}
            </motion.div>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16,1,0.3,1] } } }}
            >
              <label className="block font-sans text-[10px] font-bold tracking-widest uppercase text-[var(--gold)] mb-1.5">
                {t.contact_company}
              </label>
              <input {...register('company')} placeholder="Your Company" className={inputCls(!!errors.company)} />
              {errors.company && <p className="mt-1 font-sans text-xs text-red-400">{errors.company.message}</p>}
            </motion.div>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16,1,0.3,1] } } }}
            >
              <label className="block font-sans text-[10px] font-bold tracking-widest uppercase text-[var(--gold)] mb-1.5">
                {t.contact_email}
              </label>
              <input {...register('email')} type="email" placeholder="you@company.com" className={inputCls(!!errors.email)} />
              {errors.email && <p className="mt-1 font-sans text-xs text-red-400">{errors.email.message}</p>}
            </motion.div>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16,1,0.3,1] } } }}
            >
              <label className="block font-sans text-[10px] font-bold tracking-widest uppercase text-[var(--gold)] mb-1.5">
                {t.contact_phone}
              </label>
              <input {...register('phone')} type="tel" placeholder="+971 XX XXX XXXX" className={inputCls(false)} />
            </motion.div>

            <motion.div
              className="md:col-span-2"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16,1,0.3,1] } } }}
            >
              <label className="block font-sans text-[10px] font-bold tracking-widest uppercase text-[var(--gold)] mb-1.5">
                {t.contact_portfolio}
              </label>
              <select {...register('portfolioAED')} className={inputCls(!!errors.portfolioAED)} style={{ color: 'var(--text-muted)' }}>
                <option value="">{t.contact_portfolio_placeholder}</option>
                <option value="under-5m">{t.contact_portfolio_opt1}</option>
                <option value="5m-25m">{t.contact_portfolio_opt2}</option>
                <option value="25m-100m">{t.contact_portfolio_opt3}</option>
                <option value="100m-500m">{t.contact_portfolio_opt4}</option>
                <option value="500m+">{t.contact_portfolio_opt5}</option>
              </select>
              {errors.portfolioAED && <p className="mt-1 font-sans text-xs text-red-400">{errors.portfolioAED.message}</p>}
            </motion.div>

            <motion.div
              className="md:col-span-2"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16,1,0.3,1] } } }}
            >
              <label className="block font-sans text-[10px] font-bold tracking-widest uppercase text-[var(--gold)] mb-1.5">
                {t.contact_message}
              </label>
              <textarea
                {...register('message')}
                rows={4}
                placeholder={t.contact_message_placeholder}
                className={cn(inputCls(false), 'resize-none')}
              />
            </motion.div>

            <motion.div
              className="md:col-span-2"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16,1,0.3,1] } } }}
            >
              <Button
                type="submit"
                size="lg"
                variant="gold"
                className="w-full md:w-auto min-w-[240px]"
                disabled={isSubmitting}
              >
                {isSubmitting ? t.contact_submitting : t.contact_submit}
              </Button>
              <p className="mt-3 font-sans text-xs text-[var(--text-faint)]">
                {t.contact_privacy}
              </p>
            </motion.div>
          </motion.form>
        )}
      </div>
    </section>
  );
}
