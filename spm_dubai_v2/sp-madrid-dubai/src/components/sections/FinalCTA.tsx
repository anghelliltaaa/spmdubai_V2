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
      className="py-28 relative overflow-hidden"
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
          eyebrow="Get in Touch"
          title="Start Your Recovery Today"
          sub="Speak with a DIFC-licensed specialist. No obligation — just clarity on what's recoverable and how quickly."
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
              Message Received
            </h3>
            <p className="font-sans text-sm text-[var(--text-muted)] max-w-sm mx-auto">
              Our Dubai team will respond within one business day. Thank you for reaching out.
            </p>
          </motion.div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
            noValidate
          >
            <div>
              <label className="block font-sans text-[10px] font-bold tracking-widest uppercase text-[var(--gold)] mb-1.5">
                Full Name *
              </label>
              <input {...register('name')} placeholder="John Smith" className={inputCls(!!errors.name)} />
              {errors.name && <p className="mt-1 font-sans text-xs text-red-400">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block font-sans text-[10px] font-bold tracking-widest uppercase text-[var(--gold)] mb-1.5">
                Company *
              </label>
              <input {...register('company')} placeholder="Your Company" className={inputCls(!!errors.company)} />
              {errors.company && <p className="mt-1 font-sans text-xs text-red-400">{errors.company.message}</p>}
            </div>

            <div>
              <label className="block font-sans text-[10px] font-bold tracking-widest uppercase text-[var(--gold)] mb-1.5">
                Email *
              </label>
              <input {...register('email')} type="email" placeholder="you@company.com" className={inputCls(!!errors.email)} />
              {errors.email && <p className="mt-1 font-sans text-xs text-red-400">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block font-sans text-[10px] font-bold tracking-widest uppercase text-[var(--gold)] mb-1.5">
                Phone
              </label>
              <input {...register('phone')} type="tel" placeholder="+971 XX XXX XXXX" className={inputCls(false)} />
            </div>

            <div className="md:col-span-2">
              <label className="block font-sans text-[10px] font-bold tracking-widest uppercase text-[var(--gold)] mb-1.5">
                Estimated Portfolio Size (AED) *
              </label>
              <select {...register('portfolioAED')} className={inputCls(!!errors.portfolioAED)} style={{ color: 'var(--text-muted)' }}>
                <option value="">Select range…</option>
                <option value="under-5m">Under AED 5M</option>
                <option value="5m-25m">AED 5M – 25M</option>
                <option value="25m-100m">AED 25M – 100M</option>
                <option value="100m-500m">AED 100M – 500M</option>
                <option value="500m+">AED 500M+</option>
              </select>
              {errors.portfolioAED && <p className="mt-1 font-sans text-xs text-red-400">{errors.portfolioAED.message}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block font-sans text-[10px] font-bold tracking-widest uppercase text-[var(--gold)] mb-1.5">
                Message (Optional)
              </label>
              <textarea
                {...register('message')}
                rows={4}
                placeholder="Briefly describe your recovery challenge…"
                className={cn(inputCls(false), 'resize-none')}
              />
            </div>

            <div className="md:col-span-2">
              <Button
                type="submit"
                size="lg"
                variant="gold"
                className="w-full md:w-auto min-w-[240px]"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending…' : 'Request Consultation'}
              </Button>
              <p className="mt-3 font-sans text-xs text-[var(--text-faint)]">
                By submitting, you agree to our Privacy Policy. We will never share your information.
              </p>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
