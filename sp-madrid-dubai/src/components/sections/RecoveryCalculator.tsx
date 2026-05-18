'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/ui/section-header';
import { Button } from '@/components/ui/button';
import { calculateRecovery, type RecoveryInput } from '@/lib/calculations';
import { cn } from '@/lib/utils';
import { useLang } from '@/contexts/LangContext';

type DPD = RecoveryInput['dpdBucket'];
type Sector = RecoveryInput['sector'];

const DPD_OPTIONS: { value: DPD; label: string }[] = [
  { value: '30-89',   label: '30–89 DPD' },
  { value: '90-179',  label: '90–179 DPD' },
  { value: '180-365', label: '180–365 DPD' },
  { value: '365+',    label: '365+ DPD' },
];

const SECTOR_OPTIONS: { value: Sector; label: string }[] = [
  { value: 'banking',    label: 'Banking / Finance' },
  { value: 'telecom',    label: 'Telecommunications' },
  { value: 'retail',     label: 'Retail / BNPL' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'logistics',  label: 'Logistics' },
  { value: 'other',      label: 'Other' },
];

function formatAED(n: number): string {
  if (n >= 1_000_000) return `AED ${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `AED ${(n / 1_000).toFixed(0)}K`;
  return `AED ${n.toFixed(0)}`;
}

export function RecoveryCalculator() {
  const [portfolio, setPortfolio] = useState(10_000_000);
  const [dpd, setDpd] = useState<DPD>('90-179');
  const [sector, setSector] = useState<Sector>('banking');
  const [result, setResult] = useState<ReturnType<typeof calculateRecovery> | null>(null);
  const { t } = useLang();

  function handleCalculate() {
    setResult(calculateRecovery({ portfolioSize: portfolio, dpdBucket: dpd, sector }));
  }

  const inputCls =
    'w-full font-sans text-sm text-[var(--text-primary)] bg-[var(--bg-card)] border border-[var(--bg-border)] px-4 py-3 focus:outline-none focus:border-[var(--gold)] transition-colors duration-200';

  return (
    <section
      id="calculator"
      className="py-16 md:py-28 relative overflow-hidden"
      style={{ background: 'var(--bg)' }}
      aria-label="Recovery Calculator"
    >
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <SectionHeader
          eyebrow={t.calc_eyebrow}
          title={t.calc_title}
          sub={t.calc_sub}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Inputs */}
          <div
            className="p-5 sm:p-6 md:p-8 border"
            style={{ background: 'var(--bg-card-2)', borderColor: 'var(--bg-border)' }}
          >
            {/* Portfolio size */}
            <div className="mb-7">
              <div className="flex items-center justify-between mb-2">
                <label className="font-sans text-[10px] font-bold tracking-widest uppercase text-[var(--gold)]">
                  {t.calc_portfolio_lbl}
                </label>
                <span className="font-sans text-[13px] font-semibold text-[var(--text-primary)]">
                  {formatAED(portfolio)}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                step={1}
                value={Math.round(Math.log10(portfolio / 100_000) * 25)}
                onChange={(e) => {
                  const logVal = Number(e.target.value);
                  setPortfolio(Math.round(100_000 * Math.pow(10, logVal / 25)));
                }}
                className="w-full accent-[var(--gold)] cursor-pointer"
                aria-label="Portfolio size in AED"
              />
              <div className="flex justify-between mt-3 gap-1.5 flex-wrap">
                {[1_000_000, 10_000_000, 50_000_000, 200_000_000].map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setPortfolio(v)}
                    className={cn(
                      'font-sans text-[9px] tracking-wide border px-2.5 py-1 transition-colors flex-1 min-w-[60px]',
                      portfolio === v
                        ? 'bg-[var(--gold-dim)] border-[var(--gold)] text-[var(--gold)]'
                        : 'border-[var(--bg-border)] hover:border-[var(--gold-border)] text-[var(--text-faint)]'
                    )}
                  >
                    {formatAED(v)}
                  </button>
                ))}
              </div>
            </div>

            {/* DPD bucket */}
            <div className="mb-6">
              <label className="block font-sans text-[10px] font-bold tracking-widest uppercase text-[var(--gold)] mb-2">
                {t.calc_dpd_lbl}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {DPD_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setDpd(opt.value)}
                    className={cn(
                      'font-sans text-[11px] font-semibold py-2.5 border transition-colors',
                      dpd === opt.value
                        ? 'bg-[var(--gold-dim)] border-[var(--gold)] text-[var(--gold)]'
                        : 'bg-[var(--bg-card)] border-[var(--bg-border)] text-[var(--text-muted)] hover:border-[var(--gold-border)]'
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sector */}
            <div className="mb-8">
              <label className="block font-sans text-[10px] font-bold tracking-widest uppercase text-[var(--gold)] mb-2">
                {t.calc_sector_lbl}
              </label>
              <select
                className={inputCls}
                value={sector}
                onChange={(e) => setSector(e.target.value as Sector)}
                aria-label="Business sector"
              >
                {SECTOR_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value} style={{ background: '#111827' }}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <Button size="lg" variant="gold" className="w-full" onClick={handleCalculate}>
              {t.calc_calculate}
            </Button>
          </div>

          {/* Results */}
          <div
            className="p-5 sm:p-7 md:p-10 border flex flex-col justify-center"
            style={{ background: 'var(--bg-card)', borderColor: 'var(--bg-border)' }}
          >
            {!result ? (
              <div className="text-center">
                <div className="font-sans text-[var(--text-faint)] text-sm leading-relaxed">
                  {t.calc_empty}
                </div>
                <div className="mt-6 text-[var(--text-faint)] text-xs">
                  {t.calc_disclaimer}
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="font-sans text-[10px] font-bold tracking-widest uppercase text-[var(--gold)] mb-2">
                  {t.calc_projection_lbl}
                </div>
                <div
                  className="font-bold leading-none mb-1"
                  style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(36px, 5vw, 52px)', color: 'var(--gold)' }}
                >
                  {formatAED(result.estimatedRecovery)}
                </div>
                <div className="font-sans text-sm text-[var(--text-muted)] mb-8">
                  {Math.round(result.recoveryRate * 100)}% {t.calc_recovery_of}
                </div>

                <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-8">
                  {[
                    { label: t.calc_recovery_rate, value: `${Math.round(result.recoveryRate * 100)}%` },
                    { label: t.calc_timeline,       value: `${result.timelineMonths} mo.` },
                    { label: t.calc_roi,             value: `${result.projectedROI}%` },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center p-2 sm:p-3" style={{ background: 'var(--bg-card-2)', border: '1px solid var(--bg-border)' }}>
                      <div className="font-sans text-base sm:text-lg font-bold text-[var(--text-primary)]">{stat.value}</div>
                      <div className="font-sans text-[9px] sm:text-[10px] tracking-wide text-[var(--text-faint)]">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Recovery bar */}
                <div className="mb-2 flex justify-between font-sans text-[10px] text-[var(--text-faint)]">
                  <span>{t.calc_portfolio_bar}</span>
                  <span>{formatAED(portfolio)}</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--bg-border)' }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: 'linear-gradient(to right, var(--gold), var(--gold-light))' }}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.round(result.recoveryRate * 100)}%` }}
                    transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
                  />
                </div>

                <div className="mt-8">
                  <Button
                    size="md"
                    variant="dark"
                    className="w-full"
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    {t.calc_full_assessment}
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
