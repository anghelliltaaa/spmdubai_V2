'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ChevronDown } from 'lucide-react';
import { Eyebrow } from '@/components/ui/section-header';
import { slideUp, staggerContainer } from '@/lib/animations';
import { SITE } from '@/lib/constants';
import { useLang } from '@/contexts/LangContext';
import { useTheme } from '@/hooks/useTheme';

// ─── Hero-specific CTA button ─────────────────────────────────────────────────
// "dark" variant: deep navy fill + white text → hover: gold fill + dark text
// default:        transparent border + white text → hover: white fill + dark text
function HeroButton({
  dark = false,
  onClick,
  children,
}: {
  dark?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  const [hovered, setHovered] = useState(false);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  // Outline button text: white in dark mode (hero has dark bg), black in light mode
  const outlineTextColor = '#F0ECE3';

  return (
    <motion.button
      onClick={onClick}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -3, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
      whileTap={{ scale: 0.96, y: 0 }}
      className="relative overflow-hidden inline-flex items-center justify-center gap-2 font-sans font-bold tracking-widest uppercase cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold)] text-[12px] px-10 py-4"
      style={{
        // Base background
        background: dark ? '#1C1A14' : 'rgba(240,236,227,0.18)',
        color: dark ? '#F0ECE3' : outlineTextColor,
        border: dark
          ? (hovered ? 'none' : '1.5px solid rgba(240,236,227,0.15)')
          : (hovered ? 'none' : '1.5px solid rgba(240,236,227,0.55)'),
        transition: 'border-color 0.25s, box-shadow 0.25s',
        boxShadow: hovered && dark
          ? '0 6px 28px rgba(201,168,76,0.35)'
          : dark
            ? '0 4px 14px rgba(0,0,0,0.35)'
            : '0 2px 14px rgba(0,0,0,0.28)',
      }}
    >
      {/* Fill layer: sweeps in from left on hover */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: dark ? 'var(--gold)' : 'rgba(240,236,227,0.96)',
        }}
        initial={{ x: '-100%' }}
        animate={hovered ? { x: '0%' } : { x: '-100%' }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      />
      {/* Text — changes color on hover */}
      <motion.span
        className="relative z-10 flex items-center gap-2"
        animate={{
          color: hovered ? '#0A0906' : (dark ? '#F0ECE3' : outlineTextColor),
        }}
        transition={{ duration: 0.2, delay: hovered ? 0.12 : 0 }}
      >
        {children}
      </motion.span>
    </motion.button>
  );
}


const STAT_VALUES = ['AED 2.1B+', '94%', '0', '18+'];

export function Hero() {
  const { t } = useLang();

  const STATS = [
    { value: STAT_VALUES[0], label: t.stat_recovered },
    { value: STAT_VALUES[1], label: t.stat_rate },
    { value: STAT_VALUES[2], label: t.stat_violations },
    { value: STAT_VALUES[3], label: t.stat_gulf },
  ];
  return (
    <section
      className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden"
      style={{ paddingTop: 'var(--nav-h)' }}
      aria-label="SPM Dubai Hero"
    >
      {/* Background image — grayscale */}
      <div
        className="absolute inset-0 hero-bg-image"
        aria-hidden="true"
      />
      {/* Gradient overlay on top of image */}
      <div
        className="absolute inset-0 hero-bg-overlay"
        aria-hidden="true"
      />
      {/* Subtle gold atmospheric glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 55% at 62% 38%, rgba(201,168,76,0.07) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 18% 70%, rgba(27,53,104,0.12) 0%, transparent 55%)
          `,
        }}
        aria-hidden="true"
      />

      {/* Main content */}
      <motion.div
        className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-5 sm:px-8 max-w-4xl mx-auto w-full pt-20 pb-28"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={slideUp} className="mb-1">
          <Eyebrow className="justify-center">{t.hero_location}</Eyebrow>
        </motion.div>

        <motion.h1
          variants={slideUp}
          className="font-bold leading-[1.02] tracking-[-0.01em] mb-3"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(28px, 4vw, 56px)',
            color: '#FFFFFF',
            textShadow: '0 1px 12px rgba(0,0,0,0.28), 0 1px 3px rgba(0,0,0,0.18)',
          }}
        >
          {t.hero_heading1}<br />
          <em className="not-italic">{t.hero_heading2}</em>
        </motion.h1>

        <motion.p
          variants={slideUp}
          className="flex items-center justify-center gap-2 font-sans text-[10px] font-normal tracking-[0.22em] uppercase mb-6"
          style={{ color: 'rgba(240,236,227,0.60)' }}
        >
          <MapPin size={11} aria-hidden="true" />
          {SITE.location}
        </motion.p>

        <motion.p
          variants={slideUp}
          className="font-sans font-light leading-[1.8] max-w-[540px] mx-auto mb-10"
          style={{ fontSize: 'clamp(15px, 1.8vw, 18px)', color: 'rgba(240,236,227,0.78)' }}
        >
          {t.hero_sub}
        </motion.p>

        <motion.div variants={slideUp} className="flex items-center justify-center gap-3 flex-wrap">
          <HeroButton
            dark
            onClick={() => document.getElementById('stories')?.scrollIntoView({ behavior: 'smooth' })}
          >
            {t.hero_cta_cases}
          </HeroButton>
          <HeroButton
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            {t.hero_cta_consult}
          </HeroButton>
        </motion.div>

        {/* Inline stats strip — below buttons */}
        <motion.div
          variants={slideUp}
          className="mt-10 flex items-center justify-center gap-0 flex-wrap"
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="flex flex-col items-center px-6 py-3 text-center"
              style={{ borderRight: i < STATS.length - 1 ? '1px solid rgba(240,236,227,0.12)' : 'none' }}
            >
              <span
                className="font-bold leading-none mb-1"
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(20px, 2.4vw, 30px)',
                  color: 'var(--gold)',
                }}
              >
                {stat.value}
              </span>
              <span
                className="font-sans text-[9px] font-normal tracking-widest uppercase"
                style={{ color: 'rgba(240,236,227,0.50)' }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          variants={slideUp}
          className="mt-12 flex flex-col items-center gap-1.5 opacity-40 hover:opacity-70 transition-opacity cursor-pointer"
          onClick={() => document.getElementById('legacy')?.scrollIntoView({ behavior: 'smooth' })}
          aria-hidden="true"
        >
          <span className="font-sans text-[9px] tracking-[0.3em] uppercase" style={{ color: 'rgba(240,236,227,0.50)' }}>{t.hero_scroll}</span>
          <ChevronDown size={14} color="rgba(240,236,227,0.50)" className="animate-bounce" />
        </motion.div>
      </motion.div>

    </section>
  );
}
